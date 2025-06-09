import { UICraftingData } from '../../core/types';

export class CraftingPanel {
  constructor(
    private actions: {
      startCraft: (recipeId: string) => boolean;
      salvageMaterials: () => void;
    }
  ) {}

  render(craftingData: UICraftingData[]): string {
    // Filter to only show basic tier recipes
    const basicRecipes = craftingData.filter(recipe => recipe.tier === 'basic');
    
    const recipeButtons = basicRecipes.map(recipe => {
      const craftTimeText = recipe.craftTime > 0 ? ` (${recipe.craftTime / 1000}s)` : '';
      
      const inputsText = recipe.inputs.map(input => 
        `${input.amount} ${input.name}`
      ).join(', ');

      const outputsText = recipe.outputs.map(output => 
        `${output.amount} ${output.name}`
      ).join(', ');

      return `
        <div class="craft-item">
          <button 
            class="craft-btn ${recipe.canCraft && !recipe.isCrafting ? 'available' : 'disabled'}" 
            data-recipe="${recipe.recipeId}"
            ${!recipe.canCraft || recipe.isCrafting ? 'disabled' : ''}
          >
            <div class="craft-content">
              <div class="craft-name">${recipe.name}${craftTimeText}</div>
              <div class="craft-details ${recipe.isCrafting ? 'hidden' : ''}">
                <div class="craft-inputs">Needs: ${inputsText}</div>
                <div class="craft-outputs">Makes: ${outputsText}</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar ${recipe.isCrafting ? 'visible' : 'hidden'}">
                  <div class="progress-fill" style="width: ${recipe.progress * 100}%"></div>
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
          <div class="craft-outputs">Find: 1 random material (Wire Stock, Sheet Metal, or Leather Scraps)</div>
        </button>
      </div>
    `;

    return `
      <div class="panel crafting-panel">
        <h3>🔨 Basic Crafting</h3>
        ${salvageButton}
        ${basicRecipes.length > 0 ? `
          <h4>Basic Components</h4>
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
      this.actions.salvageMaterials();
    });

    container.querySelectorAll('[data-recipe]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recipeId = (e.target as HTMLElement).closest('[data-recipe]')?.getAttribute('data-recipe');
        if (recipeId) {
          this.actions.startCraft(recipeId);
        }
      });
    });
  }

  updateDynamicElements(container: HTMLElement, craftingData: UICraftingData[]): void {
    // Filter to only show basic tier recipes
    const basicRecipes = craftingData.filter(recipe => recipe.tier === 'basic');
    
    // Update progress bars and button states
    basicRecipes.forEach(recipe => {
      const btn = container.querySelector(`[data-recipe="${recipe.recipeId}"]`);
      if (btn) {
        // Update progress bar visibility and progress
        const progressBarContainer = btn.querySelector('.progress-bar');
        const craftDetails = btn.querySelector('.craft-details');
        const progressFill = btn.querySelector('.progress-fill');
        
        if (progressBarContainer && craftDetails) {
          if (recipe.isCrafting) {
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
          (progressFill as HTMLElement).style.width = `${recipe.progress * 100}%`;
        }

        // Update button state
        btn.classList.toggle('available', recipe.canCraft && !recipe.isCrafting);
        btn.classList.toggle('disabled', !recipe.canCraft || recipe.isCrafting);
        (btn as HTMLButtonElement).disabled = !recipe.canCraft || recipe.isCrafting;
      }
    });
  }
}