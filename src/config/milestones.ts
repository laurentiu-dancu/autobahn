import { Milestone } from '../core/types';

export const MILESTONES: Milestone[] = [
  // BASIC CRAFTING TIER MILESTONES
  {
    id: 'firstWireSpring',
    name: 'First Wire Spring',
    description: 'Bend your first wire spring',
    condition: (state) => state.resources.wireSprings.amount >= 1,
    reward: (state, gameStateManager) => {
      // Unlock only metal rod shaping - logical progression from wire work
      state.unlockedRecipes.add('shapeMetalRod');
      
      gameStateManager?.addNotification('Wire working unlocked metal shaping!', 'success', 3000);
    }
  },
  {
    id: 'firstMetalBracket',
    name: 'First Metal Bracket',
    description: 'File your first metal bracket',
    condition: (state) => state.resources.metalBrackets.amount >= 1,
    reward: (state, gameStateManager) => {
      // Unlock metal plate forging - progression from bracket work
      state.unlockedRecipes.add('forgeMetalPlate');
      
      gameStateManager?.addNotification('Metal filing unlocked plate forging!', 'success', 3000);
    }
  },
  {
    id: 'firstLeatherGasket',
    name: 'First Leather Gasket',
    description: 'Cut your first leather gasket',
    condition: (state) => state.resources.leatherGaskets.amount >= 1,
    reward: (state, gameStateManager) => {
      // Unlock fabric work - logical progression from leather cutting
      state.unlockedRecipes.add('cutFabricStrips');
      state.uiState.discoveredResources.add('fabric');
      
      gameStateManager?.addNotification('Leather work unlocked fabric processing!', 'success', 3000);
    }
  },
  {
    id: 'basicMetalworking',
    name: 'Basic Metalworking',
    description: 'Master basic metal shaping',
    condition: (state) => (state.totalProduced.metalRods || 0) >= 3 && (state.totalProduced.metalPlates || 0) >= 2,
    reward: (state, gameStateManager) => {
      // Unlock wood work - need structural materials for frames
      state.unlockedRecipes.add('cutWoodPlanks');
      state.unlockedRecipes.add('buildWoodFrame');
      state.uiState.discoveredResources.add('wood');
      
      gameStateManager?.addNotification('Metalworking mastery unlocked woodworking!', 'success', 3000);
    }
  },
  {
    id: 'electricalIntroduction',
    name: 'Electrical Introduction',
    description: 'Produce 5 wire springs to understand electrical potential',
    condition: (state) => (state.totalProduced.wireSprings || 0) >= 5,
    reward: (state, gameStateManager) => {
      // Unlock electrical wire making - progression from wire springs
      state.unlockedRecipes.add('makeElectricalWire');
      state.uiState.discoveredResources.add('rubber');
      
      gameStateManager?.addNotification('Wire expertise unlocked electrical components!', 'success', 3000);
    }
  },
  {
    id: 'rubberProcessing',
    name: 'Rubber Processing',
    description: 'Create electrical wire to unlock rubber processing',
    condition: (state) => (state.totalProduced.electricalWire || 0) >= 1,
    reward: (state, gameStateManager) => {
      // Unlock rubber tubing and glass work
      state.unlockedRecipes.add('formRubberTubing');
      state.unlockedRecipes.add('shapeGlassLens');
      state.uiState.discoveredResources.add('glass');
      
      gameStateManager?.addNotification('Electrical work unlocked advanced materials!', 'success', 3000);
    }
  },
  {
    id: 'basicComponentMastery',
    name: 'Basic Component Mastery',
    description: 'Demonstrate mastery of basic component production',
    condition: (state) => {
      const basicComponents = ['wireSprings', 'metalBrackets', 'leatherGaskets', 'metalRods', 'metalPlates'];
      const masteredCount = basicComponents.filter(id => (state.totalProduced[id] || 0) >= 5).length;
      return masteredCount >= 4;
    },
    reward: (state, gameStateManager) => {
      // Unlock coal for heat treatment and advanced crafting tier
      state.uiState.discoveredResources.add('coal');
      state.uiState.showAdvancedCrafting = true;
      
      // Unlock first advanced components - engine basics
      state.unlockedRecipes.add('craftBearing');
      state.unlockedRecipes.add('assembleValve');
      
      gameStateManager?.addNotification('🔧 Advanced Crafting Unlocked!', 'success', 4000);
    }
  },

  // ADVANCED CRAFTING TIER MILESTONES
  {
    id: 'engineComponentBasics',
    name: 'Engine Component Basics',
    description: 'Create first engine components',
    condition: (state) => (state.totalProduced.bearings || 0) >= 2 && (state.totalProduced.valves || 0) >= 2,
    reward: (state, gameStateManager) => {
      // Unlock piston and spark plug crafting
      state.unlockedRecipes.add('machinePiston');
      state.unlockedRecipes.add('craftSparkPlug');
      
      gameStateManager?.addNotification('Engine basics unlocked piston technology!', 'success', 3000);
    }
  },
  {
    id: 'powerSystemDevelopment',
    name: 'Power System Development',
    description: 'Develop core engine power components',
    condition: (state) => (state.totalProduced.pistons || 0) >= 3 && (state.totalProduced.sparkPlugs || 0) >= 3,
    reward: (state, gameStateManager) => {
      // Unlock transmission components
      state.unlockedRecipes.add('machineGear');
      state.unlockedRecipes.add('assembleClutchPlate');
      
      gameStateManager?.addNotification('Power systems unlocked transmission technology!', 'success', 3000);
    }
  },
  {
    id: 'transmissionMastery',
    name: 'Transmission Mastery',
    description: 'Master transmission component production',
    condition: (state) => (state.totalProduced.gears || 0) >= 4 && (state.totalProduced.clutchPlates || 0) >= 2,
    reward: (state, gameStateManager) => {
      // Unlock chassis components
      state.unlockedRecipes.add('buildLeafSpring');
      state.unlockedRecipes.add('forgeAxle');
      state.unlockedRecipes.add('craftBrakeShoe');
      
      gameStateManager?.addNotification('Transmission mastery unlocked chassis systems!', 'success', 3000);
    }
  },
  {
    id: 'chassisDevelopment',
    name: 'Chassis Development',
    description: 'Develop vehicle chassis components',
    condition: (state) => (state.totalProduced.leafSprings || 0) >= 2 && (state.totalProduced.axles || 0) >= 2,
    reward: (state, gameStateManager) => {
      // Unlock body components
      state.unlockedRecipes.add('formBodyPanel');
      state.unlockedRecipes.add('upholsterSeat');
      state.unlockedRecipes.add('buildDashboard');
      
      gameStateManager?.addNotification('Chassis development unlocked body construction!', 'success', 3000);
    }
  },
  {
    id: 'bodyConstruction',
    name: 'Body Construction',
    description: 'Master vehicle body construction',
    condition: (state) => (state.totalProduced.bodyPanels || 0) >= 3 && (state.totalProduced.seats || 0) >= 1,
    reward: (state, gameStateManager) => {
      // Unlock electrical systems and lead
      state.unlockedRecipes.add('assembleBattery');
      state.unlockedRecipes.add('buildHeadlight');
      state.unlockedRecipes.add('assembleWiringHarness');
      state.uiState.discoveredResources.add('lead');
      
      gameStateManager?.addNotification('Body construction unlocked electrical systems!', 'success', 3000);
    }
  },
  {
    id: 'electricalSystemMastery',
    name: 'Electrical System Mastery',
    description: 'Master electrical component production',
    condition: (state) => (state.totalProduced.batteries || 0) >= 1 && (state.totalProduced.headlights || 0) >= 2,
    reward: (state, gameStateManager) => {
      // Unlock assembly systems tier
      state.unlockedRecipes.add('assembleWheel');
      state.unlockedRecipes.add('assembleFuelSystem');
      state.uiState.showAssemblySystems = true;
      
      gameStateManager?.addNotification('🏭 Assembly Systems Unlocked!', 'success', 4000);
    }
  },

  // ASSEMBLY SYSTEMS TIER MILESTONES
  {
    id: 'firstAssemblyCompletion',
    name: 'First Assembly Completion',
    description: 'Complete your first major assembly',
    condition: (state) => (state.totalProduced.wheelAssembly || 0) >= 1 || (state.totalProduced.fuelSystem || 0) >= 1,
    reward: (state, gameStateManager) => {
      // Unlock major assemblies
      state.unlockedRecipes.add('assembleEngine');
      state.unlockedRecipes.add('assembleTransmission');
      
      gameStateManager?.addNotification('First assembly unlocked major systems!', 'success', 3000);
    }
  },
  {
    id: 'majorSystemsProduction',
    name: 'Major Systems Production',
    description: 'Produce major vehicle systems',
    condition: (state) => (state.totalProduced.engineAssembly || 0) >= 1 && (state.totalProduced.transmissionAssembly || 0) >= 1,
    reward: (state, gameStateManager) => {
      // Unlock remaining assemblies
      state.unlockedRecipes.add('assembleChassis');
      state.unlockedRecipes.add('assembleBody');
      state.unlockedRecipes.add('assembleElectricalSystem');
      
      gameStateManager?.addNotification('Major systems unlocked final assemblies!', 'success', 3000);
    }
  },
  {
    id: 'assemblyMastery',
    name: 'Assembly Mastery',
    description: 'Master assembly system production',
    condition: (state) => {
      const assemblies = ['wheelAssembly', 'fuelSystem', 'engineAssembly', 'transmissionAssembly', 'chassisAssembly', 'bodyAssembly', 'electricalSystem'];
      const completedCount = assemblies.filter(id => (state.totalProduced[id] || 0) >= 1).length;
      return completedCount >= 5;
    },
    reward: (state, gameStateManager) => {
      // Unlock automobile construction
      state.unlockedRecipes.add('constructAutomobile');
      state.uiState.showAutomobileConstruction = true;
      
      gameStateManager?.addNotification('🚗 Automobile Construction Unlocked!', 'success', 4000);
    }
  },

  // AUTOMOBILE CONSTRUCTION TIER MILESTONES
  {
    id: 'firstAutomobile',
    name: 'First Automobile',
    description: 'Construct your first complete automobile',
    condition: (state) => (state.totalProduced.automobile || 0) >= 1,
    reward: (state, gameStateManager) => {
      // Major milestone - unlock advanced automation
      state.unlockedMachines.add('advancedWireBendingJig');
      state.unlockedMachines.add('advancedFilingStation');
      state.unlockedMachines.add('assemblyLine');
      
      // Bonus marks for achievement
      state.resources.marks.amount += 500;
      
      gameStateManager?.addNotification('🎉 First Automobile Complete! Advanced automation unlocked!', 'success', 5000);
    }
  },
  {
    id: 'automobileProduction',
    name: 'Automobile Production',
    description: 'Establish automobile production line',
    condition: (state) => (state.totalProduced.automobile || 0) >= 3,
    reward: (state, gameStateManager) => {
      // Unlock logistics coordination
      state.unlockedStockControl.add('logisticsCoordinator');
      
      // Bonus marks
      state.resources.marks.amount += 1000;
      
      gameStateManager?.addNotification('Production line established! Logistics unlocked!', 'success', 4000);
    }
  },

  // AUTOMATION MILESTONES
  {
    id: 'springProductionLine',
    name: 'Spring Production Line',
    description: 'Establish consistent spring production',
    condition: (state) => (state.totalProduced.wireSprings || 0) >= 10,
    reward: (state, gameStateManager) => {
      state.unlockedMachines.add('wireBendingJig');
      gameStateManager?.addNotification('Wire Bending Jig unlocked!', 'success', 3000);
    }
  },
  {
    id: 'bracketProductionLine',
    name: 'Bracket Production Line',
    description: 'Establish consistent bracket production',
    condition: (state) => (state.totalProduced.metalBrackets || 0) >= 10,
    reward: (state, gameStateManager) => {
      state.unlockedMachines.add('filingStation');
      gameStateManager?.addNotification('Filing Station unlocked!', 'success', 3000);
    }
  },
  {
    id: 'pistonManufacturing',
    name: 'Piston Manufacturing',
    description: 'Scale up piston production',
    condition: (state) => (state.totalProduced.pistons || 0) >= 15,
    reward: (state, gameStateManager) => {
      state.unlockedMachines.add('pistonPress');
      gameStateManager?.addNotification('Piston Press unlocked!', 'success', 3000);
    }
  },
  {
    id: 'gearManufacturing',
    name: 'Gear Manufacturing',
    description: 'Scale up gear production',
    condition: (state) => (state.totalProduced.gears || 0) >= 12,
    reward: (state, gameStateManager) => {
      state.unlockedMachines.add('gearCuttingMachine');
      gameStateManager?.addNotification('Gear Cutting Machine unlocked!', 'success', 3000);
    }
  },
  {
    id: 'engineAssemblyAutomation',
    name: 'Engine Assembly Automation',
    description: 'Automate engine assembly process',
    condition: (state) => (state.totalProduced.engineAssembly || 0) >= 3,
    reward: (state, gameStateManager) => {
      state.unlockedMachines.add('engineAssemblyRig');
      gameStateManager?.addNotification('Engine Assembly Rig unlocked!', 'success', 3000);
    }
  },
  {
    id: 'chassisAssemblyAutomation',
    name: 'Chassis Assembly Automation',
    description: 'Automate chassis assembly process',
    condition: (state) => (state.totalProduced.chassisAssembly || 0) >= 3,
    reward: (state, gameStateManager) => {
      state.unlockedMachines.add('chassisAssemblyRig');
      gameStateManager?.addNotification('Chassis Assembly Rig unlocked!', 'success', 3000);
    }
  },

  // MARKET & STOCK CONTROL MILESTONES
  {
    id: 'firstSale',
    name: 'First Sale',
    description: 'Sell your first item',
    condition: (state) => state.totalSales > 0,
    reward: (state, gameStateManager) => {
      // Market is already integrated from start
      gameStateManager?.addNotification('Welcome to commerce!', 'success', 2000);
    }
  },
  {
    id: 'marketExperience',
    name: 'Market Experience',
    description: 'Complete multiple market transactions',
    condition: (state) => state.totalMarketTransactions >= 10,
    reward: (state, gameStateManager) => {
      state.unlockedStockControl.add('procurementSpecialist');
      state.unlockedStockControl.add('salesManager');
      state.uiState.showStockControl = true;
      
      gameStateManager?.addNotification('📊 Stock Control Unlocked!', 'success', 4000);
    }
  },
  {
    id: 'stockControlMastery',
    name: 'Stock Control Mastery',
    description: 'Master automated trading systems',
    condition: (state) => {
      return !!(state.stockControl.personnel.procurementSpecialist && 
                state.stockControl.personnel.salesManager);
    },
    reward: (state, gameStateManager) => {
      state.unlockedStockControl.add('supplyChainCoordinator');
      gameStateManager?.addNotification('Supply Chain Coordinator unlocked!', 'success', 3000);
    }
  }
];