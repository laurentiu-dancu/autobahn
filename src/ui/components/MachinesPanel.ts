import { UIMachineData } from '../../core/types';
import { ComponentPopover } from './ComponentPopover';
import { GameStateManager } from '../../core/GameState';

interface MachineCost {
  resourceId: string;
  amount: number;
  name: string;
}

export class MachinesPanel {
  private actions: {
    buildMachine: (machineId: string) => void;
    toggleMachine: (machineId: string) => void;
    upgradeMachine: (machineId: string) => void;
  };
  private gameState: GameStateManager;

  constructor(
    gameState: GameStateManager,
    actions: {
      buildMachine: (machineId: string) => void;
      toggleMachine: (machineId: string) => void;
      upgradeMachine: (machineId: string) => void;
    }
  ) {
    this.gameState = gameState;
    this.actions = actions;
  }

  render(machinesData: UIMachineData[], availableMachinesData: any[]): string {
    if (machinesData.length === 0 && availableMachinesData.length === 0) {
      return '';
    }

    const machineBuilds = availableMachinesData.map(machine => {
      const buildCostText = machine.cost.map((cost: MachineCost) => {
        const symbol = cost.resourceId === 'marks' ? '€' : '';
        return `${cost.amount}${symbol} ${cost.name}`;
      }).join(', ');

      return `
        <div class="machine-build">
          <button 
            class="build-btn ${machine.canBuild ? 'available' : 'disabled'}"
            data-machine="${machine.id}"
            ${!machine.canBuild ? 'disabled' : ''}
          >
            <div class="build-name">${machine.name}</div>
            <div class="build-cost">Cost: ${buildCostText}</div>
          </button>
        </div>
      `;
    }).join('');

    const activeMachines = machinesData.map(machine => {
      const upgradeCostText = machine.upgradeCost.map(cost => {
        const symbol = cost.resourceId === 'marks' ? '€' : '';
        return `${cost.amount}${symbol} ${cost.name}`;
      }).join(', ');

      // Get actual machine status directly from the machine state
      const statusIcon = machine.status === 'running' ? '🟢' : 
                        machine.status === 'waiting_resources' ? '🟡' : '🔴';
      const statusText = machine.status === 'running' ? 'Running' :
                        machine.status === 'waiting_resources' ? 'Waiting for Resources' : 
                        'Paused';

      const showProgress = machine.isActive && machine.status === 'running';
      
      // Get the saved expanded state for this machine
      const isExpanded = this.gameState.getState().uiState.panelStates[`machine-${machine.id}`]?.expanded ?? true;
      
      return `
        <div class="machine-item ${machine.isActive ? 'active' : 'inactive'} machine-${machine.status}" data-machine-id="${machine.id}">
          <div class="machine-header">
            <div class="machine-header-left" data-machine-id="${machine.id}">
              <h4>${machine.name} (Level ${machine.level})</h4>
            </div>
            <button class="collapse-btn" data-collapse="${machine.id}">${isExpanded ? '▼' : '▶'}</button>
          </div>
          <div class="progress-bar ${showProgress ? 'visible' : ''}" data-machine-progress-container="${machine.id}">
            <div class="progress-fill" data-machine-progress="${machine.id}" style="width: ${machine.progress * 100}%"></div>
          </div>
          <div class="machine-content ${isExpanded ? '' : 'collapsed'}">
            <div class="machine-info">
              <div>Speed: ${machine.currentSpeed}s - ${machine.efficiency}% efficiency</div>
              <div class="machine-status">
                <span class="status-indicator">${statusIcon} ${statusText}</span>
                ${machine.statusMessage ? `<div class="status-message">${machine.statusMessage}</div>` : ''}
              </div>
            </div>
            <div class="machine-actions">
              <button 
                class="toggle-btn" 
                data-toggle="${machine.id}"
              >
                ${machine.isActive ? '⏸️ Pause' : '▶️ Start'}
              </button>
              <button 
                class="upgrade-btn ${machine.canUpgrade ? 'available' : 'disabled'}"
                data-upgrade="${machine.id}"
                ${!machine.canUpgrade ? 'disabled' : ''}
              >
                Upgrade (${upgradeCostText})
              </button>
            </div>
          </div>
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
    // Build machine buttons
    container.querySelectorAll('[data-machine]').forEach(button => {
      button.addEventListener('click', (e) => {
        const machineId = (e.currentTarget as HTMLElement).getAttribute('data-machine');
        if (machineId) {
          this.actions.buildMachine(machineId);
        }
      });
    });

    // Toggle machine buttons
    container.querySelectorAll('[data-toggle]').forEach(button => {
      button.addEventListener('click', (e) => {
        const machineId = (e.currentTarget as HTMLElement).getAttribute('data-toggle');
        if (machineId) {
          this.actions.toggleMachine(machineId);
        }
      });
    });

    // Upgrade machine buttons
    container.querySelectorAll('[data-upgrade]').forEach(button => {
      button.addEventListener('click', (e) => {
        const machineId = (e.currentTarget as HTMLElement).getAttribute('data-upgrade');
        if (machineId) {
          this.actions.upgradeMachine(machineId);
        }
      });
    });

    // Collapse/expand buttons
    container.querySelectorAll('[data-collapse]').forEach(button => {
      button.addEventListener('click', (e) => {
        const machineId = (e.currentTarget as HTMLElement).getAttribute('data-collapse');
        if (machineId) {
          const machineItem = container.querySelector(`[data-machine-id="${machineId}"]`);
          const content = machineItem?.querySelector('.machine-content');
          const button = e.currentTarget as HTMLElement;
          
          if (content && button) {
            const isExpanded = !content.classList.contains('collapsed');
            content.classList.toggle('collapsed');
            button.textContent = isExpanded ? '▶' : '▼';
            
            // Save state
            const state = this.gameState.getState();
            if (!state.uiState.panelStates[`machine-${machineId}`]) {
              state.uiState.panelStates[`machine-${machineId}`] = { expanded: true };
            }
            state.uiState.panelStates[`machine-${machineId}`].expanded = !isExpanded;
          }
        }
      });
    });

    // Machine header hover for popover
    const popover = ComponentPopover.getInstance();
    container.querySelectorAll('.machine-header-left').forEach(header => {
      header.addEventListener('mouseenter', (e) => {
        const machineId = (e.currentTarget as HTMLElement).getAttribute('data-machine-id');
        if (machineId) {
          popover.showPopover(null, e.currentTarget as HTMLElement, machineId);
        }
      });

      header.addEventListener('mouseleave', () => {
        popover.setHoverTimeout(() => {
          popover.hidePopover();
        }, 100);
      });
    });
  }

  updateDynamicElements(container: HTMLElement, machinesData: UIMachineData[], availableMachinesData: any[]): void {
    // Update machine status and progress based on actual machine state
    machinesData.forEach(machine => {
      const item = container.querySelector(`[data-machine-id="${machine.id}"]`);
      if (item) {
        // Update machine item classes based on actual machine status
        item.className = `machine-item ${machine.isActive ? 'active' : 'inactive'} machine-${machine.status}`;
        
        // Update machine level in header
        const header = item.querySelector('.machine-header-left h4');
        if (header) {
          header.textContent = `${machine.name} (Level ${machine.level})`;
        }
        
        // Update machine info (speed and efficiency)
        const machineInfo = item.querySelector('.machine-info div:first-child');
        if (machineInfo) {
          machineInfo.textContent = `Speed: ${machine.currentSpeed}s - ${machine.efficiency}% efficiency`;
        }
        
        // Update status display
        const statusIndicator = item.querySelector('.status-indicator');
        if (statusIndicator) {
          const statusIcon = machine.status === 'running' ? '🟢' : 
                            machine.status === 'waiting_resources' ? '🟡' : '🔴';
          const statusText = machine.status === 'running' ? 'Running' :
                            machine.status === 'waiting_resources' ? 'Waiting for Resources' : 
                            'Paused';
          statusIndicator.textContent = `${statusIcon} ${statusText}`;
        }

        // Update status message
        const statusMessage = item.querySelector('.status-message');
        if (statusMessage) {
          if (machine.statusMessage) {
            statusMessage.textContent = machine.statusMessage;
            (statusMessage as HTMLElement).style.display = 'block';
          } else {
            (statusMessage as HTMLElement).style.display = 'none';
          }
        }

        // Update toggle button text based on actual machine state
        const toggleBtn = item.querySelector('[data-toggle]');
        if (toggleBtn) {
          toggleBtn.textContent = machine.isActive ? '⏹️ Stop' : '▶️ Start';
        }

        // Show/hide progress bar based on machine status
        const showProgress = machine.isActive && machine.status === 'running';
        const progressContainer = item.querySelector(`[data-machine-progress-container="${machine.id}"]`) as HTMLElement;
        if (progressContainer) {
          progressContainer.style.display = showProgress ? 'block' : 'none';
        }

        // Update progress bar based on actual machine progress
        const progressFill = item.querySelector(`[data-machine-progress="${machine.id}"]`) as HTMLElement;
        if (progressFill) {
          progressFill.style.width = `${machine.progress * 100}%`;
        }

        // Update upgrade button state and cost
        const upgradeBtn = item.querySelector('[data-upgrade]');
        if (upgradeBtn) {
          const upgradeCostText = machine.upgradeCost.map(cost => {
            const symbol = cost.resourceId === 'marks' ? '€' : '';
            return `${cost.amount}${symbol} ${cost.name}`;
          }).join(', ');
          
          upgradeBtn.classList.toggle('available', machine.canUpgrade);
          upgradeBtn.classList.toggle('disabled', !machine.canUpgrade);
          (upgradeBtn as HTMLButtonElement).disabled = !machine.canUpgrade;
          upgradeBtn.textContent = `Upgrade (${upgradeCostText})`;
        }
      }
    });

    // Update machine build button states
    availableMachinesData.forEach(machine => {
      const btn = container.querySelector(`[data-machine="${machine.id}"]`);
      if (btn) {
        btn.classList.toggle('available', machine.canBuild);
        btn.classList.toggle('disabled', !machine.canBuild);
        (btn as HTMLButtonElement).disabled = !machine.canBuild;
      }
    });
  }
}