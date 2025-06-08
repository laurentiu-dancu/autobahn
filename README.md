# Autobahn - Industrial Incremental Game

A browser-based incremental idle game set in early 20th century automobile manufacturing.

## Development

### Standard Development
```bash
npm run dev
```

### Development with Debug Mode
```bash
npm run dev:debug
```

This will start the development server and automatically enable dev mode with debugging tools.

## Dev Mode Features

### Activation
- **URL Parameter**: Add `?dev=true` to the URL
- **Persistent**: Once enabled, dev mode persists in localStorage
- **Keyboard Shortcut**: `Ctrl+Shift+D` to toggle dev panel visibility

### Debug Panel Features
- **Quick Actions**: Add resources, money, unlock all content
- **Game State**: Export/import saves, log state to console
- **Performance Monitoring**: FPS, update time, render time
- **Debug Log**: Real-time logging with timestamps

### Keyboard Shortcuts (Dev Mode Only)
- `Ctrl+Shift+D`: Toggle dev panel
- `Ctrl+Shift+R`: Add test resources
- `Ctrl+Shift+M`: Add 100 marks

### Console Access
```javascript
// Access dev mode from browser console
devMode.log('Custom message');
devMode.setResource('marks', 1000);
devMode.getGameState();
```

## Game Features

### Progressive Disclosure
- Resources appear only when discovered or depleted
- Market unlocks after first craft
- UI elements reveal themselves as needed

### Anti-Softlock Design
- Emergency labor system prevents getting stuck
- Always maintains a path to progression
- Hidden starter resources ensure immediate engagement

### Automotive Theme
- Early 20th century automobile parts manufacturing
- Realistic progression from simple hand tools to automation
- Focus on profitable, manufacturable components

## Technical Architecture

- **TypeScript**: Type-safe development
- **Vite**: Fast development and building
- **Modular Design**: Clear separation of concerns
- **Client-side**: No backend required
- **Local Storage**: Automatic save/load

## Building

```bash
npm run build
```

## License

GNU Affero General Public License v3.0