import { Milestone } from '../core/types';

export const MILESTONES: Milestone[] = [
  {
    id: 'firstWireSpring',
    name: 'First Wire Spring',
    description: 'Bend your first wire spring',
    condition: (state) => state.resources.wireSprings.amount >= 1,
    reward: (state, gameStateManager) => {
      // Unlock basic advanced crafting recipes immediately
      state.unlockedRecipes.add('machinePiston');
      state.unlockedRecipes.add('craftBearing');
      state.unlockedRecipes.add('assembleValve');
      state.unlockedRecipes.add('craftSparkPlug');
      
      // Unlock additional basic crafting recipes needed for progression
      state.unlockedRecipes.add('shapeMetalRod');
      state.unlockedRecipes.add('cutWoodPlanks');
      state.unlockedRecipes.add('makeElectricalWire');
      state.unlockedRecipes.add('formRubberTubing');
      
      // Unlock new raw materials in market
      state.uiState.discoveredResources.add('wood');
      state.uiState.discoveredResources.add('rubber');
      state.uiState.discoveredResources.add('coal');
      state.uiState.discoveredResources.add('glass');
      state.uiState.discoveredResources.add('fabric');
      
      // Unlock Advanced Crafting panel
      state.uiState.showAdvancedCrafting = true;
    }
  },
  {
    id: 'basicComponentProduction',
    name: 'Basic Component Production',
    description: 'Produce 5 different basic components',
    condition: (state) => {
      // Use components that are actually available after first milestone
      const basicComponents = ['wireSprings', 'metalBrackets', 'leatherGaskets', 'metalRods', 'electricalWire'];
      const producedCount = basicComponents.filter(id => (state.totalProduced[id] || 0) >= 1).length;
      return producedCount >= 5;
    },
    reward: (state) => {
      // Unlock remaining basic crafting recipes
      state.unlockedRecipes.add('forgeMetalPlate');
      state.unlockedRecipes.add('shapeGlassLens');
      state.unlockedRecipes.add('cutFabricStrips');
      state.unlockedRecipes.add('buildWoodFrame');
      
      // Unlock more advanced crafting recipes
      state.unlockedRecipes.add('machineGear');
      state.unlockedRecipes.add('assembleClutchPlate');
      state.unlockedRecipes.add('buildLeafSpring');
      state.unlockedRecipes.add('forgeCrankshaft');
    }
  },
  {
    id: 'firstAdvancedComponent',
    name: 'First Advanced Component',
    description: 'Craft your first advanced component',
    condition: (state) => {
      const advancedComponents = ['pistons', 'bearings', 'valves', 'sparkPlugs', 'gears', 'clutchPlates'];
      return advancedComponents.some(id => state.resources[id]?.amount >= 1);
    },
    reward: (state) => {
      // Unlock remaining advanced component recipes
      state.unlockedRecipes.add('forgeAxle');
      state.unlockedRecipes.add('craftBrakeShoe');
      state.unlockedRecipes.add('formBodyPanel');
      state.unlockedRecipes.add('upholsterSeat');
      state.unlockedRecipes.add('buildDashboard');
      state.unlockedRecipes.add('assembleBattery');
      state.unlockedRecipes.add('buildHeadlight');
      state.unlockedRecipes.add('assembleWiringHarness');
      
      // Unlock lead for batteries
      state.uiState.discoveredResources.add('lead');
      
      // Unlock first assembly recipes
      state.unlockedRecipes.add('assembleWheel');
      state.unlockedRecipes.add('assembleFuelSystem');
      
      // Unlock Assembly Systems panel
      state.uiState.showAssemblySystems = true;
    }
  },
  {
    id: 'advancedProduction',
    name: 'Advanced Production',
    description: 'Produce 3 different advanced components',
    condition: (state) => {
      const advancedComponents = ['pistons', 'gears', 'bearings', 'valves', 'sparkPlugs', 'clutchPlates', 'leafSprings', 'axles', 'brakeShoes'];
      const producedCount = advancedComponents.filter(id => (state.totalProduced[id] || 0) >= 1).length;
      return producedCount >= 3;
    },
    reward: (state) => {
      // Unlock all remaining assembly recipes
      state.unlockedRecipes.add('assembleEngine');
      state.unlockedRecipes.add('assembleTransmission');
      state.unlockedRecipes.add('assembleChassis');
      state.unlockedRecipes.add('assembleBody');
      state.unlockedRecipes.add('assembleElectricalSystem');
    }
  },
  {
    id: 'firstAssembly',
    name: 'First Assembly',
    description: 'Complete your first major assembly',
    condition: (state) => {
      const assemblies = ['wheelAssembly', 'fuelSystem', 'electricalSystem', 'engineAssembly', 'transmissionAssembly', 'chassisAssembly', 'bodyAssembly'];
      return assemblies.some(id => state.resources[id]?.amount >= 1);
    },
    reward: (state) => {
      // Unlock automobile construction
      state.unlockedRecipes.add('constructAutomobile');
      
      // Unlock Automobile Construction panel
      state.uiState.showAutomobileConstruction = true;
    }
  },
  {
    id: 'firstAutomobile',
    name: 'First Automobile',
    description: 'Construct your first complete automobile',
    condition: (state) => state.resources.automobile.amount >= 1,
    reward: (state) => {
      // Unlock advanced automation for all tiers
      state.unlockedMachines.add('advancedWireBendingJig');
      state.unlockedMachines.add('advancedFilingStation');
      state.unlockedMachines.add('assemblyLine');
    }
  },
  {
    id: 'springProduction',
    name: 'Spring Production',
    description: 'Produce 10 wire springs',
    condition: (state) => state.totalProduced.wireSprings >= 10,
    reward: (state) => {
      state.unlockedMachines.add('wireBendingJig');
    }
  },
  {
    id: 'firstSale',
    name: 'First Sale',
    description: 'Sell your first item',
    condition: (state) => state.totalSales > 0,
    reward: () => {
      // Market is already integrated from start
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
      if (gameStateManager && gameStateManager.setStockControlVisibility) {
        gameStateManager.setStockControlVisibility(true);
      } else {
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