import { Resource } from '../core/types';

export const INITIAL_RESOURCES: Record<string, Resource> = {
  // Salvageable Raw Materials (start at 0, visible from start)
  wireStock: {
    id: 'wireStock',
    name: 'Wire Stock',
    amount: 0,
    description: 'Basic metal wire for springs and electrical components',
    type: 'material'
  },
  sheetMetal: {
    id: 'sheetMetal',
    name: 'Sheet Metal',
    amount: 0,
    description: 'Thin metal sheets for brackets and body panels',
    type: 'material'
  },
  leatherScraps: {
    id: 'leatherScraps',
    name: 'Leather Scraps',
    amount: 0,
    description: 'Leather pieces for gaskets and upholstery',
    type: 'material'
  },
  oil: {
    id: 'oil',
    name: 'Oil',
    amount: 0,
    description: 'For lubrication and rubber processing',
    type: 'material'
  },

  // Market-Only Raw Materials (appear when recipes unlock)
  wood: {
    id: 'wood',
    name: 'Wood',
    amount: 0,
    description: 'Structural material for frames and interior components',
    type: 'material'
  },
  rubber: {
    id: 'rubber',
    name: 'Rubber',
    amount: 0,
    description: 'Processed material for tires and sealing',
    type: 'material'
  },
  glass: {
    id: 'glass',
    name: 'Glass',
    amount: 0,
    description: 'Transparent material for lights and gauges',
    type: 'material'
  },
  lead: {
    id: 'lead',
    name: 'Lead',
    amount: 0,
    description: 'Heavy metal for batteries and electrical components',
    type: 'material'
  },
  fabric: {
    id: 'fabric',
    name: 'Fabric',
    amount: 0,
    description: 'Textile for upholstery and insulation',
    type: 'material'
  },
  coal: {
    id: 'coal',
    name: 'Coal',
    amount: 0,
    description: 'Fuel for heat treatment and processing',
    type: 'material'
  },

  // Basic Components
  wireSprings: {
    id: 'wireSprings',
    name: 'Wire Springs',
    amount: 0,
    description: 'Hand-bent springs for automotive use',
    type: 'part'
  },
  electricalWire: {
    id: 'electricalWire',
    name: 'Electrical Wire',
    amount: 0,
    description: 'Insulated wire for electrical systems',
    type: 'part'
  },
  metalBrackets: {
    id: 'metalBrackets',
    name: 'Metal Brackets',
    amount: 0,
    description: 'Filed and shaped mounting brackets',
    type: 'part'
  },
  metalRods: {
    id: 'metalRods',
    name: 'Metal Rods',
    amount: 0,
    description: 'Shaped structural components',
    type: 'part'
  },
  metalPlates: {
    id: 'metalPlates',
    name: 'Metal Plates',
    amount: 0,
    description: 'Heavy-duty metal plates for structural use',
    type: 'part'
  },
  leatherGaskets: {
    id: 'leatherGaskets',
    name: 'Leather Gaskets',
    amount: 0,
    description: 'Cut gaskets for sealing',
    type: 'part'
  },
  rubberTubing: {
    id: 'rubberTubing',
    name: 'Rubber Tubing',
    amount: 0,
    description: 'Flexible tubing for fuel and electrical lines',
    type: 'part'
  },
  glassLenses: {
    id: 'glassLenses',
    name: 'Glass Lenses',
    amount: 0,
    description: 'Shaped glass for lights and gauges',
    type: 'part'
  },
  fabricStrips: {
    id: 'fabricStrips',
    name: 'Fabric Strips',
    amount: 0,
    description: 'Cut fabric for various applications',
    type: 'part'
  },
  woodPlanks: {
    id: 'woodPlanks',
    name: 'Wood Planks',
    amount: 0,
    description: 'Processed wood for construction',
    type: 'part'
  },
  woodFrames: {
    id: 'woodFrames',
    name: 'Wood Frames',
    amount: 0,
    description: 'Reinforced wooden frame structures',
    type: 'part'
  },

  // Advanced Components
  pistons: {
    id: 'pistons',
    name: 'Pistons',
    amount: 0,
    description: 'Engine internal components for power generation',
    type: 'part'
  },
  crankshaft: {
    id: 'crankshaft',
    name: 'Crankshaft',
    amount: 0,
    description: 'Engine power transmission component',
    type: 'part'
  },
  valves: {
    id: 'valves',
    name: 'Valves',
    amount: 0,
    description: 'Flow control mechanisms for engine',
    type: 'part'
  },
  sparkPlugs: {
    id: 'sparkPlugs',
    name: 'Spark Plugs',
    amount: 0,
    description: 'Electrical ignition components',
    type: 'part'
  },
  gears: {
    id: 'gears',
    name: 'Gears',
    amount: 0,
    description: 'Precision-machined transmission components',
    type: 'part'
  },
  bearings: {
    id: 'bearings',
    name: 'Bearings',
    amount: 0,
    description: 'Smooth-running mechanical supports',
    type: 'part'
  },
  clutchPlates: {
    id: 'clutchPlates',
    name: 'Clutch Plates',
    amount: 0,
    description: 'Power engagement mechanisms',
    type: 'part'
  },
  leafSprings: {
    id: 'leafSprings',
    name: 'Leaf Springs',
    amount: 0,
    description: 'Heavy-duty suspension components',
    type: 'part'
  },
  axles: {
    id: 'axles',
    name: 'Axles',
    amount: 0,
    description: 'Wheel mounting and power transmission shafts',
    type: 'part'
  },
  brakeShoes: {
    id: 'brakeShoes',
    name: 'Brake Shoes',
    amount: 0,
    description: 'Stopping mechanism components',
    type: 'part'
  },
  bodyPanels: {
    id: 'bodyPanels',
    name: 'Body Panels',
    amount: 0,
    description: 'Formed metal panels for vehicle exterior',
    type: 'part'
  },
  seats: {
    id: 'seats',
    name: 'Seats',
    amount: 0,
    description: 'Upholstered seating for vehicle interior',
    type: 'part'
  },
  dashboard: {
    id: 'dashboard',
    name: 'Dashboard',
    amount: 0,
    description: 'Instrument panel for vehicle controls',
    type: 'part'
  },
  batteries: {
    id: 'batteries',
    name: 'Batteries',
    amount: 0,
    description: 'Electrical power storage units',
    type: 'part'
  },
  headlights: {
    id: 'headlights',
    name: 'Headlights',
    amount: 0,
    description: 'Vehicle lighting systems',
    type: 'part'
  },
  wiringHarness: {
    id: 'wiringHarness',
    name: 'Wiring Harness',
    amount: 0,
    description: 'Complete electrical wiring system',
    type: 'part'
  },

  // Assembly Systems
  engineAssembly: {
    id: 'engineAssembly',
    name: 'Engine Assembly',
    amount: 0,
    description: 'Complete engine power unit',
    type: 'part'
  },
  transmissionAssembly: {
    id: 'transmissionAssembly',
    name: 'Transmission Assembly',
    amount: 0,
    description: 'Complete power transfer system',
    type: 'part'
  },
  chassisAssembly: {
    id: 'chassisAssembly',
    name: 'Chassis Assembly',
    amount: 0,
    description: 'Complete vehicle foundation structure',
    type: 'part'
  },
  bodyAssembly: {
    id: 'bodyAssembly',
    name: 'Body Assembly',
    amount: 0,
    description: 'Complete vehicle shell and interior',
    type: 'part'
  },
  wheelAssembly: {
    id: 'wheelAssembly',
    name: 'Wheel Assembly',
    amount: 0,
    description: 'Complete wheel units',
    type: 'part'
  },
  electricalSystem: {
    id: 'electricalSystem',
    name: 'Electrical System',
    amount: 0,
    description: 'Complete electrical and lighting system',
    type: 'part'
  },
  fuelSystem: {
    id: 'fuelSystem',
    name: 'Fuel System',
    amount: 0,
    description: 'Complete fuel storage and delivery system',
    type: 'part'
  },

  // Final Product
  automobile: {
    id: 'automobile',
    name: 'Automobile',
    amount: 0,
    description: 'Complete early 1900s motor vehicle',
    type: 'part'
  },

  // Currency
  marks: {
    id: 'marks',
    name: 'Marks',
    amount: 0,
    description: 'Currency for trading',
    type: 'currency'
  }
};