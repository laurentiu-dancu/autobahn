import { GameStateManager } from '../core/GameState';
import { CraftingSystem } from '../core/CraftingSystem';
import { AutomationManager } from '../core/AutomationManager';
import { MarketSystem } from '../core/MarketSystem';
import { StockControlSystem } from '../core/StockControlSystem';
import { MARKET_ITEMS } from '../config/marketItems';
import { RECIPES } from '../config/recipes';
import { 
  UIResourceData, 
  UICraftingData, 
  UIMachineData, 
  UIPersonnelData, 
  UIRuleData 
} from '../core/types';

/**
 * UIDataProvider centralizes all data preparation for UI components.
 * This creates a clear separation between game logic and UI presentation,
 * making the system more maintainable and less prone to bugs.
 */
export class UIDataProvider {
  constructor(
    private gameState: GameStateManager,
    private craftingSystem: CraftingSystem,
    private automationManager: AutomationManager,
    private marketSystem: MarketSystem,
    private stockControlSystem: StockControlSystem
  ) {}

  // Resource data for UI
  getResourcesData(): UIResourceData[] {
    const state = this.gameState.getState();
    
    return Object.values(state.resources)
      .filter(resource => state.uiState.discoveredResources.has(resource.id) && resource.id !== 'marks')
      .map(resource => {
        const marketItem = MARKET_ITEMS[resource.id];
        return {
          id: resource.id,
          name: resource.name,
          amount: resource.amount,
          displayAmount: Math.floor(resource.amount).toString(),
          canBuy: this.marketSystem.canBuy(resource.id),
          canSell: this.marketSystem.canSell(resource.id),
          buyPrice: marketItem?.buyPrice,
          sellPrice: marketItem?.sellPrice,
          isDiscovered: state.uiState.discoveredResources.has(resource.id)
        };
      });
  }

  // Crafting data for UI
  getCraftingData(): UICraftingData[] {
    const state = this.gameState.getState();
    const recipes = this.craftingSystem.getAvailableRecipes();
    
    return recipes.map(recipe => ({
      recipeId: recipe.id,
      name: recipe.name,
      description: recipe.description,
      canCraft: this.craftingSystem.canCraft(recipe.id),
      isCrafting: this.craftingSystem.isCrafting(recipe.id),
      progress: this.craftingSystem.getCraftProgress(recipe.id),
      craftTime: recipe.craftTime,
      inputs: recipe.inputs.map(input => {
        const resource = state.resources[input.resourceId];
        return {
          resourceId: input.resourceId,
          name: resource?.name || input.resourceId,
          amount: input.amount,
          available: resource?.amount || 0
        };
      }),
      outputs: recipe.outputs.map(output => {
        const resource = state.resources[output.resourceId];
        return {
          resourceId: output.resourceId,
          name: resource?.name || output.resourceId,
          amount: output.amount
        };
      })
    }));
  }

  // Machine data for UI
  getMachinesData(): UIMachineData[] {
    const state = this.gameState.getState();
    
    return Object.values(state.machines).map(machine => {
      const recipe = RECIPES[machine.recipeId];
      const progress = this.automationManager.getMachineProgress(machine.id);
      
      const currentSpeed = recipe ? ((recipe.craftTime * machine.productionRate) / 1000).toFixed(1) : '0';
      const manualSpeed = recipe ? (recipe.craftTime / 1000).toFixed(1) : '0';
      const efficiency = recipe ? Math.round((1 / machine.productionRate) * 100) : 100;
      
      return {
        id: machine.id,
        name: machine.name,
        level: machine.level,
        isActive: machine.isActive,
        status: machine.status || 'stopped',
        statusMessage: machine.statusMessage,
        progress,
        canUpgrade: this.automationManager.canUpgradeMachine(machine.id),
        upgradeCost: machine.upgradeCost.map(cost => {
          const resource = state.resources[cost.resourceId];
          const actualCost = cost.amount * machine.level;
          return {
            resourceId: cost.resourceId,
            name: resource?.name || cost.resourceId,
            amount: actualCost
          };
        }),
        efficiency,
        currentSpeed,
        manualSpeed
      };
    });
  }

  // Available machines for building
  getAvailableMachinesData(): Array<{id: string, name: string, description: string, canBuild: boolean, cost: Array<{resourceId: string, name: string, amount: number}>}> {
    const state = this.gameState.getState();
    const availableMachines = this.automationManager.getAvailableMachines();
    
    return availableMachines
      .filter(machineId => !state.machines[machineId])
      .map(machineId => {
        const machineTemplate = require('../config/machines').MACHINES[machineId];
        return {
          id: machineId,
          name: machineTemplate.name,
          description: machineTemplate.description,
          canBuild: this.automationManager.canBuildMachine(machineId),
          cost: machineTemplate.cost.map((cost: any) => {
            const resource = state.resources[cost.resourceId];
            return {
              resourceId: cost.resourceId,
              name: resource?.name || cost.resourceId,
              amount: cost.amount
            };
          })
        };
      });
  }

  // Personnel data for UI
  getPersonnelData(): {
    available: UIPersonnelData[],
    active: UIPersonnelData[],
    totalMonthlyCost: number
  } {
    const state = this.gameState.getState();
    const availablePersonnel = this.stockControlSystem.getAvailablePersonnel();
    const activePersonnel = this.stockControlSystem.getActivePersonnel();
    const activeRules = this.stockControlSystem.getActiveRules();
    
    const available = availablePersonnel
      .filter(personnelId => !state.stockControl.personnel[personnelId])
      .map(personnelId => {
        const template = this.stockControlSystem.getPersonnelTemplate(personnelId);
        if (!template) throw new Error(`Personnel template not found: ${personnelId}`);
        
        return {
          id: template.id,
          name: template.name,
          type: template.type,
          monthlySalary: template.monthlySalary,
          hiringCost: template.hiringCost,
          totalCost: template.hiringCost + template.monthlySalary,
          canHire: this.stockControlSystem.canHirePersonnel(personnelId),
          isActive: false,
          description: template.description,
          capabilities: template.capabilities,
          managedRulesCount: 0
        };
      });

    const active = activePersonnel.map(personnel => {
      const rulesCount = activeRules.filter(r => r.managedBy === personnel.id).length;
      return {
        id: personnel.id,
        name: personnel.name,
        type: personnel.type,
        monthlySalary: personnel.monthlySalary,
        hiringCost: personnel.hiringCost,
        totalCost: personnel.hiringCost + personnel.monthlySalary,
        canHire: false,
        isActive: true,
        description: personnel.description,
        capabilities: personnel.capabilities,
        managedRulesCount: rulesCount
      };
    });

    return {
      available,
      active,
      totalMonthlyCost: this.stockControlSystem.getTotalMonthlyCost()
    };
  }

  // Rules data for UI
  getRulesData(): UIRuleData[] {
    const state = this.gameState.getState();
    const activeRules = this.stockControlSystem.getActiveRules();
    
    return activeRules.map(rule => {
      const resource = state.resources[rule.resourceId];
      const personnel = state.stockControl.personnel[rule.managedBy];
      
      return {
        id: rule.id,
        resourceName: resource?.name || rule.resourceId,
        type: rule.type,
        threshold: rule.threshold,
        quantity: rule.quantity,
        isEnabled: rule.isEnabled,
        managerName: personnel?.name || 'Unknown'
      };
    });
  }

  // UI state data
  getUIStateData() {
    const state = this.gameState.getState();
    return {
      showMarket: state.uiState.showMarket,
      showStockControl: state.uiState.showStockControl,
      notifications: state.uiState.notifications,
      panelStates: state.uiState.panelStates,
      marksAmount: Math.floor(state.resources.marks.amount)
    };
  }

  // Game statistics
  getGameStats() {
    const state = this.gameState.getState();
    return {
      totalClicks: state.totalClicks,
      totalSales: state.totalSales,
      totalMarketTransactions: state.totalMarketTransactions,
      gameStartTime: state.gameStartTime,
      lastSaveTime: state.lastSaveTime
    };
  }
}