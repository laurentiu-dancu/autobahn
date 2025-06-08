import { GameStateManager } from './GameState';

export class SalvageSystem {
  private gameState: GameStateManager;

  constructor(gameState: GameStateManager) {
    this.gameState = gameState;
  }

  salvageMaterials(): void {
    // Define possible materials to find
    const possibleMaterials = [
      { resourceId: 'wireStock', amount: 1 },
      { resourceId: 'sheetMetal', amount: 1 },
      { resourceId: 'leatherScraps', amount: 1 },
      { resourceId: 'oil', amount: 1 }
    ];

    // Randomly select one material to find
    const randomIndex = Math.floor(Math.random() * possibleMaterials.length);
    const foundMaterial = possibleMaterials[randomIndex];

    // Give the player the randomly found material
    this.gameState.updateResource(foundMaterial.resourceId, foundMaterial.amount);

    this.gameState.incrementClicks();
  }

  canSalvage(): boolean {
    // Always available - this is the anti-softlock mechanism
    return true;
  }
}