import { GameState } from './types';
import { INITIAL_RESOURCES } from '../config/resources';
import { MILESTONES } from '../config/milestones';
import { EventEmitter } from './EventEmitter';
import { NotificationManager } from './NotificationManager';
import { StockControlSystem } from './StockControlSystem';
import { MarketSystem } from './MarketSystem';

export class GameStateManager {
  private state: GameState;
  private saveKey = 'autobahn-save';
  private eventEmitter: EventEmitter;
  private notificationManager: NotificationManager;
  private stockControlSystem: StockControlSystem;
  private needsMilestoneReapplication: boolean = false;
  private isSilentMode: boolean = false;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.notificationManager = new NotificationManager();
    this.state = this.loadGame() || this.createNewGame();
    // Initialize stock control system
    this.stockControlSystem = new StockControlSystem(this, new MarketSystem(this));
    // Ensure default rules are created for discovered resources
    this.stockControlSystem.initializeDefaultRulesForDiscoveredResources();
    
    // If we loaded a save, schedule milestone reapplication for next frame
    if (this.needsMilestoneReapplication) {
      requestAnimationFrame(() => this.reapplyMilestoneRewards());
    }
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
      // Start with only the three basic recipes
      unlockedRecipes: new Set(['bendWireSpring', 'fileMetalBracket', 'cutLeatherGasket']),
      unlockedMachines: new Set(),
      unlockedStockControl: new Set(),
      completedMilestones: new Set(),
      totalClicks: 0,
      totalProduced: {},
      totalSales: 0,
      totalMarketTransactions: 0,
      gameStartTime: Date.now(),
      lastSaveTime: Date.now(),
      uiState: {
        discoveredResources: new Set(['marks', 'wireStock', 'sheetMetal', 'leatherScraps', 'oil']), // Show salvageable resources from start
        showMarket: true, // Market available from start
        showStockControl: false,
        showStockRules: false,
        showAdvancedCrafting: false,
        showAssemblySystems: false,
        showAutomobileConstruction: false,
        panelStates: {}
      }
    };
  }

  getState(): GameState {
    return this.state;
  }

  // Enhanced UI state management methods
  setMarketVisibility(visible: boolean): void {
    if (this.state.uiState.showMarket !== visible) {
      this.state.uiState.showMarket = visible;
      this.eventEmitter.emit('marketVisibilityChanged', { visible });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
  }

  setStockControlVisibility(visible: boolean): void {
    if (this.state.uiState.showStockControl !== visible) {
      this.state.uiState.showStockControl = visible;
      this.eventEmitter.emit('stockControlVisibilityChanged', { visible });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
  }

  addNotification(message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info', duration: number = 5000): string {
    if (this.isSilentMode) return '';
    return this.notificationManager.addNotification(message, type, duration);
  }

  removeNotification(notificationId: string): void {
    this.notificationManager.removeNotification(notificationId);
  }

  getNotificationManager(): NotificationManager {
    return this.notificationManager;
  }

  setPanelState(panelId: string, state: { expanded?: boolean; activeTab?: string }): void {
    if (!this.state.uiState.panelStates[panelId]) {
      this.state.uiState.panelStates[panelId] = { expanded: true };
    }
    Object.assign(this.state.uiState.panelStates[panelId], state);
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
      const wasDiscovered = this.state.uiState.discoveredResources.has(resourceId);
      if (this.state.resources[resourceId].amount > 0 || (oldAmount > 0 && this.state.resources[resourceId].amount === 0)) {
        if (!wasDiscovered) {
          this.state.uiState.discoveredResources.add(resourceId);
          this.eventEmitter.emit('resourceDiscovered', { resourceId });
        }
      }
      
      // Emit specific resource change event
      this.eventEmitter.emit('resourceAmountChanged', { resourceId, oldAmount, newAmount });
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

  recordSale(resourceId: string, quantity: number, totalValue: number): void {
    this.state.totalSales++;
    this.state.totalMarketTransactions++;
    this.eventEmitter.emit('marketTransactionCompleted', { 
      type: 'sell', 
      resourceId, 
      quantity, 
      totalValue 
    });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  recordPurchase(resourceId: string, quantity: number, totalValue: number): void {
    this.state.totalMarketTransactions++;
    this.eventEmitter.emit('marketTransactionCompleted', { 
      type: 'buy', 
      resourceId, 
      quantity, 
      totalValue 
    });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  addMachine(machineId: string, machine: any): void {
    this.state.machines[machineId] = { ...machine };
    this.eventEmitter.emit('machineBuilt', { machineId, machine: this.state.machines[machineId] });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  incrementClicks(): void {
    this.state.totalClicks++;
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  checkMilestones(): void {
    MILESTONES.forEach(milestone => {
      if (!this.state.completedMilestones.has(milestone.id) && milestone.condition(this.state)) {
        this.state.completedMilestones.add(milestone.id);
        milestone.reward(this.state, this);
        this.eventEmitter.emit('milestoneCompleted', { 
          milestoneId: milestone.id, 
          milestoneName: milestone.name 
        });
        this.addNotification(`Milestone achieved: ${milestone.name}!`, 'success', 3000);
        // If stock control is unlocked, initialize rules
        if (milestone.id === 'marketExperience' || milestone.id === 'stockControlUnlocked') {
          this.stockControlSystem.initializeDefaultRulesForDiscoveredResources();
        }
      }
    });
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  updateMachine(machineId: string, updates: Partial<any>): void {
    if (this.state.machines[machineId]) {
      const oldStatus = this.state.machines[machineId].status;
      const oldActive = this.state.machines[machineId].isActive;
      
      Object.assign(this.state.machines[machineId], updates);
      
      // Emit specific events for status and toggle changes
      if (updates.status && oldStatus !== updates.status) {
        this.eventEmitter.emit('machineStatusChanged', { 
          machineId, 
          oldStatus: oldStatus || 'stopped', 
          newStatus: updates.status 
        });
      }
      
      if (updates.isActive !== undefined && oldActive !== updates.isActive) {
        this.eventEmitter.emit('machineToggled', { 
          machineId, 
          isActive: updates.isActive 
        });
      }
      
      if (updates.level && updates.level > (this.state.machines[machineId].level || 1)) {
        this.eventEmitter.emit('machineUpgraded', { 
          machineId, 
          newLevel: updates.level 
        });
      }
      
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
  }

  updatePersonnel(personnelId: string, personnel: any): void {
    const wasHired = !!this.state.stockControl.personnel[personnelId];
    this.state.stockControl.personnel[personnelId] = personnel;
    
    if (!wasHired) {
      this.eventEmitter.emit('personnelHired', { personnelId, personnel });
    }
    
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  removePersonnel(personnelId: string): void {
    if (this.state.stockControl.personnel[personnelId]) {
      delete this.state.stockControl.personnel[personnelId];
      this.eventEmitter.emit('personnelFired', { personnelId });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
  }

  updateRule(ruleId: string, rule: any): void {
    const wasEnabled = this.state.stockControl.rules[ruleId]?.isEnabled;
    const isNew = !this.state.stockControl.rules[ruleId];
    
    this.state.stockControl.rules[ruleId] = rule;
    
    if (isNew) {
      this.eventEmitter.emit('ruleCreated', { ruleId, rule });
    } else if (wasEnabled !== rule.isEnabled) {
      this.eventEmitter.emit('ruleToggled', { ruleId, isEnabled: rule.isEnabled });
    }
    
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  removeRule(ruleId: string): void {
    if (this.state.stockControl.rules[ruleId]) {
      delete this.state.stockControl.rules[ruleId];
      this.eventEmitter.emit('ruleDeleted', { ruleId });
      this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
    }
  }

  private showNotification(message: string): void {
    this.addNotification(message, 'success', 3000);
  }

  saveGame(): void {
    this.state.lastSaveTime = Date.now();
    const saveData = {
      ...this.state,
      unlockedRecipes: Array.from(this.state.unlockedRecipes),
      unlockedMachines: Array.from(this.state.unlockedMachines),
      unlockedStockControl: Array.from(this.state.unlockedStockControl),
      completedMilestones: Array.from(this.state.completedMilestones),
      uiState: {
        ...this.state.uiState,
        discoveredResources: Array.from(this.state.uiState.discoveredResources),
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
      const loadedState = {
        ...parsed,
        // Merge saved resources with current INITIAL_RESOURCES to ensure all resources exist
        resources: { ...INITIAL_RESOURCES, ...parsed.resources },
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
        completedMilestones: new Set(parsed.completedMilestones || []),
        stockControl: parsed.stockControl || {
          personnel: {},
          rules: {},
          lastSalaryPayment: Date.now()
        },
        uiState: {
          discoveredResources: new Set(parsed.uiState?.discoveredResources || ['marks']),
          showMarket: parsed.uiState?.showMarket || false,
          showStockControl: parsed.uiState?.showStockControl || false,
          showStockRules: parsed.uiState?.showStockRules || false,
          showAdvancedCrafting: parsed.uiState?.showAdvancedCrafting || false,
          showAssemblySystems: parsed.uiState?.showAssemblySystems || false,
          showAutomobileConstruction: parsed.uiState?.showAutomobileConstruction || false,
          panelStates: parsed.uiState?.panelStates || {}
        },
        totalProduced: parsed.totalProduced || {},
        totalSales: parsed.totalSales || 0,
        totalMarketTransactions: parsed.totalMarketTransactions || 0,
        gameStartTime: parsed.gameStartTime || Date.now(),
        lastSaveTime: parsed.lastSaveTime || Date.now()
      };
      
      // Schedule milestone reapplication for next frame
      this.needsMilestoneReapplication = true;
      
      return loadedState;
    } catch (error) {
      console.error('Error loading game:', error);
      return null;
    }
  }

  private reapplyMilestoneRewards(): void {
    if (!this.needsMilestoneReapplication) return;
    
    const state = this.getState();
    const completedMilestones = Array.from(state.completedMilestones);
    
    // Create a map of milestone IDs to their index in MILESTONES array
    const milestoneOrder = new Map(MILESTONES.map((m, i) => [m.id, i]));
    
    // Sort completed milestones by their definition order
    const sortedMilestones = completedMilestones
      .map(id => MILESTONES.find(m => m.id === id))
      .filter((m): m is typeof MILESTONES[0] => m !== undefined)
      .sort((a, b) => (milestoneOrder.get(a.id) || 0) - (milestoneOrder.get(b.id) || 0));

    // Create temporary sets to track unlocks
    const tempUnlockedRecipes = new Set(state.unlockedRecipes);
    const tempUnlockedMachines = new Set(state.unlockedMachines);
    const tempUnlockedStockControl = new Set(state.unlockedStockControl);
    const tempDiscoveredResources = new Set(state.uiState.discoveredResources);
    
    // Enable silent mode for reapplication
    this.isSilentMode = true;
    
    // Apply rewards in order
    for (const milestone of sortedMilestones) {
      milestone.reward(state, this);
    }
    
    // Disable silent mode
    this.isSilentMode = false;

    // Ensure uniqueness by using the temporary sets
    state.unlockedRecipes = new Set([...tempUnlockedRecipes, ...state.unlockedRecipes]);
    state.unlockedMachines = new Set([...tempUnlockedMachines, ...state.unlockedMachines]);
    state.unlockedStockControl = new Set([...tempUnlockedStockControl, ...state.unlockedStockControl]);
    state.uiState.discoveredResources = new Set([...tempDiscoveredResources, ...state.uiState.discoveredResources]);

    // Ensure stock control system is updated
    this.stockControlSystem.initializeDefaultRulesForDiscoveredResources();
    
    // Mark that we've completed the reapplication
    this.needsMilestoneReapplication = false;
    
    // Notify that the game state has been updated
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }

  resetGame(): void {
    localStorage.removeItem(this.saveKey);
    this.state = this.createNewGame();
    // Trigger a notification that the game was reset
    this.addNotification('Game reset successfully!', 'success', 3000);
    this.eventEmitter.emit('gameStateUpdated', { timestamp: Date.now() });
  }
}