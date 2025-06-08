import { Recipe } from '../core/types';

export const RECIPES: Record<string, Recipe> = {
  bendWireSpring: {
    id: 'bendWireSpring',
    name: 'Bend Wire Spring',
    inputs: [{ resourceId: 'wireStock', amount: 1 }],
    outputs: [{ resourceId: 'wireSprings', amount: 1 }],
    craftTime: 2000, // 2 seconds for manual crafting
    description: 'Hand-bend wire into automotive springs'
  },
  fileMetalBracket: {
    id: 'fileMetalBracket',
    name: 'File Metal Bracket',
    inputs: [{ resourceId: 'sheetMetal', amount: 1 }],
    outputs: [{ resourceId: 'metalBrackets', amount: 1 }],
    craftTime: 3000, // 3 seconds for manual crafting
    description: 'File and shape mounting brackets'
  },
  cutLeatherGasket: {
    id: 'cutLeatherGasket',
    name: 'Cut Leather Gasket',
    inputs: [{ resourceId: 'leatherScraps', amount: 1 }],
    outputs: [{ resourceId: 'leatherGaskets', amount: 1 }],
    craftTime: 1500, // 1.5 seconds for manual crafting
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
    craftTime: 5000, // 5 seconds for manual crafting
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
    craftTime: 8000, // 8 seconds for manual crafting
    description: 'Package complete automotive repair kit'
  }
};