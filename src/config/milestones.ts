import { Milestone } from '../core/types';

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
      // No longer needed - market is integrated
    },
    completed: false
  },
  {
    id: 'tenMarketTransactions',
    name: 'Market Experience',
    description: 'Complete 10 market transactions',
    condition: (state) => state.totalMarketTransactions >= 10,
    reward: (state) => {
      state.unlockedStockControl.add('procurementSpecialist');
      state.unlockedStockControl.add('salesManager');
      state.uiState.showStockControl = true;
    },
    completed: false
  },
  {
    id: 'hireBasicSpecialists',
    name: 'Basic Automation',
    description: 'Hire both procurement specialist and sales manager',
    condition: (state) => {
      return state.stockControl.personnel.procurementSpecialist && 
             state.stockControl.personnel.salesManager;
    },
    reward: (state) => {
      state.unlockedStockControl.add('supplyChainCoordinator');
    },
  }
];