import { GameStateManager } from './core/GameState';
import { CraftingSystem } from './core/CraftingSystem';
import { AutomationManager } from './core/AutomationManager';
import { MarketSystem } from './core/MarketSystem';
import { UIRenderer } from './ui/UIRenderer';

export class App {
  private gameState: GameStateManager;
  private craftingSystem: CraftingSystem;
  private automationManager: AutomationManager;
  private marketSystem: MarketSystem;
  private uiRenderer: UIRenderer;
  private gameLoop: number = 0;

  constructor(container: HTMLElement) {
    // Initialize core systems
    this.gameState = new GameStateManager();
    this.craftingSystem = new CraftingSystem(this.gameState);
    this.automationManager = new AutomationManager(this.gameState, this.craftingSystem);
    this.marketSystem = new MarketSystem(this.gameState);
    
    // Initialize UI
    this.uiRenderer = new UIRenderer(
      this.gameState,
      this.craftingSystem,
      this.automationManager,
      this.marketSystem,
      container
    );

    this.start();
  }

  private start(): void {
    // Initial render
    this.uiRenderer.render();

    // Start game loop
    this.gameLoop = setInterval(() => {
      this.update();
    }, 100); // Update every 100ms

    // Auto-save every 30 seconds
    setInterval(() => {
      this.gameState.saveGame();
    }, 30000);
  }

  private update(): void {
    // Update automation
    this.automationManager.updateMachines();
    
    // Re-render UI
    this.uiRenderer.render();
  }

  destroy(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }
}