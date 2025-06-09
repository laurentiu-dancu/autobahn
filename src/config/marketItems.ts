import { MarketItem } from '../core/types';

export const MARKET_ITEMS: Record<string, MarketItem> = {
  // Salvageable Raw Materials (always available)
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

  // Market-Only Raw Materials (appear when recipes unlock)
  wood: {
    resourceId: 'wood',
    buyPrice: 5,
    sellPrice: 5,
    available: true
  },
  rubber: {
    resourceId: 'rubber',
    buyPrice: 6,
    sellPrice: 6,
    available: true
  },
  glass: {
    resourceId: 'glass',
    buyPrice: 8,
    sellPrice: 8,
    available: true
  },
  lead: {
    resourceId: 'lead',
    buyPrice: 10,
    sellPrice: 10,
    available: true
  },
  fabric: {
    resourceId: 'fabric',
    buyPrice: 3,
    sellPrice: 3,
    available: true
  },
  coal: {
    resourceId: 'coal',
    buyPrice: 2,
    sellPrice: 2,
    available: true
  },

  // Basic Components
  wireSprings: {
    resourceId: 'wireSprings',
    buyPrice: 3,
    sellPrice: 3,
    available: true
  },
  electricalWire: {
    resourceId: 'electricalWire',
    buyPrice: 8,
    sellPrice: 8,
    available: true
  },
  metalBrackets: {
    resourceId: 'metalBrackets',
    buyPrice: 5,
    sellPrice: 5,
    available: true
  },
  metalRods: {
    resourceId: 'metalRods',
    buyPrice: 6,
    sellPrice: 6,
    available: true
  },
  metalPlates: {
    resourceId: 'metalPlates',
    buyPrice: 8,
    sellPrice: 8,
    available: true
  },
  leatherGaskets: {
    resourceId: 'leatherGaskets',
    buyPrice: 2,
    sellPrice: 2,
    available: true
  },
  rubberTubing: {
    resourceId: 'rubberTubing',
    buyPrice: 8,
    sellPrice: 8,
    available: true
  },
  glassLenses: {
    resourceId: 'glassLenses',
    buyPrice: 10,
    sellPrice: 10,
    available: true
  },
  fabricStrips: {
    resourceId: 'fabricStrips',
    buyPrice: 2,
    sellPrice: 2,
    available: true
  },
  woodPlanks: {
    resourceId: 'woodPlanks',
    buyPrice: 3,
    sellPrice: 3,
    available: true
  },
  woodFrames: {
    resourceId: 'woodFrames',
    buyPrice: 15,
    sellPrice: 15,
    available: true
  },

  // Advanced Components
  pistons: {
    resourceId: 'pistons',
    buyPrice: 25,
    sellPrice: 25,
    available: true
  },
  crankshaft: {
    resourceId: 'crankshaft',
    buyPrice: 40,
    sellPrice: 40,
    available: true
  },
  valves: {
    resourceId: 'valves',
    buyPrice: 15,
    sellPrice: 15,
    available: true
  },
  sparkPlugs: {
    resourceId: 'sparkPlugs',
    buyPrice: 20,
    sellPrice: 20,
    available: true
  },
  gears: {
    resourceId: 'gears',
    buyPrice: 30,
    sellPrice: 30,
    available: true
  },
  bearings: {
    resourceId: 'bearings',
    buyPrice: 12,
    sellPrice: 12,
    available: true
  },
  clutchPlates: {
    resourceId: 'clutchPlates',
    buyPrice: 25,
    sellPrice: 25,
    available: true
  },
  leafSprings: {
    resourceId: 'leafSprings',
    buyPrice: 20,
    sellPrice: 20,
    available: true
  },
  axles: {
    resourceId: 'axles',
    buyPrice: 35,
    sellPrice: 35,
    available: true
  },
  brakeShoes: {
    resourceId: 'brakeShoes',
    buyPrice: 15,
    sellPrice: 15,
    available: true
  },
  bodyPanels: {
    resourceId: 'bodyPanels',
    buyPrice: 20,
    sellPrice: 20,
    available: true
  },
  seats: {
    resourceId: 'seats',
    buyPrice: 25,
    sellPrice: 25,
    available: true
  },
  dashboard: {
    resourceId: 'dashboard',
    buyPrice: 30,
    sellPrice: 30,
    available: true
  },
  batteries: {
    resourceId: 'batteries',
    buyPrice: 45,
    sellPrice: 45,
    available: true
  },
  headlights: {
    resourceId: 'headlights',
    buyPrice: 35,
    sellPrice: 35,
    available: true
  },
  wiringHarness: {
    resourceId: 'wiringHarness',
    buyPrice: 50,
    sellPrice: 50,
    available: true
  },

  // Assembly Systems
  engineAssembly: {
    resourceId: 'engineAssembly',
    buyPrice: 200,
    sellPrice: 200,
    available: true
  },
  transmissionAssembly: {
    resourceId: 'transmissionAssembly',
    buyPrice: 150,
    sellPrice: 150,
    available: true
  },
  chassisAssembly: {
    resourceId: 'chassisAssembly',
    buyPrice: 180,
    sellPrice: 180,
    available: true
  },
  bodyAssembly: {
    resourceId: 'bodyAssembly',
    buyPrice: 160,
    sellPrice: 160,
    available: true
  },
  wheelAssembly: {
    resourceId: 'wheelAssembly',
    buyPrice: 25,
    sellPrice: 25,
    available: true
  },
  electricalSystem: {
    resourceId: 'electricalSystem',
    buyPrice: 140,
    sellPrice: 140,
    available: true
  },
  fuelSystem: {
    resourceId: 'fuelSystem',
    buyPrice: 35,
    sellPrice: 35,
    available: true
  },

  // Final Product
  automobile: {
    resourceId: 'automobile',
    buyPrice: 1000,
    sellPrice: 1000,
    available: true
  }
};