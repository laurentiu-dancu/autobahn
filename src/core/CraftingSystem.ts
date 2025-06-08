import { Recipe } from './types';
import { GameStateManager } from './GameState';
import { RECIPES } from '../config/gameConfig';

export class CraftingSystem {
  private gameState: GameStateManager;
  private activeCrafts: Map<string, number> = new Map();

  constructor(gameState: GameStateManager) {
    this.gameState = gameState;
  }

  canCraft(recipeId: string): boolean {
    const recipe = RECIPES[recipeId];
    if (!recipe) return false;

    const state = this.gameState.getState();
    if (!state.unlockedRecipes.has(recipeId)) return false;

    return this.gameState.canAfford(recipe.inputs);
  }

  startCraft(recipeId: string): boolean {
    if (!this.canCraft(recipeId)) return false;
    if (this.activeCrafts.has(recipeId)) return false;

    const recipe = RECIPES[recipeId];
    if (!this.gameState.spendResources(recipe.inputs)) return false;

    this.gameState.incrementClicks();
    
    // For instant crafting (craftTime = 0), complete immediately
    if (recipe.craftTime === 0) {
      this.completeCraft(recipeId);
    } else {
      // For timed crafting (machines), use the timer
      const craftEndTime = Date.now() + recipe.craftTime;
      this.activeCrafts.set(recipeId, craftEndTime);

      setTimeout(() => {
        this.completeCraft(recipeId);
      }, recipe.craftTime);
    }

    return true;
  }

  private completeCraft(recipeId: string): void {
    const recipe = RECIPES[recipeId];
    if (!recipe) return;

    this.activeCrafts.delete(recipeId);
    
    recipe.outputs.forEach(output => {
      this.gameState.updateResource(output.resourceId, output.amount);
    });

    this.gameState.checkMilestones();
  }

  getCraftProgress(recipeId: string): number {
    const endTime = this.activeCrafts.get(recipeId);
    if (!endTime) return 0;

    const recipe = RECIPES[recipeId];
    const elapsed = Date.now() - (endTime - recipe.craftTime);
    return Math.min(1, elapsed / recipe.craftTime);
  }

  isCrafting(recipeId: string): boolean {
    return this.activeCrafts.has(recipeId);
  }

  getAvailableRecipes(): Recipe[] {
    const state = this.gameState.getState();
    return Object.values(RECIPES).filter(recipe => 
      state.unlockedRecipes.has(recipe.id)
    );
  }
}