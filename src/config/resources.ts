import { Resource } from '../core/types';

export const INITIAL_RESOURCES: Record<string, Resource> = {
  wireStock: {
    id: 'wireStock',
    name: 'Wire Stock',
    amount: 0, // Start with 0
    description: 'Basic metal wire for springs and components'
  },
  sheetMetal: {
    id: 'sheetMetal',
    name: 'Sheet Metal',
    amount: 0, // Start with 0
    description: 'Thin metal sheets for brackets'
  },
  leatherScraps: {
    id: 'leatherScraps',
    name: 'Leather Scraps',
    amount: 0, // Start with 0
    description: 'Leather pieces for gaskets'
  },
  oil: {
    id: 'oil',
    name: 'Oil',
    amount: 0, // Start with 0
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
    amount: 0, // Start with 0 marks
    description: 'Currency for trading'
  }
};