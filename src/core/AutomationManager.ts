import { Machine } from './types';
import { GameStateManager } from './GameState';
import { MACHINES } from '../config/machines';
import { RECIPES } from '../config/recipes';

export class AutomationManager {
  private gameState: GameStateManager;

  constructor(gameState: GameStateManager) {
    this.gameState = gameState;
  }

  canBuildMachine(machineId: string): boolean {
    const machineTemplate = MACHINES[machineId];
    if (!machineTemplate) return false;

    const state = this.gameState.getState();
    if (!state.unlockedMachines.has(machineId)) return false;
    if (state.machines[machineId]) return false; // Already built

    return this.gameState.canAfford(machineTemplate.cost);
  }

  buildMachine(machineId: string): boolean {
    if (!this.canBuildMachine(machineId)) return false;

    const machineTemplate = MACHINES[machineId];
    if (!this.gameState.spendResources(machineTemplate.cost)) return false;

    // Check if we can afford the recipe inputs to determine initial state
    const recipe = RECIPES[machineTemplate.recipeId];
    const canAffordInputs = recipe ? this.gameState.canAfford(recipe.inputs) : false;

    const machine: Machine = {
      ...machineTemplate,
      lastProduction: Date.now(),
      isActive: true, // Start machines as active
      status: canAffordInputs ? 'running' : 'waiting_resources',
      statusMessage: canAffordInputs ? undefined : 'Waiting for resources'
    };

    this.gameState.addMachine(machineId, machine);
    return true;
  }

  canUpgradeMachine(machineId: string): boolean {
    const state = this.gameState.getState();
    const machine = state.machines[machineId];
    if (!machine) return false;

    const upgradeCost = machine.upgradeCost.map(cost => ({
      ...cost,
      amount: cost.amount * machine.level
    }));

    return this.gameState.canAfford(upgradeCost);
  }

  upgradeMachine(machineId: string): boolean {
    if (!this.canUpgradeMachine(machineId)) return false;

    const state = this.gameState.getState();
    const machine = state.machines[machineId];
    
    const upgradeCost = machine.upgradeCost.map(cost => ({
      ...cost,
      amount: cost.amount * machine.level
    }));

    if (!this.gameState.spendResources(upgradeCost)) return false;

    const updates = {
      level: machine.level + 1,
      productionRate: Math.max(0.5, machine.productionRate * 0.85) // 15% faster each level, minimum 50% of manual time (2x faster max)
    };
    this.gameState.updateMachine(machineId, updates);
    return true;
  }

  toggleMachine(machineId: string): void {
    const state = this.gameState.getState();
    const machine = state.machines[machineId];
    if (machine) {
      const wasActive = machine.isActive;
      const updates: any = { isActive: !wasActive };
      
      if (!wasActive) {
        // Starting the machine - check if we have resources
        const recipe = RECIPES[machine.recipeId];
        if (recipe && this.gameState.canAfford(recipe.inputs)) {
          updates.lastProduction = Date.now();
          updates.status = 'running';
          updates.statusMessage = undefined;
        } else {
          // No resources available - set to waiting
          const missingResources = recipe ? recipe.inputs
            .filter(input => {
              const available = state.resources[input.resourceId]?.amount || 0;
              return available < input.amount;
            })
            .map(input => {
              const resource = state.resources[input.resourceId];
              const available = resource?.amount || 0;
              return `${resource?.name || input.resourceId} (need ${input.amount}, have ${Math.floor(available)})`;
            }) : [];
          updates.status = 'waiting_resources';
          updates.statusMessage = missingResources.length > 0 ? `Waiting for: ${missingResources.join(', ')}` : 'Waiting for resources';
        }
      } else {
        // Stopping the machine
        updates.status = 'stopped';
        updates.statusMessage = 'Manually stopped';
      }
      
      this.gameState.updateMachine(machineId, updates);
    }
  }

  updateMachines(): void {
    const state = this.gameState.getState();
    const now = Date.now();

    Object.values(state.machines).forEach(machine => {
      let updates: any = {};
      let hasUpdates = false;
      
      // If machine is not active, ensure it's marked as stopped
      if (!machine.isActive) {
        if (machine.status !== 'stopped' || machine.statusMessage !== 'Manually stopped') {
          updates.status = 'stopped';
          updates.statusMessage = 'Manually stopped';
          hasUpdates = true;
        }
        if (hasUpdates) {
          this.gameState.updateMachine(machine.id, updates);
        }
        return;
      }

      const recipe = RECIPES[machine.recipeId];
      if (!recipe) return;

      const productionTime = recipe.craftTime * machine.productionRate;
      const timeSinceLastProduction = now - machine.lastProduction;

      // Check if enough time has passed for a production cycle
      if (timeSinceLastProduction >= productionTime) {
        // Check if we can afford the inputs
        if (this.gameState.canAfford(recipe.inputs)) {
          // Successfully produce
          this.gameState.spendResources(recipe.inputs);
          
          recipe.outputs.forEach(output => {
            this.gameState.updateResource(output.resourceId, output.amount);
          });

          updates.lastProduction = now;
          updates.status = 'running';
          updates.statusMessage = undefined;
          hasUpdates = true;
          this.gameState.checkMilestones();
        } else {
          // Can't afford inputs - update status to waiting
          const missingResources = recipe.inputs
            .filter(input => {
              const available = state.resources[input.resourceId]?.amount || 0;
              return available < input.amount;
            })
            .map(input => {
              const resource = state.resources[input.resourceId];
              const available = resource?.amount || 0;
              return `${resource?.name || input.resourceId} (need ${input.amount}, have ${Math.floor(available)})`;
            });
          
          if (machine.status !== 'waiting_resources') {
            updates.status = 'waiting_resources';
            updates.statusMessage = `Waiting for: ${missingResources.join(', ')}`;
            hasUpdates = true;
          }
        }
      } else {
        // Machine is still in production cycle
        if (machine.status === 'waiting_resources') {
          // Check if we now have resources available
          if (this.gameState.canAfford(recipe.inputs)) {
            updates.status = 'running';
            updates.statusMessage = undefined;
            hasUpdates = true;
            // Reset production timer to start producing immediately
            updates.lastProduction = now - productionTime;
          }
        } else if (machine.status !== 'running' && machine.status !== 'waiting_resources') {
          // Ensure running machines are marked as running
          updates.status = 'running';
          updates.statusMessage = undefined;
          hasUpdates = true;
        }
      }
      
      if (hasUpdates) {
        this.gameState.updateMachine(machine.id, updates);
      }
    });
  }

  getMachineProgress(machineId: string): number {
    const state = this.gameState.getState();
    const machine = state.machines[machineId];
    if (!machine || !machine.isActive || machine.status !== 'running') return 0;

    const recipe = RECIPES[machine.recipeId];
    if (!recipe) return 0;

    const productionTime = recipe.craftTime * machine.productionRate;
    const elapsed = Date.now() - machine.lastProduction;
    return Math.min(1, elapsed / productionTime);
  }

  getAvailableMachines(): string[] {
    const state = this.gameState.getState();
    return Array.from(state.unlockedMachines);
  }
}