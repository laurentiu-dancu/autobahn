import { UIPersonnelData, UIRuleData } from '../../core/types';

export class StockControlPanel {
  constructor(
    private actions: {
      hirePersonnel: (personnelId: string) => boolean;
      firePersonnel: (personnelId: string) => void;
      toggleRule: (ruleId: string) => void;
      deleteRule: (ruleId: string) => void;
    }
  ) {}

  render(personnelData: { available: UIPersonnelData[], active: UIPersonnelData[], totalMonthlyCost: number }, rulesData: UIRuleData[], showStockControl: boolean): string {
    if (!showStockControl) {
      return ''; // Don't show until unlocked
    }

    // Personnel hiring section
    const personnelHiring = personnelData.available.map(personnel => {
      return `
        <div class="personnel-hire">
          <button 
            class="hire-btn ${personnel.canHire ? 'available' : 'disabled'}"
            data-hire="${personnel.id}"
            ${!personnel.canHire ? 'disabled' : ''}
          >
            <div class="personnel-name">Hire ${personnel.name}</div>
            <div class="personnel-cost">Cost: €${personnel.hiringCost} + €${personnel.monthlySalary}/10s</div>
            <div class="personnel-desc">${personnel.description}</div>
            <div class="personnel-total">Total: €${personnel.totalCost} (includes first payment)</div>
          </button>
        </div>
      `;
    }).join('');

    // Active personnel section
    const activePersonnelDisplay = personnelData.active.map(personnel => {
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
            <div>Managing: ${personnel.managedRulesCount} rules</div>
            <div>Type: ${personnel.type}</div>
          </div>
        </div>
      `;
    }).join('');

    // Rules management section
    const rulesDisplay = rulesData.map(rule => {
      return `
        <div class="rule-item ${rule.isEnabled ? 'enabled' : 'disabled'}">
          <div class="rule-header">
            <span>${rule.type.toUpperCase()} ${rule.resourceName}</span>
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
            <div>Manager: ${rule.managerName}</div>
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

    return `
      <div class="panel stock-control-panel">
        <h3>📊 Stock Control</h3>
        
        ${personnelData.totalMonthlyCost > 0 ? `
          <div class="cost-summary">
            <strong>Operating Cost: €${personnelData.totalMonthlyCost.toFixed(1)}/10s</strong>
            <div class="cost-warning" data-cost-warning>
              ✅ Sufficient funds
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
        
        ${rulesDisplay ? `
          <div class="rules-section">
            <h4>Active Rules</h4>
            ${rulesDisplay}
          </div>
        ` : ''}
        
        ${personnelData.active.length === 0 && personnelData.available.length === 0 ? `
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
          this.actions.hirePersonnel(personnelId);
        }
      });
    });

    // Fire personnel
    container.querySelectorAll('[data-fire]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const personnelId = (e.target as HTMLElement).getAttribute('data-fire');
        if (personnelId && confirm('Are you sure you want to fire this personnel?')) {
          this.actions.firePersonnel(personnelId);
        }
      });
    });

    // Toggle rules
    container.querySelectorAll('[data-toggle-rule]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ruleId = (e.target as HTMLElement).getAttribute('data-toggle-rule');
        if (ruleId) {
          this.actions.toggleRule(ruleId);
        }
      });
    });

    // Delete rules
    container.querySelectorAll('[data-delete-rule]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ruleId = (e.target as HTMLElement).getAttribute('data-delete-rule');
        if (ruleId && confirm('Are you sure you want to delete this rule?')) {
          this.actions.deleteRule(ruleId);
        }
      });
    });
  }

  updateDynamicElements(container: HTMLElement, personnelData: { available: UIPersonnelData[], active: UIPersonnelData[], totalMonthlyCost: number }, rulesData: UIRuleData[]): void {
    // Update hire button states
    personnelData.available.forEach(personnel => {
      const btn = container.querySelector(`[data-hire="${personnel.id}"]`);
      if (btn) {
        btn.classList.toggle('available', personnel.canHire);
        btn.classList.toggle('disabled', !personnel.canHire);
        (btn as HTMLButtonElement).disabled = !personnel.canHire;
      }
    });

    // Update cost warning (this would need access to current marks amount)
    // For now, we'll leave this as a placeholder since we'd need to pass more data
    const costWarning = container.querySelector('[data-cost-warning]');
    if (costWarning) {
      // This would be updated based on current funds vs cost
      // Implementation would depend on having access to current marks amount
    }
  }
}