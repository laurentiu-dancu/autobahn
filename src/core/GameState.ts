import { GameState } from './types';
import { INITIAL_RESOURCES } from '../config/resources';
import { MILESTONES } from '../config/milestones';
import { EventEmitter } from './EventEmitter';

export class GameStateManager {
  private state: GameState;
  private saveKey = 'autobahn-save';
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.state = this.loadGame() || this.createNewGame();
  }

  getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }

  private createNewGame(): GameState {
    return {
      resources: { ...INITIAL_RESOURCES },
      machines: {},
      stockControl: {
        personnel: {},
        rules: {},
        lastSalaryPayment: Date.now()
      },
      unlockedRecipes: new Set(['bendWireSpring', 'fileMetalBracket', 'cutLeatherGasket']),
      unlockedMachines: new Set(),
      unlockedStockControl: new Set(),
      totalClicks: 0,
      totalProduced: {},
      totalSales: 0,
      totalMarketTransactions: 0,
      gameStartTime: Date.now(),
      lastSaveTime: Date.now(),
      uiState: {
        discoveredResources: new Set(['marks']), // Always show marks
        showMarket: false,
        showStockControl: false
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
      const newAmount = this.state.resources[resourceId].amount;
      
      // Track production
      if (amount > 0) {
        this.state.totalProduced[resourceId] = (this.state.totalProduced[resourceId] || 0) + amount;
      }
      
      // Discover resource if we have it or just ran out
      if (this.state.resources[resourceId].amount > 0 || (oldAmount > 0 && this.state.resources[resourceId].amount === 0)) {
        this.state.uiState.discoveredResources.add(resourceId);
        this.eventEmitter.emit('uiStateUpdated', { changes: ['discoveredResources'] });
      }
      
      // Emit resource updated event
      this.eventEmitter.emit('resourceUpdated', { resourceId, oldAmount, newAmount });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
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

  recordSale(): void {
    this.state.totalSales++;
    this.state.totalMarketTransactions++;
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  recordPurchase(): void {
    this.state.totalMarketTransactions++;
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  addMachine(machineId: string, machine: any): void {
    this.state.machines[machineId] = { ...machine };
    this.eventEmitter.emit('machineUpdated', { machineId, machine: this.state.machines[machineId] });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  incrementClicks(): void {
    this.state.totalClicks++;
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  checkMilestones(): void {
    MILESTONES.forEach(milestone => {
      if (!milestone.completed && milestone.condition(this.state)) {
        milestone.completed = true;
        milestone.reward(this.state);
        this.eventEmitter.emit('milestoneCompleted', { 
          milestoneId: milestone.id, 
          milestoneName: milestone.name 
        });
        this.showNotification(`Milestone achieved: ${milestone.name}!`);
        this.eventEmitter.emit('uiStateUpdated', { changes: ['milestones'] });
      }
    });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  updateMachine(machineId: string, updates: Partial<any>): void {
    if (this.state.machines[machineId]) {
      Object.assign(this.state.machines[machineId], updates);
      this.eventEmitter.emit('machineUpdated', { machineId, machine: this.state.machines[machineId] });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
  }

  updatePersonnel(personnelId: string, personnel: any): void {
    this.state.stockControl.personnel[personnelId] = personnel;
    this.eventEmitter.emit('personnelUpdated', { personnelId, personnel });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  removePersonnel(personnelId: string): void {
    if (this.state.stockControl.personnel[personnelId]) {
      delete this.state.stockControl.personnel[personnelId];
      this.eventEmitter.emit('personnelUpdated', { personnelId, personnel: null });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
  }

  updateRule(ruleId: string, rule: any): void {
    this.state.stockControl.rules[ruleId] = rule;
    this.eventEmitter.emit('ruleUpdated', { ruleId, rule });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  removeRule(ruleId: string): void {
    if (this.state.stockControl.rules[ruleId]) {
      delete this.state.stockControl.rules[ruleId];
      this.eventEmitter.emit('ruleUpdated', { ruleId, rule: null });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
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
      unlockedStockControl: Array.from(this.state.unlockedStockControl),
      uiState: {
        ...this.state.uiState,
        discoveredResources: Array.from(this.state.uiState.discoveredResources)
      }
    };
    localStorage.setItem(this.saveKey, JSON.stringify(saveData));
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  private loadGame(): GameState | null {
    try {
      const saveData = localStorage.getItem(this.saveKey);
      if (!saveData) return null;
      
      const parsed = JSON.parse(saveData);
      return {
        ...parsed,
        // Ensure machines have status fields for backwards compatibility
        machines: Object.fromEntries(
          Object.entries(parsed.machines || {}).map(([id, machine]: [string, any]) => [
            id,
            {
              ...machine,
              // Migrate old 'paused' status to 'stopped'
              status: machine.status === 'paused' ? 'stopped' : (machine.status || 'stopped'),
              statusMessage: machine.statusMessage || undefined
            }
          ])
        ),
        unlockedRecipes: new Set(parsed.unlockedRecipes),
        unlockedMachines: new Set(parsed.unlockedMachines),
        unlockedStockControl: new Set(parsed.unlockedStockControl || []),
        stockControl: parsed.stockControl || {
          personnel: {},
          rules: {},
          lastSalaryPayment: Date.now()
        },
        uiState: {
          ...parsed.uiState,
          discoveredResources: new Set(parsed.uiState?.discoveredResources || ['marks']),
          showStockControl: parsed.uiState?.showStockControl || false
        },
        totalProduced: parsed.totalProduced || {},
        totalSales: parsed.totalSales || 0,
        totalMarketTransactions: parsed.totalMarketTransactions || 0
      };
    } catch (error) {
      console.error('Failed to load game:', error);
      return null;
    }
  }

  resetGame(): void {
    localStorage.removeItem(this.saveKey);
    this.state = this.createNewGame();
    // Trigger a notification that the game was reset
    this.showNotification('Game reset successfully!');
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }
}