# Game Design Document: Autobahn (MVP)

**Title:** Autobahn (MVP)  
**Author:** Development Team  
**Version:** 1.3 (Current Implementation)  
**Date:** January 2025  

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1. [Game Concept (MVP)](#11-game-concept-mvp)
   - 1.2. [Target Audience](#12-target-audience)
   - 1.3. [Core Gameplay Loop (MVP)](#13-core-gameplay-loop-mvp)
   - 1.4. [Theme & Setting (MVP)](#14-theme--setting-mvp)
   - 1.5. [Anti-Softlock Design](#15-anti-softlock-design)
2. [Core Mechanics (MVP)](#2-core-mechanics-mvp)
   - 2.1. [Player Actions](#21-player-actions)
   - 2.2. [Resource Management](#22-resource-management)
   - 2.3. [Automation Systems](#23-automation-systems)
   - 2.4. [Progression Systems](#24-progression-systems)
   - 2.5. [Progressive Disclosure](#25-progressive-disclosure)
3. [Game Systems (MVP)](#3-game-systems-mvp)
   - 3.1. [Economy & Balancing](#31-economy--balancing)
   - 3.2. [Milestone System](#32-milestone-system)
   - 3.3. [Stock Control System](#33-stock-control-system)
   - 3.4. [Notification System](#34-notification-system)
4. [User Interface (UI) / User Experience (UX) (MVP)](#4-user-interface-ui--user-experience-ux-mvp)
   - 4.1. [UI Philosophy](#41-ui-philosophy)
   - 4.2. [Key Screens & Panels](#42-key-screens--panels)
   - 4.3. [Visual & Audio Feedback](#43-visual--audio-feedback)
   - 4.4. [Progressive UI Revelation](#44-progressive-ui-revelation)
5. [Art & Audio (MVP)](#5-art--audio-mvp)
   - 5.1. [Art Style](#51-art-style)
   - 5.2. [Sound Design](#52-sound-design)
6. [Technical Considerations (MVP)](#6-technical-considerations-mvp)
   - 6.1. [Platform](#61-platform)
   - 6.2. [Implementation & Architecture](#62-implementation--architecture)

---

## 1. Introduction

### 1.1. Game Concept (MVP)

"Autobahn" (MVP) is a browser-based incremental idle game where players begin with no resources and must salvage materials from their garage workshop to manually craft basic automotive components. The game features a pure bootstrap approach: players start with zero resources but have immediate access to the "Salvage Materials" action and can see the market from the beginning, providing clear visibility into what materials can be found and their value.

The game emphasizes realistic early automobile manufacturing, beginning with the most basic components that a single person could reasonably produce and sell, progressing through automation and eventually sophisticated stock control systems.

### 1.2. Target Audience

Players who enjoy the core loop of incremental games: manual input leading to automation, resource management, and satisfying progression through efficiency gains. Fans of industrial and historical themes will particularly appreciate the early 20th century automobile manufacturing setting.

### 1.3. Core Gameplay Loop (MVP)

Players start with zero resources but immediate access to salvage and market systems. The salvage action provides random basic materials that can be crafted into automotive parts and sold for profit. As the player progresses, automation becomes available, eventually leading to sophisticated stock control systems.

**Core Loop:** Salvage Materials → Manual Crafting → Market Sales → Resource Accumulation → Automation → Stock Control

### 1.4. Theme & Setting (MVP)

The game is set in the very early 20th century (1900-1910), focusing on a garage-based automotive parts business. The player starts as an individual craftsperson with access to salvageable workshop materials, making simple automotive components that were commonly produced by small workshops and sold to early automobile manufacturers.

### 1.5. Anti-Softlock Design

The "Salvage Materials" action serves as the primary anti-softlock mechanism. This action is always available, requires no resources, has no time cost, and provides one random basic raw material per click. This ensures players can always recover from any resource-depleted state and continue progressing, even when starting from zero.

## 2. Core Mechanics (MVP)

### 2.1. Player Actions

- **Salvage Materials (Primary Action):** Always-available action that provides one random basic raw material (Wire Stock, Sheet Metal, Leather Scraps, or Oil) per click. Serves as the fundamental anti-softlock mechanism and provides immediate player engagement from zero resources.

- **Manual Crafting:** Transform materials into automotive components through timed crafting actions (1.5-8 seconds). Available recipes: Wire Springs, Metal Brackets, Leather Gaskets, Spring Assemblies, and Repair Kits.

- **Integrated Market Trading:** Buy raw materials and sell finished products through inline market controls integrated directly into the resource display. Available from game start.

- **Building & Upgrading:** Construct and improve automated machines within the workshop (Wire Bending Jig, Filing Station).

- **Stock Control Management:** Hire personnel to manage automated buying and selling rules, reducing manual market interaction.

### 2.2. Resource Management

#### Basic Raw Materials:
- **Wire Stock:** Basic metal wire for springs and small components (starting: 0, salvageable, visible from start)
- **Sheet Metal:** Thin metal sheets for brackets and simple parts (starting: 0, salvageable, visible from start)
- **Leather Scraps:** For gaskets and simple seals (starting: 0, salvageable, visible from start)
- **Oil:** For lubrication and treatment (starting: 0, salvageable, visible from start)

#### Basic Processed Components:
- **Wire Springs:** Hand-bent springs for various automotive uses
- **Metal Brackets:** Filed and shaped mounting brackets
- **Leather Gaskets:** Cut gaskets for sealing

#### Intermediate Parts:
- **Spring Assemblies:** Multiple springs combined for suspension
- **Automotive Repair Kits:** Complete sets of common replacement parts

#### Currency:
- **Marks:** In-game currency earned from selling parts and used for purchasing materials and automation (starting: 0)

### 2.3. Automation Systems

#### Production Automation:
- **Wire Bending Jig:** Automates wire spring production (2x slower than manual, upgradeable)
- **Filing Station:** Automates bracket filing and shaping (2x slower than manual, upgradeable)

Each machine:
- Has three states: Running (🟢), Waiting for Resources (🟡), Stopped (🔴)
- Starts in stopped state when built
- Can be manually started/stopped
- Automatically transitions to "waiting for resources" when inputs are unavailable
- Can be upgraded to improve efficiency (15% faster per level, max 2x faster than manual)
- Shows real-time progress bars when running

#### Stock Control Systems:
- **Material Procurement Specialist:** Automated purchasing of raw materials (€2/10s salary)
- **Sales Manager:** Automated selling of finished products (€3/10s salary)
- **Supply Chain Coordinator:** Advanced optimization of both buying and selling (€5/10s salary)

Personnel require ongoing salaries and will quit if unpaid, providing risk/reward balance.

### 2.4. Progression Systems

- **Milestone-Based Unlocks:** New crafting recipes, machines, and stock control options unlock based on production milestones and market activity.
- **Part Complexity Tree:** More complex parts require simpler parts as components, creating natural progression.
- **Stock Control Evolution:** Market automation systems unlock after demonstrating trading proficiency.

### 2.5. Progressive Disclosure

The game reveals systems and UI elements based on player progress:
- **Salvage Materials** button and **Market** are immediately visible and functional
- **Stock Control panels** unlock after reaching trading volume milestones
- **Advanced automation** becomes available as production scales up
- **Resources appear** in the UI when first discovered through crafting or when depleted to zero

## 3. Game Systems (MVP)

### 3.1. Economy & Balancing

- **Zero-Start Economy:** Players begin with no resources, making the salvage action essential for bootstrapping the economy.
- **Market Transparency:** Market prices and available materials are visible from the start, providing clear goals and value understanding.
- **Profit Margins:** Balanced to make manual crafting profitable initially, with automation providing efficiency gains.
- **Stock Control Economics:** Automated trading systems introduce ongoing costs that must be balanced against efficiency gains.

### 3.2. Milestone System

Current milestone progression:
1. **First Wire Spring** → Unlocks Spring Assembly crafting
2. **Spring Production (10 wire springs)** → Unlocks Wire Bending Jig
3. **First Assembly** → Unlocks Repair Kit crafting + Filing Station
4. **First Sale** → Market integration milestone (now redundant as market is available from start)
5. **Market Experience (10 transactions)** → Unlocks basic stock control personnel
6. **Basic Automation** → Unlocks advanced Supply Chain Coordinator

### 3.3. Stock Control System

**Implementation Overview:**
The Stock Control System allows players to hire trading personnel who manage market transactions automatically based on configured rules. Personnel require ongoing salaries (paid every 10 seconds) and will quit if unpaid.

**Personnel Types:**

*Material Procurement Specialist:*
- **Role:** Automatically purchases raw materials when inventory falls below thresholds
- **Salary:** €2 per 10-second interval
- **Hiring Cost:** €50 + first payment
- **Capabilities:** Auto-buy raw materials, inventory monitoring

*Sales Manager:*
- **Role:** Automatically sells finished products when inventory exceeds thresholds
- **Salary:** €3 per 10-second interval
- **Hiring Cost:** €50 + first payment
- **Capabilities:** Auto-sell products, inventory monitoring

*Supply Chain Coordinator:*
- **Role:** Advanced optimization of both buying and selling
- **Salary:** €5 per 10-second interval
- **Hiring Cost:** €100 + first payment
- **Unlock:** Requires hiring both basic specialists first
- **Capabilities:** Advanced optimization, profit analysis, full supply chain management

**Rule Management:**
- Quick rule creation for common scenarios (auto-buy materials when < 5, auto-sell products when > 10)
- Individual rule management with enable/disable toggles
- Rules automatically disabled when managing personnel are fired
- Rules execute every 5 seconds to prevent spam

**Economic Mechanics:**
- Salaries deducted every 10 seconds of real-time gameplay
- Warning system when funds drop below 3 payment cycles
- Automatic termination when funds reach zero
- Rehiring requires full hiring cost again

### 3.4. Notification System

**Multi-Notification Support:**
The notification system supports multiple simultaneous notifications without conflicts:
- Each notification has a unique ID and independent lifecycle
- Notifications stack vertically in the top-right corner
- Support for different types: success, warning, error, info

**Visual Features:**
- Smooth slide-in animation from the right
- Progress bar showing remaining time
- Manual close button with hover effects
- Smooth slide-out animation when dismissed or expired
- Color-coded by notification type

**Technical Implementation:**
- State-based notification management
- Automatic cleanup after duration expires
- Manual dismissal capability
- No interference between multiple notifications

## 4. User Interface (UI) / User Experience (UX) (MVP)

### 4.1. UI Philosophy

**Immediate Clarity:** The "Salvage Materials" button and market are immediately visible, showing players exactly what they can do and what materials are available.

**Integrated Market Controls:** Buy/sell buttons are integrated directly alongside resource displays, making market interaction fluid and contextual.

**Progressive Revelation:** The UI starts with essential systems visible, with advanced panels appearing only when relevant.

### 4.2. Key Screens & Panels

- **Main Workshop View:** Three-column layout with crafting, automation, and resources/market
- **Integrated Resource & Market Panel:** Each resource displays quantity alongside inline buy/sell controls, visible from start
- **Crafting Panel:** Shows salvage action prominently, followed by available recipes with progress bars
- **Automation Panel:** Machine building, status monitoring, and upgrade options
- **Stock Control Panel:** Personnel hiring, rule management, and cost monitoring
- **Notification Area:** Top-right corner for system messages and feedback

### 4.3. Visual & Audio Feedback

- **Rich Notification System:** Multi-notification support with progress bars, animations, and type-specific styling
- **Inline Market Feedback:** Immediate visual feedback for buy/sell actions
- **Machine Status Indicators:** Color-coded status (🟢 Running, 🟡 Waiting, 🔴 Stopped) with detailed status messages
- **Progress Indicators:** Real-time progress bars for crafting and machine production
- **Stock Control Status:** Clear indicators showing active automation rules and personnel status

### 4.4. Progressive UI Revelation

- **Salvage Materials** button and **Market** visible immediately
- **Stock control options** unlock after trading milestones
- **Advanced automation panels** appear as systems become available
- **Resources appear** dynamically when discovered or depleted

## 5. Art & Audio (MVP)

### 5.1. Art Style

- **Text-Only Interface:** No images, icons, or graphics in MVP
- **Typography:** Courier New monospace font for industrial feel
- **Color Scheme:** Dark gradient background with blue/green accents and high contrast for readability
- **Layout:** Clean, functional three-column grid layout emphasizing usability
- **Notification Design:** Gradient backgrounds with smooth animations and progress indicators

### 5.2. Sound Design

- **No Audio Assets:** Silent gameplay for MVP
- **Visual Feedback:** All feedback provided through notifications, text messages, and visual indicators

## 6. Technical Considerations (MVP)

### 6.1. Platform

Browser-based game ensuring maximum accessibility across devices and operating systems.

### 6.2. Implementation & Architecture

- **Language:** TypeScript for type safety and maintainable code
- **Build System:** Vite for fast development and efficient bundling
- **Architecture:** Modular design with clear separation of concerns:
  - `GameState.ts` - Central state management with progressive disclosure logic
  - `CraftingSystem.ts` - Recipe and production logic with timed crafting
  - `AutomationManager.ts` - Machine logic with status management
  - `MarketSystem.ts` - Trading and economy logic with integrated controls
  - `StockControlSystem.ts` - Automated trading and inventory management with personnel
  - `SalvageSystem.ts` - Material salvaging mechanics
  - `NotificationManager.ts` - Multi-notification system with animations and state management
  - `UIRenderer.ts` - Progressive UI revelation with optimized rendering
  - `UIDataProvider.ts` - Centralized data preparation for UI components
  - `DevMode.ts` - Development tools and debugging features
- **State Management:** Client-side state with localStorage persistence
- **No Backend:** Fully client-side implementation for MVP
- **Performance:** Optimized rendering with state change detection and dynamic element updates
- **Event System:** Comprehensive event emitter for decoupled system communication

---

## Current Implementation Status

### ✅ Fully Implemented
1. **Zero-Start Bootstrap System** - Players start with 0 resources and must salvage to begin
2. **Immediate Market Visibility** - Market and salvageable resources visible from game start
3. **Multi-Notification System** - Robust notification system supporting multiple simultaneous notifications
4. **Salvage Materials System** - Always-available resource generation with random material selection
5. **Integrated Market Controls** - Inline buy/sell buttons with resource display
6. **Core Crafting Mechanic** - Five recipes with timed crafting and progress bars
7. **Progressive UI Disclosure** - Systems reveal as needed based on player progress
8. **Basic Production Automation** - Two machines with status management and upgrades
9. **Stock Control System** - Three personnel types with salary management and rule automation
10. **Save/Load System** - LocalStorage persistence with backwards compatibility
11. **Milestone System** - Six milestones driving progression
12. **Dev Mode** - Comprehensive debugging tools with performance monitoring
13. **Event-Driven Architecture** - Comprehensive event system for system communication
14. **Modular UI Components** - Separated UI components with centralized data provider

### 🔧 Implementation Details
- **Starting Resources:** All resources start at 0, requiring salvage to bootstrap economy
- **Market Transparency:** Market visible from start with all salvageable resources shown
- **Machine States:** Three-state system (Running/Waiting/Stopped) with intelligent state transitions
- **Stock Control Timing:** Personnel salaries paid every 10 seconds, rules execute every 5 seconds
- **UI Optimization:** State-based rendering with dynamic element updates for performance
- **Notification System:** Multi-notification support with progress bars, animations, and type-specific styling
- **Progressive Discovery:** Resources appear in UI when discovered through crafting or depletion

---

## Key Changes from Previous Version

### Major System Updates:
1. **Zero-Start Economy:** All resources now start at 0, making salvage essential for bootstrapping
2. **Immediate Market Access:** Market and salvageable resources visible from game start for clarity
3. **Robust Notification System:** Complete overhaul supporting multiple simultaneous notifications
4. **Event-Driven Architecture:** Comprehensive event system for better system decoupling
5. **Modular UI Architecture:** Separated UI components with centralized data provider

### Technical Improvements:
1. **Multi-Notification Support:** Independent notification lifecycles with animations and progress bars
2. **Enhanced State Management:** Better event-driven state updates and UI synchronization
3. **Improved UI Architecture:** Modular components with clear separation of concerns
4. **Better Progressive Disclosure:** More intuitive revelation of game systems
5. **Enhanced Dev Mode Integration:** Better debugging and development tools

### Game Balance Changes:
1. **Bootstrap Clarity:** Players immediately understand what they can salvage and its value
2. **Reduced Confusion:** Market visibility eliminates guesswork about salvage rewards
3. **Cleaner Progression:** Milestone system updated to reflect immediate market access
4. **Better Feedback:** Rich notification system provides clear player feedback

---

## Future Considerations

### Potential Enhancements:
1. **Additional Crafting Recipes:** More complex automotive components
2. **Advanced Automation:** More sophisticated machine types
3. **Market Dynamics:** Price fluctuations and supply/demand mechanics
4. **Research System:** Technology upgrades and efficiency improvements
5. **Achievement System:** Additional progression tracking and rewards

### Technical Debt:
1. **Performance Optimization:** Further rendering optimizations for larger game states
2. **Save System Enhancement:** Versioning and migration system for save compatibility
3. **Error Handling:** More robust error handling and recovery mechanisms
4. **Accessibility:** Screen reader support and keyboard navigation
5. **Mobile Optimization:** Touch-friendly interface improvements