export class FrameSync {
  private isUpdating: boolean = false;
  private lastUpdateTime: number = 0;
  private targetFrameTime: number = 16; // 60fps target
  private frameCount: number = 0;
  private lastFpsUpdate: number = 0;
  private currentFps: number = 0;

  constructor() {
    this.lastUpdateTime = performance.now();
    this.lastFpsUpdate = this.lastUpdateTime;
  }

  async startUpdate(): Promise<boolean> {
    // If we're already updating, don't start a new update
    if (this.isUpdating) {
      return false;
    }

    const now = performance.now();
    const elapsed = now - this.lastUpdateTime;
    
    // Update FPS counter
    this.frameCount++;
    if (now - this.lastFpsUpdate >= 1000) {
      this.currentFps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }

    // Only update if enough time has passed
    if (elapsed >= this.targetFrameTime) {
      this.isUpdating = true;
      this.lastUpdateTime = now;
      return true;
    }
    return false;
  }

  finishUpdate(): void {
    this.isUpdating = false;
  }

  getCurrentFps(): number {
    return this.currentFps;
  }

  setTargetFrameRate(fps: number): void {
    this.targetFrameTime = 1000 / fps;
  }
} 