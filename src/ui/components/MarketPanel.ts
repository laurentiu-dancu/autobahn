import { GameStateManager } from '../../core/GameState';
import { MarketSystem } from '../../core/MarketSystem';
import { MARKET_ITEMS } from '../../config/marketItems';

export class MarketPanel {
  private gameState: GameStateManager;
  private marketSystem: MarketSystem;

  constructor(gameState: GameStateManager, marketSystem: MarketSystem) {
    this.gameState = gameState;
    this.marketSystem = marketSystem;
  }

  render(): string {
    const state = this.gameState.getState();
    if (!state.uiState.showMarket) {
      return ''; // Don't show market until unlocked
    }

    // Define raw materials that can be bought
    const rawMaterials = ['wireStock', 'sheetMetal', 'leatherScraps', 'oil'];

    // Get discovered resources for display
    const discoveredResources = Object.values(state.resources)
      .filter(resource => state.uiState.discoveredResources.has(resource.id) && resource.id !== 'marks') // Exclude marks from market display
      .map(resource => {
        // Get market price for this resource
        const marketItem = MARKET_ITEMS[resource.id];
        const price = marketItem?.buyPrice || marketItem?.sellPrice || 0;
        const pricePrefix = price > 0 ? `€${price} ` : '';
        
        return `
        <div class="resource-item-with-market">
          <div class="resource-info">
            <span class="resource-name">${pricePrefix}${resource.name}</span>
            <span class="resource-amount" data-resource-amount="${resource.id}">${Math.floor(resource.amount)}</span>
          </div>
          <div class="resource-actions">
            ${rawMaterials.includes(resource.id) ? `
              <button 
                class="inline-market-btn buy-btn ${this.marketSystem.canBuy(resource.id) ? 'available' : 'disabled'}"
                data-buy="${resource.id}"
                ${!this.marketSystem.canBuy(resource.id) ? 'disabled' : ''}
                title="Buy ${resource.name}"
              >
                +
              </button>
            ` : ''}
            ${this.marketSystem.canSell(resource.id) ? `
              <button 
                class="inline-market-btn sell-btn available"
                data-sell="${resource.id}"
                title="Sell ${resource.name}"
              >
                -
              </button>
            ` : ''}
          </div>
        </div>
      `;
      }).join('');

    return `
      <div class="panel market-panel">
        <h3>💰 Resources & Market</h3>
        
        <div class="resources-section">
          <div class="resources-list">
            ${discoveredResources}
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners(container: HTMLElement): void {
    // Market buy
    container.querySelectorAll('[data-buy]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const resourceId = (e.target as HTMLElement).getAttribute('data-buy');
        if (resourceId) {
          this.marketSystem.buy(resourceId);
        }
      });
    });

    // Market sell
    container.querySelectorAll('[data-sell]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const resourceId = (e.target as HTMLElement).getAttribute('data-sell');
        if (resourceId) {
          this.marketSystem.sell(resourceId);
        }
      });
    });
  }

  updateDynamicElements(container: HTMLElement): void {
    const state = this.gameState.getState();
    
    // Update resource amounts
    Object.values(state.resources).forEach(resource => {
      if (state.uiState.discoveredResources.has(resource.id) && resource.id !== 'marks') {
        const amountElement = container.querySelector(`[data-resource-amount="${resource.id}"]`);
        if (amountElement) {
          amountElement.textContent = Math.floor(resource.amount).toString();
        }
      }
    });

    // Update inline market button states
    const buyButtons = container.querySelectorAll('[data-buy]');
    buyButtons.forEach(btn => {
      const resourceId = btn.getAttribute('data-buy');
      if (resourceId) {
        const canBuy = this.marketSystem.canBuy(resourceId);
        btn.classList.toggle('available', canBuy);
        btn.classList.toggle('disabled', !canBuy);
        (btn as HTMLButtonElement).disabled = !canBuy;
      }
    });

    const sellButtons = container.querySelectorAll('[data-sell]');
    sellButtons.forEach(btn => {
      const resourceId = btn.getAttribute('data-sell');
      if (resourceId) {
        const canSell = this.marketSystem.canSell(resourceId);
        btn.classList.toggle('available', canSell);
        btn.classList.toggle('disabled', !canSell);
        (btn as HTMLButtonElement).disabled = !canSell;
      }
    });
  }
}