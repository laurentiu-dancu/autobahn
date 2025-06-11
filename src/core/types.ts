export interface Resource {
  id: string;
  name: string;
  amount: number;
  type: 'material' | 'part' | 'currency';
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  inputs: { resourceId: string; amount: number }[];
  outputs: { resourceId: string; amount: number }[];
  craftTime: number; // in milliseconds
  description: string;
  tier: 'basic' | 'advanced' | 'assembly' | 'automobile'; // New tier system
}

export interface Machine {
  id: string;
  name: string;
  recipeId: string;
  level: number;
  cost: { resourceId: string; amount: number }[];
  upgradeCost: { resourceId: string; amount: number }[];
  productionRate: number; // multiplier for base craft time
  isActive: boolean;
  lastProduction: number;
  status?: 'running' | 'waiting_resources' | 'stopped';
  statusMessage?: string;
  description: string;
}

export interface UIState {
  discoveredResources: Set<string>;
  showMarket: boolean;
  showStockControl: boolean;
  showStockRules: boolean;
  showAdvancedCrafting: boolean;
  showAssemblySystems: boolean;
  showAutomobileConstruction: boolean;
  // New UI state properties for better state management
  activePanel?: string;
  panelStates: {
    [panelId: string]: {
      expanded: boolean;
      activeTab?: string;
    };
  };
}

export interface GameState {
  resources: Record<string, Resource>;
  machines: Record<string, Machine>;
  stockControl: {
    personnel: Record<string, StockControlPersonnel>;
    rules: Record<string, StockControlRule>;
    lastSalaryPayment: number;
  };
  unlockedRecipes: Set<string>;
  unlockedMachines: Set<string>;
  unlockedStockControl: Set<string>;
  completedMilestones: Set<string>;
  totalClicks: number;
  totalProduced: Record<string, number>;
  totalSales: number;
  totalMarketTransactions: number;
  gameStartTime: number;
  lastSaveTime: number;
  uiState: UIState;
}

export interface StockControlPersonnel {
  id: string;
  name: string;
  type: 'procurement' | 'sales' | 'coordinator';
  monthlySalary: number; // marks per minute
  upfrontCost: number;
  hiringCost: number;
  isActive: boolean;
  hiredAt?: number;
  description: string;
  capabilities: string[];
}

export interface StockControlRule {
  id: string;
  resourceId: string;
  threshold: number;
  action: 'buy' | 'sell';
  isEnabled: boolean;
  managedBy: string | null;
  quantity?: number;
}

export interface MarketItem {
  resourceId: string;
  buyPrice?: number;
  sellPrice?: number;
  available: boolean;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  condition: (gameState: GameState) => boolean;
  reward: (gameState: GameState, gameStateManager?: any) => void;
}

// UI Data interfaces for better type safety
export interface UIResourceData {
  id: string;
  name: string;
  amount: number;
  displayAmount: string;
  canBuy: boolean;
  canSell: boolean;
  buyPrice?: number;
  sellPrice?: number;
  isDiscovered: boolean;
  type: 'material' | 'part';  // New property to distinguish materials from parts
}

export interface UICraftingData {
  recipeId: string;
  name: string;
  description: string;
  canCraft: boolean;
  isCrafting: boolean;
  progress: number;
  craftTime: number;
  tier: 'basic' | 'advanced' | 'assembly' | 'automobile';
  inputs: { resourceId: string; name: string; amount: number; available: number }[];
  outputs: { resourceId: string; name: string; amount: number }[];
}

export interface UIMachineData {
  id: string;
  name: string;
  level: number;
  isActive: boolean;
  status: 'running' | 'waiting_resources' | 'stopped';
  statusMessage?: string;
  progress: number;
  canUpgrade: boolean;
  upgradeCost: { resourceId: string; name: string; amount: number }[];
  efficiency: number;
  currentSpeed: string;
  manualSpeed: string;
}

export interface UIPersonnelData {
  id: string;
  name: string;
  type: string;
  monthlySalary: number;
  hiringCost: number;
  totalCost: number;
  canHire: boolean;
  isActive: boolean;
  description: string;
  capabilities: string[];
  managedRulesCount: number;
}

export interface UIRuleData {
  id: string;
  resourceName: string;
  type: 'buy' | 'sell';
  threshold: number;
  quantity: number;
  isEnabled: boolean;
  managerName: string;
}