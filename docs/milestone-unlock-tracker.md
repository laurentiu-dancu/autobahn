# Milestone and Unlock Tracker

**Game:** Autobahn - Industrial Incremental  
**Purpose:** Track all milestones, unlocks, and progression gates  
**Last Updated:** January 2025  

---

## Table of Contents

1. [Initial Game State](#initial-game-state)
2. [Basic Crafting Tier](#basic-crafting-tier)
3. [Advanced Crafting Tier](#advanced-crafting-tier)
4. [Assembly Systems Tier](#assembly-systems-tier)
5. [Automobile Construction Tier](#automobile-construction-tier)
6. [Automation Unlocks](#automation-unlocks)
7. [Market & Economy](#market--economy)
8. [Stock Control System](#stock-control-system)
9. [UI Panel Unlocks](#ui-panel-unlocks)
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
**Condition:** Produce 1 `metalRods` AND 1 `metalPlates`  
**Unlocks:**
- Recipe: `cutWoodPlanks` (Wood → 2 Wood Planks)
- Recipe: `buildWoodFrame` (2 Wood Planks + 2 Metal Brackets → Wood Frame)
- Resource Discovery: `wood`

### Milestone: "Basic Component Production"
**Condition:** Produce 1 unit of 5 different basic components  
**Components:** `wireSprings`, `metalBrackets`, `leatherGaskets`, `metalRods`, `metalPlates`, `fabricStrips`, `woodPlanks`, `woodFrames`  
**Unlocks:**
- Recipe: `makeElectricalWire` (Wire Stock + Rubber → Electrical Wire)
- Resource Discovery: `rubber`
- UI Panel: Advanced Crafting Panel

### Milestone: "Electrical Component Introduction"
**Condition:** Produce 1 `electricalWire`  
**Unlocks:**
- Recipe: `formRubberTubing` (Rubber → Rubber Tubing)
- Resource Discovery: `glass`

### Milestone: "Glass and Fuel Components"
**Condition:** Produce 1 `rubberTubing`  
**Unlocks:**
- Recipe: `shapeGlassLens` (Glass → Glass Lenses)
- Resource Discovery: `coal`

---

## Advanced Crafting Tier

### Milestone: "Entry to Advanced Crafting"
**Condition:** Produce 20 `wireSprings`  
**Unlocks:**
- Recipe: `craftBearing` (Metal Rods + Oil → Bearings)
- Recipe: `assembleValve` (Metal Rods + Wire Springs → Valves)
- Resource Discovery: `lead`

### Milestone: "Engine Component Basics"
**Condition:** Produce 1 `bearings` AND 1 `valves`  
**Unlocks:**
- Recipe: `machinePiston` (2 Metal Rods + Metal Plates → Pistons)
- Recipe: `craftSparkPlug` (Metal Rods + Electrical Wire → Spark Plugs)

### Milestone: "Transmission Component Basics"
**Condition:** Produce 1 `pistons` AND 1 `sparkPlugs`  
**Unlocks:**
- Recipe: `machineGear` (2 Metal Plates + Coal → Gears)
- Recipe: `assembleClutchPlate` (2 Metal Plates + Fabric Strips → Clutch Plates)

### Milestone: "Chassis Component Basics"
**Condition:** Produce 1 `gears` AND 1 `clutchPlates`  
**Unlocks:**
- Recipe: `buildLeafSpring` (3 Wire Springs + 2 Metal Brackets → Leaf Springs)
- Recipe: `forgeAxle` (2 Metal Rods + 2 Bearings → Axles)

### Milestone: "Body Component Basics"
**Condition:** Produce 1 `leafSprings` AND 1 `axles`  
**Unlocks:**
- Recipe: `formBodyPanel` (2 Metal Plates + Metal Brackets → Body Panels)
- Recipe: `upholsterSeat` (Wood Frames + 2 Fabric Strips + Leather Gaskets → Seats)

### Milestone: "Electrical System Components"
**Condition:** Produce 1 `bodyPanels` AND 1 `seats`  
**Unlocks:**
- Recipe: `assembleBattery` (2 Lead + Rubber Tubing → Batteries)
- Recipe: `buildHeadlight` (Glass Lenses + Metal Brackets + Electrical Wire → Headlights)
- Recipe: `assembleWiringHarness` (5 Electrical Wire + 2 Rubber Tubing → Wiring Harness)

### Milestone: "Advanced Component Mastery"
**Condition:** Produce 1 unit of 5 different advanced components  
**Components:** `pistons`, `gears`, `bearings`, `valves`, `sparkPlugs`, `clutchPlates`, `leafSprings`, `axles`, `brakeShoes`, `bodyPanels`, `seats`, `dashboard`, `batteries`, `headlights`, `wiringHarness`  
**Unlocks:**
- Recipe: `assembleWheel` (Metal Rods + 8 Wire Springs + Rubber Tubing → Wheel Assembly)
- Recipe: `assembleFuelSystem` (Metal Plates + 2 Rubber Tubing + Valves → Fuel System)
- UI Panel: Assembly Systems Panel

---

## Assembly Systems Tier

### Milestone: "Wheel and Fuel System Assembly"
**Condition:** Produce 1 `wheelAssembly` AND 1 `fuelSystem`  
**Unlocks:**
- Recipe: `assembleEngine` (4 Pistons + Crankshaft + 8 Valves + 4 Spark Plugs + 2 Metal Plates → Engine Assembly)
- Recipe: `assembleTransmission` (6 Gears + 4 Bearings + 2 Clutch Plates + Metal Plates → Transmission Assembly)

### Milestone: "Chassis and Body Assembly"
**Condition:** Produce 1 `engineAssembly` AND 1 `transmissionAssembly`  
**Unlocks:**
- Recipe: `assembleChassis` (Wood Frames + 2 Leaf Springs + 2 Axles + 4 Brake Shoes + 4 Metal Brackets → Chassis Assembly)
- Recipe: `assembleBody` (6 Body Panels + 2 Seats + Dashboard + 2 Wood Frames → Body Assembly)

### Milestone: "Electrical System Assembly"
**Condition:** Produce 1 `chassisAssembly` AND 1 `bodyAssembly`  
**Unlocks:**
- Recipe: `assembleElectricalSystem` (Batteries + 2 Headlights + Wiring Harness + 2 Electrical Wire → Electrical System)
- UI Panel: Automobile Construction Panel

---

## Automobile Construction Tier

### Milestone: "First Assembly"
**Condition:** Complete first major assembly (any assembly system recipe)  
**Unlocks:**
- Recipe: `constructAutomobile` (Engine Assembly + Transmission Assembly + Chassis Assembly + Body Assembly + 4 Wheel Assembly + Electrical System + Fuel System → Automobile)

### Milestone: "First Automobile"
**Condition:** Construct 1 `automobile`  
**Unlocks:**
- Machine: `advancedWireBendingJig`
- Machine: `advancedFilingStation`
- Machine: `assemblyLine`
- Bonus: 500 Marks

### Milestone: "Automobile Fleet"
**Condition:** Construct 5 `automobile`  
**Unlocks:**
- Personnel: `logisticsCoordinator`
- Bonus: 2000 Marks

---

## Automation Unlocks

### Basic Automation

#### Milestone: "Spring Production"
**Condition:** Produce 10 `wireSprings`  
**Unlocks:**
- Machine: `wireBendingJig` (automates `bendWireSpring`)

#### Milestone: "Bracket Production"
**Condition:** Produce 10 `metalBrackets`  
**Unlocks:**
- Machine: `filingStation` (automates `fileMetalBracket`)

### Advanced Automation

#### Milestone: "Piston Production Line"
**Condition:** Produce 20 `pistons`  
**Unlocks:**
- Machine: `pistonPress` (automates `machinePiston`)

#### Milestone: "Gear Manufacturing Efficiency"
**Condition:** Produce 20 `gears`  
**Unlocks:**
- Machine: `gearCuttingMachine` (automates `machineGear`)

#### Milestone: "Engine Assembly Automation"
**Condition:** Produce 5 `engineAssembly`  
**Unlocks:**
- Machine: `engineAssemblyRig` (automates `assembleEngine`)

#### Milestone: "Chassis Assembly Automation"
**Condition:** Produce 5 `chassisAssembly`  
**Unlocks:**
- Machine: `chassisAssemblyRig` (automates `assembleChassis`)

---

## Market & Economy

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

---

## Stock Control System

### Milestone: "Basic Automation Personnel"
**Condition:** Hire both `procurementSpecialist` AND `salesManager`  
**Unlocks:**
- Personnel: `supplyChainCoordinator`

### Milestone: "Automated Supply Chain"
**Condition:** Hire both basic personnel AND have 5 active stock control rules  
**Unlocks:**
- Personnel: `logisticsCoordinator` (if not already unlocked)
- Advanced stock control features

---

## UI Panel Unlocks

| Panel | Unlock Condition | Milestone |
|-------|------------------|-----------|
| Basic Crafting | Always visible | Game Start |
| Market | Always visible | Game Start |
| Advanced Crafting | Produce 5 different basic components | "Basic Component Production" |
| Assembly Systems | Produce 5 different advanced components | "Advanced Component Mastery" |
| Automobile Construction | Produce chassis AND body assembly | "Electrical System Assembly" |
| Stock Control | Complete 10 market transactions | "Market Experience" |

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
| `rubber` | Produce 5 basic components | "Basic Component Production" |
| `glass` | Produce electrical wire | "Electrical Component Introduction" |
| `coal` | Produce rubber tubing | "Glass and Fuel Components" |
| `lead` | Produce 20 wire springs | "Entry to Advanced Crafting" |

---

## Notes

### Design Principles
1. **Progressive Disclosure:** Each milestone unlocks a small, manageable set of new content
2. **Logical Dependencies:** Unlocks follow realistic manufacturing dependencies
3. **Meaningful Choices:** Players must engage with each tier before advancing
4. **Clear Progression:** Each unlock feels earned and builds toward the next goal

### Implementation Status
- [ ] Update milestone conditions and rewards
- [ ] Add new machine definitions
- [ ] Update initial game state
- [ ] Add new personnel types
- [ ] Test progression flow
- [ ] Balance production requirements

### Future Considerations
- Additional automation tiers for late game
- Prestige/reset mechanics for extended play
- Quality/efficiency upgrades for existing systems
- Export/trade mechanics for surplus production