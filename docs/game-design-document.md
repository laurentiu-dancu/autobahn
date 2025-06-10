# Autobahn - Industrial Incremental Game Design Document

## 1. Game Overview

Autobahn is a browser-based incremental idle game where players begin with salvageable materials and progress through an increasingly complex supply chain to ultimately manufacture complete early 1900s automobiles. The game emphasizes realistic early automobile manufacturing, beginning with salvageable workshop materials and progressing through multiple distinct crafting tiers.

### 1.1. Core Gameplay Loop
**Extended Loop:** Salvage Materials → Basic Crafting → Advanced Crafting → Assembly Systems → Automobile Construction → Market Sales → Resource Accumulation → Automation → Stock Control

### 1.2. Theme & Setting
Set in early 20th century (1900-1910) automotive manufacturing, focusing on the transition from simple workshop crafting to complex industrial assembly. Players experience the evolution from individual craftsperson to automobile manufacturer.

## 2. Core Systems

### 2.1. Resource Management
- **Currency:** Deutsche Marks (€)
- **Resources:** Multiple tiers of resources and components
- **Storage:** Unlimited storage for all resources

#### Resource Categories:
- **Salvageable Materials:** Wire Stock, Sheet Metal, Leather Scraps, Oil
- **Market Materials:** Wood, Rubber, Glass, Lead, Fabric, Coal
- **Basic Components:** Wire Springs, Metal Brackets, Leather Gaskets, etc.
- **Advanced Components:** Bearings, Valves, Pistons, etc.
- **Assemblies:** Engine, Transmission, Chassis, etc.
- **Final Product:** Complete Automobile

### 2.2. Crafting System
The game features multiple crafting tiers that unlock progressively:

1. **Basic Crafting**
   - Simple components like wire springs, metal brackets, leather gaskets
   - Quick crafting times (1.5-8 seconds)
   - Foundation for more complex production

2. **Advanced Crafting**
   - Complex components like bearings, valves, pistons
   - Medium crafting times (10-30 seconds)
   - Requires basic components as inputs

3. **Assembly Systems**
   - Major sub-assemblies like wheels, fuel systems, engines
   - Longer crafting times (15-45 seconds)
   - Combines multiple advanced components

4. **Automobile Construction**
   - Complete vehicle assembly
   - Longest crafting time (180 seconds)
   - Ultimate achievement in the game

### 2.3. Automation System
- **Basic Automation:** Machines for basic component production
- **Advanced Automation:** Specialized machines for complex components
- **Assembly Automation:** Automated assembly lines for major systems
- **Production Line:** Final automation for complete automobiles

### 2.4. Market System
- Buy and sell resources and components
- Dynamic pricing based on supply and demand
- Market transactions unlock additional features
- Anti-softlock mechanism through market availability

### 2.5. Stock Control System
- Automated resource management
- Personnel management (procurement specialists, sales managers)
- Customizable rules for resource handling
- Specialized personnel for different crafting tiers

## 3. Progression System

### 3.1. Milestone Progression
1. **Basic Component Mastery**
   - Produce 5+ of 4 different basic components
   - Unlocks advanced crafting tier and coal resource

2. **Engine Component Basics**
   - Produce 2 bearings and 2 valves
   - Unlocks piston and spark plug crafting

3. **Power System Development**
   - Produce 3 pistons and 3 spark plugs
   - Unlocks transmission components

4. **Transmission Mastery**
   - Produce 4 gears and 2 clutch plates
   - Unlocks chassis components

5. **Chassis Development**
   - Produce 2 leaf springs and 2 axles
   - Unlocks body components

6. **Body Construction**
   - Produce 3 body panels and 1 seat
   - Unlocks electrical systems and lead resource

7. **Electrical System Mastery**
   - Produce 1 battery and 2 headlights
   - Unlocks assembly systems tier

8. **Assembly Systems**
   - First Assembly: Wheel or Fuel System
   - Major Systems: Engine and Transmission
   - Assembly Mastery: 5+ different assemblies
   - Unlocks automobile construction

9. **Automobile Construction**
   - First Automobile: Unlocks advanced automation
   - Production Line: Unlocks logistics coordination

### 3.2. Automation Progression
- Basic automation for each component type
- Advanced automation for complex components
- Assembly automation for major systems
- Production line for complete automobiles

## 4. Economy & Balancing

### 4.1. Resource Pricing
- **Raw Materials:** €1-10 based on rarity and processing complexity
- **Basic Components:** €2-15 with 20-50% markup over materials
- **Advanced Components:** €12-50 with 30-60% markup over inputs
- **Assemblies:** €25-200 with 40-70% markup over components
- **Automobile:** €1000 with 50% markup over assemblies

### 4.2. Crafting Times
- **Basic Components:** 1.5-8 seconds for immediate engagement
- **Advanced Components:** 10-30 seconds for meaningful progression
- **Assembly Systems:** 15-45 seconds for significant investment
- **Automobile Construction:** 180 seconds for ultimate achievement

### 4.3. Automation Benefits
- Increased production rates
- Reduced manual intervention
- Scalable production capacity
- Specialized machines for each component type

## 5. User Interface

### 5.1. Main Panels
- **Basic Crafting Panel:** Initial component production
- **Advanced Crafting Panel:** Complex component crafting
- **Assembly Systems Panel:** Major sub-assemblies
- **Automobile Construction Panel:** Complete vehicle assembly
- **Machines Panel:** Automation management
- **Market Panel:** Resource trading
- **Stock Control Panel:** Resource management

### 5.2. UI Features
- Progress bars for crafting
- Resource displays
- Milestone notifications
- Market price indicators
- Automation status indicators
- Visual feedback for complex crafting chains

### 5.3. Progressive UI Revelation
- **Basic Crafting:** Available from start
- **Advanced Crafting:** Unlocks with first advanced component milestone
- **Assembly Systems:** Unlocks with first assembly milestone
- **Automobile Construction:** Unlocks with automobile construction milestone

## 6. Future Considerations
- Additional automation tiers
- Prestige/reset mechanics
- Quality/efficiency upgrades
- Export/trade mechanics
- Advanced logistics systems
- Enhanced supply chain complexity
- Additional vehicle types
- Quality control systems
- Research and development mechanics