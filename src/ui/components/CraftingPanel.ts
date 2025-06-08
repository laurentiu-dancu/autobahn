import { GameStateManager } from '../../core/GameState';
import { CraftingSystem } from '../../core/CraftingSystem';

export class CraftingPanel {
  private gameState: GameStateManager;
  private craftingSystem: CraftingSystem;

  constructor(gameState: GameStateManager, craftingSystem: CraftingSystem) {
    this.gameState = gameState;
    this.craftingSystem = craftingSystem;
  }

  render(): string {
    const recipes = this.craftingSystem.getAvailableRecipes();
    
    if (recipes.length === 0) {
      return `
        <div class="panel crafting-panel">
          <h3>🔨 Manual Crafting</h3>
          <p>No recipes available yet...</p>
        </div>
      `;
    }
    
    const recipeButtons = recipes.map(recipe => {
      const canCraft = this.craftingSystem.canCraft(recipe.id);
      const isCrafting = this.craftingSystem.isCrafting(recipe.id);
      const progress = this.craftingSystem.getCraftProgress(recipe.id);
      
      const inputsText = recipe.inputs.map(input => {
        const resource = this.gameState.getState().resources[input.resourceId];
        return `${input.amount} ${resource?.name || input.resourceId}`;
      }).join(', ');

      const outputsText = recipe.outputs.map(output => {
        const resource = this.gameState.getState().resources[output.resourceId];
        return `${output.amount} ${resource?.name || output.resourceId}`;
      }).join(', ');

      return `
        <div class="craft-item">
          <button 
            class="craft-btn ${canCraft && !isCrafting ? 'available' : 'disabled'}" 
            data-recipe="${recipe.id}"
            ${!canCraft || isCrafting ? 'disabled' : ''}
          >
            <div class="craft-name">${recipe.name}</div>
            <div class="craft-inputs">Needs: ${inputsText}</div>
            <div class="craft-outputs">Makes: ${outputsText}</div>
            ${isCrafting ? `
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress * 100}%"></div>
              </div>
            ` : ''}
          </button>
        </div>
      `;
    }).join('');

    return `
      <div class="panel crafting-panel">
        <h3>🔨 Manual Crafting</h3>
        <div class="crafting-list">
          ${recipeButtons}
        </div>
      </div>
    `;
  }

  attachEventListeners(container: HTMLElement): void {
    container.querySelectorAll('[data-recipe]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recipeId = (e.target as HTMLElement).closest('[data-recipe]')?.getAttribute('data-recipe');
        if (recipeId) {
          this.craftingSystem.startCraft(recipeId);
        }
      });
    });
  }

  updateDynamicElements(container: HTMLElement): void {
    // Update progress bars
    const craftButtons = container.querySelectorAll('[data-recipe]');
    craftButtons.forEach(btn => {
      const recipeId = btn.getAttribute('data-recipe');
      if (recipeId) {
        const progress = this.craftingSystem.getCraftProgress(recipeId);
        const progressBar = btn.querySelector('.progress-fill');
        if (progressBar) {
          (progressBar as HTMLElement).style.width = `${progress * 100}%`;
        }
      }
    });

    // Update button states
    craftButtons.forEach(btn => {
      const recipeId = btn.getAttribute('data-recipe');
      if (recipeId) {
        const canCraft = this.craftingSystem.canCraft(recipeId);
        const isCrafting = this.craftingSystem.isCrafting(recipeId);
        
        btn.classList.toggle('available', canCraft && !isCrafting);
        btn.classList.toggle('disabled', !canCraft || isCrafting);
        (btn as HTMLButtonElement).disabled = !canCraft || isCrafting;
      }
    });
  }
}