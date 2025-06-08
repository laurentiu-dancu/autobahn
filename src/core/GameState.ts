import { GameState } from './types';
import { INITIAL_RESOURCES, MILESTONES } from '../config/gameConfig';

export class GameStateManager {
  private state: GameState;
  private saveKey = 'autobahn-save';

  constructor() {
    this.state = this.loadGame() || this.createNewGame();
  }

  private createNewGame(): GameState {
    return {
      resources: { ...INITIAL_RESOURCES },
      machines: {},
      unlockedRecipes: new Set(['forgeMetalPlate', 'cutWoodPlank']),
      unlockedMachines: new Set(),
      totalClicks: 0,
      gameStartTime: Date.now(),
      lastSaveTime: Date.now()
    };
  }

  getState(): GameState {
    return this.state;
  }

  updateResource(resourceId: string, amount: number): void {
    if (this.state.resources[resourceId]) {
      this.state.resources[resourceId].amount = Math.max(0, 
        this.state.resources[resourceId].amount + amount
      );
    }
  }

  canAfford(costs: { resourceId: string; amount: number }[]): boolean {
    return costs.every(cost => 
      this.state.resources[cost.resourceId]?.amount >= cost.amount
    );
  }

  spendResources(costs: { resourceId: string; amount: number }[]): boolean {
    if (!this.canAfford(costs)) return false;
    
    costs.forEach(cost => {
      this.updateResource(cost.resourceId, -cost.amount);
    });
    return true;
  }

  addMachine(machineId: string, machine: any): void {
    this.state.machines[machineId] = { ...machine };
  }

  incrementClicks(): void {
    this.state.totalClicks++;
  }

  checkMilestones(): void {
    MILESTONES.forEach(milestone => {
      if (!milestone.completed && milestone.condition(this.state)) {
        milestone.completed = true;
        milestone.reward(this.state);
        this.showNotification(`Milestone achieved: ${milestone.name}!`);
      }
    });
  }

  private showNotification(message: string): void {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  saveGame(): void {
    this.state.lastSaveTime = Date.now();
    const saveData = {
      ...this.state,
      unlockedRecipes: Array.from(this.state.unlockedRecipes),
      unlockedMachines: Array.from(this.state.unlockedMachines)
    };
    localStorage.setItem(this.saveKey, JSON.stringify(saveData));
  }

  private loadGame(): GameState | null {
    try {
      const saveData = localStorage.getItem(this.saveKey);
      if (!saveData) return null;
      
      const parsed = JSON.parse(saveData);
      return {
        ...parsed,
        unlockedRecipes: new Set(parsed.unlockedRecipes),
        unlockedMachines: new Set(parsed.unlockedMachines)
      };
    } catch (error) {
      console.error('Failed to load game:', error);
      return null;
    }
  }

  resetGame(): void {
    localStorage.removeItem(this.saveKey);
    this.state = this.createNewGame();
  }
}