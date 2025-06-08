import { MarketItem } from '../core/types';

export const MARKET_ITEMS: Record<string, MarketItem> = {
  wireStock: {
    resourceId: 'wireStock',
    buyPrice: 2,
    sellPrice: 2,
    available: true
  },
  sheetMetal: {
    resourceId: 'sheetMetal',
    buyPrice: 3,
    sellPrice: 3,
    available: true
  },
  leatherScraps: {
    resourceId: 'leatherScraps',
    buyPrice: 1,
    sellPrice: 1,
    available: true
  },
  oil: {
    resourceId: 'oil',
    buyPrice: 4,
    sellPrice: 4,
    available: true
  },
  wireSprings: {
    resourceId: 'wireSprings',
    buyPrice: 3,
    sellPrice: 3,
    available: true
  },
  metalBrackets: {
    resourceId: 'metalBrackets',
    buyPrice: 5,
    sellPrice: 5,
    available: true
  },
  leatherGaskets: {
    resourceId: 'leatherGaskets',
    buyPrice: 2,
    sellPrice: 2,
    available: true
  },
  springAssemblies: {
    resourceId: 'springAssemblies',
    buyPrice: 12,
    sellPrice: 12,
    available: true
  },
  repairKits: {
    resourceId: 'repairKits',
    buyPrice: 25,
    sellPrice: 25,
    available: true
  }
};