var k=Object.defineProperty;var M=(l,t,e)=>t in l?k(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var c=(l,t,e)=>M(l,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const C={wireStock:{id:"wireStock",name:"Wire Stock",amount:0,description:"Basic metal wire for springs and components"},sheetMetal:{id:"sheetMetal",name:"Sheet Metal",amount:0,description:"Thin metal sheets for brackets"},leatherScraps:{id:"leatherScraps",name:"Leather Scraps",amount:0,description:"Leather pieces for gaskets"},oil:{id:"oil",name:"Oil",amount:0,description:"For lubrication and treatment"},wireSprings:{id:"wireSprings",name:"Wire Springs",amount:0,description:"Hand-bent springs for automotive use"},metalBrackets:{id:"metalBrackets",name:"Metal Brackets",amount:0,description:"Filed and shaped mounting brackets"},leatherGaskets:{id:"leatherGaskets",name:"Leather Gaskets",amount:0,description:"Cut gaskets for sealing"},springAssemblies:{id:"springAssemblies",name:"Spring Assemblies",amount:0,description:"Multiple springs combined for suspension"},repairKits:{id:"repairKits",name:"Automotive Repair Kits",amount:0,description:"Complete sets of common replacement parts"},marks:{id:"marks",name:"Marks",amount:0,description:"Currency for trading"}},w=[{id:"firstWireSpring",name:"First Wire Spring",description:"Bend your first wire spring",condition:l=>l.resources.wireSprings.amount>=1,reward:(l,t)=>{l.unlockedRecipes.add("assembleSpringSet")}},{id:"tenWireSprings",name:"Spring Production",description:"Produce 10 wire springs",condition:l=>l.totalProduced.wireSprings>=10,reward:l=>{l.unlockedMachines.add("wireBendingJig")}},{id:"firstSpringAssembly",name:"First Assembly",description:"Create your first spring assembly",condition:l=>l.resources.springAssemblies.amount>=1,reward:l=>{l.unlockedRecipes.add("buildRepairKit"),l.unlockedMachines.add("filingStation")}},{id:"firstSale",name:"First Sale",description:"Sell your first item",condition:l=>l.totalSales>0,reward:()=>{}},{id:"tenMarketTransactions",name:"Market Experience",description:"Complete 10 market transactions",condition:l=>l.totalMarketTransactions>=10,reward:(l,t)=>{l.unlockedStockControl.add("procurementSpecialist"),l.unlockedStockControl.add("salesManager"),t&&t.setStockControlVisibility?t.setStockControlVisibility(!0):l.uiState.showStockControl=!0}},{id:"hireBasicSpecialists",name:"Basic Automation",description:"Hire both procurement specialist and sales manager",condition:l=>!!(l.stockControl.personnel.procurementSpecialist&&l.stockControl.personnel.salesManager),reward:l=>{l.unlockedStockControl.add("supplyChainCoordinator")}}];class P{constructor(){c(this,"listeners",new Map)}on(t,e){this.listeners.has(t)||this.listeners.set(t,[]),this.listeners.get(t).push(e)}off(t,e){const a=this.listeners.get(t);if(a){const s=a.indexOf(e);s>-1&&a.splice(s,1)}}emit(t,e){const a=this.listeners.get(t);a&&a.forEach(s=>s(e))}removeAllListeners(){this.listeners.clear()}}class E{constructor(){c(this,"notifications",new Map);c(this,"container",null);c(this,"nextId",1);this.createContainer()}createContainer(){const t=document.querySelector(".notifications-container");t&&t.remove(),this.container=document.createElement("div"),this.container.className="notifications-container",document.body.appendChild(this.container)}addNotification(t,e="info",a=5e3){const s=`notification_${this.nextId++}_${Date.now()}`,i={id:s,message:t,type:e,timestamp:Date.now(),duration:a,isVisible:!1,isRemoving:!1};return this.notifications.set(s,i),this.renderNotification(i),requestAnimationFrame(()=>{this.showNotification(s)}),s}removeNotification(t){const e=this.notifications.get(t);!e||e.isRemoving||(e.isRemoving=!0,this.hideNotification(t))}renderNotification(t){if(!this.container)return;const e=document.createElement("div");e.className=`notification notification-${t.type}`,e.setAttribute("data-notification-id",t.id),e.style.transform="translateX(100%)",e.style.opacity="0",e.innerHTML=`
      <div class="notification-content">
        <span class="notification-message">${t.message}</span>
        <button class="notification-close" data-close-notification="${t.id}">×</button>
      </div>
      <div class="notification-progress" data-notification-progress="${t.id}"></div>
    `;const a=e.querySelector("[data-close-notification]");a==null||a.addEventListener("click",()=>{this.removeNotification(t.id)}),this.container.appendChild(e)}showNotification(t){var i;const e=this.notifications.get(t);if(!e||e.isRemoving)return;const a=(i=this.container)==null?void 0:i.querySelector(`[data-notification-id="${t}"]`);if(!a)return;e.isVisible=!0,a.style.transition="transform 0.3s ease, opacity 0.3s ease",a.style.transform="translateX(0)",a.style.opacity="1";const s=a.querySelector("[data-notification-progress]");s&&setTimeout(()=>{e.isRemoving||(s.style.transition=`width ${e.duration}ms linear`,s.style.width="0%")},100),setTimeout(()=>{e.isRemoving||this.removeNotification(t)},e.duration)}hideNotification(t){var s;if(!this.notifications.get(t))return;const a=(s=this.container)==null?void 0:s.querySelector(`[data-notification-id="${t}"]`);if(!a){this.notifications.delete(t);return}a.style.transition="transform 0.3s ease, opacity 0.3s ease, max-height 0.3s ease, margin 0.3s ease, padding 0.3s ease",a.style.transform="translateX(100%)",a.style.opacity="0",a.style.maxHeight="0",a.style.marginBottom="0",a.style.paddingTop="0",a.style.paddingBottom="0",setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a),this.notifications.delete(t)},300)}getActiveNotifications(){return Array.from(this.notifications.values())}clearAll(){Array.from(this.notifications.keys()).forEach(e=>this.removeNotification(e))}destroy(){this.clearAll(),this.container&&this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container=null}}class A{constructor(){c(this,"state");c(this,"saveKey","autobahn-save");c(this,"eventEmitter");c(this,"notificationManager");this.eventEmitter=new P,this.notificationManager=new E,this.state=this.loadGame()||this.createNewGame()}getEventEmitter(){return this.eventEmitter}createNewGame(){return{resources:{...C},machines:{},stockControl:{personnel:{},rules:{},lastSalaryPayment:Date.now()},unlockedRecipes:new Set(["bendWireSpring","fileMetalBracket","cutLeatherGasket"]),unlockedMachines:new Set,unlockedStockControl:new Set,completedMilestones:new Set,totalClicks:0,totalProduced:{},totalSales:0,totalMarketTransactions:0,gameStartTime:Date.now(),lastSaveTime:Date.now(),uiState:{discoveredResources:new Set(["marks","wireStock","sheetMetal","leatherScraps","oil"]),showMarket:!0,showStockControl:!1,panelStates:{}}}}getState(){return this.state}setMarketVisibility(t){this.state.uiState.showMarket!==t&&(this.state.uiState.showMarket=t,this.eventEmitter.emit("marketVisibilityChanged",{visible:t}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()}))}setStockControlVisibility(t){this.state.uiState.showStockControl!==t&&(this.state.uiState.showStockControl=t,this.eventEmitter.emit("stockControlVisibilityChanged",{visible:t}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()}))}addNotification(t,e="info",a=5e3){return this.notificationManager.addNotification(t,e,a)}removeNotification(t){this.notificationManager.removeNotification(t)}getNotificationManager(){return this.notificationManager}setPanelState(t,e){this.state.uiState.panelStates[t]||(this.state.uiState.panelStates[t]={expanded:!0}),Object.assign(this.state.uiState.panelStates[t],e)}updateResource(t,e){if(this.state.resources[t]){const a=this.state.resources[t].amount;this.state.resources[t].amount=Math.max(0,this.state.resources[t].amount+e);const s=this.state.resources[t].amount;e>0&&(this.state.totalProduced[t]=(this.state.totalProduced[t]||0)+e);const i=this.state.uiState.discoveredResources.has(t);(this.state.resources[t].amount>0||a>0&&this.state.resources[t].amount===0)&&(i||(this.state.uiState.discoveredResources.add(t),this.eventEmitter.emit("resourceDiscovered",{resourceId:t}))),this.eventEmitter.emit("resourceAmountChanged",{resourceId:t,oldAmount:a,newAmount:s}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}}canAfford(t){return t.every(e=>{var a;return((a=this.state.resources[e.resourceId])==null?void 0:a.amount)>=e.amount})}spendResources(t){return this.canAfford(t)?(t.forEach(e=>{this.updateResource(e.resourceId,-e.amount)}),!0):!1}recordSale(t,e,a){this.state.totalSales++,this.state.totalMarketTransactions++,this.eventEmitter.emit("marketTransactionCompleted",{type:"sell",resourceId:t,quantity:e,totalValue:a}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}recordPurchase(t,e,a){this.state.totalMarketTransactions++,this.eventEmitter.emit("marketTransactionCompleted",{type:"buy",resourceId:t,quantity:e,totalValue:a}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}addMachine(t,e){this.state.machines[t]={...e},this.eventEmitter.emit("machineBuilt",{machineId:t,machine:this.state.machines[t]}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}incrementClicks(){this.state.totalClicks++,this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}checkMilestones(){w.forEach(t=>{!this.state.completedMilestones.has(t.id)&&t.condition(this.state)&&(this.state.completedMilestones.add(t.id),t.reward(this.state),this.eventEmitter.emit("milestoneCompleted",{milestoneId:t.id,milestoneName:t.name}),this.addNotification(`Milestone achieved: ${t.name}!`,"success",3e3))}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}updateMachine(t,e){if(this.state.machines[t]){const a=this.state.machines[t].status,s=this.state.machines[t].isActive;Object.assign(this.state.machines[t],e),e.status&&a!==e.status&&this.eventEmitter.emit("machineStatusChanged",{machineId:t,oldStatus:a||"stopped",newStatus:e.status}),e.isActive!==void 0&&s!==e.isActive&&this.eventEmitter.emit("machineToggled",{machineId:t,isActive:e.isActive}),e.level&&e.level>(this.state.machines[t].level||1)&&this.eventEmitter.emit("machineUpgraded",{machineId:t,newLevel:e.level}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}}updatePersonnel(t,e){const a=!!this.state.stockControl.personnel[t];this.state.stockControl.personnel[t]=e,a||this.eventEmitter.emit("personnelHired",{personnelId:t,personnel:e}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}removePersonnel(t){this.state.stockControl.personnel[t]&&(delete this.state.stockControl.personnel[t],this.eventEmitter.emit("personnelFired",{personnelId:t}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()}))}updateRule(t,e){var i;const a=(i=this.state.stockControl.rules[t])==null?void 0:i.isEnabled,s=!this.state.stockControl.rules[t];this.state.stockControl.rules[t]=e,s?this.eventEmitter.emit("ruleCreated",{ruleId:t,rule:e}):a!==e.isEnabled&&this.eventEmitter.emit("ruleToggled",{ruleId:t,isEnabled:e.isEnabled}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}removeRule(t){this.state.stockControl.rules[t]&&(delete this.state.stockControl.rules[t],this.eventEmitter.emit("ruleDeleted",{ruleId:t}),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()}))}showNotification(t){this.addNotification(t,"success",3e3)}saveGame(){this.state.lastSaveTime=Date.now();const t={...this.state,unlockedRecipes:Array.from(this.state.unlockedRecipes),unlockedMachines:Array.from(this.state.unlockedMachines),unlockedStockControl:Array.from(this.state.unlockedStockControl),completedMilestones:Array.from(this.state.completedMilestones),uiState:{...this.state.uiState,discoveredResources:Array.from(this.state.uiState.discoveredResources)}};localStorage.setItem(this.saveKey,JSON.stringify(t)),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}loadGame(){var t,e,a,s;try{const i=localStorage.getItem(this.saveKey);if(!i)return null;const n=JSON.parse(i);return{...n,machines:Object.fromEntries(Object.entries(n.machines||{}).map(([o,r])=>[o,{...r,status:r.status==="paused"?"stopped":r.status||"stopped",statusMessage:r.statusMessage||void 0}])),unlockedRecipes:new Set(n.unlockedRecipes),unlockedMachines:new Set(n.unlockedMachines),unlockedStockControl:new Set(n.unlockedStockControl||[]),completedMilestones:new Set(n.completedMilestones||[]),stockControl:n.stockControl||{personnel:{},rules:{},lastSalaryPayment:Date.now()},uiState:{discoveredResources:new Set(((t=n.uiState)==null?void 0:t.discoveredResources)||["marks"]),showMarket:((e=n.uiState)==null?void 0:e.showMarket)||!1,showStockControl:((a=n.uiState)==null?void 0:a.showStockControl)||!1,panelStates:((s=n.uiState)==null?void 0:s.panelStates)||{}},totalProduced:n.totalProduced||{},totalSales:n.totalSales||0,totalMarketTransactions:n.totalMarketTransactions||0}}catch(i){return console.error("Failed to load game:",i),null}}resetGame(){localStorage.removeItem(this.saveKey),this.state=this.createNewGame(),this.addNotification("Game reset successfully!","success",3e3),this.eventEmitter.emit("gameStateUpdated",{timestamp:Date.now()})}}const g={bendWireSpring:{id:"bendWireSpring",name:"Bend Wire Spring",inputs:[{resourceId:"wireStock",amount:1}],outputs:[{resourceId:"wireSprings",amount:1}],craftTime:2e3,description:"Hand-bend wire into automotive springs"},fileMetalBracket:{id:"fileMetalBracket",name:"File Metal Bracket",inputs:[{resourceId:"sheetMetal",amount:1}],outputs:[{resourceId:"metalBrackets",amount:1}],craftTime:3e3,description:"File and shape mounting brackets"},cutLeatherGasket:{id:"cutLeatherGasket",name:"Cut Leather Gasket",inputs:[{resourceId:"leatherScraps",amount:1}],outputs:[{resourceId:"leatherGaskets",amount:1}],craftTime:1500,description:"Cut leather into sealing gaskets"},assembleSpringSet:{id:"assembleSpringSet",name:"Assemble Spring Set",inputs:[{resourceId:"wireSprings",amount:3},{resourceId:"metalBrackets",amount:1}],outputs:[{resourceId:"springAssemblies",amount:1}],craftTime:5e3,description:"Combine springs and brackets into suspension assemblies"},buildRepairKit:{id:"buildRepairKit",name:"Build Repair Kit",inputs:[{resourceId:"springAssemblies",amount:1},{resourceId:"leatherGaskets",amount:2},{resourceId:"oil",amount:1}],outputs:[{resourceId:"repairKits",amount:1}],craftTime:8e3,description:"Package complete automotive repair kit"}};class R{constructor(t){c(this,"gameState");c(this,"activeCrafts",new Map);this.gameState=t}canCraft(t){const e=g[t];return!e||!this.gameState.getState().unlockedRecipes.has(t)?!1:this.gameState.canAfford(e.inputs)}startCraft(t){if(!this.canCraft(t)||this.activeCrafts.has(t))return!1;const e=g[t];if(!this.gameState.spendResources(e.inputs))return!1;if(this.gameState.incrementClicks(),this.gameState.getEventEmitter().emit("craftStarted",{recipeId:t}),e.craftTime===0)this.completeCraft(t);else{const a=Date.now()+e.craftTime;this.activeCrafts.set(t,a),setTimeout(()=>{this.completeCraft(t)},e.craftTime)}return!0}completeCraft(t){const e=g[t];e&&(this.activeCrafts.delete(t),e.outputs.forEach(a=>{this.gameState.updateResource(a.resourceId,a.amount)}),this.gameState.getEventEmitter().emit("craftCompleted",{recipeId:t,outputs:e.outputs}),this.gameState.checkMilestones())}getCraftProgress(t){const e=this.activeCrafts.get(t);if(!e)return 0;const a=g[t];if(!a||a.craftTime===0)return 0;const s=e-a.craftTime,i=Date.now()-s;return Math.min(1,Math.max(0,i/a.craftTime))}isCrafting(t){return this.activeCrafts.has(t)}getAvailableRecipes(){const t=this.gameState.getState();return Object.values(g).filter(e=>t.unlockedRecipes.has(e.id))}}const S={wireBendingJig:{id:"wireBendingJig",name:"Wire Bending Jig",recipeId:"bendWireSpring",level:1,cost:[{resourceId:"metalBrackets",amount:2},{resourceId:"marks",amount:15}],upgradeCost:[{resourceId:"metalBrackets",amount:3},{resourceId:"marks",amount:25}],productionRate:2,isActive:!1,lastProduction:0,description:"Automates wire spring production"},filingStation:{id:"filingStation",name:"Filing Station",recipeId:"fileMetalBracket",level:1,cost:[{resourceId:"wireSprings",amount:5},{resourceId:"marks",amount:20}],upgradeCost:[{resourceId:"wireSprings",amount:8},{resourceId:"marks",amount:35}],productionRate:2,isActive:!1,lastProduction:0,description:"Automates bracket filing and shaping"}};class ${constructor(t){c(this,"gameState");this.gameState=t}canBuildMachine(t){const e=S[t];if(!e)return!1;const a=this.gameState.getState();return!a.unlockedMachines.has(t)||a.machines[t]?!1:this.gameState.canAfford(e.cost)}buildMachine(t){if(!this.canBuildMachine(t))return!1;const e=S[t];if(!this.gameState.spendResources(e.cost))return!1;const a=g[e.recipeId],s=a?this.gameState.canAfford(a.inputs):!1,i={...e,lastProduction:Date.now(),isActive:!1,status:s?"paused":"waiting_resources",statusMessage:void 0};return this.gameState.addMachine(t,i),!0}canUpgradeMachine(t){const a=this.gameState.getState().machines[t];if(!a)return!1;const s=a.upgradeCost.map(i=>({...i,amount:i.amount*a.level}));return this.gameState.canAfford(s)}upgradeMachine(t){if(!this.canUpgradeMachine(t))return!1;const a=this.gameState.getState().machines[t],s=a.upgradeCost.map(n=>({...n,amount:n.amount*a.level}));if(!this.gameState.spendResources(s))return!1;const i={level:a.level+1,productionRate:Math.max(.5,a.productionRate*.85)};return this.gameState.updateMachine(t,i),!0}toggleMachine(t){const e=this.gameState.getState(),a=e.machines[t];if(a){const s=a.isActive,i={isActive:!s};if(s)i.status="stopped",i.statusMessage="Manually stopped";else{const n=g[a.recipeId];if(n&&this.gameState.canAfford(n.inputs))i.lastProduction=Date.now(),i.status="running",i.statusMessage=void 0;else{const o=n?n.inputs.filter(r=>{var m;return(((m=e.resources[r.resourceId])==null?void 0:m.amount)||0)<r.amount}).map(r=>{const d=e.resources[r.resourceId],m=(d==null?void 0:d.amount)||0;return`${(d==null?void 0:d.name)||r.resourceId} (need ${r.amount}, have ${Math.floor(m)})`}):[];i.status="waiting_resources",i.statusMessage=o.length>0?`Waiting for: ${o.join(", ")}`:"Waiting for resources"}}this.gameState.updateMachine(t,i)}}updateMachines(){const t=this.gameState.getState(),e=Date.now();Object.values(t.machines).forEach(a=>{let s={},i=!1;if(!a.isActive){(a.status!=="stopped"||a.statusMessage!=="Manually stopped")&&(s.status="stopped",s.statusMessage="Manually stopped",i=!0),i&&this.gameState.updateMachine(a.id,s);return}const n=g[a.recipeId];if(!n)return;const o=n.craftTime*a.productionRate;if(e-a.lastProduction>=o)if(this.gameState.canAfford(n.inputs))this.gameState.spendResources(n.inputs),n.outputs.forEach(d=>{this.gameState.updateResource(d.resourceId,d.amount)}),s.lastProduction=e,s.status="running",s.statusMessage=void 0,i=!0,this.gameState.checkMilestones();else{const d=n.inputs.filter(m=>{var h;return(((h=t.resources[m.resourceId])==null?void 0:h.amount)||0)<m.amount}).map(m=>{const u=t.resources[m.resourceId],h=(u==null?void 0:u.amount)||0;return`${(u==null?void 0:u.name)||m.resourceId} (need ${m.amount}, have ${Math.floor(h)})`});a.status!=="waiting_resources"&&(s.status="waiting_resources",s.statusMessage=`Waiting for: ${d.join(", ")}`,i=!0)}else a.status==="waiting_resources"?this.gameState.canAfford(n.inputs)&&(s.status="running",s.statusMessage=void 0,i=!0,s.lastProduction=e-o):a.status!=="running"&&a.status!=="waiting_resources"&&(s.status="running",s.statusMessage=void 0,i=!0);i&&this.gameState.updateMachine(a.id,s)})}getMachineProgress(t){const a=this.gameState.getState().machines[t];if(!a||!a.isActive||a.status!=="running")return 0;const s=g[a.recipeId];if(!s)return 0;const i=s.craftTime*a.productionRate,n=Date.now()-a.lastProduction;return Math.min(1,n/i)}getAvailableMachines(){const t=this.gameState.getState();return Array.from(t.unlockedMachines)}}const p={wireStock:{resourceId:"wireStock",buyPrice:2,sellPrice:2,available:!0},sheetMetal:{resourceId:"sheetMetal",buyPrice:3,sellPrice:3,available:!0},leatherScraps:{resourceId:"leatherScraps",buyPrice:1,sellPrice:1,available:!0},oil:{resourceId:"oil",buyPrice:4,sellPrice:4,available:!0},wireSprings:{resourceId:"wireSprings",buyPrice:3,sellPrice:3,available:!0},metalBrackets:{resourceId:"metalBrackets",buyPrice:5,sellPrice:5,available:!0},leatherGaskets:{resourceId:"leatherGaskets",buyPrice:2,sellPrice:2,available:!0},springAssemblies:{resourceId:"springAssemblies",buyPrice:12,sellPrice:12,available:!0},repairKits:{resourceId:"repairKits",buyPrice:25,sellPrice:25,available:!0}};class D{constructor(t){c(this,"gameState");this.gameState=t}canBuy(t,e=1){const a=p[t];if(!a||!a.available||!a.buyPrice)return!1;const s=a.buyPrice*e;return this.gameState.getState().resources.marks.amount>=s}buy(t,e=1){if(!this.canBuy(t,e))return!1;const s=p[t].buyPrice*e;return this.gameState.updateResource("marks",-s),this.gameState.updateResource(t,e),this.gameState.recordPurchase(t,e,s),!0}canSell(t,e=1){var s;const a=p[t];return!a||!a.available||!a.sellPrice?!1:((s=this.gameState.getState().resources[t])==null?void 0:s.amount)>=e}sell(t,e=1){if(!this.canSell(t,e))return!1;const s=p[t].sellPrice*e;return this.gameState.updateResource(t,-e),this.gameState.updateResource("marks",s),this.gameState.recordSale(t,e,s),!0}getBuyableItems(){const t=this.gameState.getState();return t.uiState.showMarket?Object.entries(p).filter(([e,a])=>a.available&&a.buyPrice).map(([e,a])=>{var s;return{resourceId:e,price:a.buyPrice,name:((s=t.resources[e])==null?void 0:s.name)||e}}):[]}getSellableItems(){const t=this.gameState.getState();return t.uiState.showMarket?Object.entries(p).filter(([e,a])=>{var s;return a.available&&a.sellPrice&&((s=t.resources[e])==null?void 0:s.amount)>0}).map(([e,a])=>{var s,i;return{resourceId:e,price:a.sellPrice,name:((s=t.resources[e])==null?void 0:s.name)||e,available:((i=t.resources[e])==null?void 0:i.amount)||0}}):[]}}class L{constructor(t){c(this,"gameState");this.gameState=t}salvageMaterials(){const t=[{resourceId:"wireStock",amount:1},{resourceId:"sheetMetal",amount:1},{resourceId:"leatherScraps",amount:1},{resourceId:"oil",amount:1}],e=Math.floor(Math.random()*t.length),a=t[e];this.gameState.updateResource(a.resourceId,a.amount),this.gameState.getEventEmitter().emit("materialSalvaged",{resourceId:a.resourceId,amount:a.amount}),this.gameState.incrementClicks()}canSalvage(){return!0}}class T{constructor(t,e){c(this,"gameState");c(this,"marketSystem");c(this,"lastUpdate",Date.now());c(this,"lastRuleExecution",0);this.gameState=t,this.marketSystem=e}canHirePersonnel(t){const e=this.gameState.getState();if(e.stockControl.personnel[t]||!e.unlockedStockControl.has(t))return!1;const a=this.getPersonnelTemplate(t);if(!a)return!1;const s=a.hiringCost+a.monthlySalary;return e.resources.marks.amount>=s}hirePersonnel(t){if(!this.canHirePersonnel(t))return!1;const e=this.getPersonnelTemplate(t);if(!e)return!1;this.gameState.getState();const a=e.hiringCost+e.monthlySalary;if(!this.gameState.spendResources([{resourceId:"marks",amount:a}]))return!1;const s={...e,isActive:!0,hiredAt:Date.now()};return this.gameState.updatePersonnel(t,s),!0}firePersonnel(t){const e=this.gameState.getState();e.stockControl.personnel[t]&&(Object.values(e.stockControl.rules).forEach(a=>{a.managedBy===t&&this.updateRule(a.id,{...a,isEnabled:!1})}),this.gameState.removePersonnel(t))}createRule(t,e,a,s,i){const n=`${e}_${t}_${Date.now()}`,o={id:n,resourceId:t,type:e,threshold:a,quantity:s,isEnabled:!0,managedBy:i};return this.gameState.updateRule(n,o),n}updateRule(t,e){const s=this.gameState.getState().stockControl.rules[t];if(s){const i={...s,...e};this.gameState.updateRule(t,i)}}deleteRule(t){this.gameState.removeRule(t)}update(){const t=Date.now(),e=t-this.lastUpdate;this.lastUpdate=t,this.paySalaries(e),this.executeRules()}paySalaries(t){const e=this.gameState.getState(),a=t/(1e3*10);let s=0;Object.values(e.stockControl.personnel).forEach(i=>{i.isActive&&(s+=i.monthlySalary*a)}),s>0&&(e.resources.marks.amount>=s?this.gameState.updateResource("marks",-s):(this.fireAllPersonnel(),this.gameState.showNotification("⚠️ All stock control personnel quit due to unpaid salaries!")))}executeRules(){const t=this.gameState.getState(),e=Date.now();this.lastRuleExecution||(this.lastRuleExecution=e),!(e-this.lastRuleExecution<5e3)&&(this.lastRuleExecution=e,Object.values(t.stockControl.rules).forEach(a=>{var n;if(!a.isEnabled)return;const s=t.stockControl.personnel[a.managedBy];if(!s||!s.isActive){this.updateRule(a.id,{...a,isEnabled:!1});return}const i=((n=t.resources[a.resourceId])==null?void 0:n.amount)||0;if(a.type==="buy"&&i<a.threshold)this.marketSystem.canBuy(a.resourceId,a.quantity)&&this.marketSystem.buy(a.resourceId,a.quantity);else if(a.type==="sell"&&i>a.threshold){const o=Math.min(a.quantity,i-a.threshold);o>0&&this.marketSystem.canSell(a.resourceId,o)&&this.marketSystem.sell(a.resourceId,o)}}))}fireAllPersonnel(){const t=this.gameState.getState();Object.keys(t.stockControl.personnel).forEach(e=>{this.firePersonnel(e)})}getActivePersonnel(){const t=this.gameState.getState();return Object.values(t.stockControl.personnel).filter(e=>e.isActive)}getActiveRules(){const t=this.gameState.getState();return Object.values(t.stockControl.rules).filter(e=>e.isEnabled)}getTotalMonthlyCost(){return this.getActivePersonnel().reduce((t,e)=>t+e.monthlySalary,0)}getPersonnelTemplate(t){return{procurementSpecialist:{id:"procurementSpecialist",name:"Material Procurement Specialist",type:"procurement",monthlySalary:2,hiringCost:50,isActive:!1,hiredAt:0,description:"Automatically purchases raw materials when inventory falls below set thresholds",capabilities:["Auto-buy raw materials","Inventory monitoring","Basic purchasing"]},salesManager:{id:"salesManager",name:"Sales Manager",type:"sales",monthlySalary:3,hiringCost:50,isActive:!1,hiredAt:0,description:"Automatically sells finished products when inventory exceeds set thresholds",capabilities:["Auto-sell products","Inventory monitoring","Basic sales"]},supplyChainCoordinator:{id:"supplyChainCoordinator",name:"Supply Chain Coordinator",type:"coordinator",monthlySalary:5,hiringCost:100,isActive:!1,hiredAt:0,description:"Advanced optimization of both buying and selling with profit margin analysis",capabilities:["Advanced optimization","Profit analysis","Full supply chain management"]}}[t]||null}getAvailablePersonnel(){const t=this.gameState.getState();return Array.from(t.unlockedStockControl)}}class x{constructor(t,e,a,s,i){this.gameState=t,this.craftingSystem=e,this.automationManager=a,this.marketSystem=s,this.stockControlSystem=i}getResourcesData(){const t=this.gameState.getState();return Object.values(t.resources).filter(e=>t.uiState.discoveredResources.has(e.id)&&e.id!=="marks").map(e=>{const a=p[e.id];return{id:e.id,name:e.name,amount:e.amount,displayAmount:Math.floor(e.amount).toString(),canBuy:this.marketSystem.canBuy(e.id),canSell:this.marketSystem.canSell(e.id),buyPrice:a==null?void 0:a.buyPrice,sellPrice:a==null?void 0:a.sellPrice,isDiscovered:t.uiState.discoveredResources.has(e.id)}})}getCraftingData(){const t=this.gameState.getState();return this.craftingSystem.getAvailableRecipes().map(a=>({recipeId:a.id,name:a.name,description:a.description,canCraft:this.craftingSystem.canCraft(a.id),isCrafting:this.craftingSystem.isCrafting(a.id),progress:this.craftingSystem.getCraftProgress(a.id),craftTime:a.craftTime,inputs:a.inputs.map(s=>{const i=t.resources[s.resourceId];return{resourceId:s.resourceId,name:(i==null?void 0:i.name)||s.resourceId,amount:s.amount,available:(i==null?void 0:i.amount)||0}}),outputs:a.outputs.map(s=>{const i=t.resources[s.resourceId];return{resourceId:s.resourceId,name:(i==null?void 0:i.name)||s.resourceId,amount:s.amount}})}))}getMachinesData(){const t=this.gameState.getState();return Object.values(t.machines).map(e=>{const a=g[e.recipeId],s=this.automationManager.getMachineProgress(e.id),i=a?(a.craftTime*e.productionRate/1e3).toFixed(1):"0",n=a?(a.craftTime/1e3).toFixed(1):"0",o=a?Math.round(1/e.productionRate*100):100;return{id:e.id,name:e.name,level:e.level,isActive:e.isActive,status:e.status||"stopped",statusMessage:e.statusMessage,progress:s,canUpgrade:this.automationManager.canUpgradeMachine(e.id),upgradeCost:e.upgradeCost.map(r=>{const d=t.resources[r.resourceId],m=r.amount*e.level;return{resourceId:r.resourceId,name:(d==null?void 0:d.name)||r.resourceId,amount:m}}),efficiency:o,currentSpeed:i,manualSpeed:n}})}getAvailableMachinesData(){const t=this.gameState.getState();return this.automationManager.getAvailableMachines().filter(a=>!t.machines[a]).map(a=>{const s=S[a];return{id:a,name:s.name,description:s.description,canBuild:this.automationManager.canBuildMachine(a),cost:s.cost.map(i=>{const n=t.resources[i.resourceId];return{resourceId:i.resourceId,name:(n==null?void 0:n.name)||i.resourceId,amount:i.amount}})}})}getPersonnelData(){const t=this.gameState.getState(),e=this.stockControlSystem.getAvailablePersonnel(),a=this.stockControlSystem.getActivePersonnel(),s=this.stockControlSystem.getActiveRules(),i=e.filter(o=>!t.stockControl.personnel[o]).map(o=>{const r=this.stockControlSystem.getPersonnelTemplate(o);if(!r)throw new Error(`Personnel template not found: ${o}`);return{id:r.id,name:r.name,type:r.type,monthlySalary:r.monthlySalary,hiringCost:r.hiringCost,totalCost:r.hiringCost+r.monthlySalary,canHire:this.stockControlSystem.canHirePersonnel(o),isActive:!1,description:r.description,capabilities:r.capabilities,managedRulesCount:0}}),n=a.map(o=>{const r=s.filter(d=>d.managedBy===o.id).length;return{id:o.id,name:o.name,type:o.type,monthlySalary:o.monthlySalary,hiringCost:o.hiringCost,totalCost:o.hiringCost+o.monthlySalary,canHire:!1,isActive:!0,description:o.description,capabilities:o.capabilities,managedRulesCount:r}});return{available:i,active:n,totalMonthlyCost:this.stockControlSystem.getTotalMonthlyCost()}}getRulesData(){const t=this.gameState.getState();return this.stockControlSystem.getActiveRules().map(a=>{const s=t.resources[a.resourceId],i=t.stockControl.personnel[a.managedBy];return{id:a.id,resourceName:(s==null?void 0:s.name)||a.resourceId,type:a.type,threshold:a.threshold,quantity:a.quantity,isEnabled:a.isEnabled,managerName:(i==null?void 0:i.name)||"Unknown"}})}getUIStateData(){const t=this.gameState.getState();return{showMarket:t.uiState.showMarket,showStockControl:t.uiState.showStockControl,panelStates:t.uiState.panelStates,marksAmount:Math.floor(t.resources.marks.amount)}}getGameStats(){const t=this.gameState.getState();return{totalClicks:t.totalClicks,totalSales:t.totalSales,totalMarketTransactions:t.totalMarketTransactions,gameStartTime:t.gameStartTime,lastSaveTime:t.lastSaveTime}}}class I{constructor(t){this.actions=t}render(t){const e=t.map(s=>{const i=s.craftTime>0?` (${s.craftTime/1e3}s)`:"",n=s.inputs.map(r=>`${r.amount} ${r.name}`).join(", "),o=s.outputs.map(r=>`${r.amount} ${r.name}`).join(", ");return`
        <div class="craft-item">
          <button 
            class="craft-btn ${s.canCraft&&!s.isCrafting?"available":"disabled"}" 
            data-recipe="${s.recipeId}"
            ${!s.canCraft||s.isCrafting?"disabled":""}
          >
            <div class="craft-content">
              <div class="craft-name">${s.name}${i}</div>
              <div class="craft-details ${s.isCrafting?"hidden":""}">
                <div class="craft-inputs">Needs: ${n}</div>
                <div class="craft-outputs">Makes: ${o}</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar ${s.isCrafting?"visible":"hidden"}">
                  <div class="progress-fill" style="width: ${s.progress*100}%"></div>
                </div>
              </div>
            </div>
          </button>
        </div>
      `}).join("");return`
      <div class="panel crafting-panel">
        <h3>🔨 Manual Crafting</h3>
        
      <div class="salvage-section">
        <button 
          id="salvage-materials-btn" 
          class="craft-btn available"
        >
          <div class="craft-name">🔍 Salvage Materials</div>
          <div class="craft-outputs">Find: 1 random material (Wire Stock, Sheet Metal, Leather Scraps, or Oil)</div>
        </button>
      </div>
    
        ${t.length>0?`
          <h4>Recipes</h4>
        `:""}
        <div class="crafting-list">
          ${e}
        </div>
      </div>
    `}attachEventListeners(t){var e;(e=t.querySelector("#salvage-materials-btn"))==null||e.addEventListener("click",()=>{this.actions.salvageMaterials()}),t.querySelectorAll("[data-recipe]").forEach(a=>{a.addEventListener("click",s=>{var n;const i=(n=s.target.closest("[data-recipe]"))==null?void 0:n.getAttribute("data-recipe");i&&this.actions.startCraft(i)})})}updateDynamicElements(t,e){e.forEach(a=>{const s=t.querySelector(`[data-recipe="${a.recipeId}"]`);if(s){const i=s.querySelector(".progress-bar"),n=s.querySelector(".craft-details"),o=s.querySelector(".progress-fill");i&&n&&(a.isCrafting?(i.classList.remove("hidden"),i.classList.add("visible"),n.classList.add("hidden")):(i.classList.remove("visible"),i.classList.add("hidden"),n.classList.remove("hidden"))),o&&(o.style.width=`${a.progress*100}%`),s.classList.toggle("available",a.canCraft&&!a.isCrafting),s.classList.toggle("disabled",!a.canCraft||a.isCrafting),s.disabled=!a.canCraft||a.isCrafting}})}}class q{constructor(t){this.actions=t}render(t,e){if(e.length===0&&t.length===0)return"";const a=e.map(i=>{const n=i.cost.map(o=>{const r=o.resourceId==="marks"?"€":"";return`${o.amount}${r} ${o.name}`}).join(", ");return`
        <div class="machine-build">
          <button 
            class="build-btn ${i.canBuild?"available":"disabled"}"
            data-machine="${i.id}"
            ${i.canBuild?"":"disabled"}
          >
            <div class="machine-name">Build ${i.name}</div>
            <div class="machine-cost">Cost: ${n}</div>
            <div class="machine-desc">${i.description}</div>
          </button>
        </div>
      `}).join(""),s=t.map(i=>{const n=i.upgradeCost.map(m=>{const u=m.resourceId==="marks"?"€":"";return`${m.amount}${u} ${m.name}`}).join(", "),o=i.status==="running"?"🟢":i.status==="waiting_resources"?"🟡":"🔴",r=i.status==="running"?"Running":i.status==="waiting_resources"?"Waiting for Resources":"Paused",d=i.isActive&&i.status==="running";return`
        <div class="machine-item ${i.isActive?"active":"inactive"} machine-${i.status}" data-machine-id="${i.id}">
          <div class="machine-header">
            <h4>${i.name} (Level ${i.level})</h4>
            <button 
              class="toggle-btn" 
              data-toggle="${i.id}"
            >
              ${i.isActive?"⏸️ Pause":"▶️ Start"}
            </button>
          </div>
          <div class="machine-info">
            <div>Speed: ${i.currentSpeed}s (Manual: ${i.manualSpeed}s) - ${i.efficiency}% efficiency</div>
            <div class="machine-status">
              <span class="status-indicator">${o} ${r}</span>
              ${i.statusMessage?`<div class="status-message">${i.statusMessage}</div>`:""}
            </div>
          </div>
          <div class="progress-bar" data-machine-progress-container="${i.id}" style="display: ${d?"block":"none"};">
            <div class="progress-fill" data-machine-progress="${i.id}" style="width: ${i.progress*100}%"></div>
          </div>
          <button 
            class="upgrade-btn ${i.canUpgrade?"available":"disabled"}"
            data-upgrade="${i.id}"
            ${i.canUpgrade?"":"disabled"}
          >
            Upgrade (${n})
          </button>
        </div>
      `}).join("");return`
      <div class="panel machines-panel">
        <h3>⚙️ Automation</h3>
        ${a}
        ${s}
      </div>
    `}attachEventListeners(t){t.querySelectorAll("[data-machine]").forEach(e=>{e.addEventListener("click",a=>{var i;const s=(i=a.target.closest("[data-machine]"))==null?void 0:i.getAttribute("data-machine");if(s&&this.actions.buildMachine(s)){const o=a.target;o.disabled=!0,o.classList.remove("available"),o.classList.add("disabled")}})}),t.querySelectorAll("[data-toggle]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-toggle");s&&this.actions.toggleMachine(s)})}),t.querySelectorAll("[data-upgrade]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-upgrade");s&&this.actions.upgradeMachine(s)})})}updateDynamicElements(t,e,a){e.forEach(s=>{const i=t.querySelector(`[data-machine-id="${s.id}"]`);if(i){i.className=`machine-item ${s.isActive?"active":"inactive"} machine-${s.status}`;const n=i.querySelector(".status-indicator");if(n){const h=s.status==="running"?"🟢":s.status==="waiting_resources"?"🟡":"🔴",v=s.status==="running"?"Running":s.status==="waiting_resources"?"Waiting for Resources":"Paused";n.textContent=`${h} ${v}`}const o=i.querySelector(".status-message");o&&(s.statusMessage?(o.textContent=s.statusMessage,o.style.display="block"):o.style.display="none");const r=i.querySelector("[data-toggle]");r&&(r.textContent=s.isActive?"⏹️ Stop":"▶️ Start");const d=s.isActive&&s.status==="running",m=i.querySelector(`[data-machine-progress-container="${s.id}"]`);m&&(m.style.display=d?"block":"none");const u=i.querySelector(`[data-machine-progress="${s.id}"]`);u&&(u.style.width=`${s.progress*100}%`)}}),a.forEach(s=>{const i=t.querySelector(`[data-machine="${s.id}"]`);i&&(i.classList.toggle("available",s.canBuild),i.classList.toggle("disabled",!s.canBuild),i.disabled=!s.canBuild)}),e.forEach(s=>{const i=t.querySelector(`[data-upgrade="${s.id}"]`);i&&(i.classList.toggle("available",s.canUpgrade),i.classList.toggle("disabled",!s.canUpgrade),i.disabled=!s.canUpgrade)})}}class B{constructor(t){this.actions=t}render(t,e){if(!e)return"";const a=["wireStock","sheetMetal","leatherScraps","oil"];return`
      <div class="panel market-panel">
        <h3>💰 Resources & Market</h3>
        
        <div class="resources-section">
          <div class="resources-list">
            ${t.map(i=>`
        <div class="resource-item-with-market">
          <div class="resource-info">
            <span class="resource-name">${i.buyPrice||i.sellPrice?`€${i.buyPrice||i.sellPrice} `:""}${i.name}</span>
            <span class="resource-amount" data-resource-amount="${i.id}">${i.displayAmount}</span>
          </div>
          <div class="resource-actions">
            ${a.includes(i.id)?`
              <button 
                class="inline-market-btn buy-btn ${i.canBuy?"available":"disabled"}"
                data-buy="${i.id}"
                ${i.canBuy?"":"disabled"}
                title="Buy ${i.name}"
              >
                +
              </button>
            `:""}
            ${i.canSell?`
              <button 
                class="inline-market-btn sell-btn available"
                data-sell="${i.id}"
                title="Sell ${i.name}"
              >
                -
              </button>
            `:""}
          </div>
        </div>
      `).join("")}
          </div>
        </div>
      </div>
    `}attachEventListeners(t){t.querySelectorAll("[data-buy]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-buy");s&&this.actions.buyResource(s)})}),t.querySelectorAll("[data-sell]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-sell");s&&this.actions.sellResource(s)})})}updateDynamicElements(t,e){e.forEach(i=>{const n=t.querySelector(`[data-resource-amount="${i.id}"]`);n&&(n.textContent=i.displayAmount)}),t.querySelectorAll("[data-buy]").forEach(i=>{const n=i.getAttribute("data-buy");if(n){const o=e.find(r=>r.id===n);o&&(i.classList.toggle("available",o.canBuy),i.classList.toggle("disabled",!o.canBuy),i.disabled=!o.canBuy)}}),t.querySelectorAll("[data-sell]").forEach(i=>{const n=i.getAttribute("data-sell");if(n){const o=e.find(r=>r.id===n);o&&(i.classList.toggle("available",o.canSell),i.classList.toggle("disabled",!o.canSell),i.disabled=!o.canSell)}})}}class U{constructor(t){this.actions=t}render(t,e,a){if(!a)return"";const s=t.available.map(r=>`
        <div class="personnel-hire">
          <button 
            class="hire-btn ${r.canHire?"available":"disabled"}"
            data-hire="${r.id}"
            ${r.canHire?"":"disabled"}
          >
            <div class="personnel-name">Hire ${r.name}</div>
            <div class="personnel-cost">Cost: €${r.hiringCost} + €${r.monthlySalary}/10s</div>
            <div class="personnel-desc">${r.description}</div>
            <div class="personnel-total">Total: €${r.totalCost} (includes first payment)</div>
          </button>
        </div>
      `).join(""),i=t.active.map(r=>`
        <div class="personnel-item active">
          <div class="personnel-header">
            <h4>${r.name}</h4>
            <button 
              class="fire-btn" 
              data-fire="${r.id}"
            >
              🔥 Fire
            </button>
          </div>
          <div class="personnel-info">
            <div>Salary: €${r.monthlySalary}/10s</div>
            <div>Managing: ${r.managedRulesCount} rules</div>
            <div>Type: ${r.type}</div>
          </div>
        </div>
      `).join(""),n=e.map(r=>`
        <div class="rule-item ${r.isEnabled?"enabled":"disabled"}">
          <div class="rule-header">
            <span>${r.type.toUpperCase()} ${r.resourceName}</span>
            <button 
              class="toggle-rule-btn" 
              data-toggle-rule="${r.id}"
            >
              ${r.isEnabled?"⏸️":"▶️"}
            </button>
          </div>
          <div class="rule-info">
            <div>Threshold: ${r.threshold}</div>
            <div>Quantity: ${r.quantity}</div>
            <div>Manager: ${r.managerName}</div>
          </div>
          <button 
            class="delete-rule-btn" 
            data-delete-rule="${r.id}"
          >
            🗑️ Delete
          </button>
        </div>
      `).join(""),o=t.active.length>0?`
      <div class="quick-rules">
        <h4>Quick Rules</h4>
        <div class="quick-rule-buttons">
          <button class="quick-rule-btn" data-quick-rule="buy-materials">
            Auto-buy Materials (when < 5)
          </button>
          <button class="quick-rule-btn" data-quick-rule="sell-products">
            Auto-sell Products (when > 10)
          </button>
        </div>
      </div>
    `:"";return`
      <div class="panel stock-control-panel">
        <h3>📊 Stock Control</h3>
        
        ${t.totalMonthlyCost>0?`
          <div class="cost-summary">
            <strong>Operating Cost: €${t.totalMonthlyCost.toFixed(1)}/10s</strong>
            <div class="cost-warning" data-cost-warning>
              ✅ Sufficient funds
            </div>
          </div>
        `:""}
        
        ${s?`
          <div class="personnel-section">
            <h4>Available Personnel</h4>
            ${s}
          </div>
        `:""}
        
        ${i?`
          <div class="personnel-section">
            <h4>Active Personnel</h4>
            ${i}
          </div>
        `:""}
        
        ${o}
        
        ${n?`
          <div class="rules-section">
            <h4>Active Rules</h4>
            ${n}
          </div>
        `:""}
        
        ${t.active.length===0&&t.available.length===0?`
          <p>Complete more market transactions to unlock stock control personnel.</p>
        `:""}
      </div>
    `}attachEventListeners(t){t.querySelectorAll("[data-hire]").forEach(e=>{e.addEventListener("click",a=>{var i;const s=(i=a.target.closest("[data-hire]"))==null?void 0:i.getAttribute("data-hire");s&&this.actions.hirePersonnel(s)})}),t.querySelectorAll("[data-fire]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-fire");s&&confirm("Are you sure you want to fire this personnel?")&&this.actions.firePersonnel(s)})}),t.querySelectorAll("[data-toggle-rule]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-toggle-rule");s&&this.actions.toggleRule(s)})}),t.querySelectorAll("[data-delete-rule]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-delete-rule");s&&confirm("Are you sure you want to delete this rule?")&&this.actions.deleteRule(s)})}),t.querySelectorAll("[data-quick-rule]").forEach(e=>{e.addEventListener("click",a=>{const s=a.target.getAttribute("data-quick-rule");s&&this.actions.createQuickRules(s)})})}updateDynamicElements(t,e,a){e.available.forEach(s=>{const i=t.querySelector(`[data-hire="${s.id}"]`);i&&(i.classList.toggle("available",s.canHire),i.classList.toggle("disabled",!s.canHire),i.disabled=!s.canHire)}),t.querySelector("[data-cost-warning]")}}class N{constructor(t,e,a,s,i,n,o){c(this,"gameState");c(this,"container");c(this,"lastRenderState","");c(this,"isInitialized",!1);c(this,"eventEmitter");c(this,"uiDataProvider");c(this,"craftingPanel");c(this,"machinesPanel");c(this,"marketPanel");c(this,"stockControlPanel");c(this,"updateScheduled",!1);this.gameState=t,this.container=o,this.eventEmitter=t.getEventEmitter(),this.uiDataProvider=new x(t,e,a,s,n),this.craftingPanel=new I(this.createCraftingActions(e,i)),this.machinesPanel=new q(this.createMachineActions(a)),this.marketPanel=new B(this.createMarketActions(s)),this.stockControlPanel=new U(this.createStockControlActions(n)),this.setupEventListeners()}createCraftingActions(t,e){return{startCraft:a=>t.startCraft(a),salvageMaterials:()=>e.salvageMaterials()}}createMachineActions(t){return{buildMachine:e=>t.buildMachine(e),toggleMachine:e=>t.toggleMachine(e),upgradeMachine:e=>t.upgradeMachine(e)}}createMarketActions(t){return{buyResource:e=>t.buy(e),sellResource:e=>t.sell(e)}}createStockControlActions(t){return{hirePersonnel:e=>t.hirePersonnel(e),firePersonnel:e=>t.firePersonnel(e),toggleRule:e=>{const s=this.gameState.getState().stockControl.rules[e];s&&t.updateRule(e,{...s,isEnabled:!s.isEnabled})},deleteRule:e=>t.deleteRule(e),createQuickRules:e=>this.createQuickRules(t,e)}}createQuickRules(t,e){const a=this.uiDataProvider.getPersonnelData();if(e==="buy-materials"){const s=a.active.find(i=>i.type==="procurement");s&&["wireStock","sheetMetal","leatherScraps","oil"].forEach(n=>{t.createRule(n,"buy",5,5,s.id)})}else if(e==="sell-products"){const s=a.active.find(i=>i.type==="sales");s&&["wireSprings","metalBrackets","leatherGaskets","springAssemblies","repairKits"].forEach(n=>{t.createRule(n,"sell",10,5,s.id)})}}setupEventListeners(){this.eventEmitter.on("resourceAmountChanged",()=>this.scheduleUpdate()),this.eventEmitter.on("resourceDiscovered",()=>this.forceFullRender()),this.eventEmitter.on("marketVisibilityChanged",()=>this.forceFullRender()),this.eventEmitter.on("stockControlVisibilityChanged",()=>this.forceFullRender()),this.eventEmitter.on("machineBuilt",()=>this.forceFullRender()),this.eventEmitter.on("machineStatusChanged",()=>this.scheduleUpdate()),this.eventEmitter.on("machineToggled",()=>this.scheduleUpdate()),this.eventEmitter.on("personnelHired",()=>this.forceFullRender()),this.eventEmitter.on("personnelFired",()=>this.forceFullRender()),this.eventEmitter.on("ruleCreated",()=>this.forceFullRender()),this.eventEmitter.on("ruleToggled",()=>this.scheduleUpdate()),this.eventEmitter.on("ruleDeleted",()=>this.forceFullRender()),this.eventEmitter.on("milestoneCompleted",()=>this.forceFullRender())}scheduleUpdate(){this.updateScheduled||(this.updateScheduled=!0,requestAnimationFrame(()=>{this.updateScheduled=!1,this.updateDynamicElements()}))}forceFullRender(){this.lastRenderState="",this.isInitialized=!1,this.render()}render(){const t=this.uiDataProvider.getUIStateData(),e=this.createStateHash(t);e!==this.lastRenderState||!this.isInitialized?(this.fullRender(),this.lastRenderState=e,this.isInitialized=!0):this.updateDynamicElements()}createStateHash(t){const e={showMarket:t.showMarket,showStockControl:t.showStockControl,resourceCount:this.uiDataProvider.getResourcesData().length,machineCount:this.uiDataProvider.getMachinesData().length,availableMachineCount:this.uiDataProvider.getAvailableMachinesData().length,personnelCount:this.uiDataProvider.getPersonnelData().active.length+this.uiDataProvider.getPersonnelData().available.length,rulesCount:this.uiDataProvider.getRulesData().length};return JSON.stringify(e)}fullRender(){const t=this.uiDataProvider.getUIStateData();this.container.innerHTML=`
      <div class="game-container">
        <header class="game-header">
          <h1>🏭 Autobahn - Industrial Incremental</h1>
          <div class="game-stats">
            <span id="marks-display">€${t.marksAmount} Marks</span>
            <button id="save-btn" class="save-btn">💾 Save</button>
            <button id="reset-btn" class="reset-btn">🔄 Reset</button>
          </div>
        </header>

        <div class="game-content">
          <div class="left-panel">
            ${this.craftingPanel.render(this.uiDataProvider.getCraftingData())}
            ${this.stockControlPanel.render(this.uiDataProvider.getPersonnelData(),this.uiDataProvider.getRulesData(),t.showStockControl)}
          </div>
          
          <div class="center-panel">
            ${this.machinesPanel.render(this.uiDataProvider.getMachinesData(),this.uiDataProvider.getAvailableMachinesData())}
          </div>
          
          <div class="right-panel">
            ${this.marketPanel.render(this.uiDataProvider.getResourcesData(),t.showMarket)}
          </div>
        </div>
      </div>
    `,this.attachEventListeners()}updateDynamicElements(){const t=this.uiDataProvider.getUIStateData(),e=this.container.querySelector("#marks-display");e&&(e.textContent=`€${t.marksAmount} Marks`);const a=this.container.querySelector(".left-panel"),s=this.container.querySelector(".center-panel"),i=this.container.querySelector(".right-panel");a&&(this.craftingPanel.updateDynamicElements(a,this.uiDataProvider.getCraftingData()),this.stockControlPanel.updateDynamicElements(a,this.uiDataProvider.getPersonnelData(),this.uiDataProvider.getRulesData())),s&&this.machinesPanel.updateDynamicElements(s,this.uiDataProvider.getMachinesData(),this.uiDataProvider.getAvailableMachinesData()),i&&this.marketPanel.updateDynamicElements(i,this.uiDataProvider.getResourcesData())}attachEventListeners(){var s,i;const t=this.container.querySelector(".left-panel"),e=this.container.querySelector(".center-panel"),a=this.container.querySelector(".right-panel");t&&(this.craftingPanel.attachEventListeners(t),this.stockControlPanel.attachEventListeners(t)),e&&this.machinesPanel.attachEventListeners(e),a&&this.marketPanel.attachEventListeners(a),(s=this.container.querySelector("#save-btn"))==null||s.addEventListener("click",()=>{this.gameState.saveGame(),this.gameState.addNotification("Game saved!","success",2e3)}),(i=this.container.querySelector("#reset-btn"))==null||i.addEventListener("click",()=>{confirm("Are you sure you want to reset your progress?")&&(this.gameState.resetGame(),this.forceFullRender())})}}const f=class f{constructor(){c(this,"isEnabled",!1);c(this,"debugPanel",null);c(this,"gameState");c(this,"craftingSystem");c(this,"automationManager");c(this,"marketSystem");(new URLSearchParams(window.location.search).get("dev")==="true"||localStorage.getItem("autobahn-dev-mode")==="true")&&this.enable()}static getInstance(){return f.instance||(f.instance=new f),f.instance}initialize(t,e,a,s){this.gameState=t,this.craftingSystem=e,this.automationManager=a,this.marketSystem=s,this.isEnabled&&(this.createDebugPanel(),this.setupKeyboardShortcuts(),this.logSystemInfo())}enable(){this.isEnabled=!0,localStorage.setItem("autobahn-dev-mode","true"),console.log("🔧 Dev Mode Enabled"),this.gameState&&(this.createDebugPanel(),this.setupKeyboardShortcuts(),this.logSystemInfo())}disable(){this.isEnabled=!1,localStorage.removeItem("autobahn-dev-mode"),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),console.log("🔧 Dev Mode Disabled")}isDevMode(){return this.isEnabled}createDebugPanel(){if(this.debugPanel)return;this.debugPanel=document.createElement("div"),this.debugPanel.id="dev-panel",this.debugPanel.innerHTML=`
      <div class="dev-panel-header">
        <h3>🔧 Dev Tools</h3>
        <button id="dev-panel-toggle">−</button>
      </div>
      <div class="dev-panel-content">
        <div class="dev-section">
          <h4>Quick Actions</h4>
          <button id="dev-add-resources">Add Resources</button>
          <button id="dev-add-money">Add 100 Marks</button>
          <button id="dev-unlock-all">Unlock All</button>
          <button id="dev-reset-ui">Reset UI State</button>
        </div>
        
        <div class="dev-section">
          <h4>Game State</h4>
          <button id="dev-log-state">Log State</button>
          <button id="dev-export-save">Export Save</button>
          <button id="dev-import-save">Import Save</button>
          <input type="file" id="dev-save-file" accept=".json" style="display: none;">
        </div>
        
        <div class="dev-section">
          <h4>Performance</h4>
          <div id="dev-performance">
            <div>FPS: <span id="dev-fps">--</span></div>
            <div>Update Time: <span id="dev-update-time">--</span>ms</div>
            <div>Render Time: <span id="dev-render-time">--</span>ms</div>
          </div>
        </div>
        
        <div class="dev-section">
          <h4>Debug Log</h4>
          <div id="dev-log" class="dev-log"></div>
          <button id="dev-clear-log">Clear Log</button>
        </div>
      </div>
    `;const t=document.createElement("style");t.textContent=`
      #dev-panel {
        position: fixed;
        top: 10px;
        left: 10px;
        width: 300px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #00ff00;
        border-radius: 8px;
        color: #00ff00;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        z-index: 10000;
        max-height: 80vh;
        overflow-y: auto;
      }
      
      .dev-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: rgba(0, 255, 0, 0.1);
        border-bottom: 1px solid #00ff00;
      }
      
      .dev-panel-header h3 {
        margin: 0;
        font-size: 14px;
      }
      
      #dev-panel-toggle {
        background: none;
        border: 1px solid #00ff00;
        color: #00ff00;
        cursor: pointer;
        padding: 2px 8px;
        border-radius: 3px;
      }
      
      .dev-panel-content {
        padding: 10px;
      }
      
      .dev-section {
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #004400;
      }
      
      .dev-section h4 {
        margin: 0 0 8px 0;
        color: #88ff88;
        font-size: 12px;
      }
      
      .dev-section button {
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid #00ff00;
        color: #00ff00;
        padding: 4px 8px;
        margin: 2px;
        cursor: pointer;
        border-radius: 3px;
        font-size: 11px;
      }
      
      .dev-section button:hover {
        background: rgba(0, 255, 0, 0.2);
      }
      
      .dev-log {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #004400;
        padding: 8px;
        height: 100px;
        overflow-y: auto;
        font-size: 10px;
        margin-bottom: 5px;
      }
      
      #dev-performance div {
        margin: 2px 0;
      }
      
      .dev-panel-content.collapsed {
        display: none;
      }
    `,document.head.appendChild(t),document.body.appendChild(this.debugPanel),this.attachDebugEventListeners(),this.startPerformanceMonitoring()}attachDebugEventListeners(){var t,e,a,s,i,n,o,r,d,m;this.debugPanel&&((t=this.debugPanel.querySelector("#dev-panel-toggle"))==null||t.addEventListener("click",()=>{var v,y;const u=(v=this.debugPanel)==null?void 0:v.querySelector(".dev-panel-content"),h=(y=this.debugPanel)==null?void 0:y.querySelector("#dev-panel-toggle");u&&h&&(u.classList.toggle("collapsed"),h.textContent=u.classList.contains("collapsed")?"+":"−")}),(e=this.debugPanel.querySelector("#dev-add-resources"))==null||e.addEventListener("click",()=>{this.addTestResources()}),(a=this.debugPanel.querySelector("#dev-add-money"))==null||a.addEventListener("click",()=>{this.gameState.updateResource("marks",100),this.log("Added 100 marks")}),(s=this.debugPanel.querySelector("#dev-unlock-all"))==null||s.addEventListener("click",()=>{this.unlockAll()}),(i=this.debugPanel.querySelector("#dev-reset-ui"))==null||i.addEventListener("click",()=>{this.resetUIState()}),(n=this.debugPanel.querySelector("#dev-log-state"))==null||n.addEventListener("click",()=>{console.log("Game State:",this.gameState.getState()),this.log("Game state logged to console")}),(o=this.debugPanel.querySelector("#dev-export-save"))==null||o.addEventListener("click",()=>{this.exportSave()}),(r=this.debugPanel.querySelector("#dev-import-save"))==null||r.addEventListener("click",()=>{var u,h;(h=(u=this.debugPanel)==null?void 0:u.querySelector("#dev-save-file"))==null||h.click()}),(d=this.debugPanel.querySelector("#dev-save-file"))==null||d.addEventListener("change",u=>{this.importSave(u)}),(m=this.debugPanel.querySelector("#dev-clear-log"))==null||m.addEventListener("click",()=>{var h;const u=(h=this.debugPanel)==null?void 0:h.querySelector("#dev-log");u&&(u.innerHTML="")}))}setupKeyboardShortcuts(){document.addEventListener("keydown",t=>{this.isEnabled&&(t.ctrlKey&&t.shiftKey&&t.key==="D"&&(t.preventDefault(),this.debugPanel&&(this.debugPanel.style.display=this.debugPanel.style.display==="none"?"block":"none")),t.ctrlKey&&t.shiftKey&&t.key==="R"&&(t.preventDefault(),this.addTestResources()),t.ctrlKey&&t.shiftKey&&t.key==="M"&&(t.preventDefault(),this.gameState.updateResource("marks",100),this.log("Added 100 marks (hotkey)")))})}addTestResources(){["wireStock","sheetMetal","leatherScraps","oil"].forEach(e=>{this.gameState.updateResource(e,10)}),this.log("Added 10 of each basic resource")}unlockAll(){const t=this.gameState.getState();Object.keys(g).forEach(e=>{t.unlockedRecipes.add(e)}),Object.keys(S).forEach(e=>{t.unlockedMachines.add(e)}),t.uiState.showMarket=!0,t.uiState.showFullMarket=!0,this.log("Unlocked all recipes, machines, and UI elements")}resetUIState(){const t=this.gameState.getState();t.uiState={discoveredResources:new Set(["marks"]),showMarket:!1,showFullMarket:!1,showEmergencyLabor:!1},this.log("Reset UI state to initial values")}exportSave(){this.gameState.saveGame();const t=localStorage.getItem("autobahn-save");if(t){const e=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(e),s=document.createElement("a");s.href=a,s.download=`autobahn-save-${new Date().toISOString().slice(0,19)}.json`,s.click(),URL.revokeObjectURL(a),this.log("Save exported")}}importSave(t){var s;const e=(s=t.target.files)==null?void 0:s[0];if(!e)return;const a=new FileReader;a.onload=i=>{var n;try{const o=(n=i.target)==null?void 0:n.result;localStorage.setItem("autobahn-save",o),location.reload()}catch(o){this.log(`Import failed: ${o}`)}},a.readAsText(e)}startPerformanceMonitoring(){let t=performance.now(),e=0,a=t;const s=()=>{var n;const i=performance.now();if(e++,i-a>=1e3){const o=Math.round(e*1e3/(i-a)),r=(n=this.debugPanel)==null?void 0:n.querySelector("#dev-fps");r&&(r.textContent=o.toString()),e=0,a=i}t=i,this.isEnabled&&requestAnimationFrame(s)};requestAnimationFrame(s)}log(t){var i;if(!this.isEnabled)return;const a=`[${new Date().toLocaleTimeString()}] ${t}`;console.log(`🔧 ${a}`);const s=(i=this.debugPanel)==null?void 0:i.querySelector("#dev-log");if(s){const n=document.createElement("div");n.textContent=a,s.appendChild(n),s.scrollTop=s.scrollHeight}}logSystemInfo(){console.group("🔧 Autobahn Dev Mode - System Info"),console.log("User Agent:",navigator.userAgent),console.log("Screen Resolution:",`${screen.width}x${screen.height}`),console.log("Viewport:",`${window.innerWidth}x${window.innerHeight}`),console.log("Local Storage Available:",typeof Storage<"u"),console.log("Performance API Available:",typeof performance<"u"),console.groupEnd()}getGameState(){var t;return(t=this.gameState)==null?void 0:t.getState()}setResource(t,e){this.gameState&&(this.gameState.getState().resources[t].amount=e,this.log(`Set ${t} to ${e}`))}triggerMilestone(t){this.gameState&&(this.gameState.checkMilestones(),this.log("Triggered milestone check"))}};c(f,"instance");let b=f;window.devMode=b.getInstance();class F{constructor(t){c(this,"gameState");c(this,"craftingSystem");c(this,"automationManager");c(this,"marketSystem");c(this,"salvageSystem");c(this,"stockControlSystem");c(this,"uiRenderer");c(this,"gameLoop",0);c(this,"devMode");this.devMode=b.getInstance(),this.gameState=new A,this.craftingSystem=new R(this.gameState),this.automationManager=new $(this.gameState,this.craftingSystem),this.marketSystem=new D(this.gameState),this.salvageSystem=new L(this.gameState),this.stockControlSystem=new T(this.gameState,this.marketSystem),this.uiRenderer=new N(this.gameState,this.craftingSystem,this.automationManager,this.marketSystem,this.salvageSystem,this.stockControlSystem,t),this.devMode.initialize(this.gameState,this.craftingSystem,this.automationManager,this.marketSystem),this.start()}forceUIRefresh(){this.uiRenderer.forceFullRender()}start(){this.devMode.log("Game starting..."),this.uiRenderer.render(),this.gameLoop=setInterval(()=>{this.update()},16),setInterval(()=>{this.gameState.saveGame()},3e4)}update(){const t=performance.now();this.automationManager.updateMachines(),this.stockControlSystem.update();const e=performance.now()-t,a=performance.now();this.uiRenderer.render();const s=performance.now()-a;if(this.devMode.isDevMode()){const i=document.querySelector("#dev-update-time"),n=document.querySelector("#dev-render-time");i&&(i.textContent=e.toFixed(2)),n&&(n.textContent=s.toFixed(2))}}destroy(){this.devMode.log("Game shutting down..."),this.gameState.getNotificationManager().destroy(),this.gameLoop&&clearInterval(this.gameLoop)}}const j=document.querySelector("#app"),O=new F(j);window.addEventListener("beforeunload",()=>{O.destroy()});
