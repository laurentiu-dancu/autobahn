import { UIResourceData } from '../../core/types';

export class MarketPanel {
  constructor(
    private actions: {
      buyResource: (resourceId: string) => boolean;
      sellResource: (resourceId: string) => boolean;
    }
  ) {}

  render(resourcesData: UIResourceData[], showMarket: boolean): string {
    if (!showMarket) {
      return ''; // Don't show market until unlocked
    }

    const resourceItems = resourcesData.map(resource => {
      const pricePrefix = resource.buyPrice || resource.sellPrice ? `€${resource.buyPrice || resource.sellPrice} ` : '';
      
      return `
        <div class="resource-item-with-market">
          <div class="resource-info">
            <span class="resource-name">${pricePrefix}${resource.name}</span>
            <span class="resource-amount" data-resource-amount="${resource.id}">${resource.displayAmount}</span>
          </div>
          <div class="resource-actions">
            ${resource.buyPrice ? `
              <button 
                class="inline-market-btn buy-btn ${resource.canBuy ? 'available' : 'disabled'}"
                data-buy="${resource.id}"
                ${!resource.canBuy ? 'disabled' : ''}
                title="Buy ${resource.name}"
              >
                +
              </button>
            ` : ''}
            ${resource.canSell ? `
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
            ${resourceItems}
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
          this.actions.buyResource(resourceId);
        }
      });
    });

    // Market sell
    container.querySelectorAll('[data-sell]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const resourceId = (e.target as HTMLElement).getAttribute('data-sell');
        if (resourceId) {
          this.actions.sellResource(resourceId);
        }
      });
    });
  }

  updateDynamicElements(container: HTMLElement, resourcesData: UIResourceData[]): void {
    // Update resource amounts
    resourcesData.forEach(resource => {
      const amountElement = container.querySelector(`[data-resource-amount="${resource.id}"]`);
      if (amountElement) {
        amountElement.textContent = resource.displayAmount;
      }
    });

    // Update inline market button states
    const buyButtons = container.querySelectorAll('[data-buy]');
    buyButtons.forEach(btn => {
      const resourceId = btn.getAttribute('data-buy');
      if (resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
          btn.classList.toggle('available', resource.canBuy);
          btn.classList.toggle('disabled', !resource.canBuy);
          (btn as HTMLButtonElement).disabled = !resource.canBuy;
        }
      }
    });

    const sellButtons = container.querySelectorAll('[data-sell]');
    sellButtons.forEach(btn => {
      const resourceId = btn.getAttribute('data-sell');
      if (resourceId) {
        const resource = resourcesData.find(r => r.id === resourceId);
        if (resource) {
          btn.classList.toggle('available', resource.canSell);
          btn.classList.toggle('disabled', !resource.canSell);
          (btn as HTMLButtonElement).disabled = !resource.canSell;
        }
      }
    });
  }
}