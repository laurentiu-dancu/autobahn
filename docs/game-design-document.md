# Game Design Document: Autobahn (Supply Chain Expansion)

**Title:** Autobahn (Supply Chain Expansion)  
**Author:** Development Team  
**Version:** 2.0 (Supply Chain Update)  
**Date:** January 2025  

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1. [Game Concept (Expanded)](#11-game-concept-expanded)
   - 1.2. [Target Audience](#12-target-audience)
   - 1.3. [Core Gameplay Loop (Expanded)](#13-core-gameplay-loop-expanded)
   - 1.4. [Theme & Setting](#14-theme--setting)
   - 1.5. [Anti-Softlock Design](#15-anti-softlock-design)
2. [Core Mechanics (Expanded)](#2-core-mechanics-expanded)
   - 2.1. [Player Actions](#21-player-actions)
   - 2.2. [Resource Management](#22-resource-management)
   - 2.3. [Crafting Systems](#23-crafting-systems)
   - 2.4. [Automation Systems](#24-automation-systems)
   - 2.5. [Progressive Disclosure](#25-progressive-disclosure)
3. [Supply Chain Design](#3-supply-chain-design)
   - 3.1. [Raw Materials](#31-raw-materials)
   - 3.2. [Basic Components](#32-basic-components)
   - 3.3. [Advanced Components](#33-advanced-components)
   - 3.4. [Assembly Systems](#34-assembly-systems)
   - 3.5. [Automobile Construction](#35-automobile-construction)
4. [Game Systems](#4-game-systems)
   - 4.1. [Economy & Balancing](#41-economy--balancing)
   - 4.2. [Milestone System](#42-milestone-system)
   - 4.3. [Stock Control System](#43-stock-control-system)
   - 4.4. [Notification System](#44-notification-system)
5. [User Interface (UI) / User Experience (UX)](#5-user-interface-ui--user-experience-ux)
   - 5.1. [UI Philosophy](#51-ui-philosophy)
   - 5.2. [Key Screens & Panels](#52-key-screens--panels)
   - 5.3. [Visual & Audio Feedback](#53-visual--audio-feedback)
   - 5.4. [Progressive UI Revelation](#54-progressive-ui-revelation)
6. [Art & Audio](#6-art--audio)
   - 6.1. [Art Style](#61-art-style)
   - 6.2. [Sound Design](#62-sound-design)
7. [Technical Considerations](#7-technical-considerations)
   - 7.1. [Platform](#71-platform)
   - 7.2. [Implementation & Architecture](#72-implementation--architecture)

---

## 1. Introduction

### 1.1. Game Concept (Expanded)

"Autobahn" is a browser-based incremental idle game where players begin with salvageable materials and progress through an increasingly complex supply chain to ultimately manufacture complete early 1900s automobiles. The game features a comprehensive crafting progression from basic materials through intermediate components to advanced assemblies, culminating in automobile production.

The game emphasizes realistic early automobile manufacturing, beginning with salvageable workshop materials and progressing through three distinct crafting tiers: Basic Crafting (simple components), Advanced Crafting (complex assemblies), and Automobile Construction (final vehicle assembly).

### 1.2. Target Audience

Players who enjoy deep incremental progression, complex supply chain management, and industrial themes. The expanded crafting system appeals to players who appreciate intricate dependency trees and long-term progression goals.

### 1.3. Core Gameplay Loop (Expanded)

**Extended Loop:** Salvage Materials → Basic Crafting → Advanced Crafting → Assembly Systems → Automobile Construction → Market Sales → Resource Accumulation → Automation → Stock Control

The progression now spans multiple crafting tiers, each with increasing complexity and value, leading to the ultimate goal of automobile production.

### 1.4. Theme & Setting

Set in early 20th century (1900-1910) automotive manufacturing, focusing on the transition from simple workshop crafting to complex industrial assembly. Players experience the evolution from individual craftsperson to automobile manufacturer.

### 1.5. Anti-Softlock Design

The "Salvage Materials" action remains the primary anti-softlock mechanism, providing access to basic raw materials. Market availability expands as recipes unlock, ensuring players can always acquire necessary materials for progression.

## 2. Core Mechanics (Expanded)

### 2.1. Player Actions

- **Salvage Materials:** Always-available action providing random basic raw materials
- **Basic Crafting:** Transform raw materials into simple components (1.5-8 seconds)
- **Advanced Crafting:** Combine basic components into complex assemblies (10-30 seconds)
- **Automobile Construction:** Assemble complete vehicles from major sub-assemblies (60-300 seconds)
- **Integrated Market Trading:** Buy/sell materials and components
- **Building & Upgrading:** Construct automated production machines
- **Stock Control Management:** Automated trading and inventory management

### 2.2. Resource Management

#### Salvageable Raw Materials:
- **Wire Stock:** Basic metal wire (salvageable, market available)
- **Sheet Metal:** Thin metal sheets (salvageable, market available)
- **Leather Scraps:** For gaskets and upholstery (salvageable, market available)
- **Oil:** For lubrication and rubber production (salvageable, market available)

#### Market-Only Raw Materials:
- **Wood:** For body frames and interior components
- **Rubber:** For tires and sealing (derived from oil processing)
- **Glass:** For lights and gauges
- **Lead:** For batteries and electrical components
- **Fabric:** For upholstery and electrical insulation
- **Coal:** For fuel and heat treatment processes

#### Basic Components (Basic Crafting):
- **Wire Springs:** Hand-bent springs
- **Metal Brackets:** Filed and shaped brackets
- **Leather Gaskets:** Cut sealing gaskets
- **Metal Rods:** Shaped structural components
- **Rubber Tubing:** Processed rubber for fuel/electrical lines
- **Glass Lenses:** Shaped glass for lights
- **Fabric Strips:** Cut fabric for various uses

#### Advanced Components (Advanced Crafting):
- **Gears:** Precision-machined transmission components
- **Bearings:** Smooth-running mechanical supports
- **Spark Plugs:** Electrical ignition components
- **Valves:** Flow control mechanisms
- **Pistons:** Engine internal components
- **Crankshafts:** Engine power transmission
- **Clutch Plates:** Power engagement mechanisms
- **Brake Shoes:** Stopping mechanism components

#### Assembly Systems:
- **Engine Assembly:** Complete power unit
- **Transmission Assembly:** Power transfer system
- **Chassis Assembly:** Vehicle foundation
- **Body Assembly:** Vehicle shell and interior
- **Wheel Assembly:** Complete wheel units
- **Electrical System:** Wiring and components
- **Fuel System:** Fuel storage and delivery

#### Final Product:
- **Automobile:** Complete early 1900s vehicle

### 2.3. Crafting Systems

#### Basic Crafting (1.5-8 seconds):
Simple transformations of raw materials into basic components. Focuses on individual skill and hand tools.

#### Advanced Crafting (10-30 seconds):
Complex assembly of basic components into sophisticated parts requiring precision and multiple steps.

#### Automobile Construction (60-300 seconds):
Final assembly of major sub-systems into complete vehicles. Represents the pinnacle of manufacturing complexity.

### 2.4. Automation Systems

Automation becomes available for each crafting tier as players progress:
- **Basic Machines:** Automate simple component production
- **Advanced Machines:** Handle complex assembly processes
- **Assembly Lines:** Manage automobile construction workflows

### 2.5. Progressive Disclosure

The game reveals crafting tiers and components based on player progress:
- **Basic Crafting:** Available from start
- **Advanced Crafting:** Unlocks after basic component milestones
- **Automobile Construction:** Unlocks after advanced assembly milestones

## 3. Supply Chain Design

### 3.1. Raw Materials

#### Salvageable Materials (Always Available):
- **Wire Stock** (€2): Basic metal wire for springs and electrical
- **Sheet Metal** (€3): Thin metal for brackets and body panels
- **Leather Scraps** (€1): For gaskets and upholstery
- **Oil** (€4): For lubrication and rubber processing

#### Market Materials (Unlock with Recipes):
- **Wood** (€5): Structural material for frames and interior
- **Rubber** (€6): Processed material for tires and sealing
- **Glass** (€8): Transparent material for lights and gauges
- **Lead** (€10): Heavy metal for batteries and weights
- **Fabric** (€3): Textile for upholstery and insulation
- **Coal** (€2): Fuel for heat treatment and processing

### 3.2. Basic Components

#### Wire-Based Components:
- **Wire Springs** (2s): 1 Wire Stock → 1 Wire Springs (€3)
- **Electrical Wire** (3s): 1 Wire Stock + 1 Rubber → 1 Electrical Wire (€8)

#### Metal Components:
- **Metal Brackets** (3s): 1 Sheet Metal → 1 Metal Brackets (€5)
- **Metal Rods** (4s): 1 Sheet Metal → 1 Metal Rods (€6)
- **Metal Plates** (5s): 2 Sheet Metal → 1 Metal Plates (€8)

#### Processed Materials:
- **Leather Gaskets** (1.5s): 1 Leather Scraps → 1 Leather Gaskets (€2)
- **Rubber Tubing** (4s): 1 Rubber → 1 Rubber Tubing (€8)
- **Glass Lenses** (6s): 1 Glass → 1 Glass Lenses (€10)
- **Fabric Strips** (2s): 1 Fabric → 2 Fabric Strips (€2 each)

#### Wood Components:
- **Wood Planks** (3s): 1 Wood → 2 Wood Planks (€3 each)
- **Wood Frames** (8s): 2 Wood Planks + 2 Metal Brackets → 1 Wood Frames (€15)

### 3.3. Advanced Components

#### Engine Components:
- **Pistons** (15s): 2 Metal Rods + 1 Metal Plates → 1 Pistons (€25)
- **Crankshaft** (20s): 3 Metal Rods + 2 Bearings → 1 Crankshaft (€40)
- **Valves** (12s): 1 Metal Rods + 1 Wire Springs → 1 Valves (€15)
- **Spark Plugs** (10s): 1 Metal Rods + 1 Electrical Wire → 1 Spark Plugs (€20)

#### Transmission Components:
- **Gears** (18s): 2 Metal Plates + 1 Coal → 1 Gears (€30)
- **Bearings** (8s): 1 Metal Rods + 1 Oil → 1 Bearings (€12)
- **Clutch Plates** (14s): 2 Metal Plates + 1 Fabric Strips → 1 Clutch Plates (€25)

#### Chassis Components:
- **Leaf Springs** (16s): 3 Wire Springs + 2 Metal Brackets → 1 Leaf Springs (€20)
- **Axles** (22s): 2 Metal Rods + 2 Bearings → 1 Axles (€35)
- **Brake Shoes** (10s): 1 Metal Plates + 1 Leather Gaskets → 1 Brake Shoes (€15)

#### Body Components:
- **Body Panels** (12s): 2 Metal Plates + 1 Metal Brackets → 1 Body Panels (€20)
- **Seats** (18s): 1 Wood Frames + 2 Fabric Strips + 1 Leather Gaskets → 1 Seats (€25)
- **Dashboard** (15s): 1 Wood Planks + 2 Glass Lenses → 1 Dashboard (€30)

#### Electrical Components:
- **Batteries** (25s): 2 Lead + 1 Rubber Tubing → 1 Batteries (€45)
- **Headlights** (14s): 1 Glass Lenses + 1 Metal Brackets + 1 Electrical Wire → 1 Headlights (€35)
- **Wiring Harness** (20s): 5 Electrical Wire + 2 Rubber Tubing → 1 Wiring Harness (€50)

### 3.4. Assembly Systems

#### Engine Assembly (45s):
- **Inputs:** 4 Pistons + 1 Crankshaft + 8 Valves + 4 Spark Plugs + 2 Metal Plates
- **Output:** 1 Engine Assembly (€200)

#### Transmission Assembly (35s):
- **Inputs:** 6 Gears + 4 Bearings + 2 Clutch Plates + 1 Metal Plates
- **Output:** 1 Transmission Assembly (€150)

#### Chassis Assembly (40s):
- **Inputs:** 1 Wood Frames + 2 Leaf Springs + 2 Axles + 4 Brake Shoes + 4 Metal Brackets
- **Output:** 1 Chassis Assembly (€180)

#### Body Assembly (30s):
- **Inputs:** 6 Body Panels + 2 Seats + 1 Dashboard + 2 Wood Frames
- **Output:** 1 Body Assembly (€160)

#### Wheel Assembly (20s):
- **Inputs:** 1 Metal Rods + 8 Wire Springs + 1 Rubber Tubing
- **Output:** 1 Wheel Assembly (€25)

#### Electrical System (25s):
- **Inputs:** 1 Batteries + 2 Headlights + 1 Wiring Harness + 2 Electrical Wire
- **Output:** 1 Electrical System (€140)

#### Fuel System (15s):
- **Inputs:** 1 Metal Plates + 2 Rubber Tubing + 1 Valves
- **Output:** 1 Fuel System (€35)

### 3.5. Automobile Construction

#### Complete Automobile (180s):
- **Inputs:** 1 Engine Assembly + 1 Transmission Assembly + 1 Chassis Assembly + 1 Body Assembly + 4 Wheel Assembly + 1 Electrical System + 1 Fuel System
- **Output:** 1 Automobile (€1000)

## 4. Game Systems

### 4.1. Economy & Balancing

#### Pricing Strategy:
- **Raw Materials:** €1-10 based on rarity and processing complexity
- **Basic Components:** €2-15 with 20-50% markup over materials
- **Advanced Components:** €12-50 with 30-60% markup over inputs
- **Assemblies:** €25-200 with 40-70% markup over components
- **Automobile:** €1000 with 50% markup over assemblies

#### Time Progression:
- **Basic Crafting:** 1.5-8 seconds for immediate engagement
- **Advanced Crafting:** 10-30 seconds for meaningful progression
- **Assembly Systems:** 15-45 seconds for significant investment
- **Automobile Construction:** 180 seconds for ultimate achievement

### 4.2. Milestone System

#### Expanded Milestone Progression:
1. **First Wire Spring** → Unlocks Advanced Crafting tier
2. **First Advanced Component** → Unlocks Assembly Systems
3. **First Assembly** → Unlocks Automobile Construction
4. **First Automobile** → Unlocks advanced automation
5. **Production Milestones** → Unlock specialized machines and personnel

### 4.3. Stock Control System

Enhanced to handle the complex supply chain with specialized personnel for different crafting tiers and assembly management.

### 4.4. Notification System

Expanded to provide feedback on complex crafting chains and milestone achievements across all tiers.

## 5. User Interface (UI) / User Experience (UX)

### 5.1. UI Philosophy

**Tiered Complexity:** The UI reveals crafting tiers progressively, maintaining clarity while accommodating increased complexity.

### 5.2. Key Screens & Panels

- **Basic Crafting Panel:** Simple component production
- **Advanced Crafting Panel:** Complex component assembly
- **Assembly Systems Panel:** Major sub-assembly construction
- **Automobile Construction Panel:** Final vehicle assembly
- **Enhanced Market Panel:** Expanded material and component trading
- **Automation Panel:** Multi-tier machine management
- **Stock Control Panel:** Complex supply chain automation

### 5.3. Visual & Audio Feedback

Enhanced notification system for complex crafting chains and major milestone achievements.

### 5.4. Progressive UI Revelation

- **Basic Crafting:** Available from start
- **Advanced Crafting:** Unlocks with first advanced component milestone
- **Assembly Systems:** Unlocks with first assembly milestone
- **Automobile Construction:** Unlocks with automobile construction milestone

## 6. Art & Audio

### 6.1. Art Style

Maintains text-only interface with enhanced visual hierarchy for multiple crafting tiers.

### 6.2. Sound Design

Silent gameplay with visual feedback through enhanced notification system.

## 7. Technical Considerations

### 7.1. Platform

Browser-based game ensuring accessibility across devices.

### 7.2. Implementation & Architecture

Enhanced modular design to accommodate:
- **Expanded Recipe System:** Multiple crafting tiers with complex dependencies
- **Enhanced UI Components:** Separate panels for each crafting tier
- **Advanced Automation:** Multi-tier machine management
- **Complex Supply Chain:** Enhanced stock control for intricate material flows

---

## Implementation Priority

### Phase 1: Core Expansion
1. **New Raw Materials:** Add market-only materials with unlock conditions
2. **Basic Components:** Expand basic crafting with new recipes
3. **UI Structure:** Create separate panels for crafting tiers

### Phase 2: Advanced Systems
1. **Advanced Components:** Implement complex assembly recipes
2. **Assembly Systems:** Create major sub-assembly crafting
3. **Enhanced Automation:** Multi-tier machine support

### Phase 3: Automobile Construction
1. **Final Assembly:** Implement automobile construction system
2. **Enhanced Milestones:** Complex progression tracking
3. **Advanced Stock Control:** Supply chain automation

### Phase 4: Polish & Balance
1. **Economic Balancing:** Fine-tune pricing and timing
2. **UI Enhancement:** Optimize user experience for complexity
3. **Performance Optimization:** Handle increased game state complexity

---

This expanded design maintains the core appeal of the original game while adding significant depth and complexity through a comprehensive supply chain that culminates in automobile production. The tiered crafting system provides clear progression goals while the ultimate automobile construction offers a meaningful long-term objective.