export interface Resource {
  id: string;
  name: string;
  amount: number;
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  inputs: { resourceId: string; amount: number }[];
  outputs: { resourceId: string; amount: number }[];
  craftTime: number; // in milliseconds
  description: string;
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
  status: 'running' | 'waiting_resources' | 'stopped';
  statusMessage?: string;
  description: string;
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
  totalClicks: number;
  totalProduced: Record<string, number>;
  totalSales: number;
  totalMarketTransactions: number;
  gameStartTime: number;
  lastSaveTime: number;
  uiState: {
    discoveredResources: Set<string>;
    showMarket: boolean;
    showStockControl: boolean;
  };
}

export interface StockControlPersonnel {
  id: string;
  name: string;
  type: 'procurement' | 'sales' | 'coordinator';
  monthlySalary: number; // marks per minute
  hiringCost: number;
  isActive: boolean;
  hiredAt: number;
  description: string;
  capabilities: string[];
}

export interface StockControlRule {
  id: string;
  resourceId: string;
  type: 'buy' | 'sell';
  threshold: number;
  quantity: number;
  isEnabled: boolean;
  managedBy: string; // personnel id
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
  reward: (gameState: GameState) => void;
  completed: boolean;
}