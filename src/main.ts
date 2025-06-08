import { App } from './App';
import './styles/main.css';

// Initialize the game
const appContainer = document.querySelector<HTMLDivElement>('#app')!;
const game = new App(appContainer);

// Handle page unload to save game
window.addEventListener('beforeunload', () => {
  game.destroy();
});