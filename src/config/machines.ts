import { Machine } from '../core/types';

export const MACHINES: Record<string, Machine> = {
  wireBendingJig: {
    id: 'wireBendingJig',
    name: 'Wire Bending Jig',
    recipeId: 'bendWireSpring',
    level: 1,
    cost: [
      { resourceId: 'metalBrackets', amount: 2 },
      { resourceId: 'marks', amount: 15 }
    ],
    upgradeCost: [
      { resourceId: 'metalBrackets', amount: 3 },
      { resourceId: 'marks', amount: 25 }
    ],
    productionRate: 2.0, // 200% of manual time (2x slower than manual)
    isActive: false,
    lastProduction: 0,
    description: 'Automates wire spring production'
  },
  filingStation: {
    id: 'filingStation',
    name: 'Filing Station',
    recipeId: 'fileMetalBracket',
    level: 1,
    cost: [
      { resourceId: 'wireSprings', amount: 5 },
      { resourceId: 'marks', amount: 20 }
    ],
    upgradeCost: [
      { resourceId: 'wireSprings', amount: 8 },
      { resourceId: 'marks', amount: 35 }
    ],
    productionRate: 2.0, // 200% of manual time (2x slower than manual)
    isActive: false,
    lastProduction: 0,
    description: 'Automates bracket filing and shaping'
  }
};