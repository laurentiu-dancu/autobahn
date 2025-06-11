import { GameStateManager } from './GameState';
import { MarketSystem } from './MarketSystem';
import { StockControlPersonnel, StockControlRule } from './types';
import { isMaterial, isPart } from './utils';

export class StockControlSystem {
  private gameState: GameStateManager;
  private marketSystem: MarketSystem;
  private lastUpdate: number = Date.now();
  private lastRuleExecution: number = 0;

  private readonly personnelTemplates: Record<string, StockControlPersonnel> = {
    procurementSpecialist: {
      name: 'Material Buyer',
      description: 'Automatically buys materials when stock is low',
      capabilities: ['buy_materials'],
      upfrontCost: 5,
      type: 'procurement',
      monthlySalary: 5,
      hiringCost: 5,
      isActive: false,
      hiredAt: Date.now(),
      id: 'procurementSpecialist'
    },
    salesManager: {
      name: 'Parts Seller',
      description: 'Automatically sells parts when stock is high',
      capabilities: ['sell_parts'],
      upfrontCost: 5,
      type: 'sales',
      monthlySalary: 5,
      hiringCost: 5,
      isActive: false,
      hiredAt: Date.now(),
      id: 'salesManager'
    }
  };

  constructor(gameState: GameStateManager, marketSystem: MarketSystem) {
    this.gameState = gameState;
    this.marketSystem = marketSystem;
    
    // Listen for resource discovery events
    this.gameState.getEventEmitter().on('resourceDiscovered', ({ resourceId }) => {
      this.handleResourceDiscovery(resourceId);
    });
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
    const state = this.gameState.getState();
    const template = this.personnelTemplates[personnelId];
    
    if (!template) return false;
    
    // Check if already hired
    if (state.stockControl.personnel[personnelId]) return false;
    
    // Check if we can afford the upfront cost
    if (state.resources.marks.amount < template.hiringCost) {
      return false;
    }
    
    // Pay the upfront cost
    this.gameState.updateResource('marks', -template.hiringCost);
    
    // Create and activate the personnel
    const personnel = {
      ...template,
      isActive: true,
      hiredAt: Date.now()
    };
    this.gameState.updatePersonnel(personnelId, personnel);

    // Create default rules for this personnel based on their capabilities
    if (personnel.capabilities.includes('buy_materials')) {
      // Create buy rules for all discovered materials
      Object.values(state.resources).forEach(resource => {
        if (isMaterial(resource.id) && state.uiState.discoveredResources.has(resource.id)) {
          // Check if a rule already exists for this resource
          const existingRule = Object.values(state.stockControl.rules).find(
            r => r.resourceId === resource.id && r.action === 'buy'
          );
          if (!existingRule) {
            this.createRule(resource.id, 'buy', 1, 1, personnelId);
          }
        }
      });
    }
    
    if (personnel.capabilities.includes('sell_parts')) {
      // Create sell rules for all discovered parts
      Object.values(state.resources).forEach(resource => {
        if (isPart(resource.id) && state.uiState.discoveredResources.has(resource.id)) {
          // Check if a rule already exists for this resource
          const existingRule = Object.values(state.stockControl.rules).find(
            r => r.resourceId === resource.id && r.action === 'sell'
          );
          if (!existingRule) {
            this.createRule(resource.id, 'sell', 5, 1, personnelId);
          }
        }
      });
    }
    
    return true;
  }

  firePersonnel(personnelId: string): void {
    const state = this.gameState.getState();
    if (state.stockControl.personnel[personnelId]) {
      // Remove all rules managed by this personnel
      Object.values(state.stockControl.rules).forEach(rule => {
        if (rule.managedBy === personnelId) {
          this.gameState.removeRule(rule.id);
        }
      });
      
      this.gameState.removePersonnel(personnelId);
    }
  }

  // Rule Management
  createRule(resourceId: string, type: 'buy' | 'sell', threshold: number, quantity: number, managedBy: string): string | undefined {
    const state = this.gameState.getState();
    const personnel = state.stockControl.personnel[managedBy];
    
    // Only create rule if personnel is active
    if (!personnel || !personnel.isActive) {
      return undefined;
    }

    const ruleId = `${type}_${resourceId}_${Date.now()}`;
    const rule: StockControlRule = {
      id: ruleId,
      resourceId,
      action: type,
      threshold,
      isEnabled: true,
      managedBy,
      quantity: quantity
    };
    this.gameState.updateRule(ruleId, rule);
    return ruleId;
  }

  private canEnableRule(rule: StockControlRule): boolean {
    const state = this.gameState.getState();
    
    // If rule is already managed by someone, check if that personnel is still active
    if (rule.managedBy) {
      const manager = state.stockControl.personnel[rule.managedBy];
      if (!manager || !manager.isActive) return false;
      return true;
    }

    // For new rules, check if we have appropriate personnel
    const activePersonnel = Object.values(state.stockControl.personnel).filter(p => p.isActive);
    
    if (rule.action === 'buy') {
      return activePersonnel.some(p => p.capabilities.includes('buy_materials'));
    } else if (rule.action === 'sell') {
      return activePersonnel.some(p => p.capabilities.includes('sell_parts'));
    }
    
    return false;
  }

  updateRule(ruleId: string, rule: StockControlRule): void {
    const state = this.gameState.getState();
    const existingRule = state.stockControl.rules[ruleId];
    
    // If trying to enable a rule, check if we can
    if (rule.isEnabled && !this.canEnableRule(rule)) {
      rule.isEnabled = false;
    }
    
    // If rule is being enabled and doesn't have a manager, assign one
    if (rule.isEnabled && !rule.managedBy) {
      const activePersonnel = Object.values(state.stockControl.personnel).filter(p => p.isActive);
      
      if (rule.action === 'buy') {
        const buyer = activePersonnel.find(p => p.capabilities.includes('buy_materials'));
        if (buyer) rule.managedBy = buyer.id;
      } else if (rule.action === 'sell') {
        const seller = activePersonnel.find(p => p.capabilities.includes('sell_parts'));
        if (seller) rule.managedBy = seller.id;
      }
    }
    
    this.gameState.updateRule(ruleId, rule);
  }

  adjustThreshold(ruleId: string, delta: number): void {
    const state = this.gameState.getState();
    const rule = state.stockControl.rules[ruleId];
    if (!rule) return;

    // Ensure threshold doesn't go below 0
    const newThreshold = Math.max(0, rule.threshold + delta);
    this.updateRule(ruleId, { ...rule, threshold: newThreshold });
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
        this.gameState.addNotification('⚠️ All stock control personnel quit due to unpaid salaries!');
      }
    }
  }

  private executeRules(): void {
    const state = this.gameState.getState();
    const now = Date.now();
    
    // Only execute rules once per second
    if (now - this.lastRuleExecution < 1000) {
      return;
    }
    this.lastRuleExecution = now;

    Object.values(state.stockControl.rules).forEach(rule => {
      // Skip if rule is disabled or if managing personnel is not active
      if (!rule.isEnabled) return;
      if (rule.managedBy) {
        const personnel = state.stockControl.personnel[rule.managedBy];
        if (!personnel || !personnel.isActive) return;
      }

      const resource = state.resources[rule.resourceId];
      if (!resource) return;

      // Ensure quantity is defined, default to 1 if not set
      const quantity = rule.quantity ?? 1;

      if (rule.action === 'buy' && isMaterial(rule.resourceId)) {
        // Calculate how many we need to buy to reach threshold
        const needed = rule.threshold - resource.amount;
        if (needed > 0) {
          // Buy up to the rule's quantity, but not more than needed
          const buyAmount = Math.min(quantity, needed);
          this.marketSystem.buy(rule.resourceId, buyAmount);
        }
      } else if (rule.action === 'sell' && isPart(rule.resourceId)) {
        // Calculate how many we can sell to reach threshold
        const excess = resource.amount - rule.threshold;
        if (excess > 0) {
          // Sell up to the rule's quantity, but not more than excess
          const sellAmount = Math.min(quantity, excess);
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
    return this.personnelTemplates[personnelId] || null;
  }

  getAvailablePersonnel(): string[] {
    const state = this.gameState.getState();
    return Array.from(state.unlockedStockControl);
  }

  // Remove quick configure option and automatically create rules for discovered resources
  private createDefaultRules(resourceId: string): void {
    // This method is no longer needed as rules are created with workers
    return;
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
    // This method is no longer needed as rules are created with workers
    return;
  }

  private handleResourceDiscovery(resourceId: string): void {
    const state = this.gameState.getState();
    
    // Get active personnel
    const activePersonnel = Object.values(state.stockControl.personnel).filter(p => p.isActive);
    
    // Create buy rules for materials
    if (isMaterial(resourceId)) {
      const buyer = activePersonnel.find(p => p.capabilities.includes('buy_materials'));
      if (buyer) {
        // Check if a rule already exists for this resource
        const existingRule = Object.values(state.stockControl.rules).find(
          r => r.resourceId === resourceId && r.action === 'buy'
        );
        if (!existingRule) {
          this.createRule(resourceId, 'buy', 1, 1, buyer.id);
        }
      }
    }
    
    // Create sell rules for parts
    if (isPart(resourceId)) {
      const seller = activePersonnel.find(p => p.capabilities.includes('sell_parts'));
      if (seller) {
        // Check if a rule already exists for this resource
        const existingRule = Object.values(state.stockControl.rules).find(
          r => r.resourceId === resourceId && r.action === 'sell'
        );
        if (!existingRule) {
          this.createRule(resourceId, 'sell', 5, 1, seller.id);
        }
      }
    }
  }
}