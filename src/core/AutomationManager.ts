import { Machine } from './types';
import { GameStateManager } from './GameState';
import { CraftingSystem } from './CraftingSystem';
import { MACHINES } from '../config/machines';
import { RECIPES } from '../config/recipes';

export class AutomationManager {
  private gameState: GameStateManager;
  private craftingSystem: CraftingSystem;

  constructor(gameState: GameStateManager, craftingSystem: CraftingSystem) {
    this.gameState = gameState;
    this.craftingSystem = craftingSystem;
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

    const machine: Machine = {
      ...machineTemplate,
      lastProduction: Date.now(),
      isActive: true,
      status: 'running',
      statusMessage: undefined
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

    machine.level++;
    machine.productionRate = Math.max(0.5, machine.productionRate * 0.85); // 15% faster each level, minimum 50% of manual time (2x faster max)
    return true;
  }

  toggleMachine(machineId: string): void {
    const state = this.gameState.getState();
    const machine = state.machines[machineId];
    if (machine) {
      machine.isActive = !machine.isActive;
      if (machine.isActive) {
        machine.lastProduction = Date.now();
        machine.status = 'running';
        machine.statusMessage = undefined;
      } else {
        machine.status = 'paused';
        machine.statusMessage = 'Manually paused';
      }
    }
  }

  updateMachines(): void {
    const state = this.gameState.getState();
    const now = Date.now();

    Object.values(state.machines).forEach(machine => {
      if (!machine.isActive) {
        if (machine.status !== 'paused') {
          machine.status = 'paused';
          machine.statusMessage = 'Manually paused';
        }
        return;
      }

      const recipe = RECIPES[machine.recipeId];
      if (!recipe) return;

      const productionTime = recipe.craftTime * machine.productionRate; // Machine rate is multiplier of manual time
      const timeSinceLastProduction = now - machine.lastProduction;

      if (timeSinceLastProduction >= productionTime) {
        // Check if we can afford the inputs
        if (this.gameState.canAfford(recipe.inputs)) {
          // Successfully produce
          this.gameState.spendResources(recipe.inputs);
          
          recipe.outputs.forEach(output => {
            this.gameState.updateResource(output.resourceId, output.amount);
          });

          machine.lastProduction = now;
          machine.status = 'running';
          machine.statusMessage = undefined;
          this.gameState.checkMilestones();
        } else {
          // Can't afford inputs - update status
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
          
          machine.status = 'waiting_resources';
          machine.statusMessage = `Waiting for: ${missingResources.join(', ')}`;
        }
      } else {
        // Machine is still in production cycle
        if (machine.status === 'waiting_resources') {
          // Check if we now have resources available
          if (this.gameState.canAfford(recipe.inputs)) {
            machine.status = 'running';
            machine.statusMessage = undefined;
            // Reset production timer to start producing immediately
            machine.lastProduction = now - productionTime;
          }
        }
      }
    });
  }

  getMachineProgress(machineId: string): number {
    const state = this.gameState.getState();
    const machine = state.machines[machineId];
    if (!machine || !machine.isActive) return 0;

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