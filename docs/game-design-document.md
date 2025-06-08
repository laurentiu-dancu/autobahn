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
   - 3.3. [Emergency Income System](#33-emergency-income-system)
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

"Autobahn" (MVP) is a browser-based incremental idle game where players begin by manually crafting basic automotive components in a garage workshop. Starting with simple, profitable parts that can be made by hand, players gradually build up resources and automate production. The game emphasizes realistic early automobile manufacturing, beginning with the most basic components that a single person could reasonably produce and sell.

The game starts the player with hidden starter resources to ensure immediate engagement, revealing the broader resource and market systems only as the player progresses and needs them.

### 1.2. Target Audience

Players who enjoy the core loop of incremental games: manual input leading to automation, resource management, and satisfying progression through efficiency gains. Fans of industrial and historical themes will particularly appreciate the early 20th century automobile manufacturing setting.

### 1.3. Core Gameplay Loop (MVP)

The player starts with hidden basic materials and immediately begins crafting simple automotive parts by hand (e.g., "Bend Wire Spring"). These parts can be sold immediately for profit. As resources are consumed, the market system is revealed. As complexity increases, automation becomes available. The focus is on starting with the simplest possible profitable automotive component.

**Core Loop:** Manual Crafting (Hidden Resources) → Immediate Sales → Resource Scarcity → Market Discovery → Automation → Expansion

### 1.4. Theme & Setting (MVP)

The game is set in the very early 20th century (1900-1910), focusing on a garage-based automotive parts business. The player starts as an individual craftsperson making simple automotive components that were commonly produced by small workshops and sold to early automobile manufacturers. The setting emphasizes the manual, artisanal nature of early automotive manufacturing.

## 2. Core Mechanics (MVP)

### 2.1. Player Actions

- **Clicking/Manual Crafting:** The primary initial action to craft simple automotive parts. Examples: "Bend Wire Spring," "File Metal Bracket," "Cut Leather Gasket."
- **Building:** Constructing the very first automated machines within the workshop.
- **Upgrading:** Improving the output rate or efficiency of existing machines.
- **Trading:** Buying raw materials and selling finished parts to generate currency (revealed after initial resources are consumed).
- **Emergency Labor:** Working for competitors when completely out of resources (anti-softlock measure).

### 2.2. Resource Management

#### Basic Raw Materials:
- **Wire Stock:** Basic metal wire for springs and small components
- **Sheet Metal:** Thin metal sheets for brackets and simple parts
- **Leather Scraps:** For gaskets and simple seals
- **Oil:** For lubrication and treatment

#### Basic Processed Components:
- **Wire Springs:** Hand-bent springs for various automotive uses
- **Metal Brackets:** Filed and shaped mounting brackets
- **Leather Gaskets:** Cut gaskets for sealing
- **Oil-Treated Parts:** Components treated for durability

#### Intermediate Parts:
- **Spring Assemblies:** Multiple springs combined for suspension
- **Mounting Hardware:** Complete bracket and gasket sets
- **Lubrication Kits:** Packaged oil and treated components

#### Finished Products:
- **Automotive Repair Kits:** Complete sets of common replacement parts
- **Individual Parts for Sale:** Any component can be sold separately to automobile manufacturers

#### Currency:
- **Marks:** In-game currency earned from selling parts and automobiles

### 2.5. Progressive Disclosure
### 2.3. Automation Systems

- **Basic Machines:** Purchase simple tools to automate manual crafting steps:
  - **Wire Bending Jig:** Automates spring production
  - **Filing Station:** Automates bracket shaping
  - **Cutting Press:** Automates gasket cutting
  - **Treatment Bath:** Automates oil treatment process

Each machine automates one specific crafting action, has a fixed output rate, and can be upgraded for improved efficiency.

### 2.4. Progression Systems

- **Linear Unlocks:** New crafting recipes and automated tools become available sequentially as the player produces certain quantities of items or accumulates enough currency.
- **Part Complexity Tree:** More complex parts require simpler parts as components, creating a natural progression from basic wire springs to complete automotive repair kits.

## 3. Game Systems (MVP)

### 3.1. Economy & Balancing

- **Production Costs:** Resources and currency required to build and upgrade tools
- **Part Values:** Different parts have varying market values based on complexity and automotive demand
- **Profit Margins:** Simple parts have lower margins but faster production; complex parts have higher margins but require more resources
- **Revenue Streams:** Income from selling individual parts and complete repair kits

### 3.2. Basic Unlocks

A simple milestone system where reaching specific production targets unlocks new capabilities:
- "Bend 10 Wire Springs" → Unlocks Spring Assembly crafting
- "Sell 5 Spring Assemblies" → Unlocks Wire Bending Jig purchase
- "Complete 1 Repair Kit" → Unlocks advanced component recipes

## 4. User Interface (UI) / User Experience (UX) (MVP)

### 4.1. UI Philosophy

**Progressive Revelation:** The UI starts extremely simple, showing only what the player can immediately use. New panels and options appear only when relevant, maintaining focus and preventing overwhelm.

### 4.2. Key Screens & Panels

- **Main Workshop View:** Initially shows only available crafting actions
- **Inventory Panel:** Shows only resources the player has discovered or depleted
- **Market Panel:** Appears only when player needs to buy/sell (progressive disclosure)
- **Automation Panel:** Appears only when first automation becomes available
- **Emergency Labor Panel:** Appears only during potential softlock situations

### 4.3. Visual & Audio Feedback

- **Text-Based Feedback:** Clear messages for successful actions, resource changes, and unlocks
- **Progress Indicators:** Simple text-based progress bars for ongoing crafting
- **State Changes:** Clear indication when new UI elements become available
- **No Audio/Visual Assets:** Pure HTML/CSS implementation for MVP

## 5. Art & Audio (MVP)

### 5.1. Art Style

- **Text-Only Interface:** No images, icons, or graphics in MVP
- **Typography:** Clear, readable fonts that evoke industrial/mechanical themes
- **Color Scheme:** Simple, high-contrast colors for readability
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
  - `marketSystem.ts` - Trading and economy logic with visibility controls
  - `emergencySystem.ts` - Anti-softlock emergency labor system
  - `uiRenderer.ts` - Progressive UI revelation and rendering
  - `saveSystem.ts` - Local storage persistence
- **State Management:** Client-side state with localStorage persistence
- **No Backend:** Fully client-side implementation for MVP
- **No Assets:** Pure HTML/CSS/TypeScript implementation

---

## Development Priorities

1. **Core Clicking Mechanic** - Basic part crafting with hidden starter resources
2. **Progressive UI Disclosure** - Revealing systems as needed
3. **Market Integration** - Buying/selling with visibility controls
4. **Anti-Softlock System** - Emergency labor implementation
5. **First Automation** - Single tool automation
6. **Save/Load System** - Progress persistence
7. **Progression Unlocks** - Milestone-based advancement

---
