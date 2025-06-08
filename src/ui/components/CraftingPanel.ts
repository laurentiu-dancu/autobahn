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
            <div class="craft-name">${recipe.name}${craftTimeText}</div>
            <div class="craft-inputs">Needs: ${inputsText}</div>
            <div class="craft-outputs">Makes: ${outputsText}</div>
            ${recipe.craftTime > 0 ? `
              <div class="progress-bar" style="display: ${isCrafting ? 'block' : 'none'};">
                <div class="progress-fill" data-recipe-progress="${recipe.id}"></div>
              </div>
            ` : ''}
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
          <div class="craft-outputs">Find: 1 Wire Stock, 1 Sheet Metal, 1 Leather Scraps, 1 Oil</div>
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
          const success = this.craftingSystem.startCraft(recipeId);
          if (success) {
            // Immediately show progress bar and start animation
            this.startProgressAnimation(container, recipeId);
          }
        }
      });
    });
  }

  private startProgressAnimation(container: HTMLElement, recipeId: string): void {
    const progressBar = container.querySelector(`[data-recipe-progress="${recipeId}"]`)?.parentElement;
    const progressFill = container.querySelector(`[data-recipe-progress="${recipeId}"]`) as HTMLElement;
    
    if (progressBar && progressFill) {
      // Show the progress bar
      (progressBar as HTMLElement).style.display = 'block';
      
      // Get recipe for timing
      const recipes = this.craftingSystem.getAvailableRecipes();
      const recipe = recipes.find(r => r.id === recipeId);
      
      if (recipe && recipe.craftTime > 0) {
        // Reset and start animation
        progressFill.style.width = '0%';
        progressFill.classList.remove('animating');
        
        // Force reflow
        progressFill.offsetHeight;
        
        // Start animation
        progressFill.style.animationDuration = `${recipe.craftTime}ms`;
        progressFill.classList.add('animating');
        
        // Clean up after animation completes
        setTimeout(() => {
          progressFill.classList.remove('animating');
          progressFill.style.width = '0%';
          (progressBar as HTMLElement).style.display = 'none';
        }, recipe.craftTime + 100); // Small buffer
      }
    }
  }

  updateDynamicElements(container: HTMLElement): void {
    // Update button states
    const craftButtons = container.querySelectorAll('[data-recipe]');
    craftButtons.forEach(btn => {
      const recipeId = btn.getAttribute('data-recipe');
      if (recipeId) {
        const canCraft = this.craftingSystem.canCraft(recipeId);
        const isCrafting = this.craftingSystem.isCrafting(recipeId);
        
        btn.classList.toggle('available', canCraft && !isCrafting);
        btn.classList.toggle('disabled', !canCraft || isCrafting);
        (btn as HTMLButtonElement).disabled = !canCraft || isCrafting;
        
        // Update progress bar visibility
        const progressBar = container.querySelector(`[data-recipe-progress="${recipeId}"]`)?.parentElement;
        if (progressBar) {
          (progressBar as HTMLElement).style.display = isCrafting ? 'block' : 'none';
        }
      }
    });
  }
}