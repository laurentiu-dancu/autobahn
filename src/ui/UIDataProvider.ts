import { GameStateManager } from '../core/GameState';
import { CraftingSystem } from '../core/CraftingSystem';
import { AutomationManager } from '../core/AutomationManager';
import { MarketSystem } from '../core/MarketSystem';
import { StockControlSystem } from '../core/StockControlSystem';
import { MARKET_ITEMS } from '../config/marketItems';
import { RECIPES } from '../config/recipes';
import { MACHINES } from '../config/machines';
import { 
  UIResourceData, 
  UICraftingData, 
  UIMachineData, 
  UIPersonnelData, 
  UIRuleData 
} from '../core/types';
import { isMaterial } from '../core/utils';

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
          isDiscovered: state.uiState.discoveredResources.has(resource.id),
          type: isMaterial(resource.id) ? 'material' as const : 'part' as const
        };
      })
      .sort((a, b) => (a.sellPrice || 0) - (b.sellPrice || 0));
  }

  // Crafting data for UI - organized by tier
  getCraftingDataByTier(): {
    basic: UICraftingData[],
    advanced: UICraftingData[],
    assembly: UICraftingData[],
    automobile: UICraftingData[]
  } {
    const state = this.gameState.getState();
    const recipes = this.craftingSystem.getAvailableRecipes();
    
    // Get all machine recipe IDs
    const automatedRecipeIds = new Set(
      Object.values(state.machines).map(machine => machine.recipeId)
    );
    
    const craftingData = recipes
      .filter(recipe => !automatedRecipeIds.has(recipe.id)) // Filter out automated recipes
      .map(recipe => ({
        recipeId: recipe.id,
        name: recipe.name,
        description: recipe.description,
        canCraft: this.craftingSystem.canCraft(recipe.id),
        isCrafting: this.craftingSystem.isCrafting(recipe.id),
        progress: this.craftingSystem.getCraftProgress(recipe.id),
        craftTime: recipe.craftTime,
        tier: recipe.tier,
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

    // Sort each tier by craft time
    const sortByCraftTime = (a: UICraftingData, b: UICraftingData) => a.craftTime - b.craftTime;

    return {
      basic: craftingData.filter(recipe => recipe.tier === 'basic').sort(sortByCraftTime),
      advanced: craftingData.filter(recipe => recipe.tier === 'advanced').sort(sortByCraftTime),
      assembly: craftingData.filter(recipe => recipe.tier === 'assembly').sort(sortByCraftTime),
      automobile: craftingData.filter(recipe => recipe.tier === 'automobile').sort(sortByCraftTime)
    };
  }

  // Legacy method for backward compatibility
  getCraftingData(): UICraftingData[] {
    const tierData = this.getCraftingDataByTier();
    return [...tierData.basic, ...tierData.advanced, ...tierData.assembly, ...tierData.automobile];
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
      
      // Calculate upgrade cost based on next level
      const nextLevel = machine.level + 1;
      const upgradeCost = machine.upgradeCost.map(cost => {
        const resource = state.resources[cost.resourceId];
        const actualCost = cost.amount * nextLevel; // Use next level for upgrade cost
        return {
          resourceId: cost.resourceId,
          name: resource?.name || cost.resourceId,
          amount: actualCost
        };
      });
      
      return {
        id: machine.id,
        name: machine.name,
        level: machine.level,
        isActive: machine.isActive,
        status: machine.status || 'stopped',
        statusMessage: machine.statusMessage,
        progress,
        canUpgrade: this.automationManager.canUpgradeMachine(machine.id),
        upgradeCost,
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
        const machineTemplate = MACHINES[machineId];
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
      .filter(personnelId => !state.stockControl.personnel[personnelId]?.isActive)
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
      const personnel = rule.managedBy ? state.stockControl.personnel[rule.managedBy] : null;
      
      return {
        id: rule.id,
        resourceName: resource?.name || rule.resourceId,
        type: rule.action,
        threshold: rule.threshold,
        quantity: rule.quantity ?? 1,
        isEnabled: rule.isEnabled,
        managerName: personnel?.name || (rule.managedBy ? rule.managedBy : 'System')
      };
    });
  }

  // UI state data
  getUIStateData() {
    const state = this.gameState.getState();
    return {
      showMarket: state.uiState.showMarket,
      showStockControl: state.uiState.showStockControl,
      showAdvancedCrafting: state.uiState.showAdvancedCrafting,
      showAssemblySystems: state.uiState.showAssemblySystems,
      showAutomobileConstruction: state.uiState.showAutomobileConstruction,
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