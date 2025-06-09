import { GameStateManager } from '../core/GameState';
import { CraftingSystem } from '../core/CraftingSystem';
import { AutomationManager } from '../core/AutomationManager';
import { MarketSystem } from '../core/MarketSystem';
import { SalvageSystem } from '../core/SalvageSystem';
import { StockControlSystem } from '../core/StockControlSystem';
import { UIDataProvider } from './UIDataProvider';
import { CraftingPanel } from './components/CraftingPanel';
import { AdvancedCraftingPanel } from './components/AdvancedCraftingPanel';
import { AssemblySystemsPanel } from './components/AssemblySystemsPanel';
import { AutomobileConstructionPanel } from './components/AutomobileConstructionPanel';
import { MachinesPanel } from './components/MachinesPanel';
import { MarketPanel } from './components/MarketPanel';
import { StockControlPanel } from './components/StockControlPanel';
import { EventEmitter } from '../core/EventEmitter';

export class UIRenderer {
  private gameState: GameStateManager;
  private container: HTMLElement;
  private lastRenderState: string = '';
  private isInitialized: boolean = false;
  private eventEmitter: EventEmitter;
  private uiDataProvider: UIDataProvider;

  // UI Components
  private craftingPanel: CraftingPanel;
  private advancedCraftingPanel: AdvancedCraftingPanel;
  private assemblySystemsPanel: AssemblySystemsPanel;
  private automobileConstructionPanel: AutomobileConstructionPanel;
  private machinesPanel: MachinesPanel;
  private marketPanel: MarketPanel;
  private stockControlPanel: StockControlPanel;

  constructor(
    gameState: GameStateManager,
    craftingSystem: CraftingSystem,
    automationManager: AutomationManager,
    marketSystem: MarketSystem,
    salvageSystem: SalvageSystem,
    stockControlSystem: StockControlSystem,
    container: HTMLElement
  ) {
    this.gameState = gameState;
    this.container = container;
    this.eventEmitter = gameState.getEventEmitter();

    // Initialize UI Data Provider
    this.uiDataProvider = new UIDataProvider(
      gameState,
      craftingSystem,
      automationManager,
      marketSystem,
      stockControlSystem
    );

    // Initialize UI components with action handlers
    this.craftingPanel = new CraftingPanel(this.createCraftingActions(craftingSystem, salvageSystem));
    this.advancedCraftingPanel = new AdvancedCraftingPanel(this.createCraftingActions(craftingSystem, salvageSystem));
    this.assemblySystemsPanel = new AssemblySystemsPanel(this.createCraftingActions(craftingSystem, salvageSystem));
    this.automobileConstructionPanel = new AutomobileConstructionPanel(this.createCraftingActions(craftingSystem, salvageSystem));
    this.machinesPanel = new MachinesPanel(this.createMachineActions(automationManager));
    this.marketPanel = new MarketPanel(this.createMarketActions(marketSystem));
    this.stockControlPanel = new StockControlPanel(this.createStockControlActions(stockControlSystem));
    
    this.setupEventListeners();
  }

  private createCraftingActions(craftingSystem: CraftingSystem, salvageSystem: SalvageSystem) {
    return {
      startCraft: (recipeId: string) => craftingSystem.startCraft(recipeId),
      salvageMaterials: () => salvageSystem.salvageMaterials()
    };
  }

  private createMachineActions(automationManager: AutomationManager) {
    return {
      buildMachine: (machineId: string) => automationManager.buildMachine(machineId),
      toggleMachine: (machineId: string) => automationManager.toggleMachine(machineId),
      upgradeMachine: (machineId: string) => automationManager.upgradeMachine(machineId)
    };
  }

  private createMarketActions(marketSystem: MarketSystem) {
    return {
      buyResource: (resourceId: string) => marketSystem.buy(resourceId),
      sellResource: (resourceId: string) => marketSystem.sell(resourceId)
    };
  }

  private createStockControlActions(stockControlSystem: StockControlSystem) {
    return {
      hirePersonnel: (personnelId: string) => stockControlSystem.hirePersonnel(personnelId),
      firePersonnel: (personnelId: string) => stockControlSystem.firePersonnel(personnelId),
      toggleRule: (ruleId: string) => {
        const state = this.gameState.getState();
        const rule = state.stockControl.rules[ruleId];
        if (rule) {
          stockControlSystem.updateRule(ruleId, { ...rule, isEnabled: !rule.isEnabled });
        }
      },
      deleteRule: (ruleId: string) => stockControlSystem.deleteRule(ruleId),
      createQuickRules: (ruleType: string) => this.createQuickRules(stockControlSystem, ruleType)
    };
  }

  private createQuickRules(stockControlSystem: StockControlSystem, ruleType: string): void {
    const personnelData = this.uiDataProvider.getPersonnelData();
    
    if (ruleType === 'buy-materials') {
      const procurementSpecialist = personnelData.active.find(p => p.type === 'procurement');
      if (procurementSpecialist) {
        const materials = ['wireStock', 'sheetMetal', 'leatherScraps', 'oil'];
        materials.forEach(resourceId => {
          stockControlSystem.createRule(resourceId, 'buy', 5, 5, procurementSpecialist.id);
        });
      }
    } else if (ruleType === 'sell-products') {
      const salesManager = personnelData.active.find(p => p.type === 'sales');
      if (salesManager) {
        const products = ['wireSprings', 'metalBrackets', 'leatherGaskets', 'springAssemblies', 'repairKits'];
        products.forEach(resourceId => {
          stockControlSystem.createRule(resourceId, 'sell', 10, 5, salesManager.id);
        });
      }
    }
  }

  private setupEventListeners(): void {
    // Listen to specific events that require UI updates
    this.eventEmitter.on('resourceAmountChanged', () => this.scheduleUpdate());
    this.eventEmitter.on('resourceDiscovered', () => this.forceFullRender());
    this.eventEmitter.on('marketVisibilityChanged', () => this.forceFullRender());
    this.eventEmitter.on('stockControlVisibilityChanged', () => this.forceFullRender());
    this.eventEmitter.on('machineBuilt', () => this.forceFullRender());
    this.eventEmitter.on('machineStatusChanged', () => this.scheduleUpdate());
    this.eventEmitter.on('machineToggled', () => this.scheduleUpdate());
    this.eventEmitter.on('personnelHired', () => this.forceFullRender());
    this.eventEmitter.on('personnelFired', () => this.forceFullRender());
    this.eventEmitter.on('ruleCreated', () => this.forceFullRender());
    this.eventEmitter.on('ruleToggled', () => this.scheduleUpdate());
    this.eventEmitter.on('ruleDeleted', () => this.forceFullRender());
    this.eventEmitter.on('milestoneCompleted', () => this.forceFullRender());
  }

  private updateScheduled = false;
  private scheduleUpdate(): void {
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      requestAnimationFrame(() => {
        this.updateScheduled = false;
        this.updateDynamicElements();
      });
    }
  }

  forceFullRender(): void {
    this.lastRenderState = '';
    this.isInitialized = false;
    this.render();
  }

  render(): void {
    const uiState = this.uiDataProvider.getUIStateData();
    
    // Create a hash of the current state to detect changes
    const currentStateHash = this.createStateHash(uiState);
    
    // Only do full render if state has changed or this is the first render
    if (currentStateHash !== this.lastRenderState || !this.isInitialized) {
      this.fullRender();
      this.lastRenderState = currentStateHash;
      this.isInitialized = true;
    } else {
      // Only update dynamic elements that change frequently
      this.updateDynamicElements();
    }
  }

  private createStateHash(uiState: any): string {
    // Create a simplified hash of state that affects UI structure
    const hashData = {
      showMarket: uiState.showMarket,
      showStockControl: uiState.showStockControl,
      showAdvancedCrafting: uiState.showAdvancedCrafting,
      showAssemblySystems: uiState.showAssemblySystems,
      showAutomobileConstruction: uiState.showAutomobileConstruction,
      resourceCount: this.uiDataProvider.getResourcesData().length,
      machineCount: this.uiDataProvider.getMachinesData().length,
      availableMachineCount: this.uiDataProvider.getAvailableMachinesData().length,
      personnelCount: this.uiDataProvider.getPersonnelData().active.length + this.uiDataProvider.getPersonnelData().available.length,
      rulesCount: this.uiDataProvider.getRulesData().length
    };
    return JSON.stringify(hashData);
  }

  private fullRender(): void {
    const uiState = this.uiDataProvider.getUIStateData();
    const craftingDataByTier = this.uiDataProvider.getCraftingDataByTier();
    
    this.container.innerHTML = `
      <div class="game-container">
        <header class="game-header">
          <h1>🏭 Autobahn - Industrial Incremental</h1>
          <div class="game-stats">
            <span id="marks-display">€${uiState.marksAmount} Marks</span>
            <button id="save-btn" class="save-btn">💾 Save</button>
            <button id="reset-btn" class="reset-btn">🔄 Reset</button>
          </div>
        </header>

        <div class="game-content">
          <div class="left-panel">
            ${this.craftingPanel.render(craftingDataByTier.basic)}
            ${uiState.showAdvancedCrafting ? this.advancedCraftingPanel.render(craftingDataByTier.advanced) : ''}
            ${uiState.showAssemblySystems ? this.assemblySystemsPanel.render(craftingDataByTier.assembly) : ''}
            ${uiState.showAutomobileConstruction ? this.automobileConstructionPanel.render(craftingDataByTier.automobile) : ''}
            ${this.stockControlPanel.render(this.uiDataProvider.getPersonnelData(), this.uiDataProvider.getRulesData(), uiState.showStockControl)}
          </div>
          
          <div class="center-panel">
            ${this.machinesPanel.render(this.uiDataProvider.getMachinesData(), this.uiDataProvider.getAvailableMachinesData())}
          </div>
          
          <div class="right-panel">
            ${this.marketPanel.render(this.uiDataProvider.getResourcesData(), uiState.showMarket)}
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private updateDynamicElements(): void {
    const uiState = this.uiDataProvider.getUIStateData();
    const craftingDataByTier = this.uiDataProvider.getCraftingDataByTier();
    
    // Update marks display
    const marksElement = this.container.querySelector('#marks-display');
    if (marksElement) {
      marksElement.textContent = `€${uiState.marksAmount} Marks`;
    }

    // Update each panel's dynamic elements
    const leftPanel = this.container.querySelector('.left-panel');
    const centerPanel = this.container.querySelector('.center-panel');
    const rightPanel = this.container.querySelector('.right-panel');

    if (leftPanel) {
      this.craftingPanel.updateDynamicElements(leftPanel as HTMLElement, craftingDataByTier.basic);
      if (uiState.showAdvancedCrafting) {
        this.advancedCraftingPanel.updateDynamicElements(leftPanel as HTMLElement, craftingDataByTier.advanced);
      }
      if (uiState.showAssemblySystems) {
        this.assemblySystemsPanel.updateDynamicElements(leftPanel as HTMLElement, craftingDataByTier.assembly);
      }
      if (uiState.showAutomobileConstruction) {
        this.automobileConstructionPanel.updateDynamicElements(leftPanel as HTMLElement, craftingDataByTier.automobile);
      }
      this.stockControlPanel.updateDynamicElements(leftPanel as HTMLElement, this.uiDataProvider.getPersonnelData(), this.uiDataProvider.getRulesData());
    }
    if (centerPanel) {
      this.machinesPanel.updateDynamicElements(centerPanel as HTMLElement, this.uiDataProvider.getMachinesData(), this.uiDataProvider.getAvailableMachinesData());
    }
    if (rightPanel) {
      this.marketPanel.updateDynamicElements(rightPanel as HTMLElement, this.uiDataProvider.getResourcesData());
    }
  }

  private attachEventListeners(): void {
    // Attach event listeners for each panel
    const leftPanel = this.container.querySelector('.left-panel');
    const centerPanel = this.container.querySelector('.center-panel');
    const rightPanel = this.container.querySelector('.right-panel');

    const uiState = this.uiDataProvider.getUIStateData();

    if (leftPanel) {
      this.craftingPanel.attachEventListeners(leftPanel as HTMLElement);
      if (uiState.showAdvancedCrafting) {
        this.advancedCraftingPanel.attachEventListeners(leftPanel as HTMLElement);
      }
      if (uiState.showAssemblySystems) {
        this.assemblySystemsPanel.attachEventListeners(leftPanel as HTMLElement);
      }
      if (uiState.showAutomobileConstruction) {
        this.automobileConstructionPanel.attachEventListeners(leftPanel as HTMLElement);
      }
      this.stockControlPanel.attachEventListeners(leftPanel as HTMLElement);
    }
    if (centerPanel) this.machinesPanel.attachEventListeners(centerPanel as HTMLElement);
    if (rightPanel) this.marketPanel.attachEventListeners(rightPanel as HTMLElement);

    // Save button
    this.container.querySelector('#save-btn')?.addEventListener('click', () => {
      this.gameState.saveGame();
      this.gameState.addNotification('Game saved!', 'success', 2000);
    });

    // Reset button
    this.container.querySelector('#reset-btn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your progress?')) {
        this.gameState.resetGame();
        this.forceFullRender();
      }
    });
  }
}