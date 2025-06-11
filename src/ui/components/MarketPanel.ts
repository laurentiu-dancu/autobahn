import { UIResourceData } from '../../core/types';
import { isMaterial } from '../../core/utils';
import { ComponentPopover } from './ComponentPopover';

export class MarketPanel {
  private actions: {
    buyResource: (resourceId: string) => void;
    sellResource: (resourceId: string) => void;
  };

  constructor(actions: { buyResource: (resourceId: string) => void; sellResource: (resourceId: string) => void }) {
    this.actions = actions;
  }

  render(resourcesData: UIResourceData[], showMarket: boolean): string {
    if (!showMarket) {
      return ''; // Don't show market until unlocked
    }

    // Split resources into materials and parts
    const materials = resourcesData.filter(resource => isMaterial(resource.id));
    const parts = resourcesData.filter(resource => !isMaterial(resource.id));

    const resourceItems = [
      ...materials.map(resource => this.renderResourceItem(resource)),
      '<div class="market-gap"></div>',
      ...parts.map(resource => this.renderResourceItem(resource))
    ].join('');

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

  private renderResourceItem(resource: UIResourceData): string {
    const pricePrefix = resource.buyPrice || resource.sellPrice ? `€${resource.buyPrice || resource.sellPrice} ` : '';
    
    return `
      <div class="resource-item-with-market">
        <div class="resource-info" data-resource-id="${resource.id}">
          <span class="resource-name">${pricePrefix}${resource.name}</span>
          <span class="resource-amount" data-resource-amount="${resource.id}">${resource.displayAmount}</span>
        </div>
        <div class="resource-actions">
          ${isMaterial(resource.id) ? `
            <button 
              class="inline-market-btn buy-btn ${resource.canBuy ? 'available' : 'disabled'}"
              data-buy="${resource.id}"
              ${!resource.canBuy ? 'disabled' : ''}
              title="Buy ${resource.name}"
            >
              +
            </button>
          ` : ''}
          <button 
            class="inline-market-btn sell-btn ${resource.canSell ? 'available' : 'disabled'}"
            data-sell="${resource.id}"
            ${!resource.canSell ? 'disabled' : ''}
            title="Sell ${resource.name}"
          >
            -
          </button>
        </div>
      </div>
    `;
  }

  attachEventListeners(container: HTMLElement): void {
    // Buy buttons
    container.querySelectorAll('[data-buy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const resourceId = (btn as HTMLElement).dataset.buy;
        if (resourceId) {
          this.actions.buyResource(resourceId);
        }
      });
    });

    // Sell buttons
    container.querySelectorAll('[data-sell]').forEach(btn => {
      btn.addEventListener('click', () => {
        const resourceId = (btn as HTMLElement).dataset.sell;
        if (resourceId) {
          this.actions.sellResource(resourceId);
        }
      });
    });

    // Resource info hover
    container.querySelectorAll('.resource-info').forEach(info => {
      const resourceId = (info as HTMLElement).dataset.resourceId;
      if (!resourceId) return;

      info.addEventListener('mouseenter', () => {
        ComponentPopover.getInstance().showPopover(resourceId, info as HTMLElement);
      });

      info.addEventListener('mouseleave', () => {
        ComponentPopover.getInstance().scheduleHide();
      });
    });
  }

  updateDynamicElements(container: HTMLElement, resourcesData: UIResourceData[]): void {
    resourcesData.forEach(resource => {
      const item = container.querySelector(`[data-resource-id="${resource.id}"]`);
      if (item) {
        const amountElement = item.querySelector('.resource-amount');
        if (amountElement) {
          amountElement.textContent = resource.displayAmount;
        }
      }

      const buyBtn = container.querySelector(`[data-buy="${resource.id}"]`);
      if (buyBtn) {
        buyBtn.classList.toggle('available', resource.canBuy);
        buyBtn.classList.toggle('disabled', !resource.canBuy);
        (buyBtn as HTMLButtonElement).disabled = !resource.canBuy;
      }

      const sellBtn = container.querySelector(`[data-sell="${resource.id}"]`);
      if (sellBtn) {
        sellBtn.classList.toggle('available', resource.canSell);
        sellBtn.classList.toggle('disabled', !resource.canSell);
        (sellBtn as HTMLButtonElement).disabled = !resource.canSell;
      }
    });
  }
}