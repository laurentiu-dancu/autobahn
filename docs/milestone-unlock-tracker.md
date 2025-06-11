# Milestone and Unlock Tracker

**Game:** Autobahn - Industrial Incremental  
**Purpose:** Track all milestones, unlocks, and progression gates  
**Last Updated:** January 2025  

---

## Table of Contents

1. [Initial Game State](#initial-game-state)
2. [Basic Crafting Tier](#basic-crafting-tier)
3. [Basic Automation Tier](#basic-automation-tier)
4. [Advanced Crafting Tier](#advanced-crafting-tier)
5. [Advanced Automation Tier](#advanced-automation-tier)
6. [Assembly Systems Tier](#assembly-systems-tier)
7. [Assembly Automation Tier](#assembly-automation-tier)
8. [Automobile Construction Tier](#automobile-construction-tier)
9. [Market & Stock Control](#market--stock-control)
10. [Resource Discovery](#resource-discovery)

---

## Initial Game State

### Starting Resources
- **Marks:** 0
- **Discovered Resources:** `marks`, `wireStock`, `sheetMetal`, `leatherScraps`, `oil`

### Starting Recipes
- `bendWireSpring` - Wire Stock → Wire Springs
- `fileMetalBracket` - Sheet Metal → Metal Brackets  
- `cutLeatherGasket` - Leather Scraps → Leather Gaskets

### Starting UI Elements
- Basic Crafting Panel (visible)
- Salvage Materials action (always available)
- Market Panel (visible, basic resources only)

---

## Basic Crafting Tier

### Milestone: "First Wire Spring"
**Condition:** Produce 1 `wireSprings`  
**Unlocks:**
- Recipe: `shapeMetalRod` (Sheet Metal → Metal Rods)

### Milestone: "First Metal Bracket"  
**Condition:** Produce 1 `metalBrackets`  
**Unlocks:**
- Recipe: `forgeMetalPlate` (2 Sheet Metal → Metal Plates)

### Milestone: "First Leather Gasket"
**Condition:** Produce 1 `leatherGaskets`  
**Unlocks:**
- Recipe: `cutFabricStrips` (Fabric → 2 Fabric Strips)
- Resource Discovery: `fabric`

### Milestone: "Basic Metalworking"
**Condition:** Produce 3 `metalRods` AND 2 `metalPlates`  
**Unlocks:**
- Recipe: `cutWoodPlanks` (Wood → 2 Wood Planks)
- Recipe: `buildWoodFrame` (2 Wood Planks + 2 Metal Brackets → Wood Frame)
- Resource Discovery: `wood`

### Milestone: "Electrical Introduction"
**Condition:** Produce 5 `wireSprings`  
**Unlocks:**
- Recipe: `makeElectricalWire` (Wire Stock + Rubber → Electrical Wire)
- Resource Discovery: `rubber`

### Milestone: "Rubber Processing"
**Condition:** Produce 1 `electricalWire`  
**Unlocks:**
- Recipe: `formRubberTubing` (Rubber → Rubber Tubing)
- Recipe: `shapeGlassLens` (Glass → Glass Lenses)
- Resource Discovery: `glass`

### Milestone: "Basic Component Mastery"
**Condition:** Produce 5+ of 4 different basic components  
**Components:** `wireSprings`, `metalBrackets`, `leatherGaskets`, `metalRods`, `metalPlates`  
**Unlocks:**
- Resource Discovery: `coal`
- Recipe: `craftBearing` (Metal Rods + Oil → Bearings)
- Recipe: `assembleValve` (Metal Rods + Wire Springs → Valves)
- UI Panel: Advanced Crafting Panel

---

## Basic Automation Tier

### Milestone: "Spring Production Line"
**Condition:** Produce 10 `wireSprings`  
**Unlocks:**
- Machine: `wireBendingJig` (automates `bendWireSpring`)

### Milestone: "Bracket Production Line"
**Condition:** Produce 10 `metalBrackets`  
**Unlocks:**
- Machine: `filingStation` (automates `fileMetalBracket`)

### Milestone: "Leather Processing Automation"
**Condition:** Produce 8 `leatherGaskets`  
**Unlocks:**
- Machine: `leatherCuttingStation` (automates `cutLeatherGasket`)

### Milestone: "Metal Shaping Automation"
**Condition:** Produce 12 `metalRods`  
**Unlocks:**
- Machine: `metalShapingPress` (automates `shapeMetalRod`)

### Milestone: "Plate Forge Automation"
**Condition:** Produce 8 `metalPlates`  
**Unlocks:**
- Machine: `plateForge` (automates `forgeMetalPlate`)

### Milestone: "Electrical Wire Automation"
**Condition:** Produce 6 `electricalWire`  
**Unlocks:**
- Machine: `electricalWireStation` (automates `makeElectricalWire`)

### Milestone: "Rubber Forming Automation"
**Condition:** Produce 5 `rubberTubing`  
**Unlocks:**
- Machine: `rubberFormingMachine` (automates `formRubberTubing`)

### Milestone: "Glass Shaping Automation"
**Condition:** Produce 4 `glassLenses`  
**Unlocks:**
- Machine: `glassShapingKiln` (automates `shapeGlassLens`)

### Milestone: "Fabric Processing Automation"
**Condition:** Produce 10 `fabricStrips`  
**Unlocks:**
- Machine: `fabricCuttingTable` (automates `cutFabricStrips`)

### Milestone: "Woodworking Automation"
**Condition:** Produce 8 `woodPlanks`  
**Unlocks:**
- Machine: `woodworkingBench` (automates `cutWoodPlanks`)

### Milestone: "Frame Assembly Automation"
**Condition:** Produce 5 `woodFrames`  
**Unlocks:**
- Machine: `frameAssemblyJig` (automates `buildWoodFrame`)

---

## Advanced Crafting Tier

### Milestone: "Engine Component Basics"
**Condition:** Produce 2 `bearings` AND 2 `valves`  
**Unlocks:**
- Recipe: `machinePiston` (2 Metal Rods + Metal Plates → Pistons)
- Recipe: `craftSparkPlug` (Metal Rods + Electrical Wire → Spark Plugs)
- Recipe: `forgeCrankshaft` (3 Metal Rods + 2 Bearings → Crankshaft)

### Milestone: "Power System Development"
**Condition:** Produce 3 `pistons` AND 3 `sparkPlugs`  
**Unlocks:**
- Recipe: `machineGear` (2 Metal Plates + Coal → Gears)
- Recipe: `assembleClutchPlate` (2 Metal Plates + Fabric Strips → Clutch Plates)

### Milestone: "Transmission Mastery"
**Condition:** Produce 4 `gears` AND 2 `clutchPlates`  
**Unlocks:**
- Recipe: `buildLeafSpring` (3 Wire Springs + 2 Metal Brackets → Leaf Springs)
- Recipe: `forgeAxle` (2 Metal Rods + 2 Bearings → Axles)
- Recipe: `craftBrakeShoe` (Metal Plates + Leather Gaskets → Brake Shoes)

### Milestone: "Chassis Development"
**Condition:** Produce 2 `leafSprings` AND 2 `axles`  
**Unlocks:**
- Recipe: `formBodyPanel` (2 Metal Plates + Metal Brackets → Body Panels)
- Recipe: `upholsterSeat` (Wood Frames + 2 Fabric Strips + Leather Gaskets → Seats)
- Recipe: `buildDashboard` (Wood Planks + 2 Glass Lenses → Dashboard)

### Milestone: "Body Construction"
**Condition:** Produce 3 `bodyPanels` AND 1 `seats`  
**Unlocks:**
- Recipe: `assembleBattery` (2 Lead + Rubber Tubing → Batteries)
- Recipe: `buildHeadlight` (Glass Lenses + Metal Brackets + Electrical Wire → Headlights)
- Recipe: `assembleWiringHarness` (5 Electrical Wire + 2 Rubber Tubing → Wiring Harness)
- Resource Discovery: `lead`

### Milestone: "Electrical System Mastery"
**Condition:** Produce 1 `batteries` AND 2 `headlights`  
**Unlocks:**
- Recipe: `assembleWheel` (Metal Rods + 8 Wire Springs + Rubber Tubing → Wheel Assembly)
- Recipe: `assembleFuelSystem` (Metal Plates + 2 Rubber Tubing + Valves → Fuel System)
- UI Panel: Assembly Systems Panel

---

## Advanced Automation Tier

### Milestone: "Bearing Manufacturing"
**Condition:** Produce 10 `bearings`  
**Unlocks:**
- Machine: `bearingManufacturingStation` (automates `craftBearing`)

### Milestone: "Valve Assembly Automation"
**Condition:** Produce 12 `valves`  
**Unlocks:**
- Machine: `valveAssemblyStation` (automates `assembleValve`)

### Milestone: "Piston Manufacturing"
**Condition:** Produce 15 `pistons`  
**Unlocks:**
- Machine: `pistonPress` (automates `machinePiston`)

### Milestone: "Gear Manufacturing"
**Condition:** Produce 12 `gears`  
**Unlocks:**
- Machine: `gearCuttingMachine` (automates `machineGear`)

---

## Assembly Systems Tier

### Milestone: "First Assembly Completion"
**Condition:** Produce 1 `wheelAssembly` OR 1 `fuelSystem`  
**Unlocks:**
- Recipe: `assembleEngine` (4 Pistons + Crankshaft + 8 Valves + 4 Spark Plugs + 2 Metal Plates → Engine Assembly)
- Recipe: `assembleTransmission` (6 Gears + 4 Bearings + 2 Clutch Plates + Metal Plates → Transmission Assembly)

### Milestone: "Major Systems Production"
**Condition:** Produce 1 `engineAssembly` AND 1 `transmissionAssembly`  
**Unlocks:**
- Recipe: `assembleChassis` (Wood Frames + 2 Leaf Springs + 2 Axles + 4 Brake Shoes + 4 Metal Brackets → Chassis Assembly)
- Recipe: `assembleBody` (6 Body Panels + 2 Seats + Dashboard + 2 Wood Frames → Body Assembly)
- Recipe: `assembleElectricalSystem` (Batteries + 2 Headlights + Wiring Harness + 2 Electrical Wire → Electrical System)

### Milestone: "Assembly Mastery"
**Condition:** Produce 1+ of 5 different assembly systems  
**Assemblies:** `wheelAssembly`, `fuelSystem`, `engineAssembly`, `transmissionAssembly`, `chassisAssembly`, `bodyAssembly`, `electricalSystem`  
**Unlocks:**
- Recipe: `constructAutomobile` (Engine Assembly + Transmission Assembly + Chassis Assembly + Body Assembly + 4 Wheel Assembly + Electrical System + Fuel System → Automobile)
- UI Panel: Automobile Construction Panel

---

## Assembly Automation Tier

### Milestone: "Engine Assembly Automation"
**Condition:** Produce 3 `engineAssembly`  
**Unlocks:**
- Machine: `engineAssemblyRig` (automates `assembleEngine`)

### Milestone: "Chassis Assembly Automation"
**Condition:** Produce 3 `chassisAssembly`  
**Unlocks:**
- Machine: `chassisAssemblyRig` (automates `assembleChassis`)

---

## Automobile Construction Tier

### Milestone: "First Automobile"
**Condition:** Construct 1 `automobile`  
**Unlocks:**
- Machine: `advancedWireBendingJig` (faster wire spring automation)
- Machine: `advancedFilingStation` (faster bracket automation)
- Machine: `assemblyLine` (automates automobile construction)
- Bonus: 500 Marks

### Milestone: "Automobile Production"
**Condition:** Construct 3 `automobile`  
**Unlocks:**
- Personnel: `logisticsCoordinator`
- Bonus: 1000 Marks

---

## Market & Stock Control

### Milestone: "First Sale"
**Condition:** Sell any item in market  
**Unlocks:**
- Market functionality (already available from start)

### Milestone: "Market Experience"
**Condition:** Complete 10 market transactions  
**Unlocks:**
- Personnel: `procurementSpecialist`
- Personnel: `salesManager`
- UI Panel: Stock Control Panel

### Milestone: "Stock Control Mastery"
**Condition:** Hire both `procurementSpecialist` AND `salesManager`  
**Unlocks:**
- Bonus: 1000 Marks

---

## Resource Discovery

### Salvageable Resources (Always Available)
- `wireStock` - Wire Stock
- `sheetMetal` - Sheet Metal  
- `leatherScraps` - Leather Scraps
- `oil` - Oil

### Market-Only Resources (Unlock Progression)
| Resource | Unlock Condition | Milestone |
|----------|------------------|-----------|
| `fabric` | Produce leather gaskets | "First Leather Gasket" |
| `wood` | Produce metal rods AND plates | "Basic Metalworking" |
| `rubber` | Produce 5 wire springs | "Electrical Introduction" |
| `glass` | Produce electrical wire | "Rubber Processing" |
| `coal` | Master basic components | "Basic Component Mastery" |
| `lead` | Master body construction | "Body Construction" |

---

## Machine Unlock Summary

### Basic Automation (11 machines)
- `wireBendingJig` - 10 wire springs
- `filingStation` - 10 metal brackets
- `leatherCuttingStation` - 8 leather gaskets
- `metalShapingPress` - 12 metal rods
- `plateForge` - 8 metal plates
- `electricalWireStation` - 6 electrical wire
- `rubberFormingMachine` - 5 rubber tubing
- `glassShapingKiln` - 4 glass lenses
- `fabricCuttingTable` - 10 fabric strips
- `woodworkingBench` - 8 wood planks
- `frameAssemblyJig` - 5 wood frames

### Advanced Automation (4 machines)
- `bearingManufacturingStation` - 10 bearings
- `valveAssemblyStation` - 12 valves
- `pistonPress` - 15 pistons
- `gearCuttingMachine` - 12 gears

### Assembly Automation (2 machines)
- `engineAssemblyRig` - 3 engine assemblies
- `chassisAssemblyRig` - 3 chassis assemblies

### Late-Game Automation (3 machines)
- `advancedWireBendingJig` - First automobile
- `advancedFilingStation` - First automobile
- `assemblyLine` - First automobile

**Total Machines:** 20

---

## Design Principles

1. **Progressive Disclosure:** Each milestone unlocks a small, manageable set of new content
2. **Logical Dependencies:** Unlocks follow realistic manufacturing dependencies
3. **Meaningful Choices:** Players must engage with each tier before advancing
4. **Clear Progression:** Each unlock feels earned and builds toward the next goal
5. **Comprehensive Automation:** Every basic component has automation available
6. **Balanced Thresholds:** Production requirements scale appropriately with complexity

---

## Implementation Status
- [x] Update milestone conditions and rewards
- [x] Add new machine definitions for all basic components
- [x] Update initial game state to start with only 3 basic recipes
- [x] Add comprehensive automation milestones
- [x] Test progression flow
- [x] Balance production requirements

### Future Considerations
- Additional automation tiers for late game
- Prestige/reset mechanics for extended play
- Quality/efficiency upgrades for existing systems
- Export/trade mechanics for surplus production