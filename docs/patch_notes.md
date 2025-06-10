# Autobahn - Game Balance Patch Notes

## Overview
This document outlines planned balance changes to improve game progression and challenge using existing systems. Changes are organized into stages for easier implementation and testing.

## Stage 1: Resource Economy & Basic Systems
### Resource Costs
- Increase raw material costs by 25-30%:
  - Wire Stock: 2 → 3 marks
  - Sheet Metal: 3 → 4 marks
  - Leather Scraps: 1 → 2 marks
  - Oil: 4 → 5 marks

### Market Prices
- Adjust component sell prices:
  - Basic components: 2-2.5x material cost
  - Advanced components: 2.5-3.5x material cost
  - Assembly components: 3.5-4.5x material cost

### Crafting Times
- Basic recipes: 2-8 seconds (unchanged)
- Advanced recipes: 20-40 seconds (up from 10-30)
- Assembly recipes: 45-75 seconds (up from 15-45)
- Automobile construction: 300 seconds (up from 180)

### Machine Production
- Basic machines: 2.0x speed (unchanged)
- Advanced machines: 1.5x speed (down from 1.7-1.8)
- Assembly machines: 1.3x speed (down from 1.5-1.6)
- Assembly line: 1.5x speed (up from 1.2)

## Stage 2: Advanced Systems & Progression
### Machine Costs
- Keep initial costs unchanged
- Implement scaling upgrade costs (1.3x per level)
- Adjust machine input requirements:
  - Basic machines: Require more basic components
  - Advanced machines: Require more advanced components
  - Assembly machines: Require more assembly components

### Recipe Requirements
- Increase input requirements for advanced recipes:
  - Engine components: +30% material requirements
  - Transmission components: +25% material requirements
  - Chassis components: +20% material requirements
  - Body components: +15% material requirements

### Milestone Requirements
- Increase production requirements by 20-30%
- Adjust milestone thresholds:
  - Basic automation: 12 items (up from 10)
  - Advanced automation: 15 items (up from 12-15)
  - Assembly automation: 4 items (up from 3)

## Stage 3: Economic Balance
### Market Adjustments
- Rebalance buy/sell prices:
  - Raw materials: 1:1 ratio (unchanged)
  - Basic components: 1:1.5 ratio
  - Advanced components: 1:2 ratio
  - Assembly components: 1:2.5 ratio
  - Final products: 1:3 ratio

## Implementation Notes
- All resource and monetary values should be whole numbers
- Focus on maintaining game flow while increasing challenge
- Ensure changes don't create resource bottlenecks

## Balance Goals
- Create more meaningful progression
- Encourage strategic automation decisions
- Make resource management more challenging
- Maintain game accessibility
- Ensure all systems remain viable 