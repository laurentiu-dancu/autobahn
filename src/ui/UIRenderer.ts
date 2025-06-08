import { GameStateManager } from '../core/GameState';
import { CraftingSystem } from '../core/CraftingSystem';
import { AutomationManager } from '../core/AutomationManager';
import { MarketSystem } from '../core/MarketSystem';
import { RECIPES, MACHINES } from '../config/gameConfig';

export class UIRenderer {
  private gameState: GameStateManager;
  private craftingSystem: CraftingSystem;
  private automationManager: AutomationManager;
  private marketSystem: MarketSystem;
  private container: HTMLElement;
  private lastRenderState: string = '';
  private isInitialized: boolean = false;

  constructor(
    gameState: GameStateManager,
    craftingSystem: CraftingSystem,
    automationManager: AutomationManager,
    marketSystem: MarketSystem,
    container: HTMLElement
  ) {
    this.gameState = gameState;
    this.craftingSystem = craftingSystem;
    this.automationManager = automationManager;
    this.marketSystem = marketSystem;
    this.container = container;
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
      unlockedRecipes: Array.from(state.unlockedRecipes).sort(),
      unlockedMachines: Array.from(state.unlockedMachines).sort(),
      machineIds: Object.keys(state.machines).sort(),
      totalClicks: state.totalClicks
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
            ${this.renderCrafting()}
          </div>
          
          <div class="center-panel">
            ${this.renderMachines()}
          </div>
          
          <div class="right-panel">
            ${this.renderMarket()}
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

    // Update resource amounts
    this.updateResourceAmounts();
    
    // Update progress bars
    this.updateProgressBars();
    
    // Update button states (availability)
    this.updateButtonStates();
  }

  private updateResourceAmounts(): void {
    const state = this.gameState.getState();
    
    Object.values(state.resources).forEach(resource => {
      if (state.uiState.discoveredResources.has(resource.id)) {
        const amountElement = this.container.querySelector(`[data-resource-amount="${resource.id}"]`);
        if (amountElement) {
          amountElement.textContent = Math.floor(resource.amount).toString();
        }
      }
    });
  }

  private updateProgressBars(): void {
    // Update crafting progress bars
    const craftButtons = this.container.querySelectorAll('[data-recipe]');
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

    // Update machine progress bars
    const machineItems = this.container.querySelectorAll('.machine-item');
    machineItems.forEach(item => {
      const machineId = item.getAttribute('data-machine-id');
      if (machineId) {
        const progress = this.automationManager.getMachineProgress(machineId);
        const progressBar = item.querySelector('.progress-fill');
        if (progressBar) {
          (progressBar as HTMLElement).style.width = `${progress * 100}%`;
        }
      }
    });
  }

  private updateButtonStates(): void {
    // Update craft button states
    const craftButtons = this.container.querySelectorAll('[data-recipe]');
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

    // Update machine build button states
    const buildButtons = this.container.querySelectorAll('[data-machine]');
    buildButtons.forEach(btn => {
      const machineId = btn.getAttribute('data-machine');
      if (machineId) {
        const canBuild = this.automationManager.canBuildMachine(machineId);
        btn.classList.toggle('available', canBuild);
        btn.classList.toggle('disabled', !canBuild);
        (btn as HTMLButtonElement).disabled = !canBuild;
      }
    });

    // Update machine upgrade button states
    const upgradeButtons = this.container.querySelectorAll('[data-upgrade]');
    upgradeButtons.forEach(btn => {
      const machineId = btn.getAttribute('data-upgrade');
      if (machineId) {
        const canUpgrade = this.automationManager.canUpgradeMachine(machineId);
        btn.classList.toggle('available', canUpgrade);
        btn.classList.toggle('disabled', !canUpgrade);
        (btn as HTMLButtonElement).disabled = !canUpgrade;
      }
    });

    // Update market button states
    const buyButtons = this.container.querySelectorAll('[data-buy]');
    buyButtons.forEach(btn => {
      const resourceId = btn.getAttribute('data-buy');
      if (resourceId) {
        const canBuy = this.marketSystem.canBuy(resourceId);
        btn.classList.toggle('available', canBuy);
        btn.classList.toggle('disabled', !canBuy);
        (btn as HTMLButtonElement).disabled = !canBuy;
      }
    });
  }

  private renderCrafting(): string {
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

  private renderMachines(): string {
    const state = this.gameState.getState();
    const availableMachines = this.automationManager.getAvailableMachines();
    const builtMachines = Object.entries(state.machines);

    if (availableMachines.length === 0 && builtMachines.length === 0) {
      return ''; // Don't show machines panel if no machines available
    }
    
    const machineBuilds = availableMachines
      .filter(machineId => !state.machines[machineId])
      .map(machineId => {
        const machine = MACHINES[machineId];
        const canBuild = this.automationManager.canBuildMachine(machineId);
        
        const costText = machine.cost.map(cost => {
          const resource = state.resources[cost.resourceId];
          return `${cost.amount} ${resource?.name || cost.resourceId}`;
        }).join(', ');

        return `
          <div class="machine-build">
            <button 
              class="build-btn ${canBuild ? 'available' : 'disabled'}"
              data-machine="${machineId}"
              ${!canBuild ? 'disabled' : ''}
            >
              <div class="machine-name">Build ${machine.name}</div>
              <div class="machine-cost">Cost: ${costText}</div>
              <div class="machine-desc">${machine.description}</div>
            </button>
          </div>
        `;
      }).join('');

    const activeMachines = builtMachines.map(([machineId, machine]) => {
      const progress = this.automationManager.getMachineProgress(machineId);
      const canUpgrade = this.automationManager.canUpgradeMachine(machineId);
      const recipe = RECIPES[machine.recipeId];
      
      const upgradeCostText = machine.upgradeCost.map(cost => {
        const resource = state.resources[cost.resourceId];
        const actualCost = cost.amount * machine.level;
        return `${actualCost} ${resource?.name || cost.resourceId}`;
      }).join(', ');

      return `
        <div class="machine-item ${machine.isActive ? 'active' : 'inactive'}" data-machine-id="${machineId}">
          <div class="machine-header">
            <h4>${machine.name} (Level ${machine.level})</h4>
            <button 
              class="toggle-btn" 
              data-toggle="${machineId}"
            >
              ${machine.isActive ? '⏸️ Pause' : '▶️ Start'}
            </button>
          </div>
          <div class="machine-info">
            <div>Recipe: ${recipe?.name}</div>
            <div>Speed: ${Math.round((1 / machine.productionRate) * 100)}% of manual</div>
          </div>
          ${machine.isActive ? `
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress * 100}%"></div>
            </div>
          ` : ''}
          <button 
            class="upgrade-btn ${canUpgrade ? 'available' : 'disabled'}"
            data-upgrade="${machineId}"
            ${!canUpgrade ? 'disabled' : ''}
          >
            Upgrade (${upgradeCostText})
          </button>
        </div>
      `;
    }).join('');

    return `
      <div class="panel machines-panel">
        <h3>⚙️ Automation</h3>
        ${machineBuilds}
        ${activeMachines}
      </div>
    `;
  }

  private renderMarket(): string {
    const state = this.gameState.getState();
    if (!state.uiState.showMarket) {
      return ''; // Don't show market until unlocked
    }

    // Get discovered resources for display
    const discoveredResources = Object.values(state.resources)
      .filter(resource => state.uiState.discoveredResources.has(resource.id))
      .map(resource => `
        <div class="resource-item">
          <span class="resource-name">${resource.name}</span>
          <span class="resource-amount" data-resource-amount="${resource.id}">${Math.floor(resource.amount)}</span>
        </div>
      `).join('');

    const buyableItems = this.marketSystem.getBuyableItems();
    const sellableItems = this.marketSystem.getSellableItems();

    const buySection = buyableItems.map(item => `
      <button 
        class="market-btn buy-btn ${this.marketSystem.canBuy(item.resourceId) ? 'available' : 'disabled'}"
        data-buy="${item.resourceId}"
        ${!this.marketSystem.canBuy(item.resourceId) ? 'disabled' : ''}
      >
        Buy ${item.name} (${item.price}₼)
      </button>
    `).join('');

    const sellSection = sellableItems.map(item => `
      <button 
        class="market-btn sell-btn available"
        data-sell="${item.resourceId}"
      >
        Sell ${item.name} (${item.price}₼) [${item.available}]
      </button>
    `).join('');

    return `
      <div class="panel market-panel">
        <h3>💰 Resources & Market</h3>
        
        <div class="resources-section">
          <h4>📦 Your Resources</h4>
          <div class="resources-list">
            ${discoveredResources}
          </div>
        </div>
        
        <div class="market-actions">
          <div class="market-section">
            <h4>🛒 Buy</h4>
            <div class="market-buttons">
              ${buySection}
            </div>
          </div>
          
          <div class="market-section">
            <h4>💸 Sell</h4>
            <div class="market-buttons">
              ${sellSection}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    // Crafting buttons
    this.container.querySelectorAll('[data-recipe]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recipeId = (e.target as HTMLElement).closest('[data-recipe]')?.getAttribute('data-recipe');
        if (recipeId) {
          this.craftingSystem.startCraft(recipeId);
        }
      });
    });

    // Machine building
    this.container.querySelectorAll('[data-machine]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).closest('[data-machine]')?.getAttribute('data-machine');
        if (machineId) {
          this.automationManager.buildMachine(machineId);
        }
      });
    });

    // Machine toggle
    this.container.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).getAttribute('data-toggle');
        if (machineId) {
          this.automationManager.toggleMachine(machineId);
        }
      });
    });

    // Machine upgrade
    this.container.querySelectorAll('[data-upgrade]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).getAttribute('data-upgrade');
        if (machineId) {
          this.automationManager.upgradeMachine(machineId);
        }
      });
    });

    // Market buy
    this.container.querySelectorAll('[data-buy]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const resourceId = (e.target as HTMLElement).getAttribute('data-buy');
        if (resourceId) {
          this.marketSystem.buy(resourceId);
        }
      });
    });

    // Market sell
    this.container.querySelectorAll('[data-sell]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const resourceId = (e.target as HTMLElement).getAttribute('data-sell');
        if (resourceId) {
          this.marketSystem.sell(resourceId);
        }
      });
    });

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