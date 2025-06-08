import { GameStateManager } from '../../core/GameState';
import { StockControlSystem } from '../../core/StockControlSystem';

export class StockControlPanel {
  private gameState: GameStateManager;
  private stockControlSystem: StockControlSystem;

  constructor(gameState: GameStateManager, stockControlSystem: StockControlSystem) {
    this.gameState = gameState;
    this.stockControlSystem = stockControlSystem;
  }

  render(): string {
    const state = this.gameState.getState();
    if (!state.uiState.showStockControl) {
      return ''; // Don't show until unlocked
    }

    const availablePersonnel = this.stockControlSystem.getAvailablePersonnel();
    const activePersonnel = this.stockControlSystem.getActivePersonnel();
    const activeRules = this.stockControlSystem.getActiveRules();
    const totalMonthlyCost = this.stockControlSystem.getTotalMonthlyCost();

    // Personnel hiring section
    const personnelHiring = availablePersonnel
      .filter(personnelId => !state.stockControl.personnel[personnelId])
      .map(personnelId => {
        const template = this.stockControlSystem.getPersonnelTemplate(personnelId);
        if (!template) return '';
        
        const canHire = this.stockControlSystem.canHirePersonnel(personnelId);
        const totalCost = template.hiringCost + template.monthlySalary;
        
        return `
          <div class="personnel-hire">
            <button 
              class="hire-btn ${canHire ? 'available' : 'disabled'}"
              data-hire="${personnelId}"
              ${!canHire ? 'disabled' : ''}
            >
              <div class="personnel-name">Hire ${template.name}</div>
              <div class="personnel-cost">Cost: €${template.hiringCost} + €${template.monthlySalary}/10s</div>
              <div class="personnel-desc">${template.description}</div>
              <div class="personnel-total">Total: €${totalCost} (includes first payment)</div>
            </button>
          </div>
        `;
      }).join('');

    // Active personnel section
    const activePersonnelDisplay = activePersonnel.map(personnel => {
      const rulesCount = activeRules.filter(r => r.managedBy === personnel.id).length;
      
      return `
        <div class="personnel-item active">
          <div class="personnel-header">
            <h4>${personnel.name}</h4>
            <button 
              class="fire-btn" 
              data-fire="${personnel.id}"
            >
              🔥 Fire
            </button>
          </div>
          <div class="personnel-info">
            <div>Salary: €${personnel.monthlySalary}/10s</div>
            <div>Managing: ${rulesCount} rules</div>
            <div>Type: ${personnel.type}</div>
          </div>
        </div>
      `;
    }).join('');

    // Rules management section
    const rulesDisplay = activeRules.map(rule => {
      const resource = state.resources[rule.resourceId];
      const personnel = state.stockControl.personnel[rule.managedBy];
      
      return `
        <div class="rule-item ${rule.isEnabled ? 'enabled' : 'disabled'}">
          <div class="rule-header">
            <span>${rule.type.toUpperCase()} ${resource?.name || rule.resourceId}</span>
            <button 
              class="toggle-rule-btn" 
              data-toggle-rule="${rule.id}"
            >
              ${rule.isEnabled ? '⏸️' : '▶️'}
            </button>
          </div>
          <div class="rule-info">
            <div>Threshold: ${rule.threshold}</div>
            <div>Quantity: ${rule.quantity}</div>
            <div>Manager: ${personnel?.name || 'Unknown'}</div>
          </div>
          <button 
            class="delete-rule-btn" 
            data-delete-rule="${rule.id}"
          >
            🗑️ Delete
          </button>
        </div>
      `;
    }).join('');

    // Quick rule creation for common resources
    const quickRules = activePersonnel.length > 0 ? `
      <div class="quick-rules">
        <h4>Quick Rules</h4>
        <div class="quick-rule-buttons">
          <button class="quick-rule-btn" data-quick-rule="buy-materials">
            Auto-buy Materials (when < 5)
          </button>
          <button class="quick-rule-btn" data-quick-rule="sell-products">
            Auto-sell Products (when > 10)
          </button>
        </div>
      </div>
    ` : '';

    return `
      <div class="panel stock-control-panel">
        <h3>📊 Stock Control</h3>
        
        ${totalMonthlyCost > 0 ? `
          <div class="cost-summary">
            <strong>Operating Cost: €${totalMonthlyCost.toFixed(1)}/10s</strong>
            <div class="cost-warning ${state.resources.marks.amount < totalMonthlyCost * 3 ? 'low-funds' : ''}">
              ${state.resources.marks.amount < totalMonthlyCost * 3 ? '⚠️ Low funds! Personnel will quit if unpaid.' : '✅ Sufficient funds'}
            </div>
          </div>
        ` : ''}
        
        ${personnelHiring ? `
          <div class="personnel-section">
            <h4>Available Personnel</h4>
            ${personnelHiring}
          </div>
        ` : ''}
        
        ${activePersonnelDisplay ? `
          <div class="personnel-section">
            <h4>Active Personnel</h4>
            ${activePersonnelDisplay}
          </div>
        ` : ''}
        
        ${quickRules}
        
        ${rulesDisplay ? `
          <div class="rules-section">
            <h4>Active Rules</h4>
            ${rulesDisplay}
          </div>
        ` : ''}
        
        ${activePersonnel.length === 0 && availablePersonnel.length === 0 ? `
          <p>Complete more market transactions to unlock stock control personnel.</p>
        ` : ''}
      </div>
    `;
  }

  attachEventListeners(container: HTMLElement): void {
    // Hire personnel
    container.querySelectorAll('[data-hire]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const personnelId = (e.target as HTMLElement).closest('[data-hire]')?.getAttribute('data-hire');
        if (personnelId) {
          this.stockControlSystem.hirePersonnel(personnelId);
        }
      });
    });

    // Fire personnel
    container.querySelectorAll('[data-fire]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const personnelId = (e.target as HTMLElement).getAttribute('data-fire');
        if (personnelId && confirm('Are you sure you want to fire this personnel?')) {
          this.stockControlSystem.firePersonnel(personnelId);
        }
      });
    });

    // Toggle rules
    container.querySelectorAll('[data-toggle-rule]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ruleId = (e.target as HTMLElement).getAttribute('data-toggle-rule');
        if (ruleId) {
          const state = this.gameState.getState();
          const rule = state.stockControl.rules[ruleId];
          if (rule) {
            this.stockControlSystem.updateRule(ruleId, { isEnabled: !rule.isEnabled });
          }
        }
      });
    });

    // Delete rules
    container.querySelectorAll('[data-delete-rule]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ruleId = (e.target as HTMLElement).getAttribute('data-delete-rule');
        if (ruleId && confirm('Are you sure you want to delete this rule?')) {
          this.stockControlSystem.deleteRule(ruleId);
        }
      });
    });

    // Quick rules
    container.querySelectorAll('[data-quick-rule]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ruleType = (e.target as HTMLElement).getAttribute('data-quick-rule');
        this.createQuickRules(ruleType);
      });
    });
  }

  private createQuickRules(ruleType: string | null): void {
    const activePersonnel = this.stockControlSystem.getActivePersonnel();
    if (activePersonnel.length === 0) return;

    if (ruleType === 'buy-materials') {
      const procurementSpecialist = activePersonnel.find(p => p.type === 'procurement');
      if (procurementSpecialist) {
        const materials = ['wireStock', 'sheetMetal', 'leatherScraps', 'oil'];
        materials.forEach(resourceId => {
          this.stockControlSystem.createRule(resourceId, 'buy', 5, 5, procurementSpecialist.id);
        });
      }
    } else if (ruleType === 'sell-products') {
      const salesManager = activePersonnel.find(p => p.type === 'sales');
      if (salesManager) {
        const products = ['wireSprings', 'metalBrackets', 'leatherGaskets', 'springAssemblies', 'repairKits'];
        products.forEach(resourceId => {
          this.stockControlSystem.createRule(resourceId, 'sell', 10, 5, salesManager.id);
        });
      }
    }
  }

  updateDynamicElements(container: HTMLElement): void {
    const state = this.gameState.getState();
    
    // Update hire button states
    const hireButtons = container.querySelectorAll('[data-hire]');
    hireButtons.forEach(btn => {
      const personnelId = btn.getAttribute('data-hire');
      if (personnelId) {
        const canHire = this.stockControlSystem.canHirePersonnel(personnelId);
        btn.classList.toggle('available', canHire);
        btn.classList.toggle('disabled', !canHire);
        (btn as HTMLButtonElement).disabled = !canHire;
      }
    });

    // Update cost warning
    const totalMonthlyCost = this.stockControlSystem.getTotalMonthlyCost();
    const costWarning = container.querySelector('.cost-warning');
    if (costWarning) {
      const isLowFunds = state.resources.marks.amount < totalMonthlyCost * 3;
      costWarning.classList.toggle('low-funds', isLowFunds);
      costWarning.textContent = isLowFunds ? 
        '⚠️ Low funds! Personnel will quit if unpaid.' : 
        '✅ Sufficient funds';
    }
  }
}