import { RECIPES } from '../../config/recipes';
import { INITIAL_RESOURCES } from '../../config/resources';
import { MARKET_ITEMS } from '../../config/marketItems';
import { Recipe } from '../../core/types';

export class ComponentPopover {
  private static instance: ComponentPopover;
  private container: HTMLElement | null = null;
  private currentPopover: HTMLElement | null = null;
  private hoverTimeout: number | null = null;

  private constructor() {
    // Create container for popovers
    this.container = document.createElement('div');
    this.container.className = 'component-popover-container';
    document.body.appendChild(this.container);
  }

  public static getInstance(): ComponentPopover {
    if (!ComponentPopover.instance) {
      ComponentPopover.instance = new ComponentPopover();
    }
    return ComponentPopover.instance;
  }

  public showPopover(resourceId: string, targetElement: HTMLElement): void {
    // Clear any existing hover timeout
    if (this.hoverTimeout) {
      window.clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }

    // Remove any existing popover
    this.hidePopover();

    // Create new popover
    const popover = document.createElement('div');
    popover.className = 'component-popover';
    
    // Get resource info
    const resource = INITIAL_RESOURCES[resourceId];
    const marketItem = MARKET_ITEMS[resourceId];
    
    // Get recipe that produces this resource
    const recipe = Object.values(RECIPES).find(r => 
      r.outputs.some(output => output.resourceId === resourceId)
    );

    // Build popover content
    let content = `
      <div class="popover-header">
        <h4>${resource.name}</h4>
        ${marketItem ? `<div class="popover-price">€${marketItem.buyPrice}</div>` : ''}
      </div>
      <div class="popover-description">${resource.description}</div>
    `;

    // If this is a part (not a material), show its components
    if (recipe && resource.type === 'part') {
      content += `
        <div class="popover-components">
          <div class="components-header">Components:</div>
          ${this.renderComponents(recipe)}
        </div>
      `;
    }

    popover.innerHTML = content;

    // Add to container first to get dimensions
    this.container?.appendChild(popover);
    this.currentPopover = popover;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get target element position
    const rect = targetElement.getBoundingClientRect();
    
    // Calculate initial position (right of target)
    let posX = rect.right + 10;
    let posY = rect.top;

    // Get popover dimensions
    const popoverRect = popover.getBoundingClientRect();

    // Adjust position if popover would go outside viewport
    if (posX + popoverRect.width > viewportWidth) {
      // Try to position on the left side
      posX = rect.left - popoverRect.width - 10;
      
      // If still outside viewport, align with left edge
      if (posX < 10) {
        posX = 10;
      }
    }

    // Adjust vertical position if needed
    if (posY + popoverRect.height > viewportHeight) {
      posY = Math.max(10, viewportHeight - popoverRect.height - 10);
    }

    // Apply position
    popover.style.left = `${posX}px`;
    popover.style.top = `${posY}px`;

    // Add hover listeners to component items
    popover.querySelectorAll('.component-item').forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const resourceId = (e.currentTarget as HTMLElement).dataset.resourceId;
        if (resourceId) {
          this.showPopover(resourceId, e.currentTarget as HTMLElement);
        }
      });
    });
  }

  private renderComponents(recipe: Recipe): string {
    return recipe.inputs.map(input => {
      const resource = INITIAL_RESOURCES[input.resourceId];
      const marketItem = MARKET_ITEMS[input.resourceId];
      const subRecipe = Object.values(RECIPES).find(r => 
        r.outputs.some(output => output.resourceId === input.resourceId)
      );

      return `
        <div class="component-item" data-resource-id="${input.resourceId}">
          <div class="component-header">
            <span class="component-name">${input.amount}x ${resource.name}</span>
            ${marketItem ? `<span class="component-price">€${marketItem.buyPrice}</span>` : ''}
          </div>
          ${subRecipe && resource.type === 'part' ? `
            <div class="sub-components">
              ${this.renderComponents(subRecipe)}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  public hidePopover(): void {
    if (this.currentPopover) {
      this.currentPopover.remove();
      this.currentPopover = null;
    }
  }

  public scheduleHide(): void {
    if (this.hoverTimeout) {
      window.clearTimeout(this.hoverTimeout);
    }
    this.hoverTimeout = window.setTimeout(() => {
      this.hidePopover();
    }, 300);
  }
} 