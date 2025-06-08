import { Resource, Recipe, Machine, MarketItem, Milestone } from '../core/types';

export const INITIAL_RESOURCES: Record<string, Resource> = {
  wireStock: {
    id: 'wireStock',
    name: 'Wire Stock',
    amount: 5, // Hidden starter resource
    description: 'Basic metal wire for springs and components'
  },
  sheetMetal: {
    id: 'sheetMetal',
    name: 'Sheet Metal',
    amount: 3, // Hidden starter resource
    description: 'Thin metal sheets for brackets'
  },
  leatherScraps: {
    id: 'leatherScraps',
    name: 'Leather Scraps',
    amount: 2, // Hidden starter resource
    description: 'Leather pieces for gaskets'
  },
  oil: {
    id: 'oil',
    name: 'Oil',
    amount: 1, // Hidden starter resource
    description: 'For lubrication and treatment'
  },
  wireSprings: {
    id: 'wireSprings',
    name: 'Wire Springs',
    amount: 0,
    description: 'Hand-bent springs for automotive use'
  },
  metalBrackets: {
    id: 'metalBrackets',
    name: 'Metal Brackets',
    amount: 0,
    description: 'Filed and shaped mounting brackets'
  },
  leatherGaskets: {
    id: 'leatherGaskets',
    name: 'Leather Gaskets',
    amount: 0,
    description: 'Cut gaskets for sealing'
  },
  springAssemblies: {
    id: 'springAssemblies',
    name: 'Spring Assemblies',
    amount: 0,
    description: 'Multiple springs combined for suspension'
  },
  repairKits: {
    id: 'repairKits',
    name: 'Automotive Repair Kits',
    amount: 0,
    description: 'Complete sets of common replacement parts'
  },
  marks: {
    id: 'marks',
    name: 'Marks',
    amount: 0, // Start with no money to encourage immediate crafting
    description: 'Currency for trading'
  }
};

export const RECIPES: Record<string, Recipe> = {
  bendWireSpring: {
    id: 'bendWireSpring',
    name: 'Bend Wire Spring',
    inputs: [{ resourceId: 'wireStock', amount: 1 }],
    outputs: [{ resourceId: 'wireSprings', amount: 1 }],
    craftTime: 0,
    description: 'Hand-bend wire into automotive springs'
  },
  fileMetalBracket: {
    id: 'fileMetalBracket',
    name: 'File Metal Bracket',
    inputs: [{ resourceId: 'sheetMetal', amount: 1 }],
    outputs: [{ resourceId: 'metalBrackets', amount: 1 }],
    craftTime: 0,
    description: 'File and shape mounting brackets'
  },
  cutLeatherGasket: {
    id: 'cutLeatherGasket',
    name: 'Cut Leather Gasket',
    inputs: [{ resourceId: 'leatherScraps', amount: 1 }],
    outputs: [{ resourceId: 'leatherGaskets', amount: 1 }],
    craftTime: 0,
    description: 'Cut leather into sealing gaskets'
  },
  assembleSpringSet: {
    id: 'assembleSpringSet',
    name: 'Assemble Spring Set',
    inputs: [
      { resourceId: 'wireSprings', amount: 3 },
      { resourceId: 'metalBrackets', amount: 1 }
    ],
    outputs: [{ resourceId: 'springAssemblies', amount: 1 }],
    craftTime: 0,
    description: 'Combine springs and brackets into suspension assemblies'
  },
  buildRepairKit: {
    id: 'buildRepairKit',
    name: 'Build Repair Kit',
    inputs: [
      { resourceId: 'springAssemblies', amount: 1 },
      { resourceId: 'leatherGaskets', amount: 2 },
      { resourceId: 'oil', amount: 1 }
    ],
    outputs: [{ resourceId: 'repairKits', amount: 1 }],
    craftTime: 0,
    description: 'Package complete automotive repair kit'
  }
};

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
    productionRate: 0.7, // 30% faster than manual
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
    productionRate: 0.6, // 40% faster than manual
    isActive: false,
    lastProduction: 0,
    description: 'Automates bracket filing and shaping'
  }
};

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

export const MILESTONES: Milestone[] = [
  {
    id: 'firstWireSpring',
    name: 'First Wire Spring',
    description: 'Bend your first wire spring',
    condition: (state) => state.resources.wireSprings.amount >= 1,
    reward: (state) => {
      state.unlockedRecipes.add('assembleSpringSet');
      state.uiState.showMarket = true; // Reveal market after first craft
    },
    completed: false
  },
  {
    id: 'tenWireSprings',
    name: 'Spring Production',
    description: 'Produce 10 wire springs',
    condition: (state) => state.totalProduced.wireSprings >= 10,
    reward: (state) => {
      state.unlockedMachines.add('wireBendingJig');
    },
    completed: false
  },
  {
    id: 'firstSpringAssembly',
    name: 'First Assembly',
    description: 'Create your first spring assembly',
    condition: (state) => state.resources.springAssemblies.amount >= 1,
    reward: (state) => {
      state.unlockedRecipes.add('buildRepairKit');
      state.unlockedMachines.add('filingStation');
    },
    completed: false
  },
  {
    id: 'firstSale',
    name: 'First Sale',
    description: 'Sell your first item',
    condition: (state) => state.totalSales > 0,
    reward: (state) => {
      state.uiState.showFullMarket = true; // Reveal full market interface
    },
    completed: false
  }
];