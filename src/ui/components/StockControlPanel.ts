import { UIPersonnelData, UIRuleData, StockControlRule } from '../../core/types';
import { GameStateManager } from '../../core/GameState';
import { UIDataProvider } from '../UIDataProvider';

export class StockControlPanel {
  private readonly GROUP_IDS = {
    BUY: 'stockControlBuyRules',
    SELL: 'stockControlSellRules'
  };

  constructor(
    private gameState: GameStateManager,
    private uiDataProvider: UIDataProvider,
    private actions: {
      hirePersonnel: (personnelId: string) => boolean;
      firePersonnel: (personnelId: string) => void;
      toggleRule: (ruleId: string) => void;
      adjustThreshold: (ruleId: string, delta: number) => void;
    }
  ) {}

  render(personnelData: { available: UIPersonnelData[], active: UIPersonnelData[], totalMonthlyCost: number }, rulesData: UIRuleData[], showStockControl: boolean): string {
    if (!showStockControl) {
      return ''; // Don't show until unlocked
    }

    // Get group states from game state
    const state = this.gameState.getState();
    const buyGroupExpanded = state.uiState.panelStates[this.GROUP_IDS.BUY]?.expanded ?? true;
    const sellGroupExpanded = state.uiState.panelStates[this.GROUP_IDS.SELL]?.expanded ?? true;

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

    // Group rules by type
    const buyRules = rulesData.filter(rule => rule.type === 'buy');
    const sellRules = rulesData.filter(rule => rule.type === 'sell');

    // Rules management section with collapsible containers
    const rulesDisplay = `
      <div class="rules-section">
        <h4>Active Rules</h4>
        
        <div class="rule-group">
          <div class="rule-group-header" data-toggle-group="${this.GROUP_IDS.BUY}">
            <h5>Buy Rules (${buyRules.length})</h5>
            <span class="toggle-icon">${buyGroupExpanded ? '▼' : '▶'}</span>
          </div>
          <div class="rule-group-content ${buyGroupExpanded ? '' : 'collapsed'}" id="${this.GROUP_IDS.BUY}">
            <table class="rules-table">
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Target Stock</th>
                </tr>
              </thead>
              <tbody>
                ${buyRules.map(rule => this.renderRule(rule)).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="rule-group">
          <div class="rule-group-header" data-toggle-group="${this.GROUP_IDS.SELL}">
            <h5>Sell Rules (${sellRules.length})</h5>
            <span class="toggle-icon">${sellGroupExpanded ? '▼' : '▶'}</span>
          </div>
          <div class="rule-group-content ${sellGroupExpanded ? '' : 'collapsed'}" id="${this.GROUP_IDS.SELL}">
            <table class="rules-table">
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Target Stock</th>
                </tr>
              </thead>
              <tbody>
                ${sellRules.map(rule => this.renderRule(rule)).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

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
        
        ${rulesDisplay}
        
        ${personnelData.active.length === 0 && personnelData.available.length === 0 ? `
          <p>Complete more market transactions to unlock stock control personnel.</p>
        ` : ''}
      </div>
    `;
  }

  private renderRule(rule: UIRuleData): string {
    return `
      <tr class="rule-row ${rule.isEnabled ? 'enabled' : 'disabled'}">
        <td class="rule-resource">${rule.resourceName}</td>
        <td class="rule-threshold">
          <div class="threshold-control">
            <div class="threshold-buttons">
              <button class="threshold-btn" data-threshold="${rule.id}" data-amount="-10">-10</button>
              <button class="threshold-btn" data-threshold="${rule.id}" data-amount="-1">-</button>
              <span class="threshold-value" data-threshold-value="${rule.id}">${rule.threshold}</span>
              <button class="threshold-btn" data-threshold="${rule.id}" data-amount="1">+</button>
              <button class="threshold-btn" data-threshold="${rule.id}" data-amount="10">+10</button>
            </div>
          </div>
        </td>
      </tr>
    `;
  }

  attachEventListeners(container: HTMLElement): void {
    // Hire buttons
    container.querySelectorAll('[data-hire]').forEach(btn => {
      btn.addEventListener('click', () => {
        const personnelId = (btn as HTMLElement).dataset.hire;
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

    // Threshold adjustment buttons
    container.querySelectorAll('[data-threshold]').forEach(btn => {
      btn.addEventListener('click', () => {
        const ruleId = (btn as HTMLElement).dataset.threshold;
        const amount = parseInt((btn as HTMLElement).dataset.amount || '1');
        if (ruleId) {
          this.actions.adjustThreshold(ruleId, amount);
          
          // Get the updated rule from the game state
          const state = this.gameState.getState();
          const updatedRule = state.stockControl.rules[ruleId];
          
          if (updatedRule) {
            // Update the threshold value display
            const thresholdValueElement = container.querySelector(`[data-threshold-value="${ruleId}"]`);
            if (thresholdValueElement) {
              thresholdValueElement.textContent = updatedRule.threshold.toString();
            }
          }
        }
      });
    });

    // Toggle rule groups
    container.querySelectorAll('[data-toggle-group]').forEach(header => {
      header.addEventListener('click', (e) => {
        const groupId = (e.currentTarget as HTMLElement).getAttribute('data-toggle-group');
        if (groupId) {
          const content = container.querySelector(`#${groupId}`);
          const icon = header.querySelector('.toggle-icon');
          if (content && icon) {
            const isCollapsed = content.classList.contains('collapsed');
            content.classList.toggle('collapsed');
            icon.textContent = isCollapsed ? '▼' : '▶';
            
            // Update game state with the new expanded state
            this.gameState.setPanelState(groupId, {
              expanded: isCollapsed // If it was collapsed, it will now be expanded and vice versa
            });
            // Save game state to persist the panel state
            this.gameState.saveGame();
          }
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

    // Update threshold values
    rulesData.forEach(rule => {
      const thresholdElement = container.querySelector(`[data-threshold-value="${rule.id}"]`);
      if (thresholdElement) {
        thresholdElement.textContent = rule.threshold.toString();
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