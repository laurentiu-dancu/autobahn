# Game Design Document: Autobahn (MVP)

**Title:** Autobahn (MVP)  
**Author:** Development Team  
**Version:** 1.2 (Current Implementation)  
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

"Autobahn" (MVP) is a browser-based incremental idle game where players begin by salvaging materials from their garage workshop and manually crafting basic automotive components. The game features a hybrid starting approach: players begin with small amounts of basic materials (Wire Stock, Sheet Metal, Leather Scraps, Oil) but can always generate more through the "Salvage Materials" action. This ensures immediate engagement while providing a reliable fallback mechanism.

The game emphasizes realistic early automobile manufacturing, beginning with the most basic components that a single person could reasonably produce and sell, progressing through automation and eventually sophisticated stock control systems.

### 1.2. Target Audience

Players who enjoy the core loop of incremental games: manual input leading to automation, resource management, and satisfying progression through efficiency gains. Fans of industrial and historical themes will particularly appreciate the early 20th century automobile manufacturing setting.

### 1.3. Core Gameplay Loop (MVP)

Players start with small amounts of basic materials and an always-available "Salvage Materials" action. These materials can be crafted into simple automotive parts and sold for profit. As the player progresses, market systems are revealed and automation becomes available, eventually leading to sophisticated stock control systems.

**Core Loop:** Salvage Materials → Manual Crafting → Market Sales → Resource Accumulation → Automation → Stock Control

### 1.4. Theme & Setting (MVP)

The game is set in the very early 20th century (1900-1910), focusing on a garage-based automotive parts business. The player starts as an individual craftsperson with basic materials and the ability to salvage more from their workshop, making simple automotive components that were commonly produced by small workshops and sold to early automobile manufacturers.

### 1.5. Anti-Softlock Design

The "Salvage Materials" action serves as the primary anti-softlock mechanism. This action is always available, requires no resources, has no time cost, and provides one random basic raw material per click. Combined with the starting materials, this ensures players can always recover from any resource-depleted state and continue progressing.

## 2. Core Mechanics (MVP)

### 2.1. Player Actions

- **Salvage Materials (Primary Action):** Always-available action that provides one random basic raw material (Wire Stock, Sheet Metal, Leather Scraps, or Oil) per click. Serves as the fundamental anti-softlock mechanism and provides immediate player engagement.

- **Manual Crafting:** Transform materials into automotive components through timed crafting actions (1.5-8 seconds). Available recipes: Wire Springs, Metal Brackets, Leather Gaskets, Spring Assemblies, and Repair Kits.

- **Integrated Market Trading:** Buy raw materials and sell finished products through inline market controls integrated directly into the resource display.

- **Building & Upgrading:** Construct and improve automated machines within the workshop (Wire Bending Jig, Filing Station).

- **Stock Control Management:** Hire personnel to manage automated buying and selling rules, reducing manual market interaction.

### 2.2. Resource Management

#### Basic Raw Materials:
- **Wire Stock:** Basic metal wire for springs and small components (starting: 5, salvageable)
- **Sheet Metal:** Thin metal sheets for brackets and simple parts (starting: 3, salvageable)
- **Leather Scraps:** For gaskets and simple seals (starting: 2, salvageable)
- **Oil:** For lubrication and treatment (starting: 1, salvageable)

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

The game reveals systems and UI elements only when they become relevant:
- **Salvage Materials** button is immediately visible and functional
- **Market controls** appear inline with resources after first craft
- **Stock Control panels** unlock after reaching trading volume milestones
- **Advanced automation** becomes available as production scales up

## 3. Game Systems (MVP)

### 3.1. Economy & Balancing

- **Baseline Resource Generation:** The "Salvage Materials" action provides constant, slow baseline resource generation, ensuring recovery from any depleted state.
- **Market Integration:** Inline buy/sell controls integrated directly into resource display make trading fluid and immediate.
- **Profit Margins:** Balanced to make manual crafting profitable initially, with automation providing efficiency gains.
- **Stock Control Economics:** Automated trading systems introduce ongoing costs that must be balanced against efficiency gains.

### 3.2. Milestone System

Current milestone progression:
1. **First Wire Spring** → Unlocks Spring Assembly crafting + Market visibility
2. **Spring Production (10 wire springs)** → Unlocks Wire Bending Jig
3. **First Assembly** → Unlocks Repair Kit crafting + Filing Station
4. **First Sale** → Market integration milestone
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

## 4. User Interface (UI) / User Experience (UX) (MVP)

### 4.1. UI Philosophy

**Immediate Engagement:** The "Salvage Materials" button is prominently displayed and immediately clickable, providing instant feedback and resource generation.

**Integrated Market Controls:** Buy/sell buttons are integrated directly alongside resource displays, making market interaction fluid and contextual.

**Progressive Revelation:** The UI starts simple, showing only what the player can immediately use, with new panels appearing only when relevant.

### 4.2. Key Screens & Panels

- **Main Workshop View:** Three-column layout with crafting, automation, and resources/market
- **Integrated Resource & Market Panel:** Each resource displays quantity alongside inline buy/sell controls
- **Crafting Panel:** Shows salvage action prominently, followed by available recipes with progress bars
- **Automation Panel:** Machine building, status monitoring, and upgrade options
- **Stock Control Panel:** Personnel hiring, rule management, and cost monitoring

### 4.3. Visual & Audio Feedback

- **Text-Based Feedback:** Clear messages for successful actions, resource changes, and milestones
- **Inline Market Feedback:** Immediate visual feedback for buy/sell actions
- **Machine Status Indicators:** Color-coded status (🟢 Running, 🟡 Waiting, 🔴 Stopped) with detailed status messages
- **Progress Indicators:** Real-time progress bars for crafting and machine production
- **Stock Control Status:** Clear indicators showing active automation rules and personnel status

### 4.4. Progressive UI Revelation

- **Salvage Materials** button visible immediately
- **Market controls** appear after first craft
- **Stock control options** unlock after trading milestones
- **Advanced automation panels** appear as systems become available

## 5. Art & Audio (MVP)

### 5.1. Art Style

- **Text-Only Interface:** No images, icons, or graphics in MVP
- **Typography:** Courier New monospace font for industrial feel
- **Color Scheme:** Brown/orange industrial theme with high contrast for readability
- **Layout:** Clean, functional three-column grid layout emphasizing usability

### 5.2. Sound Design

- **No Audio Assets:** Silent gameplay for MVP
- **Text Feedback:** All feedback provided through clear text messages and visual indicators

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
  - `UIRenderer.ts` - Progressive UI revelation with optimized rendering
  - `DevMode.ts` - Development tools and debugging features
- **State Management:** Client-side state with localStorage persistence
- **No Backend:** Fully client-side implementation for MVP
- **Performance:** Optimized rendering with state change detection and dynamic element updates

---

## Current Implementation Status

### ✅ Fully Implemented
1. **Salvage Materials System** - Always-available resource generation with random material selection
2. **Integrated Market Controls** - Inline buy/sell buttons with resource display
3. **Core Crafting Mechanic** - Five recipes with timed crafting and progress bars
4. **Progressive UI Disclosure** - Systems reveal as needed based on player progress
5. **Basic Production Automation** - Two machines with status management and upgrades
6. **Stock Control System** - Three personnel types with salary management and rule automation
7. **Save/Load System** - LocalStorage persistence with backwards compatibility
8. **Milestone System** - Six milestones driving progression
9. **Dev Mode** - Comprehensive debugging tools with performance monitoring

### 🔧 Implementation Details
- **Starting Resources:** Players begin with small amounts of basic materials (5 Wire Stock, 3 Sheet Metal, 2 Leather Scraps, 1 Oil, 0 Marks)
- **Machine States:** Three-state system (Running/Waiting/Stopped) with intelligent state transitions
- **Stock Control Timing:** Personnel salaries paid every 10 seconds, rules execute every 5 seconds
- **UI Optimization:** State-based rendering with dynamic element updates for performance
- **Progressive Discovery:** Resources appear in UI only when discovered through crafting or depletion

---

## Key Changes from Previous Version

### Updated Systems:
1. **Starting Resources:** Clarified hybrid approach with both starting materials and salvage action
2. **Machine Status System:** Implemented three-state system with intelligent transitions
3. **Stock Control Implementation:** Detailed personnel system with salary mechanics
4. **UI Architecture:** Optimized rendering system with state change detection
5. **Milestone Progression:** Documented actual milestone conditions and rewards

### Technical Improvements:
1. **Performance Optimization:** Efficient rendering with minimal DOM manipulation
2. **State Management:** Robust save/load with backwards compatibility
3. **Dev Mode Integration:** Comprehensive debugging and development tools
4. **Modular Architecture:** Clean separation of concerns across all systems