export interface GameEvents {
  resourceUpdated: { resourceId: string; oldAmount: number; newAmount: number };
  machineUpdated: { machineId: string; machine: any };
  personnelUpdated: { personnelId: string; personnel: any };
  ruleUpdated: { ruleId: string; rule: any };
  milestoneCompleted: { milestoneId: string; milestoneName: string };
  gameStateUpdated: { timestamp: number };
  uiStateUpdated: { changes: string[] };
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