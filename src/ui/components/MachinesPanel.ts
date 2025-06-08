import { GameStateManager } from '../../core/GameState';
import { AutomationManager } from '../../core/AutomationManager';
import { MACHINES } from '../../config/machines';
import { RECIPES } from '../../config/recipes';

export class MachinesPanel {
  private gameState: GameStateManager;
  private automationManager: AutomationManager;

  constructor(gameState: GameStateManager, automationManager: AutomationManager) {
    this.gameState = gameState;
    this.automationManager = automationManager;
  }

  render(): string {
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
      
      const currentSpeed = recipe ? ((recipe.craftTime * machine.productionRate) / 1000).toFixed(1) : '0';
      const manualSpeed = recipe ? (recipe.craftTime / 1000).toFixed(1) : '0';
      const efficiency = recipe ? Math.round((1 / machine.productionRate) * 100) : 100;
      
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
            <div>Speed: ${currentSpeed}s (Manual: ${manualSpeed}s) - ${efficiency}% efficiency</div>
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

  attachEventListeners(container: HTMLElement): void {
    // Machine building
    container.querySelectorAll('[data-machine]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).closest('[data-machine]')?.getAttribute('data-machine');
        if (machineId) {
          this.automationManager.buildMachine(machineId);
        }
      });
    });

    // Machine toggle
    container.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).getAttribute('data-toggle');
        if (machineId) {
          this.automationManager.toggleMachine(machineId);
        }
      });
    });

    // Machine upgrade
    container.querySelectorAll('[data-upgrade]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).getAttribute('data-upgrade');
        if (machineId) {
          this.automationManager.upgradeMachine(machineId);
        }
      });
    });
  }

  updateDynamicElements(container: HTMLElement): void {
    // Update machine progress bars
    const machineItems = container.querySelectorAll('.machine-item');
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

    // Update machine build button states
    const buildButtons = container.querySelectorAll('[data-machine]');
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
    const upgradeButtons = container.querySelectorAll('[data-upgrade]');
    upgradeButtons.forEach(btn => {
      const machineId = btn.getAttribute('data-upgrade');
      if (machineId) {
        const canUpgrade = this.automationManager.canUpgradeMachine(machineId);
        btn.classList.toggle('available', canUpgrade);
        btn.classList.toggle('disabled', !canUpgrade);
        (btn as HTMLButtonElement).disabled = !canUpgrade;
      }
    });
  }
}