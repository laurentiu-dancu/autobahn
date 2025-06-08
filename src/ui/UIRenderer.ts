import { GameStateManager } from '../core/GameState';
import { CraftingSystem } from '../core/CraftingSystem';
import { AutomationManager } from '../core/AutomationManager';
import { MarketSystem } from '../core/MarketSystem';
import { SalvageSystem } from '../core/SalvageSystem';
import { StockControlSystem } from '../core/StockControlSystem';
import { CraftingPanel } from './components/CraftingPanel';
import { MachinesPanel } from './components/MachinesPanel';
import { MarketPanel } from './components/MarketPanel';
import { StockControlPanel } from './components/StockControlPanel';

export class UIRenderer {
  private gameState: GameStateManager;
  private craftingSystem: CraftingSystem;
  private automationManager: AutomationManager;
  private marketSystem: MarketSystem;
  private salvageSystem: SalvageSystem;
  private stockControlSystem: StockControlSystem;
  private container: HTMLElement;
  private lastRenderState: string = '';
  private isInitialized: boolean = false;

  // UI Components
  private craftingPanel: CraftingPanel;
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
    this.craftingSystem = craftingSystem;
    this.automationManager = automationManager;
    this.marketSystem = marketSystem;
    this.salvageSystem = salvageSystem;
    this.stockControlSystem = stockControlSystem;
    this.container = container;

    // Initialize UI components
    this.craftingPanel = new CraftingPanel(gameState, craftingSystem, salvageSystem);
    this.machinesPanel = new MachinesPanel(gameState, automationManager);
    this.marketPanel = new MarketPanel(gameState, marketSystem);
    this.stockControlPanel = new StockControlPanel(gameState, stockControlSystem);
  }

  forceFullRender(): void {
    this.lastRenderState = '';
    this.isInitialized = false;
    this.render();
  }

  render(): void {
    const state = this.gameState.getState();
    
    // Create a hash of the current state to detect changes
    const currentStateHash = this.createStateHash(state);
    
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

  private createStateHash(state: any): string {
    // Create a simplified hash of state that affects UI structure
    const hashData = {
      discoveredResources: Array.from(state.uiState.discoveredResources).sort(),
      showMarket: state.uiState.showMarket,
      showStockControl: state.uiState.showStockControl,
      unlockedRecipes: Array.from(state.unlockedRecipes).sort(),
      unlockedMachines: Array.from(state.unlockedMachines).sort(),
      unlockedStockControl: Array.from(state.unlockedStockControl).sort(),
      machineIds: Object.keys(state.machines).sort(),
      personnelIds: Object.keys(state.stockControl.personnel).sort()
    };
    return JSON.stringify(hashData);
  }

  private fullRender(): void {
    const state = this.gameState.getState();
    
    this.container.innerHTML = `
      <div class="game-container">
        <header class="game-header">
          <h1>🏭 Autobahn Workshop</h1>
          <div class="game-stats">
            <span id="total-clicks">Total Clicks: ${state.totalClicks}</span>
            <button id="save-btn" class="save-btn">💾 Save</button>
            <button id="reset-btn" class="reset-btn">🔄 Reset</button>
          </div>
        </header>

        <div class="game-content">
          <div class="left-panel">
            ${this.craftingPanel.render()}
            ${this.stockControlPanel.render()}
          </div>
          
          <div class="center-panel">
            ${this.machinesPanel.render()}
          </div>
          
          <div class="right-panel">
            ${this.marketPanel.render()}
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private updateDynamicElements(): void {
    const state = this.gameState.getState();
    
    // Update total clicks
    const totalClicksElement = this.container.querySelector('#total-clicks');
    if (totalClicksElement) {
      totalClicksElement.textContent = `Total Clicks: ${state.totalClicks}`;
    }

    // Update each panel's dynamic elements
    const leftPanel = this.container.querySelector('.left-panel');
    const centerPanel = this.container.querySelector('.center-panel');
    const rightPanel = this.container.querySelector('.right-panel');

    if (leftPanel) this.craftingPanel.updateDynamicElements(leftPanel as HTMLElement);
    if (leftPanel) this.stockControlPanel.updateDynamicElements(leftPanel as HTMLElement);
    if (centerPanel) this.machinesPanel.updateDynamicElements(centerPanel as HTMLElement);
    if (rightPanel) this.marketPanel.updateDynamicElements(rightPanel as HTMLElement);
  }

  private attachEventListeners(): void {
    // Attach event listeners for each panel
    const leftPanel = this.container.querySelector('.left-panel');
    const centerPanel = this.container.querySelector('.center-panel');
    const rightPanel = this.container.querySelector('.right-panel');

    if (leftPanel) this.craftingPanel.attachEventListeners(leftPanel as HTMLElement);
    if (leftPanel) this.stockControlPanel.attachEventListeners(leftPanel as HTMLElement);
    if (centerPanel) this.machinesPanel.attachEventListeners(centerPanel as HTMLElement);
    if (rightPanel) this.marketPanel.attachEventListeners(rightPanel as HTMLElement);

    // Save button
    this.container.querySelector('#save-btn')?.addEventListener('click', () => {
      this.gameState.saveGame();
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