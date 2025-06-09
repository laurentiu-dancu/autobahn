import { Machine } from '../core/types';

export const MACHINES: Record<string, Machine> = {
  // BASIC AUTOMATION - All basic components
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
    productionRate: 2.0,
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
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates bracket filing and shaping'
  },
  leatherCuttingStation: {
    id: 'leatherCuttingStation',
    name: 'Leather Cutting Station',
    recipeId: 'cutLeatherGasket',
    level: 1,
    cost: [
      { resourceId: 'metalBrackets', amount: 1 },
      { resourceId: 'marks', amount: 10 }
    ],
    upgradeCost: [
      { resourceId: 'metalBrackets', amount: 2 },
      { resourceId: 'marks', amount: 15 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates leather gasket cutting'
  },
  metalShapingPress: {
    id: 'metalShapingPress',
    name: 'Metal Shaping Press',
    recipeId: 'shapeMetalRod',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 2 },
      { resourceId: 'marks', amount: 25 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 3 },
      { resourceId: 'marks', amount: 40 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates metal rod shaping'
  },
  plateForge: {
    id: 'plateForge',
    name: 'Plate Forge',
    recipeId: 'forgeMetalPlate',
    level: 1,
    cost: [
      { resourceId: 'metalRods', amount: 3 },
      { resourceId: 'marks', amount: 30 }
    ],
    upgradeCost: [
      { resourceId: 'metalRods', amount: 5 },
      { resourceId: 'marks', amount: 50 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates metal plate forging'
  },
  electricalWireStation: {
    id: 'electricalWireStation',
    name: 'Electrical Wire Station',
    recipeId: 'makeElectricalWire',
    level: 1,
    cost: [
      { resourceId: 'metalBrackets', amount: 2 },
      { resourceId: 'rubberTubing', amount: 1 },
      { resourceId: 'marks', amount: 35 }
    ],
    upgradeCost: [
      { resourceId: 'metalBrackets', amount: 3 },
      { resourceId: 'rubberTubing', amount: 2 },
      { resourceId: 'marks', amount: 55 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates electrical wire production'
  },
  rubberFormingMachine: {
    id: 'rubberFormingMachine',
    name: 'Rubber Forming Machine',
    recipeId: 'formRubberTubing',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 1 },
      { resourceId: 'metalRods', amount: 2 },
      { resourceId: 'marks', amount: 40 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 2 },
      { resourceId: 'metalRods', amount: 3 },
      { resourceId: 'marks', amount: 65 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates rubber tubing formation'
  },
  glassShapingKiln: {
    id: 'glassShapingKiln',
    name: 'Glass Shaping Kiln',
    recipeId: 'shapeGlassLens',
    level: 1,
    cost: [
      { resourceId: 'metalBrackets', amount: 3 },
      { resourceId: 'coal', amount: 5 },
      { resourceId: 'marks', amount: 45 }
    ],
    upgradeCost: [
      { resourceId: 'metalBrackets', amount: 5 },
      { resourceId: 'coal', amount: 8 },
      { resourceId: 'marks', amount: 70 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates glass lens shaping'
  },
  fabricCuttingTable: {
    id: 'fabricCuttingTable',
    name: 'Fabric Cutting Table',
    recipeId: 'cutFabricStrips',
    level: 1,
    cost: [
      { resourceId: 'woodPlanks', amount: 2 },
      { resourceId: 'metalBrackets', amount: 1 },
      { resourceId: 'marks', amount: 20 }
    ],
    upgradeCost: [
      { resourceId: 'woodPlanks', amount: 3 },
      { resourceId: 'metalBrackets', amount: 2 },
      { resourceId: 'marks', amount: 30 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates fabric strip cutting'
  },
  woodworkingBench: {
    id: 'woodworkingBench',
    name: 'Woodworking Bench',
    recipeId: 'cutWoodPlanks',
    level: 1,
    cost: [
      { resourceId: 'metalBrackets', amount: 2 },
      { resourceId: 'marks', amount: 25 }
    ],
    upgradeCost: [
      { resourceId: 'metalBrackets', amount: 3 },
      { resourceId: 'marks', amount: 40 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates wood plank cutting'
  },
  frameAssemblyJig: {
    id: 'frameAssemblyJig',
    name: 'Frame Assembly Jig',
    recipeId: 'buildWoodFrame',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 2 },
      { resourceId: 'woodPlanks', amount: 4 },
      { resourceId: 'marks', amount: 50 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 3 },
      { resourceId: 'woodPlanks', amount: 6 },
      { resourceId: 'marks', amount: 80 }
    ],
    productionRate: 2.0,
    isActive: false,
    lastProduction: 0,
    description: 'Automates wood frame assembly'
  },

  // ADVANCED AUTOMATION
  pistonPress: {
    id: 'pistonPress',
    name: 'Piston Press',
    recipeId: 'machinePiston',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 3 },
      { resourceId: 'gears', amount: 2 },
      { resourceId: 'marks', amount: 100 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 4 },
      { resourceId: 'gears', amount: 3 },
      { resourceId: 'marks', amount: 150 }
    ],
    productionRate: 1.8,
    isActive: false,
    lastProduction: 0,
    description: 'Automates precision piston manufacturing'
  },
  gearCuttingMachine: {
    id: 'gearCuttingMachine',
    name: 'Gear Cutting Machine',
    recipeId: 'machineGear',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 4 },
      { resourceId: 'bearings', amount: 3 },
      { resourceId: 'marks', amount: 120 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 5 },
      { resourceId: 'bearings', amount: 4 },
      { resourceId: 'marks', amount: 180 }
    ],
    productionRate: 1.7,
    isActive: false,
    lastProduction: 0,
    description: 'Automates precision gear manufacturing'
  },
  bearingManufacturingStation: {
    id: 'bearingManufacturingStation',
    name: 'Bearing Manufacturing Station',
    recipeId: 'craftBearing',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 2 },
      { resourceId: 'metalRods', amount: 3 },
      { resourceId: 'marks', amount: 80 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 3 },
      { resourceId: 'metalRods', amount: 5 },
      { resourceId: 'marks', amount: 120 }
    ],
    productionRate: 1.8,
    isActive: false,
    lastProduction: 0,
    description: 'Automates bearing manufacturing'
  },
  valveAssemblyStation: {
    id: 'valveAssemblyStation',
    name: 'Valve Assembly Station',
    recipeId: 'assembleValve',
    level: 1,
    cost: [
      { resourceId: 'metalRods', amount: 2 },
      { resourceId: 'wireSprings', amount: 5 },
      { resourceId: 'marks', amount: 70 }
    ],
    upgradeCost: [
      { resourceId: 'metalRods', amount: 3 },
      { resourceId: 'wireSprings', amount: 8 },
      { resourceId: 'marks', amount: 105 }
    ],
    productionRate: 1.8,
    isActive: false,
    lastProduction: 0,
    description: 'Automates valve assembly'
  },

  // ASSEMBLY AUTOMATION
  engineAssemblyRig: {
    id: 'engineAssemblyRig',
    name: 'Engine Assembly Rig',
    recipeId: 'assembleEngine',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 6 },
      { resourceId: 'gears', amount: 4 },
      { resourceId: 'bearings', amount: 6 },
      { resourceId: 'marks', amount: 300 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 8 },
      { resourceId: 'gears', amount: 6 },
      { resourceId: 'bearings', amount: 8 },
      { resourceId: 'marks', amount: 450 }
    ],
    productionRate: 1.5,
    isActive: false,
    lastProduction: 0,
    description: 'Automates complex engine assembly process'
  },
  chassisAssemblyRig: {
    id: 'chassisAssemblyRig',
    name: 'Chassis Assembly Rig',
    recipeId: 'assembleChassis',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 5 },
      { resourceId: 'axles', amount: 2 },
      { resourceId: 'leafSprings', amount: 2 },
      { resourceId: 'marks', amount: 250 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 7 },
      { resourceId: 'axles', amount: 3 },
      { resourceId: 'leafSprings', amount: 3 },
      { resourceId: 'marks', amount: 375 }
    ],
    productionRate: 1.6,
    isActive: false,
    lastProduction: 0,
    description: 'Automates chassis assembly process'
  },

  // ADVANCED LATE-GAME AUTOMATION
  advancedWireBendingJig: {
    id: 'advancedWireBendingJig',
    name: 'Advanced Wire Bending Jig',
    recipeId: 'bendWireSpring',
    level: 1,
    cost: [
      { resourceId: 'gears', amount: 3 },
      { resourceId: 'bearings', amount: 4 },
      { resourceId: 'electricalWire', amount: 5 },
      { resourceId: 'marks', amount: 200 }
    ],
    upgradeCost: [
      { resourceId: 'gears', amount: 4 },
      { resourceId: 'bearings', amount: 6 },
      { resourceId: 'electricalWire', amount: 7 },
      { resourceId: 'marks', amount: 300 }
    ],
    productionRate: 0.8, // Faster than basic version
    isActive: false,
    lastProduction: 0,
    description: 'High-speed automated wire spring production'
  },
  advancedFilingStation: {
    id: 'advancedFilingStation',
    name: 'Advanced Filing Station',
    recipeId: 'fileMetalBracket',
    level: 1,
    cost: [
      { resourceId: 'gears', amount: 2 },
      { resourceId: 'bearings', amount: 3 },
      { resourceId: 'electricalWire', amount: 4 },
      { resourceId: 'marks', amount: 180 }
    ],
    upgradeCost: [
      { resourceId: 'gears', amount: 3 },
      { resourceId: 'bearings', amount: 5 },
      { resourceId: 'electricalWire', amount: 6 },
      { resourceId: 'marks', amount: 270 }
    ],
    productionRate: 0.9, // Faster than basic version
    isActive: false,
    lastProduction: 0,
    description: 'High-precision automated bracket production'
  },
  assemblyLine: {
    id: 'assemblyLine',
    name: 'Assembly Line',
    recipeId: 'constructAutomobile',
    level: 1,
    cost: [
      { resourceId: 'metalPlates', amount: 10 },
      { resourceId: 'gears', amount: 8 },
      { resourceId: 'bearings', amount: 12 },
      { resourceId: 'electricalSystem', amount: 2 },
      { resourceId: 'marks', amount: 1000 }
    ],
    upgradeCost: [
      { resourceId: 'metalPlates', amount: 15 },
      { resourceId: 'gears', amount: 12 },
      { resourceId: 'bearings', amount: 18 },
      { resourceId: 'electricalSystem', amount: 3 },
      { resourceId: 'marks', amount: 1500 }
    ],
    productionRate: 1.2, // Slightly faster than manual for the ultimate achievement
    isActive: false,
    lastProduction: 0,
    description: 'Automated automobile assembly line'
  }
};