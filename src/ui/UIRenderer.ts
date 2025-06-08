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

  render(): void {
    const state = this.gameState.getState();
    
    this.container.innerHTML = `
      <div class="game-container">
        <header class="game-header">
          <h1>🏭 Autobahn Workshop</h1>
          <div class="game-stats">
            <span>Total Clicks: ${state.totalClicks}</span>
            <button id="save-btn" class="save-btn">💾 Save</button>
            <button id="reset-btn" class="reset-btn">🔄 Reset</button>
          </div>
        </header>

        <div class="game-content">
          <div class="left-panel">
            ${this.renderResources()}
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

  private renderResources(): string {
    const state = this.gameState.getState();
    const resources = Object.values(state.resources)
      .filter(resource => resource.amount > 0 || resource.id === 'marks')
      .map(resource => `
        <div class="resource-item">
          <span class="resource-name">${resource.name}</span>
          <span class="resource-amount">${Math.floor(resource.amount)}</span>
        </div>
      `).join('');

    return `
      <div class="panel resources-panel">
        <h3>📦 Resources</h3>
        <div class="resources-list">
          ${resources}
        </div>
      </div>
    `;
  }

  private renderCrafting(): string {
    const recipes = this.craftingSystem.getAvailableRecipes();
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
        <div class="machine-item ${machine.isActive ? 'active' : 'inactive'}">
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
    const buyableItems = this.marketSystem.getBuyableItems();
    const sellableItems = this.marketSystem.getSellableItems();

    const buySection = buyableItems.map(item => `
      <div class="market-item">
        <button 
          class="market-btn buy-btn ${this.marketSystem.canBuy(item.resourceId) ? 'available' : 'disabled'}"
          data-buy="${item.resourceId}"
          ${!this.marketSystem.canBuy(item.resourceId) ? 'disabled' : ''}
        >
          Buy ${item.name} (${item.price} marks)
        </button>
      </div>
    `).join('');

    const sellSection = sellableItems.map(item => `
      <div class="market-item">
        <button 
          class="market-btn sell-btn available"
          data-sell="${item.resourceId}"
        >
          Sell ${item.name} (${item.price} marks) [${item.available}]
        </button>
      </div>
    `).join('');

    return `
      <div class="panel market-panel">
        <h3>💰 Market</h3>
        <div class="market-section">
          <h4>Buy Materials</h4>
          ${buySection}
        </div>
        <div class="market-section">
          <h4>Sell Products</h4>
          ${sellSection}
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
      }
    });
  }
}