import { GameStateManager } from '../../core/GameState';
import { CraftingSystem } from '../../core/CraftingSystem';
import { SalvageSystem } from '../../core/SalvageSystem';

export class CraftingPanel {
  private gameState: GameStateManager;
  private craftingSystem: CraftingSystem;
  private salvageSystem: SalvageSystem;

  constructor(gameState: GameStateManager, craftingSystem: CraftingSystem, salvageSystem: SalvageSystem) {
    this.gameState = gameState;
    this.craftingSystem = craftingSystem;
    this.salvageSystem = salvageSystem;
  }

  render(): string {
    const recipes = this.craftingSystem.getAvailableRecipes();
    
    const recipeButtons = recipes.map(recipe => {
      const canCraft = this.craftingSystem.canCraft(recipe.id);
      const isCrafting = this.craftingSystem.isCrafting(recipe.id);
      const progress = this.craftingSystem.getCraftProgress(recipe.id);
      
      const craftTimeText = recipe.craftTime > 0 ? ` (${recipe.craftTime / 1000}s)` : '';
      
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
            <div class="craft-content">
              <div class="craft-name">${recipe.name}${craftTimeText}</div>
              <div class="craft-details ${isCrafting ? 'hidden' : ''}">
                <div class="craft-inputs">Needs: ${inputsText}</div>
                <div class="craft-outputs">Makes: ${outputsText}</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar ${isCrafting ? 'visible' : 'hidden'}">
                  <div class="progress-fill" style="width: ${progress * 100}%"></div>
                </div>
              </div>
            </div>
          </button>
        </div>
      `;
    }).join('');

    // Salvage materials button - always available
    const salvageButton = `
      <div class="salvage-section">
        <button 
          id="salvage-materials-btn" 
          class="craft-btn available"
        >
          <div class="craft-name">🔍 Salvage Materials</div>
          <div class="craft-outputs">Find: 1 random material (Wire Stock, Sheet Metal, Leather Scraps, or Oil)</div>
        </button>
      </div>
    `;
    return `
      <div class="panel crafting-panel">
        <h3>🔨 Manual Crafting</h3>
        ${salvageButton}
        ${recipes.length > 0 ? `
          <h4>Recipes</h4>
        ` : ''}
        <div class="crafting-list">
          ${recipeButtons}
        </div>
      </div>
    `;
  }

  attachEventListeners(container: HTMLElement): void {
    // Salvage materials button
    container.querySelector('#salvage-materials-btn')?.addEventListener('click', () => {
      this.salvageSystem.salvageMaterials();
    });

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
        const isCrafting = this.craftingSystem.isCrafting(recipeId);
        const progress = this.craftingSystem.getCraftProgress(recipeId);
        
        // Update progress bar visibility and progress
        const progressBarContainer = btn.querySelector('.progress-bar');
        const craftDetails = btn.querySelector('.craft-details');
        const progressFill = btn.querySelector('.progress-fill');
        
        if (progressBarContainer && craftDetails) {
          if (isCrafting) {
            progressBarContainer.classList.remove('hidden');
            progressBarContainer.classList.add('visible');
            craftDetails.classList.add('hidden');
          } else {
            progressBarContainer.classList.remove('visible');
            progressBarContainer.classList.add('hidden');
            craftDetails.classList.remove('hidden');
          }
        }
        
        if (progressFill) {
          (progressFill as HTMLElement).style.width = `${progress * 100}%`;
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