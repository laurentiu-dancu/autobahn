import { GameStateManager } from './GameState';
import { MARKET_ITEMS } from '../config/gameConfig';

export class MarketSystem {
  private gameState: GameStateManager;

  constructor(gameState: GameStateManager) {
    this.gameState = gameState;
  }

  canBuy(resourceId: string, quantity: number = 1): boolean {
    const item = MARKET_ITEMS[resourceId];
    if (!item || !item.available || !item.buyPrice) return false;

    const totalCost = item.buyPrice * quantity;
    return this.gameState.getState().resources.marks.amount >= totalCost;
  }

  buy(resourceId: string, quantity: number = 1): boolean {
    if (!this.canBuy(resourceId, quantity)) return false;

    const item = MARKET_ITEMS[resourceId];
    const totalCost = item.buyPrice! * quantity;

    this.gameState.updateResource('marks', -totalCost);
    this.gameState.updateResource(resourceId, quantity);
    return true;
  }

  canSell(resourceId: string, quantity: number = 1): boolean {
    const item = MARKET_ITEMS[resourceId];
    if (!item || !item.available || !item.sellPrice) return false;

    return this.gameState.getState().resources[resourceId]?.amount >= quantity;
  }

  sell(resourceId: string, quantity: number = 1): boolean {
    if (!this.canSell(resourceId, quantity)) return false;

    const item = MARKET_ITEMS[resourceId];
    const totalValue = item.sellPrice! * quantity;

    this.gameState.updateResource(resourceId, -quantity);
    this.gameState.updateResource('marks', totalValue);
    this.gameState.recordSale();
    return true;
  }

  getBuyableItems(): Array<{resourceId: string, price: number, name: string}> {
    const state = this.gameState.getState();
    if (!state.uiState.showMarket) return [];
    
    return Object.entries(MARKET_ITEMS)
      .filter(([_, item]) => item.available && item.buyPrice)
      .map(([resourceId, item]) => ({
        resourceId,
        price: item.buyPrice!,
        name: state.resources[resourceId]?.name || resourceId
      }));
  }

  getSellableItems(): Array<{resourceId: string, price: number, name: string, available: number}> {
    const state = this.gameState.getState();
    if (!state.uiState.showMarket) return [];
    
    return Object.entries(MARKET_ITEMS)
      .filter(([resourceId, item]) => {
        return item.available && item.sellPrice && state.resources[resourceId]?.amount > 0;
      })
      .map(([resourceId, item]) => ({
        resourceId,
        price: item.sellPrice!,
        name: state.resources[resourceId]?.name || resourceId,
        available: state.resources[resourceId]?.amount || 0
      }));
  }
}