import { GameStateManager } from './GameState';

export class SalvageSystem {
  private gameState: GameStateManager;

  constructor(gameState: GameStateManager) {
    this.gameState = gameState;
  }

  salvageMaterials(): void {
    // Provide small amounts of basic materials
    const salvageAmounts = {
      wireStock: 1,
      sheetMetal: 1,
      leatherScraps: 1,
      oil: 1
    };

    Object.entries(salvageAmounts).forEach(([resourceId, amount]) => {
      this.gameState.updateResource(resourceId, amount);
    });

    this.gameState.incrementClicks();
  }

  canSalvage(): boolean {
    // Always available - this is the anti-softlock mechanism
    return true;
  }
}