import { Resource, Recipe, Machine, MarketItem, Milestone } from '../core/types';

export const INITIAL_RESOURCES: Record<string, Resource> = {
  ironOre: {
    id: 'ironOre',
    name: 'Iron Ore',
    amount: 0,
    description: 'Raw iron ore for metal production'
  },
  coal: {
    id: 'coal',
    name: 'Coal',
    amount: 0,
    description: 'Fuel for forges and machines'
  },
  woodLogs: {
    id: 'woodLogs',
    name: 'Wood Logs',
    amount: 0,
    description: 'Raw wood for construction'
  },
  metalPlates: {
    id: 'metalPlates',
    name: 'Metal Plates',
    amount: 0,
    description: 'Forged metal plates for construction'
  },
  woodPlanks: {
    id: 'woodPlanks',
    name: 'Wood Planks',
    amount: 0,
    description: 'Cut wooden planks'
  },
  gears: {
    id: 'gears',
    name: 'Gears',
    amount: 0,
    description: 'Mechanical gears for machinery'
  },
  marks: {
    id: 'marks',
    name: 'Marks',
    amount: 10,
    description: 'Currency for trading'
  }
};

export const RECIPES: Record<string, Recipe> = {
  forgeMetalPlate: {
    id: 'forgeMetalPlate',
    name: 'Forge Metal Plate',
    inputs: [
      { resourceId: 'ironOre', amount: 1 },
      { resourceId: 'coal', amount: 1 }
    ],
    outputs: [{ resourceId: 'metalPlates', amount: 1 }],
    craftTime: 2000,
    description: 'Forge iron ore and coal into metal plates'
  },
  cutWoodPlank: {
    id: 'cutWoodPlank',
    name: 'Cut Wood Plank',
    inputs: [{ resourceId: 'woodLogs', amount: 1 }],
    outputs: [{ resourceId: 'woodPlanks', amount: 1 }],
    craftTime: 1500,
    description: 'Cut wood logs into planks'
  },
  assembleGear: {
    id: 'assembleGear',
    name: 'Assemble Gear',
    inputs: [{ resourceId: 'metalPlates', amount: 2 }],
    outputs: [{ resourceId: 'gears', amount: 1 }],
    craftTime: 3000,
    description: 'Assemble metal plates into gears'
  }
};

export const MACHINES: Record<string, Machine> = {
  manualPress: {
    id: 'manualPress',
    name: 'Manual Press',
    recipeId: 'forgeMetalPlate',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 5 },
      { resourceId: 'marks', amount: 20 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 10 },
      { resourceId: 'marks', amount: 50 }
    ],
    productionRate: 0.8, // 20% faster than manual
    isActive: false,
    lastProduction: 0,
    description: 'Automates metal plate forging'
  },
  woodSaw: {
    id: 'woodSaw',
    name: 'Wood Saw',
    recipeId: 'cutWoodPlank',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 3 },
      { resourceId: 'woodPlanks', amount: 5 },
      { resourceId: 'marks', amount: 15 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 6 },
      { resourceId: 'marks', amount: 30 }
    ],
    productionRate: 0.7, // 30% faster than manual
    isActive: false,
    lastProduction: 0,
    description: 'Automates wood plank cutting'
  }
};

export const MARKET_ITEMS: Record<string, MarketItem> = {
  ironOre: {
    resourceId: 'ironOre',
    buyPrice: 2,
    available: true
  },
  coal: {
    resourceId: 'coal',
    buyPrice: 1,
    available: true
  },
  woodLogs: {
    resourceId: 'woodLogs',
    buyPrice: 1,
    available: true
  },
  metalPlates: {
    resourceId: 'metalPlates',
    sellPrice: 5,
    available: true
  },
  woodPlanks: {
    resourceId: 'woodPlanks',
    sellPrice: 3,
    available: true
  },
  gears: {
    resourceId: 'gears',
    sellPrice: 12,
    available: true
  }
};

export const MILESTONES: Milestone[] = [
  {
    id: 'firstMetalPlate',
    name: 'First Metal Plate',
    description: 'Forge your first metal plate',
    condition: (state) => state.resources.metalPlates.amount >= 1,
    reward: (state) => {
      state.unlockedRecipes.add('assembleGear');
    },
    completed: false
  },
  {
    id: 'tenMetalPlates',
    name: 'Metal Production',
    description: 'Produce 10 metal plates',
    condition: (state) => state.resources.metalPlates.amount >= 10,
    reward: (state) => {
      state.unlockedMachines.add('manualPress');
    },
    completed: false
  },
  {
    id: 'firstGear',
    name: 'First Gear',
    description: 'Assemble your first gear',
    condition: (state) => state.resources.gears.amount >= 1,
    reward: (state) => {
      state.unlockedMachines.add('woodSaw');
    },
    completed: false
  }
];