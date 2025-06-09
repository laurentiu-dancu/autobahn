import { RECIPES } from '../config/recipes';
import { MACHINES } from '../config/machines';

export class DevMode {
  private static instance: DevMode;
  private isEnabled: boolean = false;
  private debugPanel: HTMLElement | null = null;
  private gameState: any;
  private craftingSystem: any;
  private automationManager: any;
  private marketSystem: any;

  private constructor() {
    // Check for dev mode flag in URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const devFlag = urlParams.get('dev') === 'true' || localStorage.getItem('autobahn-dev-mode') === 'true';
    
    if (devFlag) {
      this.enable();
    }
  }

  static getInstance(): DevMode {
    if (!DevMode.instance) {
      DevMode.instance = new DevMode();
    }
    return DevMode.instance;
  }

  initialize(gameState: any, craftingSystem: any, automationManager: any, marketSystem: any): void {
    this.gameState = gameState;
    this.craftingSystem = craftingSystem;
    this.automationManager = automationManager;
    this.marketSystem = marketSystem;

    if (this.isEnabled) {
      this.createDebugPanel();
      this.setupKeyboardShortcuts();
      this.logSystemInfo();
    }
  }

  enable(): void {
    this.isEnabled = true;
    localStorage.setItem('autobahn-dev-mode', 'true');
    console.log('🔧 Dev Mode Enabled');
    
    if (this.gameState) {
      this.createDebugPanel();
      this.setupKeyboardShortcuts();
      this.logSystemInfo();
    }
  }

  disable(): void {
    this.isEnabled = false;
    localStorage.removeItem('autobahn-dev-mode');
    if (this.debugPanel) {
      this.debugPanel.remove();
      this.debugPanel = null;
    }
    console.log('🔧 Dev Mode Disabled');
  }

  isDevMode(): boolean {
    return this.isEnabled;
  }

  private createDebugPanel(): void {
    if (this.debugPanel) return;

    this.debugPanel = document.createElement('div');
    this.debugPanel.id = 'dev-panel';
    this.debugPanel.innerHTML = `
      <div class="dev-panel-header">
        <h3>🔧 Dev Tools</h3>
        <button id="dev-panel-toggle">−</button>
      </div>
      <div class="dev-panel-content">
        <div class="dev-section">
          <h4>Quick Actions</h4>
          <button id="dev-add-resources">Add Resources</button>
          <button id="dev-add-money">Add 100 Marks</button>
          <button id="dev-unlock-all">Unlock All</button>
          <button id="dev-reset-ui">Reset UI State</button>
        </div>
        
        <div class="dev-section">
          <h4>Game State</h4>
          <button id="dev-log-state">Log State</button>
          <button id="dev-export-save">Export Save</button>
          <button id="dev-import-save">Import Save</button>
          <input type="file" id="dev-save-file" accept=".json" style="display: none;">
        </div>
        
        <div class="dev-section">
          <h4>Performance</h4>
          <div id="dev-performance">
            <div>FPS: <span id="dev-fps">--</span></div>
            <div>Update Time: <span id="dev-update-time">--</span>ms</div>
            <div>Render Time: <span id="dev-render-time">--</span>ms</div>
          </div>
        </div>
        
        <div class="dev-section">
          <h4>Debug Log</h4>
          <div id="dev-log" class="dev-log"></div>
          <button id="dev-clear-log">Clear Log</button>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #dev-panel {
        position: fixed;
        top: 10px;
        left: 10px;
        width: 300px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #00ff00;
        border-radius: 8px;
        color: #00ff00;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        z-index: 10000;
        max-height: 80vh;
        overflow-y: auto;
      }
      
      .dev-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: rgba(0, 255, 0, 0.1);
        border-bottom: 1px solid #00ff00;
      }
      
      .dev-panel-header h3 {
        margin: 0;
        font-size: 14px;
      }
      
      #dev-panel-toggle {
        background: none;
        border: 1px solid #00ff00;
        color: #00ff00;
        cursor: pointer;
        padding: 2px 8px;
        border-radius: 3px;
      }
      
      .dev-panel-content {
        padding: 10px;
      }
      
      .dev-section {
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #004400;
      }
      
      .dev-section h4 {
        margin: 0 0 8px 0;
        color: #88ff88;
        font-size: 12px;
      }
      
      .dev-section button {
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid #00ff00;
        color: #00ff00;
        padding: 4px 8px;
        margin: 2px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 11px;
      }
      
      .dev-section button:hover {
        background: rgba(0, 255, 0, 0.2);
      }
      
      .dev-log {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #004400;
        padding: 8px;
        height: 100px;
        overflow-y: auto;
        font-size: 10px;
        margin-bottom: 5px;
      }
      
      #dev-performance div {
        margin: 2px 0;
      }
      
      .dev-panel-content.collapsed {
        display: none;
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(this.debugPanel);
    this.attachDebugEventListeners();
    this.startPerformanceMonitoring();
  }

  private attachDebugEventListeners(): void {
    if (!this.debugPanel) return;

    // Panel toggle
    this.debugPanel.querySelector('#dev-panel-toggle')?.addEventListener('click', () => {
      const content = this.debugPanel?.querySelector('.dev-panel-content');
      const toggle = this.debugPanel?.querySelector('#dev-panel-toggle');
      if (content && toggle) {
        content.classList.toggle('collapsed');
        toggle.textContent = content.classList.contains('collapsed') ? '+' : '−';
      }
    });

    // Quick actions
    this.debugPanel.querySelector('#dev-add-resources')?.addEventListener('click', () => {
      this.addTestResources();
    });

    this.debugPanel.querySelector('#dev-add-money')?.addEventListener('click', () => {
      this.gameState.updateResource('marks', 100);
      this.log('Added 100 marks');
    });

    this.debugPanel.querySelector('#dev-unlock-all')?.addEventListener('click', () => {
      this.unlockAll();
    });

    this.debugPanel.querySelector('#dev-reset-ui')?.addEventListener('click', () => {
      this.resetUIState();
    });

    // Game state actions
    this.debugPanel.querySelector('#dev-log-state')?.addEventListener('click', () => {
      console.log('Game State:', this.gameState.getState());
      this.log('Game state logged to console');
    });

    this.debugPanel.querySelector('#dev-export-save')?.addEventListener('click', () => {
      this.exportSave();
    });

    this.debugPanel.querySelector('#dev-import-save')?.addEventListener('click', () => {
      this.debugPanel?.querySelector('#dev-save-file')?.click();
    });

    this.debugPanel.querySelector('#dev-save-file')?.addEventListener('change', (e) => {
      this.importSave(e as Event);
    });

    this.debugPanel.querySelector('#dev-clear-log')?.addEventListener('click', () => {
      const logElement = this.debugPanel?.querySelector('#dev-log');
      if (logElement) logElement.innerHTML = '';
    });
  }

  private setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      if (!this.isEnabled) return;

      // Ctrl + Shift + D: Toggle dev panel
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        if (this.debugPanel) {
          this.debugPanel.style.display = this.debugPanel.style.display === 'none' ? 'block' : 'none';
        }
      }

      // Ctrl + Shift + R: Add resources
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        this.addTestResources();
      }

      // Ctrl + Shift + M: Add money
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        this.gameState.updateResource('marks', 100);
        this.log('Added 100 marks (hotkey)');
      }
    });
  }

  private addTestResources(): void {
    const resources = ['wireStock', 'sheetMetal', 'leatherScraps', 'oil'];
    resources.forEach(resourceId => {
      this.gameState.updateResource(resourceId, 10);
    });
    this.log('Added 10 of each basic resource');
  }

  private unlockAll(): void {
    const state = this.gameState.getState();
    
    // Unlock all recipes
    Object.keys(RECIPES).forEach(recipeId => {
      state.unlockedRecipes.add(recipeId);
    });

    // Unlock all machines
    Object.keys(MACHINES).forEach(machineId => {
      state.unlockedMachines.add(machineId);
    });

    // Show all UI elements
    state.uiState.showMarket = true;
    state.uiState.showFullMarket = true;
    
    this.log('Unlocked all recipes, machines, and UI elements');
  }

  private resetUIState(): void {
    const state = this.gameState.getState();
    state.uiState = {
      discoveredResources: new Set(['marks']),
      showMarket: false,
      showFullMarket: false,
      showEmergencyLabor: false
    };
    this.log('Reset UI state to initial values');
  }

  private exportSave(): void {
    this.gameState.saveGame();
    const saveData = localStorage.getItem('autobahn-save');
    if (saveData) {
      const blob = new Blob([saveData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `autobahn-save-${new Date().toISOString().slice(0, 19)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.log('Save exported');
    }
  }

  private importSave(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = e.target?.result as string;
        localStorage.setItem('autobahn-save', saveData);
        location.reload(); // Reload to apply imported save
      } catch (error) {
        this.log(`Import failed: ${error}`);
      }
    };
    reader.readAsText(file);
  }

  private startPerformanceMonitoring(): void {
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;

    const updatePerformance = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastFpsUpdate >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
        const fpsElement = this.debugPanel?.querySelector('#dev-fps');
        if (fpsElement) fpsElement.textContent = fps.toString();
        
        frameCount = 0;
        lastFpsUpdate = now;
      }

      lastTime = now;
      if (this.isEnabled) {
        requestAnimationFrame(updatePerformance);
      }
    };

    requestAnimationFrame(updatePerformance);
  }

  log(message: string): void {
    if (!this.isEnabled) return;

    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    
    console.log(`🔧 ${logMessage}`);
    
    const logElement = this.debugPanel?.querySelector('#dev-log');
    if (logElement) {
      const logEntry = document.createElement('div');
      logEntry.textContent = logMessage;
      logElement.appendChild(logEntry);
      logElement.scrollTop = logElement.scrollHeight;
    }
  }

  private logSystemInfo(): void {
    console.group('🔧 Autobahn Dev Mode - System Info');
    console.log('User Agent:', navigator.userAgent);
    console.log('Screen Resolution:', `${screen.width}x${screen.height}`);
    console.log('Viewport:', `${window.innerWidth}x${window.innerHeight}`);
    console.log('Local Storage Available:', typeof Storage !== 'undefined');
    console.log('Performance API Available:', typeof performance !== 'undefined');
    console.groupEnd();
  }

  // Public methods for external debugging
  getGameState() {
    return this.gameState?.getState();
  }

  setResource(resourceId: string, amount: number): void {
    if (this.gameState) {
      this.gameState.getState().resources[resourceId].amount = amount;
      this.log(`Set ${resourceId} to ${amount}`);
    }
  }

  triggerMilestone(milestoneId: string): void {
    if (this.gameState) {
      this.gameState.checkMilestones();
      this.log(`Triggered milestone check`);
    }
  }
}

// Global dev mode access
(window as any).devMode = DevMode.getInstance();