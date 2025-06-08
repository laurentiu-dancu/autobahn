import { GameStateManager } from './GameState';
import { MarketSystem } from './MarketSystem';
import { StockControlPersonnel, StockControlRule } from './types';

export class StockControlSystem {
  private gameState: GameStateManager;
  private marketSystem: MarketSystem;
  private lastUpdate: number = Date.now();
  private lastRuleExecution: number = 0;

  constructor(gameState: GameStateManager, marketSystem: MarketSystem) {
    this.gameState = gameState;
    this.marketSystem = marketSystem;
  }

  // Personnel Management
  canHirePersonnel(personnelId: string): boolean {
    const state = this.gameState.getState();
    
    // Check if already hired
    if (state.stockControl.personnel[personnelId]) return false;
    
    // Check if unlocked
    if (!state.unlockedStockControl.has(personnelId)) return false;
    
    const template = this.getPersonnelTemplate(personnelId);
    if (!template) return false;
    
    // Check hiring cost + at least 1 minute of salary
    const totalCost = template.hiringCost + template.monthlySalary;
    return state.resources.marks.amount >= totalCost;
  }

  hirePersonnel(personnelId: string): boolean {
    if (!this.canHirePersonnel(personnelId)) return false;
    
    const template = this.getPersonnelTemplate(personnelId);
    if (!template) return false;
    
    const state = this.gameState.getState();
    const totalCost = template.hiringCost + template.monthlySalary;
    
    if (!this.gameState.spendResources([{ resourceId: 'marks', amount: totalCost }])) {
      return false;
    }
    
    const personnel: StockControlPersonnel = {
      ...template,
      isActive: true,
      hiredAt: Date.now()
    };
    
    state.stockControl.personnel[personnelId] = personnel;
    return true;
  }

  firePersonnel(personnelId: string): void {
    const state = this.gameState.getState();
    if (state.stockControl.personnel[personnelId]) {
      // Disable all rules managed by this personnel
      Object.values(state.stockControl.rules).forEach(rule => {
        if (rule.managedBy === personnelId) {
          rule.isEnabled = false;
        }
      });
      
      delete state.stockControl.personnel[personnelId];
    }
  }

  // Rule Management
  createRule(resourceId: string, type: 'buy' | 'sell', threshold: number, quantity: number, managedBy: string): string {
    const state = this.gameState.getState();
    const ruleId = `${type}_${resourceId}_${Date.now()}`;
    
    const rule: StockControlRule = {
      id: ruleId,
      resourceId,
      type,
      threshold,
      quantity,
      isEnabled: true,
      managedBy
    };
    
    state.stockControl.rules[ruleId] = rule;
    return ruleId;
  }

  updateRule(ruleId: string, updates: Partial<StockControlRule>): void {
    const state = this.gameState.getState();
    const rule = state.stockControl.rules[ruleId];
    if (rule) {
      Object.assign(rule, updates);
    }
  }

  deleteRule(ruleId: string): void {
    const state = this.gameState.getState();
    delete state.stockControl.rules[ruleId];
  }

  // System Updates
  update(): void {
    const now = Date.now();
    const deltaTime = now - this.lastUpdate;
    this.lastUpdate = now;
    
    this.paySalaries(deltaTime);
    this.executeRules();
  }

  private paySalaries(deltaTime: number): void {
    const state = this.gameState.getState();
    const minutesPassed = deltaTime / (1000 * 10); // Convert to 10-second intervals (6x slower)
    
    let totalSalary = 0;
    Object.values(state.stockControl.personnel).forEach(personnel => {
      if (personnel.isActive) {
        totalSalary += personnel.monthlySalary * minutesPassed;
      }
    });
    
    if (totalSalary > 0) {
      if (state.resources.marks.amount >= totalSalary) {
        this.gameState.updateResource('marks', -totalSalary);
      } else {
        // Fire all personnel if can't pay salaries
        this.fireAllPersonnel();
        this.gameState.showNotification('⚠️ All stock control personnel quit due to unpaid salaries!');
      }
    }
  }

  private executeRules(): void {
    const state = this.gameState.getState();
    
    // Only execute rules every 5 seconds to prevent spam
    const now = Date.now();
    if (!this.lastRuleExecution) this.lastRuleExecution = now;
    if (now - this.lastRuleExecution < 5000) return;
    this.lastRuleExecution = now;
    
    Object.values(state.stockControl.rules).forEach(rule => {
      if (!rule.isEnabled) return;
      
      // Check if the personnel managing this rule is still active
      const personnel = state.stockControl.personnel[rule.managedBy];
      if (!personnel || !personnel.isActive) {
        rule.isEnabled = false;
        return;
      }
      
      const currentAmount = state.resources[rule.resourceId]?.amount || 0;
      
      if (rule.type === 'buy' && currentAmount < rule.threshold) {
        // Try to buy
        if (this.marketSystem.canBuy(rule.resourceId, rule.quantity)) {
          this.marketSystem.buy(rule.resourceId, rule.quantity);
        }
      } else if (rule.type === 'sell' && currentAmount > rule.threshold) {
        // Try to sell
        const sellAmount = Math.min(rule.quantity, currentAmount - rule.threshold);
        if (sellAmount > 0 && this.marketSystem.canSell(rule.resourceId, sellAmount)) {
          this.marketSystem.sell(rule.resourceId, sellAmount);
        }
      }
    });
  }

  private fireAllPersonnel(): void {
    const state = this.gameState.getState();
    Object.keys(state.stockControl.personnel).forEach(personnelId => {
      this.firePersonnel(personnelId);
    });
  }

  // Getters
  getActivePersonnel(): StockControlPersonnel[] {
    const state = this.gameState.getState();
    return Object.values(state.stockControl.personnel).filter(p => p.isActive);
  }

  getActiveRules(): StockControlRule[] {
    const state = this.gameState.getState();
    return Object.values(state.stockControl.rules).filter(r => r.isEnabled);
  }

  getTotalMonthlyCost(): number {
    return this.getActivePersonnel().reduce((total, personnel) => {
      return total + personnel.monthlySalary;
    }, 0);
  }

  getPersonnelTemplate(personnelId: string): StockControlPersonnel | null {
    const templates: Record<string, StockControlPersonnel> = {
      procurementSpecialist: {
        id: 'procurementSpecialist',
        name: 'Material Procurement Specialist',
        type: 'procurement',
        monthlySalary: 2, // marks per 10-second interval
        hiringCost: 50,
        isActive: false,
        hiredAt: 0,
        description: 'Automatically purchases raw materials when inventory falls below set thresholds',
        capabilities: ['Auto-buy raw materials', 'Inventory monitoring', 'Basic purchasing']
      },
      salesManager: {
        id: 'salesManager',
        name: 'Sales Manager',
        type: 'sales',
        monthlySalary: 3,
        hiringCost: 50,
        isActive: false,
        hiredAt: 0,
        description: 'Automatically sells finished products when inventory exceeds set thresholds',
        capabilities: ['Auto-sell products', 'Inventory monitoring', 'Basic sales']
      },
      supplyChainCoordinator: {
        id: 'supplyChainCoordinator',
        name: 'Supply Chain Coordinator',
        type: 'coordinator',
        monthlySalary: 5,
        hiringCost: 100,
        isActive: false,
        hiredAt: 0,
        description: 'Advanced optimization of both buying and selling with profit margin analysis',
        capabilities: ['Advanced optimization', 'Profit analysis', 'Full supply chain management']
      }
    };
    
    return templates[personnelId] || null;
  }

  getAvailablePersonnel(): string[] {
    const state = this.gameState.getState();
    return Array.from(state.unlockedStockControl);
  }
}