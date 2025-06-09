import { GameStateManager } from './core/GameState';
import { CraftingSystem } from './core/CraftingSystem';
import { AutomationManager } from './core/AutomationManager';
import { MarketSystem } from './core/MarketSystem';
import { SalvageSystem } from './core/SalvageSystem';
import { StockControlSystem } from './core/StockControlSystem';
import { UIRenderer } from './ui/UIRenderer';
import { DevMode } from './core/DevMode';
import { FrameSync } from './core/FrameSync';

export class App {
  private gameState: GameStateManager;
  private craftingSystem: CraftingSystem;
  private automationManager: AutomationManager;
  private marketSystem: MarketSystem;
  private salvageSystem: SalvageSystem;
  private stockControlSystem: StockControlSystem;
  private uiRenderer: UIRenderer;
  private frameSync: FrameSync;
  private devMode: DevMode;
  private isRunning: boolean = false;

  constructor(container: HTMLElement) {
    // Initialize dev mode first
    this.devMode = DevMode.getInstance();
    
    // Initialize core systems
    this.gameState = new GameStateManager();
    this.craftingSystem = new CraftingSystem(this.gameState);
    this.automationManager = new AutomationManager(this.gameState, this.craftingSystem);
    this.marketSystem = new MarketSystem(this.gameState);
    this.salvageSystem = new SalvageSystem(this.gameState);
    this.stockControlSystem = new StockControlSystem(this.gameState, this.marketSystem);
    this.frameSync = new FrameSync();
    
    // Initialize UI
    this.uiRenderer = new UIRenderer(
      this.gameState,
      this.craftingSystem,
      this.automationManager,
      this.marketSystem,
      this.salvageSystem,
      this.stockControlSystem,
      container
    );

    // Initialize dev mode with game systems
    this.devMode.initialize(
      this.gameState,
      this.craftingSystem,
      this.automationManager,
      this.marketSystem
    );

    this.start();
  }

  forceUIRefresh(): void {
    this.uiRenderer.forceFullRender();
  }

  private start(): void {
    this.devMode.log('Game starting...');
    
    // Initial render
    this.uiRenderer.render();

    // Start game loop
    this.isRunning = true;
    this.gameLoop();

    // Auto-save every 30 seconds
    setInterval(() => {
      this.gameState.saveGame();
    }, 30000);
  }

  private async gameLoop(): Promise<void> {
    if (!this.isRunning) return;

    // Always render to keep UI smooth
    const renderStart = performance.now();
    this.uiRenderer.render();
    const renderTime = performance.now() - renderStart;

    // Try to update game logic if enough time has passed
    if (await this.frameSync.startUpdate()) {
      const updateStart = performance.now();
      
      // Update automation
      this.automationManager.updateMachines();
      
      // Update stock control
      this.stockControlSystem.update();
      
      const updateTime = performance.now() - updateStart;
      
      // Update dev mode performance metrics
      if (this.devMode.isDevMode()) {
        const updateTimeElement = document.querySelector('#dev-update-time');
        const renderTimeElement = document.querySelector('#dev-render-time');
        const fpsElement = document.querySelector('#dev-fps');
        if (updateTimeElement) updateTimeElement.textContent = updateTime.toFixed(2);
        if (renderTimeElement) renderTimeElement.textContent = renderTime.toFixed(2);
        if (fpsElement) fpsElement.textContent = this.frameSync.getCurrentFps().toString();
      }

      this.frameSync.finishUpdate();
    }

    // Schedule next frame
    requestAnimationFrame(() => this.gameLoop());
  }

  destroy(): void {
    this.devMode.log('Game shutting down...');
    
    // Stop the game loop
    this.isRunning = false;
    
    // Clean up notification manager
    this.gameState.getNotificationManager().destroy();
  }
}