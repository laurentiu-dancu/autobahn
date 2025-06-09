import { GameStateManager } from './GameState';
import { MarketSystem } from './MarketSystem';
import { StockControlPersonnel, StockControlRule } from './types';
import { isMaterial, isPart } from './utils';

export class StockControlSystem {
  private gameState: GameStateManager;
  private marketSystem: MarketSystem;
  private lastUpdate: number = Date.now();
  private lastRuleExecution: number = 0;

  private readonly personnelTemplates = {
    procurementSpecialist: {
      name: 'Material Buyer',
      description: 'Automatically buys materials when stock is low',
      capabilities: ['buy_materials'],
      salary: 5,
      upfrontCost: 20
    },
    salesManager: {
      name: 'Parts Seller',
      description: 'Automatically sells parts when stock is high',
      capabilities: ['sell_parts'],
      salary: 5,
      upfrontCost: 30
    }
  };

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
    
    this.gameState.updatePersonnel(personnelId, personnel);
    return true;
  }

  firePersonnel(personnelId: string): void {
    const state = this.gameState.getState();
    if (state.stockControl.personnel[personnelId]) {
      // Disable all rules managed by this personnel
      Object.values(state.stockControl.rules).forEach(rule => {
        if (rule.managedBy === personnelId) {
          this.updateRule(rule.id, { ...rule, isEnabled: false });
        }
      });
      
      this.gameState.removePersonnel(personnelId);
    }
  }

  // Rule Management
  createRule(resourceId: string, type: 'buy' | 'sell', threshold: number, quantity: number, managedBy: string): string {
    const ruleId = `${type}_${resourceId}_${Date.now()}`;
    const rule: StockControlRule = {
      id: ruleId,
      resourceId,
      action: type,
      threshold,
      isEnabled: true,
      managedBy,
      quantity
    };
    this.gameState.updateRule(ruleId, rule);
    return ruleId;
  }

  updateRule(ruleId: string, updates: Partial<StockControlRule>): void {
    const state = this.gameState.getState();
    const rule = state.stockControl.rules[ruleId];
    if (rule) {
      const updatedRule = { ...rule, ...updates };
      this.gameState.updateRule(ruleId, updatedRule);
    }
  }

  deleteRule(ruleId: string): void {
    this.gameState.removeRule(ruleId);
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
    Object.values(state.stockControl.rules).forEach(rule => {
      if (!rule.isEnabled) return;

      const resource = state.resources[rule.resourceId];
      if (!resource) return;

      if (rule.action === 'buy' && isMaterial(rule.resourceId)) {
        if (resource.amount < rule.threshold) {
          this.marketSystem.buy(rule.resourceId, 1);
        }
      } else if (rule.action === 'sell' && isPart(rule.resourceId)) {
        if (resource.amount > rule.threshold) {
          this.marketSystem.sell(rule.resourceId, 1);
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
        name: 'Material Buyer',
        type: 'procurement',
        monthlySalary: 2, // marks per 10-second interval
        hiringCost: 50,
        isActive: false,
        hiredAt: 0,
        description: 'Automatically buys raw materials when inventory is low',
        capabilities: ['Auto-buy raw materials', 'Inventory monitoring']
      },
      salesManager: {
        id: 'salesManager',
        name: 'Parts Seller',
        type: 'sales',
        monthlySalary: 3,
        hiringCost: 50,
        isActive: false,
        hiredAt: 0,
        description: 'Automatically sells finished parts when inventory is high',
        capabilities: ['Auto-sell parts', 'Inventory monitoring']
      }
    };
    
    return templates[personnelId] || null;
  }

  getAvailablePersonnel(): string[] {
    const state = this.gameState.getState();
    return Array.from(state.unlockedStockControl);
  }

  // Remove quick configure option and automatically create rules for discovered resources
  private createDefaultRules(resourceId: string): void {
    const resource = this.gameState.getState().resources[resourceId];
    if (!resource) return;

    const ruleId = `auto_${resourceId}`;
    const rule: StockControlRule = {
      id: ruleId,
      resourceId,
      threshold: isMaterial(resourceId) ? 10 : 5,
      action: isMaterial(resourceId) ? 'buy' : 'sell',
      isEnabled: true,
      managedBy: null
    };
    this.gameState.updateRule(ruleId, rule);
  }

  // Add a method to pause or stop trading for a resource
  pauseRule(ruleId: string): void {
    const rule = this.gameState.getState().stockControl.rules[ruleId];
    if (rule) {
      rule.isEnabled = false;
      this.gameState.updateRule(ruleId, rule);
    }
  }

  resumeRule(ruleId: string): void {
    const rule = this.gameState.getState().stockControl.rules[ruleId];
    if (rule) {
      rule.isEnabled = true;
      this.gameState.updateRule(ruleId, rule);
    }
  }

  public initializeDefaultRulesForDiscoveredResources(): void {
    const state = this.gameState.getState();
    const discovered = state.uiState.discoveredResources;
    Object.values(state.resources).forEach(resource => {
      if (discovered.has(resource.id) && (isMaterial(resource.id) || isPart(resource.id))) {
        const ruleId = `auto_${resource.id}`;
        if (!state.stockControl.rules[ruleId]) {
          this.createDefaultRules(resource.id);
        }
      }
    });
  }
}