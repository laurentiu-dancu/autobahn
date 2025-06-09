import { Recipe } from '../core/types';

export const RECIPES: Record<string, Recipe> = {
  // BASIC CRAFTING RECIPES (1.5-8 seconds)
  
  // Wire-Based Components
  bendWireSpring: {
    id: 'bendWireSpring',
    name: 'Bend Wire Spring',
    inputs: [{ resourceId: 'wireStock', amount: 1 }],
    outputs: [{ resourceId: 'wireSprings', amount: 1 }],
    craftTime: 2000,
    description: 'Hand-bend wire into automotive springs',
    tier: 'basic'
  },
  makeElectricalWire: {
    id: 'makeElectricalWire',
    name: 'Make Electrical Wire',
    inputs: [
      { resourceId: 'wireStock', amount: 1 },
      { resourceId: 'rubber', amount: 1 }
    ],
    outputs: [{ resourceId: 'electricalWire', amount: 1 }],
    craftTime: 3000,
    description: 'Insulate wire for electrical systems',
    tier: 'basic'
  },

  // Metal Components
  fileMetalBracket: {
    id: 'fileMetalBracket',
    name: 'File Metal Bracket',
    inputs: [{ resourceId: 'sheetMetal', amount: 1 }],
    outputs: [{ resourceId: 'metalBrackets', amount: 1 }],
    craftTime: 3000,
    description: 'File and shape mounting brackets',
    tier: 'basic'
  },
  shapeMetalRod: {
    id: 'shapeMetalRod',
    name: 'Shape Metal Rod',
    inputs: [{ resourceId: 'sheetMetal', amount: 1 }],
    outputs: [{ resourceId: 'metalRods', amount: 1 }],
    craftTime: 4000,
    description: 'Shape metal into structural rods',
    tier: 'basic'
  },
  forgeMetalPlate: {
    id: 'forgeMetalPlate',
    name: 'Forge Metal Plate',
    inputs: [{ resourceId: 'sheetMetal', amount: 2 }],
    outputs: [{ resourceId: 'metalPlates', amount: 1 }],
    craftTime: 5000,
    description: 'Forge heavy-duty metal plates',
    tier: 'basic'
  },

  // Processed Materials
  cutLeatherGasket: {
    id: 'cutLeatherGasket',
    name: 'Cut Leather Gasket',
    inputs: [{ resourceId: 'leatherScraps', amount: 1 }],
    outputs: [{ resourceId: 'leatherGaskets', amount: 1 }],
    craftTime: 1500,
    description: 'Cut leather into sealing gaskets',
    tier: 'basic'
  },
  formRubberTubing: {
    id: 'formRubberTubing',
    name: 'Form Rubber Tubing',
    inputs: [{ resourceId: 'rubber', amount: 1 }],
    outputs: [{ resourceId: 'rubberTubing', amount: 1 }],
    craftTime: 4000,
    description: 'Form flexible rubber tubing',
    tier: 'basic'
  },
  shapeGlassLens: {
    id: 'shapeGlassLens',
    name: 'Shape Glass Lens',
    inputs: [{ resourceId: 'glass', amount: 1 }],
    outputs: [{ resourceId: 'glassLenses', amount: 1 }],
    craftTime: 6000,
    description: 'Shape glass for lights and gauges',
    tier: 'basic'
  },
  cutFabricStrips: {
    id: 'cutFabricStrips',
    name: 'Cut Fabric Strips',
    inputs: [{ resourceId: 'fabric', amount: 1 }],
    outputs: [{ resourceId: 'fabricStrips', amount: 2 }],
    craftTime: 2000,
    description: 'Cut fabric into usable strips',
    tier: 'basic'
  },

  // Wood Components
  cutWoodPlanks: {
    id: 'cutWoodPlanks',
    name: 'Cut Wood Planks',
    inputs: [{ resourceId: 'wood', amount: 1 }],
    outputs: [{ resourceId: 'woodPlanks', amount: 2 }],
    craftTime: 3000,
    description: 'Cut wood into usable planks',
    tier: 'basic'
  },
  buildWoodFrame: {
    id: 'buildWoodFrame',
    name: 'Build Wood Frame',
    inputs: [
      { resourceId: 'woodPlanks', amount: 2 },
      { resourceId: 'metalBrackets', amount: 2 }
    ],
    outputs: [{ resourceId: 'woodFrames', amount: 1 }],
    craftTime: 8000,
    description: 'Build reinforced wooden frame',
    tier: 'basic'
  },

  // ADVANCED CRAFTING RECIPES (10-30 seconds)
  
  // Engine Components
  machinePiston: {
    id: 'machinePiston',
    name: 'Machine Piston',
    inputs: [
      { resourceId: 'metalRods', amount: 2 },
      { resourceId: 'metalPlates', amount: 1 }
    ],
    outputs: [{ resourceId: 'pistons', amount: 1 }],
    craftTime: 15000,
    description: 'Machine precision engine pistons',
    tier: 'advanced'
  },
  forgeCrankshaft: {
    id: 'forgeCrankshaft',
    name: 'Forge Crankshaft',
    inputs: [
      { resourceId: 'metalRods', amount: 3 },
      { resourceId: 'bearings', amount: 2 }
    ],
    outputs: [{ resourceId: 'crankshaft', amount: 1 }],
    craftTime: 20000,
    description: 'Forge engine crankshaft',
    tier: 'advanced'
  },
  assembleValve: {
    id: 'assembleValve',
    name: 'Assemble Valve',
    inputs: [
      { resourceId: 'metalRods', amount: 1 },
      { resourceId: 'wireSprings', amount: 1 }
    ],
    outputs: [{ resourceId: 'valves', amount: 1 }],
    craftTime: 12000,
    description: 'Assemble engine valve mechanism',
    tier: 'advanced'
  },
  craftSparkPlug: {
    id: 'craftSparkPlug',
    name: 'Craft Spark Plug',
    inputs: [
      { resourceId: 'metalRods', amount: 1 },
      { resourceId: 'electricalWire', amount: 1 }
    ],
    outputs: [{ resourceId: 'sparkPlugs', amount: 1 }],
    craftTime: 10000,
    description: 'Craft electrical ignition spark plug',
    tier: 'advanced'
  },

  // Transmission Components
  machineGear: {
    id: 'machineGear',
    name: 'Machine Gear',
    inputs: [
      { resourceId: 'metalPlates', amount: 2 },
      { resourceId: 'coal', amount: 1 }
    ],
    outputs: [{ resourceId: 'gears', amount: 1 }],
    craftTime: 18000,
    description: 'Machine precision transmission gear',
    tier: 'advanced'
  },
  craftBearing: {
    id: 'craftBearing',
    name: 'Craft Bearing',
    inputs: [
      { resourceId: 'metalRods', amount: 1 },
      { resourceId: 'oil', amount: 1 }
    ],
    outputs: [{ resourceId: 'bearings', amount: 1 }],
    craftTime: 8000,
    description: 'Craft smooth-running bearing',
    tier: 'advanced'
  },
  assembleClutchPlate: {
    id: 'assembleClutchPlate',
    name: 'Assemble Clutch Plate',
    inputs: [
      { resourceId: 'metalPlates', amount: 2 },
      { resourceId: 'fabricStrips', amount: 1 }
    ],
    outputs: [{ resourceId: 'clutchPlates', amount: 1 }],
    craftTime: 14000,
    description: 'Assemble power engagement clutch plate',
    tier: 'advanced'
  },

  // Chassis Components
  buildLeafSpring: {
    id: 'buildLeafSpring',
    name: 'Build Leaf Spring',
    inputs: [
      { resourceId: 'wireSprings', amount: 3 },
      { resourceId: 'metalBrackets', amount: 2 }
    ],
    outputs: [{ resourceId: 'leafSprings', amount: 1 }],
    craftTime: 16000,
    description: 'Build heavy-duty leaf spring suspension',
    tier: 'advanced'
  },
  forgeAxle: {
    id: 'forgeAxle',
    name: 'Forge Axle',
    inputs: [
      { resourceId: 'metalRods', amount: 2 },
      { resourceId: 'bearings', amount: 2 }
    ],
    outputs: [{ resourceId: 'axles', amount: 1 }],
    craftTime: 22000,
    description: 'Forge wheel mounting axle',
    tier: 'advanced'
  },
  craftBrakeShoe: {
    id: 'craftBrakeShoe',
    name: 'Craft Brake Shoe',
    inputs: [
      { resourceId: 'metalPlates', amount: 1 },
      { resourceId: 'leatherGaskets', amount: 1 }
    ],
    outputs: [{ resourceId: 'brakeShoes', amount: 1 }],
    craftTime: 10000,
    description: 'Craft stopping mechanism brake shoe',
    tier: 'advanced'
  },

  // Body Components
  formBodyPanel: {
    id: 'formBodyPanel',
    name: 'Form Body Panel',
    inputs: [
      { resourceId: 'metalPlates', amount: 2 },
      { resourceId: 'metalBrackets', amount: 1 }
    ],
    outputs: [{ resourceId: 'bodyPanels', amount: 1 }],
    craftTime: 12000,
    description: 'Form vehicle exterior body panel',
    tier: 'advanced'
  },
  upholsterSeat: {
    id: 'upholsterSeat',
    name: 'Upholster Seat',
    inputs: [
      { resourceId: 'woodFrames', amount: 1 },
      { resourceId: 'fabricStrips', amount: 2 },
      { resourceId: 'leatherGaskets', amount: 1 }
    ],
    outputs: [{ resourceId: 'seats', amount: 1 }],
    craftTime: 18000,
    description: 'Upholster comfortable vehicle seat',
    tier: 'advanced'
  },
  buildDashboard: {
    id: 'buildDashboard',
    name: 'Build Dashboard',
    inputs: [
      { resourceId: 'woodPlanks', amount: 1 },
      { resourceId: 'glassLenses', amount: 2 }
    ],
    outputs: [{ resourceId: 'dashboard', amount: 1 }],
    craftTime: 15000,
    description: 'Build instrument dashboard',
    tier: 'advanced'
  },

  // Electrical Components
  assembleBattery: {
    id: 'assembleBattery',
    name: 'Assemble Battery',
    inputs: [
      { resourceId: 'lead', amount: 2 },
      { resourceId: 'rubberTubing', amount: 1 }
    ],
    outputs: [{ resourceId: 'batteries', amount: 1 }],
    craftTime: 25000,
    description: 'Assemble electrical power storage battery',
    tier: 'advanced'
  },
  buildHeadlight: {
    id: 'buildHeadlight',
    name: 'Build Headlight',
    inputs: [
      { resourceId: 'glassLenses', amount: 1 },
      { resourceId: 'metalBrackets', amount: 1 },
      { resourceId: 'electricalWire', amount: 1 }
    ],
    outputs: [{ resourceId: 'headlights', amount: 1 }],
    craftTime: 14000,
    description: 'Build vehicle headlight assembly',
    tier: 'advanced'
  },
  assembleWiringHarness: {
    id: 'assembleWiringHarness',
    name: 'Assemble Wiring Harness',
    inputs: [
      { resourceId: 'electricalWire', amount: 5 },
      { resourceId: 'rubberTubing', amount: 2 }
    ],
    outputs: [{ resourceId: 'wiringHarness', amount: 1 }],
    craftTime: 20000,
    description: 'Assemble complete electrical wiring system',
    tier: 'advanced'
  },

  // ASSEMBLY SYSTEM RECIPES (15-45 seconds)
  
  assembleEngine: {
    id: 'assembleEngine',
    name: 'Assemble Engine',
    inputs: [
      { resourceId: 'pistons', amount: 4 },
      { resourceId: 'crankshaft', amount: 1 },
      { resourceId: 'valves', amount: 8 },
      { resourceId: 'sparkPlugs', amount: 4 },
      { resourceId: 'metalPlates', amount: 2 }
    ],
    outputs: [{ resourceId: 'engineAssembly', amount: 1 }],
    craftTime: 45000,
    description: 'Assemble complete engine power unit',
    tier: 'assembly'
  },
  assembleTransmission: {
    id: 'assembleTransmission',
    name: 'Assemble Transmission',
    inputs: [
      { resourceId: 'gears', amount: 6 },
      { resourceId: 'bearings', amount: 4 },
      { resourceId: 'clutchPlates', amount: 2 },
      { resourceId: 'metalPlates', amount: 1 }
    ],
    outputs: [{ resourceId: 'transmissionAssembly', amount: 1 }],
    craftTime: 35000,
    description: 'Assemble complete power transfer system',
    tier: 'assembly'
  },
  assembleChassis: {
    id: 'assembleChassis',
    name: 'Assemble Chassis',
    inputs: [
      { resourceId: 'woodFrames', amount: 1 },
      { resourceId: 'leafSprings', amount: 2 },
      { resourceId: 'axles', amount: 2 },
      { resourceId: 'brakeShoes', amount: 4 },
      { resourceId: 'metalBrackets', amount: 4 }
    ],
    outputs: [{ resourceId: 'chassisAssembly', amount: 1 }],
    craftTime: 40000,
    description: 'Assemble complete vehicle foundation',
    tier: 'assembly'
  },
  assembleBody: {
    id: 'assembleBody',
    name: 'Assemble Body',
    inputs: [
      { resourceId: 'bodyPanels', amount: 6 },
      { resourceId: 'seats', amount: 2 },
      { resourceId: 'dashboard', amount: 1 },
      { resourceId: 'woodFrames', amount: 2 }
    ],
    outputs: [{ resourceId: 'bodyAssembly', amount: 1 }],
    craftTime: 30000,
    description: 'Assemble complete vehicle body and interior',
    tier: 'assembly'
  },
  assembleWheel: {
    id: 'assembleWheel',
    name: 'Assemble Wheel',
    inputs: [
      { resourceId: 'metalRods', amount: 1 },
      { resourceId: 'wireSprings', amount: 8 },
      { resourceId: 'rubberTubing', amount: 1 }
    ],
    outputs: [{ resourceId: 'wheelAssembly', amount: 1 }],
    craftTime: 20000,
    description: 'Assemble complete wheel unit',
    tier: 'assembly'
  },
  assembleElectricalSystem: {
    id: 'assembleElectricalSystem',
    name: 'Assemble Electrical System',
    inputs: [
      { resourceId: 'batteries', amount: 1 },
      { resourceId: 'headlights', amount: 2 },
      { resourceId: 'wiringHarness', amount: 1 },
      { resourceId: 'electricalWire', amount: 2 }
    ],
    outputs: [{ resourceId: 'electricalSystem', amount: 1 }],
    craftTime: 25000,
    description: 'Assemble complete electrical and lighting system',
    tier: 'assembly'
  },
  assembleFuelSystem: {
    id: 'assembleFuelSystem',
    name: 'Assemble Fuel System',
    inputs: [
      { resourceId: 'metalPlates', amount: 1 },
      { resourceId: 'rubberTubing', amount: 2 },
      { resourceId: 'valves', amount: 1 }
    ],
    outputs: [{ resourceId: 'fuelSystem', amount: 1 }],
    craftTime: 15000,
    description: 'Assemble complete fuel storage and delivery system',
    tier: 'assembly'
  },

  // AUTOMOBILE CONSTRUCTION (180 seconds)
  
  constructAutomobile: {
    id: 'constructAutomobile',
    name: 'Construct Automobile',
    inputs: [
      { resourceId: 'engineAssembly', amount: 1 },
      { resourceId: 'transmissionAssembly', amount: 1 },
      { resourceId: 'chassisAssembly', amount: 1 },
      { resourceId: 'bodyAssembly', amount: 1 },
      { resourceId: 'wheelAssembly', amount: 4 },
      { resourceId: 'electricalSystem', amount: 1 },
      { resourceId: 'fuelSystem', amount: 1 }
    ],
    outputs: [{ resourceId: 'automobile', amount: 1 }],
    craftTime: 180000,
    description: 'Construct complete early 1900s automobile',
    tier: 'automobile'
  }
};