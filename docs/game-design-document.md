# Game Design Document: Autobahn (MVP)

**Title:** Autobahn (MVP)  
**Author:** Development Team  
**Version:** 1.1 (MVP with Scavenging & Stock Control)  
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
   - 3.2. [Basic Unlocks](#32-basic-unlocks)
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

"Autobahn" (MVP) is a browser-based incremental idle game where players begin by salvaging materials from their garage workshop and manually crafting basic automotive components. Starting with a simple "Salvage Materials" action that provides free basic resources, players gradually build up their inventory and automate production. The game emphasizes realistic early automobile manufacturing, beginning with the most basic components that a single person could reasonably produce and sell.

The game starts the player with an always-available salvaging action to ensure immediate engagement and prevent softlocks, revealing the broader resource and market systems only as the player progresses and needs them.

### 1.2. Target Audience

Players who enjoy the core loop of incremental games: manual input leading to automation, resource management, and satisfying progression through efficiency gains. Fans of industrial and historical themes will particularly appreciate the early 20th century automobile manufacturing setting.

### 1.3. Core Gameplay Loop (MVP)

The player starts with an immediately available "Salvage Materials" action that provides small amounts of basic raw materials without cost or time delay. These materials can be crafted into simple automotive parts and sold for profit. As the player progresses, market systems are revealed and automation becomes available. The focus is on starting with the simplest possible profitable automotive component while ensuring the player can always generate basic inputs.

**Core Loop:** Salvage Materials → Manual Crafting → Market Sales → Resource Accumulation → Automation → Stock Control

### 1.4. Theme & Setting (MVP)

The game is set in the very early 20th century (1900-1910), focusing on a garage-based automotive parts business. The player starts as an individual craftsperson salvaging materials from their workshop and making simple automotive components that were commonly produced by small workshops and sold to early automobile manufacturers. The setting emphasizes the manual, artisanal nature of early automotive manufacturing with a focus on resourcefulness and gradual industrialization.

### 1.5. Anti-Softlock Design

The "Salvage Materials" action serves as the primary anti-softlock mechanism. This action is always available, requires no resources, has no time cost, and provides small but consistent amounts of basic raw materials. This ensures players can always recover from any resource-depleted state and continue progressing without external intervention.

## 2. Core Mechanics (MVP)

### 2.1. Player Actions

- **Salvage Materials (Primary Action):** The fundamental and always-available action that provides small, fixed amounts of basic raw materials (Wire Stock, Sheet Metal, Leather Scraps, Oil) without consuming any resources or time. This action is immediately visible and clickable upon game start, providing instant feedback and ensuring the player can always generate basic inputs for crafting.

- **Manual Crafting:** Transform salvaged or purchased materials into automotive components through instant crafting actions. Examples: "Bend Wire Spring," "File Metal Bracket," "Cut Leather Gasket."

- **Integrated Market Trading:** Buy raw materials and sell finished products through inline market controls integrated directly into the resource display, making trading fluid and accessible.

- **Building & Upgrading:** Construct and improve automated machines within the workshop.

- **Stock Control Management:** Configure automated buying and selling rules, set inventory thresholds, and manage trading systems to reduce manual market interaction.

### 2.2. Resource Management

#### Basic Raw Materials:
- **Wire Stock:** Basic metal wire for springs and small components (obtainable via salvaging)
- **Sheet Metal:** Thin metal sheets for brackets and simple parts (obtainable via salvaging)
- **Leather Scraps:** For gaskets and simple seals (obtainable via salvaging)
- **Oil:** For lubrication and treatment (obtainable via salvaging)

#### Basic Processed Components:
- **Wire Springs:** Hand-bent springs for various automotive uses
- **Metal Brackets:** Filed and shaped mounting brackets
- **Leather Gaskets:** Cut gaskets for sealing

#### Intermediate Parts:
- **Spring Assemblies:** Multiple springs combined for suspension
- **Automotive Repair Kits:** Complete sets of common replacement parts

#### Currency:
- **Marks:** In-game currency earned from selling parts and used for purchasing materials and automation

### 2.3. Automation Systems

#### Production Automation:
- **Basic Machines:** Purchase simple tools to automate manual crafting steps:
  - **Wire Bending Jig:** Automates spring production
  - **Filing Station:** Automates bracket shaping
  - **Cutting Press:** Automates gasket cutting

Each machine automates one specific crafting action, has a fixed output rate, and can be upgraded for improved efficiency.

#### Stock Control Systems (New Category):
- **Material Procurement Systems:** Automated purchasing systems that buy specified raw materials when stock falls below configured thresholds
- **Sales Management Systems:** Automated selling systems that sell specified finished products when stock exceeds configured thresholds
- **Inventory Optimization:** Advanced stock control that balances material costs, storage capacity, and production demands

These systems have their own costs, upgrade paths (faster transactions, better price negotiations, handling more item types), and may require ongoing operational costs or contracts.

### 2.4. Progression Systems

- **Linear Unlocks:** New crafting recipes and automated tools become available sequentially as the player produces certain quantities of items or accumulates enough currency.
- **Part Complexity Tree:** More complex parts require simpler parts as components, creating a natural progression from basic wire springs to complete automotive repair kits.
- **Stock Control Evolution:** Market automation systems unlock as the player demonstrates proficiency with manual trading and reaches certain volume thresholds.

### 2.5. Progressive Disclosure

The game reveals systems and UI elements only when they become relevant:
- **Salvage Materials** button is immediately visible and functional
- **Market controls** appear inline with resources after first craft
- **Stock Control panels** unlock after reaching trading volume milestones
- **Advanced automation** becomes available as production scales up

## 3. Game Systems (MVP)

### 3.1. Economy & Balancing

- **Baseline Resource Generation:** The "Salvage Materials" action provides a constant, slow baseline for resource generation, ensuring the player can always recover from a depleted state. This makes the game inherently anti-softlock from the very first click.

- **Market Integration:** Inline buy/sell controls integrated directly into the resource display make market interaction fluid and immediate, reducing the friction of basic trading.

- **Profit Margins:** Balanced to make manual crafting profitable initially, with automated production and stock control providing increasing efficiency and profit margins as the game progresses.

- **Stock Control Economics:** Automated trading systems introduce new layers of economic strategy, requiring players to balance automation costs against efficiency gains and profit optimization.

### 3.2. Basic Unlocks

A simple milestone system where reaching specific production targets unlocks new capabilities:
- "Salvage 10 times" → Unlocks advanced salvaging techniques
- "Bend 10 Wire Springs" → Unlocks Spring Assembly crafting
- "Sell 5 Spring Assemblies" → Unlocks Wire Bending Jig purchase
- "Complete 10 market transactions" → Unlocks basic stock control systems
- "Reach 100 total sales" → Unlocks advanced stock control features

### 3.3. Stock Control System

**Basic Stock Control:**
- **Auto-Buy Thresholds:** Set minimum inventory levels for raw materials; system automatically purchases when stock falls below threshold
- **Auto-Sell Targets:** Set maximum inventory levels for finished products; system automatically sells excess stock
- **Simple Rules:** Basic if-then logic for inventory management

**Advanced Stock Control:**
- **Multi-Tier Thresholds:** Different buying/selling rules based on inventory levels and market conditions
- **Production Balancing:** Coordinate material purchasing with production capacity and demand forecasting
- **Profit Optimization:** Advanced algorithms that consider market prices, storage costs, and production efficiency

**Stock Control Progression:**
- Unlocks after demonstrating manual trading proficiency
- Starts with simple buy/sell automation
- Evolves into sophisticated supply chain management
- Eventually enables hands-off operation of entire production chains

## 4. User Interface (UI) / User Experience (UX) (MVP)

### 4.1. UI Philosophy

**Immediate Engagement:** The "Salvage Materials" button is prominently displayed and immediately clickable upon game start, providing instant feedback and resource generation.

**Integrated Market Controls:** Instead of separate market screens, buy/sell buttons are integrated directly alongside resource displays, making market interaction fluid and contextual.

**Progressive Revelation:** The UI starts extremely simple, showing only what the player can immediately use. New panels and options appear only when relevant, maintaining focus and preventing overwhelm.

### 4.2. Key Screens & Panels

- **Main Workshop View:** Prominently features the "Salvage Materials" button and integrated resource/market display
- **Integrated Resource & Market Panel:** Each discovered resource displays its quantity alongside inline buy/sell controls (when applicable)
- **Crafting Panel:** Shows available recipes with clear input/output requirements
- **Automation Panel:** Appears when first automation becomes available
- **Stock Control Panel:** Advanced panel for configuring automated trading rules and inventory management

### 4.3. Visual & Audio Feedback

- **Text-Based Feedback:** Clear messages for successful actions, resource changes, and unlocks
- **Inline Market Feedback:** Immediate visual feedback for buy/sell actions directly in resource display
- **Progress Indicators:** Simple text-based progress bars for ongoing automation
- **Stock Control Status:** Clear indicators showing active automation rules and their current status

### 4.4. Progressive UI Revelation

- **Salvage Materials** button visible immediately
- **Inline market controls** appear after first craft
- **Stock control options** unlock after trading milestones
- **Advanced automation panels** appear as systems become available

## 5. Art & Audio (MVP)

### 5.1. Art Style

- **Text-Only Interface:** No images, icons, or graphics in MVP
- **Typography:** Clear, readable fonts that evoke industrial/mechanical themes
- **Color Scheme:** Simple, high-contrast colors for readability with distinct colors for different action types (salvaging, crafting, buying, selling)
- **Layout:** Clean, functional layout emphasizing usability over aesthetics

### 5.2. Sound Design

- **No Audio Assets:** Silent gameplay for MVP
- **Text Feedback:** All audio feedback replaced with clear text messages
- **Future Consideration:** Audio system designed to be easily added post-MVP

## 6. Technical Considerations (MVP)

### 6.1. Platform

Browser-based game ensuring maximum accessibility across devices and operating systems.

### 6.2. Implementation & Architecture

- **Language:** TypeScript for type safety and maintainable code
- **Build System:** Vite for fast development and efficient bundling
- **Architecture:** Modular design with clear separation of concerns:
  - `gameState.ts` - Central state management with progressive disclosure logic
  - `craftingSystem.ts` - Recipe and production logic
  - `automationManager.ts` - Tool and automation logic
  - `marketSystem.ts` - Trading and economy logic with integrated controls
  - `stockControlSystem.ts` - Automated trading and inventory management
  - `salvageSystem.ts` - Material salvaging mechanics
  - `uiRenderer.ts` - Progressive UI revelation and integrated market rendering
  - `saveSystem.ts` - Local storage persistence
- **State Management:** Client-side state with localStorage persistence
- **No Backend:** Fully client-side implementation for MVP
- **No Assets:** Pure HTML/CSS/TypeScript implementation

---

## Development Priorities

1. **Salvage Materials System** - Always-available resource generation
2. **Integrated Market Controls** - Inline buy/sell buttons with resources
3. **Core Crafting Mechanic** - Basic part crafting with instant feedback
4. **Progressive UI Disclosure** - Revealing systems as needed
5. **Basic Stock Control** - Simple automated buying/selling rules
6. **First Production Automation** - Single tool automation
7. **Advanced Stock Control** - Multi-tier inventory management
8. **Save/Load System** - Progress persistence
9. **Progression Unlocks** - Milestone-based advancement

---

## Key Changes from Previous Version

### New Systems Added:
1. **Salvage Materials Action:** Primary anti-softlock mechanism providing free basic resources
2. **Integrated Market Controls:** Inline buy/sell buttons directly in resource display
3. **Stock Control System:** Automated inventory management replacing manual market interaction
4. **Progressive Market Integration:** Market controls appear contextually rather than as separate screens

### Removed Systems:
1. **Emergency Labor System:** Replaced by always-available salvaging
2. **Separate Market Panels:** Replaced by integrated inline controls
3. **Hidden Starter Resources:** Replaced by explicit salvaging action

### Modified Systems:
1. **Resource Discovery:** Now triggered by salvaging and crafting rather than hidden depletion
2. **UI Philosophy:** Emphasis on integrated, contextual controls rather than separate panels
3. **Progression Path:** Clear path from salvaging → crafting → trading → automation → stock control