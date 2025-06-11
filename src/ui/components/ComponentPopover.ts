import { RECIPES } from '../../config/recipes';
import { INITIAL_RESOURCES } from '../../config/resources';
import { MARKET_ITEMS } from '../../config/marketItems';
import { Recipe } from '../../core/types';
import { MACHINES } from '../../config/machines';

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

  public showPopover(resourceId: string | null, targetElement: HTMLElement, machineId?: string): void {
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
    
    let content = '';
    
    if (machineId) {
      // Handle machine automation popover
      content = this.renderMachinePopover(machineId);
    } else if (resourceId) {
      // Handle resource popover
      content = this.renderResourcePopover(resourceId);
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

    // Adjust position if popover would go off screen
    if (posX + popoverRect.width > viewportWidth) {
      posX = rect.left - popoverRect.width - 10;
    }
    if (posY + popoverRect.height > viewportHeight) {
      posY = viewportHeight - popoverRect.height - 10;
    }

    // Set final position
    popover.style.left = `${posX}px`;
    popover.style.top = `${posY}px`;
  }

  private renderMachinePopover(machineId: string): string {
    const machine = MACHINES[machineId];
    if (!machine) return '';

    const recipe = RECIPES[machine.recipeId];
    if (!recipe) return '';

    // Get the output resource info
    const outputResource = INITIAL_RESOURCES[recipe.outputs[0].resourceId];
    const outputMarketItem = MARKET_ITEMS[recipe.outputs[0].resourceId];

    return `
      <div class="popover-header">
        <h4>${machine.name}</h4>
      </div>
      <div class="popover-description">${machine.description}</div>
      <div class="popover-components">
        <div class="components-header">Produces:</div>
        <div class="component-item">
          <div class="component-header">
            <span class="component-name">${recipe.outputs[0].amount}x ${outputResource.name}</span>
            ${outputMarketItem ? `<span class="component-price">€${outputMarketItem.buyPrice}</span>` : ''}
          </div>
          <div class="sub-components">
            <div class="components-header">Requires:</div>
            ${this.renderComponents(recipe)}
          </div>
        </div>
      </div>
    `;
  }

  private renderResourcePopover(resourceId: string): string {
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

    return content;
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

  public setHoverTimeout(callback: () => void, delay: number): void {
    this.hoverTimeout = window.setTimeout(callback, delay);
  }
} 