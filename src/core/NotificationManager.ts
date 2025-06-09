export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: number;
  duration: number;
  isVisible: boolean;
  isRemoving: boolean;
}

export class NotificationManager {
  private notifications: Map<string, Notification> = new Map();
  private container: HTMLElement | null = null;
  private nextId = 1;

  constructor() {
    this.createContainer();
  }

  private createContainer(): void {
    // Remove existing container if it exists
    const existing = document.querySelector('.notifications-container');
    if (existing) {
      existing.remove();
    }

    this.container = document.createElement('div');
    this.container.className = 'notifications-container';
    document.body.appendChild(this.container);
  }

  addNotification(message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info', duration: number = 5000): string {
    const id = `notification_${this.nextId++}_${Date.now()}`;
    
    const notification: Notification = {
      id,
      message,
      type,
      timestamp: Date.now(),
      duration,
      isVisible: false,
      isRemoving: false
    };

    this.notifications.set(id, notification);
    this.renderNotification(notification);
    
    // Start the notification lifecycle
    requestAnimationFrame(() => {
      this.showNotification(id);
    });

    return id;
  }

  removeNotification(id: string): void {
    const notification = this.notifications.get(id);
    if (!notification || notification.isRemoving) return;

    notification.isRemoving = true;
    this.hideNotification(id);
  }

  private renderNotification(notification: Notification): void {
    if (!this.container) return;

    const element = document.createElement('div');
    element.className = `notification notification-${notification.type}`;
    element.setAttribute('data-notification-id', notification.id);
    element.style.transform = 'translateX(100%)';
    element.style.opacity = '0';

    element.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${notification.message}</span>
        <button class="notification-close" data-close-notification="${notification.id}">×</button>
      </div>
      <div class="notification-progress" data-notification-progress="${notification.id}"></div>
    `;

    // Attach close button event listener
    const closeBtn = element.querySelector('[data-close-notification]');
    closeBtn?.addEventListener('click', () => {
      this.removeNotification(notification.id);
    });

    this.container.appendChild(element);
  }

  private showNotification(id: string): void {
    const notification = this.notifications.get(id);
    if (!notification || notification.isRemoving) return;

    const element = this.container?.querySelector(`[data-notification-id="${id}"]`) as HTMLElement;
    if (!element) return;

    notification.isVisible = true;

    // Animate in
    element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    element.style.transform = 'translateX(0)';
    element.style.opacity = '1';

    // Start progress bar animation
    const progressBar = element.querySelector('[data-notification-progress]') as HTMLElement;
    if (progressBar) {
      // Small delay to ensure the notification is visible before starting progress
      setTimeout(() => {
        if (notification.isRemoving) return;
        
        progressBar.style.transition = `width ${notification.duration}ms linear`;
        progressBar.style.width = '0%';
      }, 100);
    }

    // Auto-remove after duration
    setTimeout(() => {
      if (!notification.isRemoving) {
        this.removeNotification(id);
      }
    }, notification.duration);
  }

  private hideNotification(id: string): void {
    const notification = this.notifications.get(id);
    if (!notification) return;

    const element = this.container?.querySelector(`[data-notification-id="${id}"]`) as HTMLElement;
    if (!element) {
      this.notifications.delete(id);
      return;
    }

    // Animate out
    element.style.transition = 'transform 0.3s ease, opacity 0.3s ease, max-height 0.3s ease, margin 0.3s ease, padding 0.3s ease';
    element.style.transform = 'translateX(100%)';
    element.style.opacity = '0';
    element.style.maxHeight = '0';
    element.style.marginBottom = '0';
    element.style.paddingTop = '0';
    element.style.paddingBottom = '0';

    // Remove from DOM and state after animation
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.notifications.delete(id);
    }, 300);
  }

  // Get all active notifications (for debugging/state inspection)
  getActiveNotifications(): Notification[] {
    return Array.from(this.notifications.values());
  }

  // Clear all notifications
  clearAll(): void {
    const ids = Array.from(this.notifications.keys());
    ids.forEach(id => this.removeNotification(id));
  }

  // Cleanup method
  destroy(): void {
    this.clearAll();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = null;
  }
}