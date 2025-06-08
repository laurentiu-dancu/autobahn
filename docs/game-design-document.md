# Game Design Document: Autobahn (MVP)

**Title:** Autobahn (MVP)  
**Author:** Development Team  
**Version:** 1.0 (MVP)  
**Date:** January 2025  

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1. [Game Concept (MVP)](#11-game-concept-mvp)
   - 1.2. [Target Audience](#12-target-audience)
   - 1.3. [Core Gameplay Loop (MVP)](#13-core-gameplay-loop-mvp)
   - 1.4. [Theme & Setting (MVP)](#14-theme--setting-mvp)
2. [Core Mechanics (MVP)](#2-core-mechanics-mvp)
   - 2.1. [Player Actions](#21-player-actions)
   - 2.2. [Resource Management](#22-resource-management)
   - 2.3. [Automation Systems](#23-automation-systems)
   - 2.4. [Progression Systems](#24-progression-systems)
3. [Game Systems (MVP)](#3-game-systems-mvp)
   - 3.1. [Economy & Balancing](#31-economy--balancing)
   - 3.2. [Basic Unlocks](#32-basic-unlocks)
4. [User Interface (UI) / User Experience (UX) (MVP)](#4-user-interface-ui--user-experience-ux-mvp)
   - 4.1. [UI Philosophy](#41-ui-philosophy)
   - 4.2. [Key Screens & Panels](#42-key-screens--panels)
   - 4.3. [Visual & Audio Feedback](#43-visual--audio-feedback)
5. [Art & Audio (MVP)](#5-art--audio-mvp)
   - 5.1. [Art Style](#51-art-style)
   - 5.2. [Sound Design](#52-sound-design)
6. [Technical Considerations (MVP)](#6-technical-considerations-mvp)
   - 6.1. [Platform](#61-platform)
   - 6.2. [Implementation & Architecture](#62-implementation--architecture)

---

## 1. Introduction

### 1.1. Game Concept (MVP)

"Autobahn" (MVP) is a browser-based incremental idle game where players begin by manually crafting basic components for early automobiles in a small workshop. The core loop involves manual production, accumulating resources, and then automating these tasks to gradually expand from a single workshop into a small, efficient manufacturing operation. The focus is on the immediate satisfaction of automation and the initial steps of building an industrial process.

Players can buy and sell individual automobile parts, creating a dynamic economy where different components have varying values and production complexities.

### 1.2. Target Audience

Players who enjoy the core loop of incremental games: manual input leading to automation, resource management, and satisfying progression through efficiency gains. Fans of industrial and historical themes will particularly appreciate the early 20th century automobile manufacturing setting.

### 1.3. Core Gameplay Loop (MVP)

The player starts with a single, manual action, such as "Forge Metal Plate." Accumulating enough of these basic resources allows the player to craft more complex parts, like "Assemble Gear." Once a certain threshold of manual production is met, the player can purchase a basic machine (e.g., a simple press) to automate the "Forge Metal Plate" action. This automation frees the player to focus on the next manual bottleneck or to upgrade existing machines for increased output.

**Core Loop:** Manual Crafting → Resource Accumulation → Basic Automation → Simple Upgrades → Part Trading

### 1.4. Theme & Setting (MVP)

The game is set in the very early 20th century (1900-1910), focusing on the nascent automobile industry. The initial player experience is confined to a "dark room" or a small, dimly lit workshop. The visual and auditory feedback should emphasize the manual, mechanical nature of early industrial work. As the player automates and expands, the workshop might become slightly larger and brighter, but the scope remains limited to a single, evolving manufacturing space for the MVP.

## 2. Core Mechanics (MVP)

### 2.1. Player Actions

- **Clicking/Manual Crafting:** The primary initial action to generate basic resources and craft initial components. Examples: "Forge Metal Plate," "Cut Wood Plank," "Melt Rubber."
- **Building:** Constructing the very first automated machines within the workshop.
- **Upgrading:** Improving the output rate or efficiency of existing machines.
- **Trading:** Buying raw materials and selling finished parts to generate currency.

### 2.2. Resource Management

#### Basic Raw Materials:
- **Iron Ore:** Raw material for metal production
- **Coal:** Fuel for forges and machines
- **Wood Logs:** Raw material for wooden components
- **Rubber Sap:** Raw material for rubber parts
- **Leather Hides:** For upholstery and seating

#### Basic Processed Components:
- **Metal Plates:** Forged from iron ore and coal
- **Steel Rods:** Refined metal for structural components
- **Wooden Planks:** Cut from wood logs
- **Rubber Sheets:** Processed from rubber sap
- **Leather Strips:** Processed from leather hides

#### Intermediate Parts:
- **Gears:** Assembled from metal plates
- **Bolts & Screws:** Forged from steel rods
- **Chassis Frame:** Assembled from metal plates and steel rods
- **Wheels:** Assembled from wooden planks and metal plates
- **Tires:** Assembled from rubber sheets
- **Engine Block:** Complex assembly from multiple metal components
- **Seats:** Assembled from wooden planks and leather strips

#### Finished Products:
- **Basic Automobile:** Assembled from chassis, engine, wheels, tires, and seats
- **Individual Parts for Sale:** Any intermediate part can be sold separately

#### Currency:
- **Marks:** In-game currency earned from selling parts and automobiles

### 2.3. Automation Systems

- **Basic Machines:** Purchase simple machines to automate manual crafting steps:
  - **Manual Press:** Automates metal plate forging
  - **Simple Lathe:** Automates gear cutting
  - **Wood Saw:** Automates plank cutting
  - **Rubber Press:** Automates rubber sheet production
  - **Assembly Station:** Automates simple part assembly

Each machine automates one specific crafting action, has a fixed output rate, and can be upgraded for improved efficiency.

### 2.4. Progression Systems

- **Linear Unlocks:** New crafting recipes and automated machines become available sequentially as the player produces certain quantities of items or accumulates enough currency.
- **Part Complexity Tree:** More complex parts require simpler parts as components, creating a natural progression from basic materials to finished automobiles.

## 3. Game Systems (MVP)

### 3.1. Economy & Balancing

- **Production Costs:** Resources and currency required to build and upgrade machines
- **Part Values:** Different parts have varying market values based on complexity and demand
- **Supply & Demand:** Basic market fluctuations affect part prices (simplified for MVP)
- **Revenue Streams:** Income from selling individual parts and complete automobiles

### 3.2. Basic Unlocks

A simple milestone system where reaching specific production targets unlocks new capabilities:
- "Produce 10 Metal Plates" → Unlocks Gear crafting
- "Assemble 5 Gears" → Unlocks Manual Press purchase
- "Build 1 Complete Automobile" → Unlocks advanced part recipes

## 4. User Interface (UI) / User Experience (UX) (MVP)

### 4.1. UI Philosophy

Clean, functional, and directly reflective of the current state of the workshop. The UI should be minimalist initially, gradually revealing more options as the player progresses. Information should be presented clearly without overwhelming the player.

### 4.2. Key Screens & Panels

- **Main Workshop View:** Displays current manual action buttons, resource counts, and slots for automated machines
- **Inventory Panel:** Shows all available parts and materials with quantities
- **Market Panel:** Interface for buying raw materials and selling parts
- **Build/Upgrade Panel:** Simple overlay for purchasing and upgrading machines
- **Progress Panel:** Shows current objectives and unlock progress

### 4.3. Visual & Audio Feedback

- Clear visual cues for resource accumulation and machine operation
- Satisfying, distinct sounds for manual clicks and automated machine operations
- Visual indicators for when new unlocks become available
- Smooth animations for part creation and machine operation

## 5. Art & Audio (MVP)

### 5.1. Art Style

- **Initial Phase:** Dark, confined workshop atmosphere with warm lighting from forge fires
- **Color Palette:** Muted browns, grays, and warm oranges reflecting early industrial era
- **Visual Elements:** Simple, clear representations of mechanical parts and early machinery
- **Progressive Brightening:** Workshop becomes more illuminated as automation increases

### 5.2. Sound Design

- **Manual Actions:** Distinct, satisfying sounds (hammer on metal, saw cutting wood)
- **Machine Operations:** Unique, rhythmic sounds for each automated machine
- **Ambient Audio:** Subtle workshop atmosphere with occasional steam hisses and mechanical sounds
- **Feedback Sounds:** Pleasant chimes for unlocks and successful sales

## 6. Technical Considerations (MVP)

### 6.1. Platform

Browser-based game ensuring maximum accessibility across devices and operating systems.

### 6.2. Implementation & Architecture

- **Language:** TypeScript for type safety and maintainable code
- **Build System:** Vite for fast development and efficient bundling
- **Architecture:** Modular design with clear separation of concerns:
  - `gameState.ts` - Central state management
  - `resourceManager.ts` - Resource and inventory handling
  - `craftingSystem.ts` - Recipe and production logic
  - `automationManager.ts` - Machine and automation logic
  - `marketSystem.ts` - Trading and economy logic
  - `uiRenderer.ts` - UI updates and rendering
  - `saveSystem.ts` - Local storage persistence
- **State Management:** Client-side state with localStorage persistence
- **No Backend:** Fully client-side implementation for MVP

---

## Development Priorities

1. **Core Clicking Mechanic** - Basic resource generation
2. **Simple Crafting System** - Converting raw materials to basic parts
3. **First Automation** - Single machine automation
4. **Basic UI** - Essential panels and feedback
5. **Save/Load System** - Progress persistence
6. **Market System** - Part buying/selling
7. **Progression Unlocks** - Milestone-based advancement

---

*This document serves as the foundation for the Autobahn MVP development. Features and mechanics may be refined during implementation based on playtesting and technical constraints.*