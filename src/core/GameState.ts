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
      totalProduced: {},
      totalSales: 0,
      gameStartTime: Date.now(),
      lastSaveTime: Date.now(),
      uiState: {
        discoveredResources: new Set(['marks']), // Always show marks
        showMarket: false,
        showFullMarket: false,
        showEmergencyLabor: false
      }
    };
  }

  getState(): GameState {
    return this.state;
  }

  updateResource(resourceId: string, amount: number): void {
    if (this.state.resources[resourceId]) {
      const oldAmount = this.state.resources[resourceId].amount;
      this.state.resources[resourceId].amount = Math.max(0, 
        this.state.resources[resourceId].amount + amount
      );
      
      // Track production
      if (amount > 0) {
        this.state.totalProduced[resourceId] = (this.state.totalProduced[resourceId] || 0) + amount;
      }
      
      // Discover resource if we have it or just ran out
      if (this.state.resources[resourceId].amount > 0 || (oldAmount > 0 && this.state.resources[resourceId].amount === 0)) {
        this.state.uiState.discoveredResources.add(resourceId);
      }
      
      // Check for emergency labor need
      this.checkEmergencyLabor();
    }
  }

  private checkEmergencyLabor(): void {
    const hasNoMoney = this.state.resources.marks.amount < 1;
    const hasNoSellableItems = !this.hasSellableItems();
    const cannotAffordBasicMaterial = !this.canAffordCheapestMaterial();
    
    this.state.uiState.showEmergencyLabor = hasNoMoney && hasNoSellableItems && cannotAffordBasicMaterial;
  }

  private hasSellableItems(): boolean {
    const sellableResources = ['wireSprings', 'metalBrackets', 'leatherGaskets', 'springAssemblies', 'repairKits'];
    return sellableResources.some(resourceId => this.state.resources[resourceId]?.amount > 0);
  }

  private canAffordCheapestMaterial(): boolean {
    const cheapestPrice = Math.min(2, 3, 1, 4); // wireStock: 2, sheetMetal: 3, leatherScraps: 1, oil: 4
    return this.state.resources.marks.amount >= cheapestPrice;
  }

  performEmergencyLabor(): void {
    this.updateResource('marks', 0.15); // Small amount per click
    this.incrementClicks();
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

  recordSale(): void {
    this.state.totalSales++;
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
      unlockedMachines: Array.from(this.state.unlockedMachines),
      uiState: {
        ...this.state.uiState,
        discoveredResources: Array.from(this.state.uiState.discoveredResources)
      }
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
        unlockedMachines: new Set(parsed.unlockedMachines),
        uiState: {
          ...parsed.uiState,
          discoveredResources: new Set(parsed.uiState?.discoveredResources || ['marks'])
        },
        totalProduced: parsed.totalProduced || {},
        totalSales: parsed.totalSales || 0
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