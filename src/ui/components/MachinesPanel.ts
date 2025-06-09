import { UIMachineData } from '../../core/types';

export class MachinesPanel {
  constructor(
    private actions: {
      buildMachine: (machineId: string) => boolean;
      toggleMachine: (machineId: string) => void;
      upgradeMachine: (machineId: string) => boolean;
    }
  ) {}

  render(machinesData: UIMachineData[], availableMachinesData: any[]): string {
    if (availableMachinesData.length === 0 && machinesData.length === 0) {
      return ''; // Don't show machines panel if no machines available
    }
    
    const machineBuilds = availableMachinesData.map(machine => {
      const costText = machine.cost.map((cost: any) => {
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
            <div class="machine-name">Build ${machine.name}</div>
            <div class="machine-cost">Cost: ${costText}</div>
            <div class="machine-desc">${machine.description}</div>
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
      
      return `
        <div class="machine-item ${machine.isActive ? 'active' : 'inactive'} machine-${machine.status}" data-machine-id="${machine.id}">
          <div class="machine-header">
            <h4>${machine.name} (Level ${machine.level})</h4>
            <button 
              class="toggle-btn" 
              data-toggle="${machine.id}"
            >
              ${machine.isActive ? '⏸️ Pause' : '▶️ Start'}
            </button>
          </div>
          <div class="machine-info">
            <div>Speed: ${machine.currentSpeed}s (Manual: ${machine.manualSpeed}s) - ${machine.efficiency}% efficiency</div>
            <div class="machine-status">
              <span class="status-indicator">${statusIcon} ${statusText}</span>
              ${machine.statusMessage ? `<div class="status-message">${machine.statusMessage}</div>` : ''}
            </div>
          </div>
          <div class="progress-bar" data-machine-progress-container="${machine.id}" style="display: ${showProgress ? 'block' : 'none'};">
            <div class="progress-fill" data-machine-progress="${machine.id}" style="width: ${machine.progress * 100}%"></div>
          </div>
          <button 
            class="upgrade-btn ${machine.canUpgrade ? 'available' : 'disabled'}"
            data-upgrade="${machine.id}"
            ${!machine.canUpgrade ? 'disabled' : ''}
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
          const success = this.actions.buildMachine(machineId);
          if (success) {
            // Immediately disable the button to prevent visual flash
            const button = e.target as HTMLButtonElement;
            button.disabled = true;
            button.classList.remove('available');
            button.classList.add('disabled');
          }
        }
      });
    });

    // Machine toggle
    container.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).getAttribute('data-toggle');
        if (machineId) {
          this.actions.toggleMachine(machineId);
        }
      });
    });

    // Machine upgrade
    container.querySelectorAll('[data-upgrade]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const machineId = (e.target as HTMLElement).getAttribute('data-upgrade');
        if (machineId) {
          this.actions.upgradeMachine(machineId);
        }
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

    // Update machine upgrade button states
    machinesData.forEach(machine => {
      const btn = container.querySelector(`[data-upgrade="${machine.id}"]`);
      if (btn) {
        btn.classList.toggle('available', machine.canUpgrade);
        btn.classList.toggle('disabled', !machine.canUpgrade);
        (btn as HTMLButtonElement).disabled = !machine.canUpgrade;
      }
    });
  }
}