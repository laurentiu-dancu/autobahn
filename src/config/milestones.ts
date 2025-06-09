import { Milestone } from '../core/types';

export const MILESTONES: Milestone[] = [
  {
    id: 'firstWireSpring',
    name: 'First Wire Spring',
    description: 'Bend your first wire spring',
    condition: (state) => state.resources.wireSprings.amount >= 1,
    reward: (state, gameStateManager) => {
      state.unlockedRecipes.add('assembleSpringSet');
      // Market is already available from start, no need to unlock
    }
  },
  {
    id: 'tenWireSprings',
    name: 'Spring Production',
    description: 'Produce 10 wire springs',
    condition: (state) => state.totalProduced.wireSprings >= 10,
    reward: (state) => {
      state.unlockedMachines.add('wireBendingJig');
    }
  },
  {
    id: 'firstSpringAssembly',
    name: 'First Assembly',
    description: 'Create your first spring assembly',
    condition: (state) => state.resources.springAssemblies.amount >= 1,
    reward: (state) => {
      state.unlockedRecipes.add('buildRepairKit');
      state.unlockedMachines.add('filingStation');
    }
  },
  {
    id: 'firstSale',
    name: 'First Sale',
    description: 'Sell your first item',
    condition: (state) => state.totalSales > 0,
    reward: () => {
      // No longer needed - market is integrated
    }
  },
  {
    id: 'tenMarketTransactions',
    name: 'Market Experience',
    description: 'Complete 10 market transactions',
    condition: (state) => state.totalMarketTransactions >= 10,
    reward: (state, gameStateManager) => {
      state.unlockedStockControl.add('procurementSpecialist');
      state.unlockedStockControl.add('salesManager');
      // Use the new method instead of direct assignment
      if (gameStateManager && gameStateManager.setStockControlVisibility) {
        gameStateManager.setStockControlVisibility(true);
      } else {
        // Fallback for backwards compatibility
        state.uiState.showStockControl = true;
      }
    }
  },
  {
    id: 'hireBasicSpecialists',
    name: 'Basic Automation',
    description: 'Hire both procurement specialist and sales manager',
    condition: (state) => {
      return !!(state.stockControl.personnel.procurementSpecialist && 
                state.stockControl.personnel.salesManager);
    },
    reward: (state) => {
      state.unlockedStockControl.add('supplyChainCoordinator');
    }
  }
];