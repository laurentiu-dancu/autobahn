export interface GameEvents {
  // Resource events
  resourceAmountChanged: { resourceId: string; oldAmount: number; newAmount: number };
  resourceDiscovered: { resourceId: string };
  
  // Machine events
  machineBuilt: { machineId: string; machine: any };
  machineStatusChanged: { machineId: string; oldStatus: string; newStatus: string };
  machineToggled: { machineId: string; isActive: boolean };
  machineUpgraded: { machineId: string; newLevel: number };
  
  // Personnel events
  personnelHired: { personnelId: string; personnel: any };
  personnelFired: { personnelId: string };
  
  // Rule events
  ruleCreated: { ruleId: string; rule: any };
  ruleToggled: { ruleId: string; isEnabled: boolean };
  ruleDeleted: { ruleId: string };
  
  // Market events
  marketTransactionCompleted: { type: 'buy' | 'sell'; resourceId: string; quantity: number; totalValue: number };
  
  // UI visibility events
  marketVisibilityChanged: { visible: boolean };
  stockControlVisibilityChanged: { visible: boolean };
  
  // Milestone events
  milestoneCompleted: { milestoneId: string; milestoneName: string };
  
  // Crafting events
  craftStarted: { recipeId: string };
  craftCompleted: { recipeId: string; outputs: { resourceId: string; amount: number }[] };
  
  // Salvage events
  materialSalvaged: { resourceId: string; amount: number };
  
  // General state events (kept for backwards compatibility)
  gameStateUpdated: { timestamp: number };
}

export type EventCallback<T = any> = (data: T) => void;

export class EventEmitter {
  private listeners: Map<keyof GameEvents, EventCallback[]> = new Map();

  on<K extends keyof GameEvents>(event: K, callback: EventCallback<GameEvents[K]>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  off<K extends keyof GameEvents>(event: K, callback: EventCallback<GameEvents[K]>): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  emit<K extends keyof GameEvents>(event: K, data: GameEvents[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  removeAllListeners(): void {
    this.listeners.clear();
  }
}