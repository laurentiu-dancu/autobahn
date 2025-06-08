var E=Object.defineProperty;var R=(l,e,t)=>e in l?E(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var c=(l,e,t)=>R(l,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();const L={wireStock:{id:"wireStock",name:"Wire Stock",amount:5,description:"Basic metal wire for springs and components"},sheetMetal:{id:"sheetMetal",name:"Sheet Metal",amount:3,description:"Thin metal sheets for brackets"},leatherScraps:{id:"leatherScraps",name:"Leather Scraps",amount:2,description:"Leather pieces for gaskets"},oil:{id:"oil",name:"Oil",amount:1,description:"For lubrication and treatment"},wireSprings:{id:"wireSprings",name:"Wire Springs",amount:0,description:"Hand-bent springs for automotive use"},metalBrackets:{id:"metalBrackets",name:"Metal Brackets",amount:0,description:"Filed and shaped mounting brackets"},leatherGaskets:{id:"leatherGaskets",name:"Leather Gaskets",amount:0,description:"Cut gaskets for sealing"},springAssemblies:{id:"springAssemblies",name:"Spring Assemblies",amount:0,description:"Multiple springs combined for suspension"},repairKits:{id:"repairKits",name:"Automotive Repair Kits",amount:0,description:"Complete sets of common replacement parts"},marks:{id:"marks",name:"Marks",amount:0,description:"Currency for trading"}},I=[{id:"firstWireSpring",name:"First Wire Spring",description:"Bend your first wire spring",condition:l=>l.resources.wireSprings.amount>=1,reward:l=>{l.unlockedRecipes.add("assembleSpringSet"),l.uiState.showMarket=!0},completed:!1},{id:"tenWireSprings",name:"Spring Production",description:"Produce 10 wire springs",condition:l=>l.totalProduced.wireSprings>=10,reward:l=>{l.unlockedMachines.add("wireBendingJig")},completed:!1},{id:"firstSpringAssembly",name:"First Assembly",description:"Create your first spring assembly",condition:l=>l.resources.springAssemblies.amount>=1,reward:l=>{l.unlockedRecipes.add("buildRepairKit"),l.unlockedMachines.add("filingStation")},completed:!1},{id:"firstSale",name:"First Sale",description:"Sell your first item",condition:l=>l.totalSales>0,reward:()=>{},completed:!1},{id:"tenMarketTransactions",name:"Market Experience",description:"Complete 10 market transactions",condition:l=>l.totalMarketTransactions>=10,reward:l=>{l.unlockedStockControl.add("procurementSpecialist"),l.unlockedStockControl.add("salesManager"),l.uiState.showStockControl=!0},completed:!1},{id:"hireBasicSpecialists",name:"Basic Automation",description:"Hire both procurement specialist and sales manager",condition:l=>!!(l.stockControl.personnel.procurementSpecialist&&l.stockControl.personnel.salesManager),reward:l=>{l.unlockedStockControl.add("supplyChainCoordinator")},completed:!1}];class x{constructor(){c(this,"state");c(this,"saveKey","autobahn-save");this.state=this.loadGame()||this.createNewGame()}createNewGame(){return{resources:{...L},machines:{},stockControl:{personnel:{},rules:{},lastSalaryPayment:Date.now()},unlockedRecipes:new Set(["bendWireSpring","fileMetalBracket","cutLeatherGasket"]),unlockedMachines:new Set,unlockedStockControl:new Set,totalClicks:0,totalProduced:{},totalSales:0,totalMarketTransactions:0,gameStartTime:Date.now(),lastSaveTime:Date.now(),uiState:{discoveredResources:new Set(["marks"]),showMarket:!1,showStockControl:!1}}}getState(){return this.state}updateResource(e,t){if(this.state.resources[e]){const s=this.state.resources[e].amount;this.state.resources[e].amount=Math.max(0,this.state.resources[e].amount+t),t>0&&(this.state.totalProduced[e]=(this.state.totalProduced[e]||0)+t),(this.state.resources[e].amount>0||s>0&&this.state.resources[e].amount===0)&&this.state.uiState.discoveredResources.add(e)}}canAfford(e){return e.every(t=>{var s;return((s=this.state.resources[t.resourceId])==null?void 0:s.amount)>=t.amount})}spendResources(e){return this.canAfford(e)?(e.forEach(t=>{this.updateResource(t.resourceId,-t.amount)}),!0):!1}recordSale(){this.state.totalSales++,this.state.totalMarketTransactions++}recordPurchase(){this.state.totalMarketTransactions++}addMachine(e,t){this.state.machines[e]={...t}}incrementClicks(){this.state.totalClicks++}checkMilestones(){I.forEach(e=>{!e.completed&&e.condition(this.state)&&(e.completed=!0,e.reward(this.state),this.showNotification(`Milestone achieved: ${e.name}!`))})}showNotification(e){const t=document.createElement("div");t.className="notification",t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3)}saveGame(){this.state.lastSaveTime=Date.now();const e={...this.state,unlockedRecipes:Array.from(this.state.unlockedRecipes),unlockedMachines:Array.from(this.state.unlockedMachines),unlockedStockControl:Array.from(this.state.unlockedStockControl),uiState:{...this.state.uiState,discoveredResources:Array.from(this.state.uiState.discoveredResources)}};localStorage.setItem(this.saveKey,JSON.stringify(e))}loadGame(){var e,t;try{const s=localStorage.getItem(this.saveKey);if(!s)return null;const a=JSON.parse(s);return{...a,machines:Object.fromEntries(Object.entries(a.machines||{}).map(([i,r])=>[i,{...r,status:r.status==="paused"?"stopped":r.status||"stopped",statusMessage:r.statusMessage||void 0}])),unlockedRecipes:new Set(a.unlockedRecipes),unlockedMachines:new Set(a.unlockedMachines),unlockedStockControl:new Set(a.unlockedStockControl||[]),stockControl:a.stockControl||{personnel:{},rules:{},lastSalaryPayment:Date.now()},uiState:{...a.uiState,discoveredResources:new Set(((e=a.uiState)==null?void 0:e.discoveredResources)||["marks"]),showStockControl:((t=a.uiState)==null?void 0:t.showStockControl)||!1},totalProduced:a.totalProduced||{},totalSales:a.totalSales||0,totalMarketTransactions:a.totalMarketTransactions||0}}catch(s){return console.error("Failed to load game:",s),null}}resetGame(){localStorage.removeItem(this.saveKey),this.state=this.createNewGame(),this.showNotification("Game reset successfully!")}}const g={bendWireSpring:{id:"bendWireSpring",name:"Bend Wire Spring",inputs:[{resourceId:"wireStock",amount:1}],outputs:[{resourceId:"wireSprings",amount:1}],craftTime:2e3,description:"Hand-bend wire into automotive springs"},fileMetalBracket:{id:"fileMetalBracket",name:"File Metal Bracket",inputs:[{resourceId:"sheetMetal",amount:1}],outputs:[{resourceId:"metalBrackets",amount:1}],craftTime:3e3,description:"File and shape mounting brackets"},cutLeatherGasket:{id:"cutLeatherGasket",name:"Cut Leather Gasket",inputs:[{resourceId:"leatherScraps",amount:1}],outputs:[{resourceId:"leatherGaskets",amount:1}],craftTime:1500,description:"Cut leather into sealing gaskets"},assembleSpringSet:{id:"assembleSpringSet",name:"Assemble Spring Set",inputs:[{resourceId:"wireSprings",amount:3},{resourceId:"metalBrackets",amount:1}],outputs:[{resourceId:"springAssemblies",amount:1}],craftTime:5e3,description:"Combine springs and brackets into suspension assemblies"},buildRepairKit:{id:"buildRepairKit",name:"Build Repair Kit",inputs:[{resourceId:"springAssemblies",amount:1},{resourceId:"leatherGaskets",amount:2},{resourceId:"oil",amount:1}],outputs:[{resourceId:"repairKits",amount:1}],craftTime:8e3,description:"Package complete automotive repair kit"}};class T{constructor(e){c(this,"gameState");c(this,"activeCrafts",new Map);this.gameState=e}canCraft(e){const t=g[e];return!t||!this.gameState.getState().unlockedRecipes.has(e)?!1:this.gameState.canAfford(t.inputs)}startCraft(e){if(!this.canCraft(e)||this.activeCrafts.has(e))return!1;const t=g[e];if(!this.gameState.spendResources(t.inputs))return!1;if(this.gameState.incrementClicks(),t.craftTime===0)this.completeCraft(e);else{const s=Date.now()+t.craftTime;this.activeCrafts.set(e,s),setTimeout(()=>{this.completeCraft(e)},t.craftTime)}return!0}completeCraft(e){const t=g[e];t&&(this.activeCrafts.delete(e),t.outputs.forEach(s=>{this.gameState.updateResource(s.resourceId,s.amount)}),this.gameState.checkMilestones())}getCraftProgress(e){const t=this.activeCrafts.get(e);if(!t)return 0;const s=g[e];if(!s||s.craftTime===0)return 0;const a=t-s.craftTime,i=Date.now()-a;return Math.min(1,Math.max(0,i/s.craftTime))}isCrafting(e){return this.activeCrafts.has(e)}getAvailableRecipes(){const e=this.gameState.getState();return Object.values(g).filter(t=>e.unlockedRecipes.has(t.id))}}const P={wireBendingJig:{id:"wireBendingJig",name:"Wire Bending Jig",recipeId:"bendWireSpring",level:1,cost:[{resourceId:"metalBrackets",amount:2},{resourceId:"marks",amount:15}],upgradeCost:[{resourceId:"metalBrackets",amount:3},{resourceId:"marks",amount:25}],productionRate:2,isActive:!1,lastProduction:0,description:"Automates wire spring production"},filingStation:{id:"filingStation",name:"Filing Station",recipeId:"fileMetalBracket",level:1,cost:[{resourceId:"wireSprings",amount:5},{resourceId:"marks",amount:20}],upgradeCost:[{resourceId:"wireSprings",amount:8},{resourceId:"marks",amount:35}],productionRate:2,isActive:!1,lastProduction:0,description:"Automates bracket filing and shaping"}};class q{constructor(e){c(this,"gameState");this.gameState=e}canBuildMachine(e){const t=P[e];if(!t)return!1;const s=this.gameState.getState();return!s.unlockedMachines.has(e)||s.machines[e]?!1:this.gameState.canAfford(t.cost)}buildMachine(e){if(!this.canBuildMachine(e))return!1;const t=P[e];if(!this.gameState.spendResources(t.cost))return!1;const s=g[t.recipeId],a=s?this.gameState.canAfford(s.inputs):!1,i={...t,lastProduction:Date.now(),isActive:!1,status:a?"paused":"waiting_resources",statusMessage:void 0};return this.gameState.addMachine(e,i),!0}canUpgradeMachine(e){const s=this.gameState.getState().machines[e];if(!s)return!1;const a=s.upgradeCost.map(i=>({...i,amount:i.amount*s.level}));return this.gameState.canAfford(a)}upgradeMachine(e){if(!this.canUpgradeMachine(e))return!1;const s=this.gameState.getState().machines[e],a=s.upgradeCost.map(i=>({...i,amount:i.amount*s.level}));return this.gameState.spendResources(a)?(s.level++,s.productionRate=Math.max(.5,s.productionRate*.85),!0):!1}toggleMachine(e){const t=this.gameState.getState(),s=t.machines[e];if(s){const a=s.isActive;if(s.isActive=!a,s.isActive){const i=g[s.recipeId];if(i&&this.gameState.canAfford(i.inputs))s.lastProduction=Date.now(),s.status="running",s.statusMessage=void 0;else{s.status="waiting_resources";const r=i?i.inputs.filter(n=>{var m;return(((m=t.resources[n.resourceId])==null?void 0:m.amount)||0)<n.amount}).map(n=>{const o=t.resources[n.resourceId],m=(o==null?void 0:o.amount)||0;return`${(o==null?void 0:o.name)||n.resourceId} (need ${n.amount}, have ${Math.floor(m)})`}):[];s.statusMessage=r.length>0?`Waiting for: ${r.join(", ")}`:"Waiting for resources"}}else s.status="stopped",s.statusMessage="Manually stopped"}}updateMachines(){const e=this.gameState.getState(),t=Date.now();Object.values(e.machines).forEach(s=>{if(!s.isActive){s.status="stopped",s.statusMessage="Manually stopped";return}const a=g[s.recipeId];if(!a)return;const i=a.craftTime*s.productionRate;if(t-s.lastProduction>=i)if(this.gameState.canAfford(a.inputs))this.gameState.spendResources(a.inputs),a.outputs.forEach(n=>{this.gameState.updateResource(n.resourceId,n.amount)}),s.lastProduction=t,s.status="running",s.statusMessage=void 0,this.gameState.checkMilestones();else{const n=a.inputs.filter(o=>{var d;return(((d=e.resources[o.resourceId])==null?void 0:d.amount)||0)<o.amount}).map(o=>{const m=e.resources[o.resourceId],d=(m==null?void 0:m.amount)||0;return`${(m==null?void 0:m.name)||o.resourceId} (need ${o.amount}, have ${Math.floor(d)})`});s.status="waiting_resources",s.statusMessage=`Waiting for: ${n.join(", ")}`}else s.status==="waiting_resources"?this.gameState.canAfford(a.inputs)&&(s.status="running",s.statusMessage=void 0,s.lastProduction=t-i):s.status!=="running"&&s.status!=="waiting_resources"&&(s.status="running",s.statusMessage=void 0)})}getMachineProgress(e){const s=this.gameState.getState().machines[e];if(!s||!s.isActive||s.status!=="running")return 0;const a=g[s.recipeId];if(!a)return 0;const i=a.craftTime*s.productionRate,r=Date.now()-s.lastProduction;return Math.min(1,r/i)}getAvailableMachines(){const e=this.gameState.getState();return Array.from(e.unlockedMachines)}}const S={wireStock:{resourceId:"wireStock",buyPrice:2,sellPrice:2,available:!0},sheetMetal:{resourceId:"sheetMetal",buyPrice:3,sellPrice:3,available:!0},leatherScraps:{resourceId:"leatherScraps",buyPrice:1,sellPrice:1,available:!0},oil:{resourceId:"oil",buyPrice:4,sellPrice:4,available:!0},wireSprings:{resourceId:"wireSprings",buyPrice:3,sellPrice:3,available:!0},metalBrackets:{resourceId:"metalBrackets",buyPrice:5,sellPrice:5,available:!0},leatherGaskets:{resourceId:"leatherGaskets",buyPrice:2,sellPrice:2,available:!0},springAssemblies:{resourceId:"springAssemblies",buyPrice:12,sellPrice:12,available:!0},repairKits:{resourceId:"repairKits",buyPrice:25,sellPrice:25,available:!0}};class B{constructor(e){c(this,"gameState");this.gameState=e}canBuy(e,t=1){const s=S[e];if(!s||!s.available||!s.buyPrice)return!1;const a=s.buyPrice*t;return this.gameState.getState().resources.marks.amount>=a}buy(e,t=1){if(!this.canBuy(e,t))return!1;const a=S[e].buyPrice*t;return this.gameState.updateResource("marks",-a),this.gameState.updateResource(e,t),this.gameState.recordPurchase(),!0}canSell(e,t=1){var a;const s=S[e];return!s||!s.available||!s.sellPrice?!1:((a=this.gameState.getState().resources[e])==null?void 0:a.amount)>=t}sell(e,t=1){if(!this.canSell(e,t))return!1;const a=S[e].sellPrice*t;return this.gameState.updateResource(e,-t),this.gameState.updateResource("marks",a),this.gameState.recordSale(),!0}getBuyableItems(){const e=this.gameState.getState();return e.uiState.showMarket?Object.entries(S).filter(([t,s])=>s.available&&s.buyPrice).map(([t,s])=>{var a;return{resourceId:t,price:s.buyPrice,name:((a=e.resources[t])==null?void 0:a.name)||t}}):[]}getSellableItems(){const e=this.gameState.getState();return e.uiState.showMarket?Object.entries(S).filter(([t,s])=>{var a;return s.available&&s.sellPrice&&((a=e.resources[t])==null?void 0:a.amount)>0}).map(([t,s])=>{var a,i;return{resourceId:t,price:s.sellPrice,name:((a=e.resources[t])==null?void 0:a.name)||t,available:((i=e.resources[t])==null?void 0:i.amount)||0}}):[]}}class D{constructor(e){c(this,"gameState");this.gameState=e}salvageMaterials(){const e=[{resourceId:"wireStock",amount:1},{resourceId:"sheetMetal",amount:1},{resourceId:"leatherScraps",amount:1},{resourceId:"oil",amount:1}],t=Math.floor(Math.random()*e.length),s=e[t];this.gameState.updateResource(s.resourceId,s.amount),this.gameState.incrementClicks()}canSalvage(){return!0}}class j{constructor(e,t){c(this,"gameState");c(this,"marketSystem");c(this,"lastUpdate",Date.now());c(this,"lastRuleExecution",0);this.gameState=e,this.marketSystem=t}canHirePersonnel(e){const t=this.gameState.getState();if(t.stockControl.personnel[e]||!t.unlockedStockControl.has(e))return!1;const s=this.getPersonnelTemplate(e);if(!s)return!1;const a=s.hiringCost+s.monthlySalary;return t.resources.marks.amount>=a}hirePersonnel(e){if(!this.canHirePersonnel(e))return!1;const t=this.getPersonnelTemplate(e);if(!t)return!1;const s=this.gameState.getState(),a=t.hiringCost+t.monthlySalary;if(!this.gameState.spendResources([{resourceId:"marks",amount:a}]))return!1;const i={...t,isActive:!0,hiredAt:Date.now()};return s.stockControl.personnel[e]=i,!0}firePersonnel(e){const t=this.gameState.getState();t.stockControl.personnel[e]&&(Object.values(t.stockControl.rules).forEach(s=>{s.managedBy===e&&(s.isEnabled=!1)}),delete t.stockControl.personnel[e])}createRule(e,t,s,a,i){const r=this.gameState.getState(),n=`${t}_${e}_${Date.now()}`,o={id:n,resourceId:e,type:t,threshold:s,quantity:a,isEnabled:!0,managedBy:i};return r.stockControl.rules[n]=o,n}updateRule(e,t){const a=this.gameState.getState().stockControl.rules[e];a&&Object.assign(a,t)}deleteRule(e){const t=this.gameState.getState();delete t.stockControl.rules[e]}update(){const e=Date.now(),t=e-this.lastUpdate;this.lastUpdate=e,this.paySalaries(t),this.executeRules()}paySalaries(e){const t=this.gameState.getState(),s=e/(1e3*10);let a=0;Object.values(t.stockControl.personnel).forEach(i=>{i.isActive&&(a+=i.monthlySalary*s)}),a>0&&(t.resources.marks.amount>=a?this.gameState.updateResource("marks",-a):(this.fireAllPersonnel(),this.gameState.showNotification("⚠️ All stock control personnel quit due to unpaid salaries!")))}executeRules(){const e=this.gameState.getState(),t=Date.now();this.lastRuleExecution||(this.lastRuleExecution=t),!(t-this.lastRuleExecution<5e3)&&(this.lastRuleExecution=t,Object.values(e.stockControl.rules).forEach(s=>{var r;if(!s.isEnabled)return;const a=e.stockControl.personnel[s.managedBy];if(!a||!a.isActive){s.isEnabled=!1;return}const i=((r=e.resources[s.resourceId])==null?void 0:r.amount)||0;if(s.type==="buy"&&i<s.threshold)this.marketSystem.canBuy(s.resourceId,s.quantity)&&this.marketSystem.buy(s.resourceId,s.quantity);else if(s.type==="sell"&&i>s.threshold){const n=Math.min(s.quantity,i-s.threshold);n>0&&this.marketSystem.canSell(s.resourceId,n)&&this.marketSystem.sell(s.resourceId,n)}}))}fireAllPersonnel(){const e=this.gameState.getState();Object.keys(e.stockControl.personnel).forEach(t=>{this.firePersonnel(t)})}getActivePersonnel(){const e=this.gameState.getState();return Object.values(e.stockControl.personnel).filter(t=>t.isActive)}getActiveRules(){const e=this.gameState.getState();return Object.values(e.stockControl.rules).filter(t=>t.isEnabled)}getTotalMonthlyCost(){return this.getActivePersonnel().reduce((e,t)=>e+t.monthlySalary,0)}getPersonnelTemplate(e){return{procurementSpecialist:{id:"procurementSpecialist",name:"Material Procurement Specialist",type:"procurement",monthlySalary:2,hiringCost:50,isActive:!1,hiredAt:0,description:"Automatically purchases raw materials when inventory falls below set thresholds",capabilities:["Auto-buy raw materials","Inventory monitoring","Basic purchasing"]},salesManager:{id:"salesManager",name:"Sales Manager",type:"sales",monthlySalary:3,hiringCost:50,isActive:!1,hiredAt:0,description:"Automatically sells finished products when inventory exceeds set thresholds",capabilities:["Auto-sell products","Inventory monitoring","Basic sales"]},supplyChainCoordinator:{id:"supplyChainCoordinator",name:"Supply Chain Coordinator",type:"coordinator",monthlySalary:5,hiringCost:100,isActive:!1,hiredAt:0,description:"Advanced optimization of both buying and selling with profit margin analysis",capabilities:["Advanced optimization","Profit analysis","Full supply chain management"]}}[e]||null}getAvailablePersonnel(){const e=this.gameState.getState();return Array.from(e.unlockedStockControl)}}class O{constructor(e,t,s){c(this,"gameState");c(this,"craftingSystem");c(this,"salvageSystem");this.gameState=e,this.craftingSystem=t,this.salvageSystem=s}render(){const e=this.craftingSystem.getAvailableRecipes(),t=e.map(a=>{const i=this.craftingSystem.canCraft(a.id),r=this.craftingSystem.isCrafting(a.id),n=this.craftingSystem.getCraftProgress(a.id),o=a.craftTime>0?` (${a.craftTime/1e3}s)`:"",m=a.inputs.map(u=>{const h=this.gameState.getState().resources[u.resourceId];return`${u.amount} ${(h==null?void 0:h.name)||u.resourceId}`}).join(", "),d=a.outputs.map(u=>{const h=this.gameState.getState().resources[u.resourceId];return`${u.amount} ${(h==null?void 0:h.name)||u.resourceId}`}).join(", ");return`
        <div class="craft-item">
          <button 
            class="craft-btn ${i&&!r?"available":"disabled"}" 
            data-recipe="${a.id}"
            ${!i||r?"disabled":""}
          >
            <div class="craft-content">
              <div class="craft-name">${a.name}${o}</div>
              <div class="craft-details ${r?"hidden":""}">
                <div class="craft-inputs">Needs: ${m}</div>
                <div class="craft-outputs">Makes: ${d}</div>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar ${r?"visible":"hidden"}">
                  <div class="progress-fill" style="width: ${n*100}%"></div>
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
    
        ${e.length>0?`
          <h4>Recipes</h4>
        `:""}
        <div class="crafting-list">
          ${t}
        </div>
      </div>
    `}attachEventListeners(e){var t;(t=e.querySelector("#salvage-materials-btn"))==null||t.addEventListener("click",()=>{this.salvageSystem.salvageMaterials()}),e.querySelectorAll("[data-recipe]").forEach(s=>{s.addEventListener("click",a=>{var r;const i=(r=a.target.closest("[data-recipe]"))==null?void 0:r.getAttribute("data-recipe");i&&this.craftingSystem.startCraft(i)})})}updateDynamicElements(e){const t=e.querySelectorAll("[data-recipe]");t.forEach(s=>{const a=s.getAttribute("data-recipe");if(a){const i=this.craftingSystem.isCrafting(a),r=this.craftingSystem.getCraftProgress(a),n=s.querySelector(".progress-bar"),o=s.querySelector(".craft-details"),m=s.querySelector(".progress-fill");n&&o&&(i?(n.classList.remove("hidden"),n.classList.add("visible"),o.classList.add("hidden")):(n.classList.remove("visible"),n.classList.add("hidden"),o.classList.remove("hidden"))),m&&(m.style.width=`${r*100}%`)}}),t.forEach(s=>{const a=s.getAttribute("data-recipe");if(a){const i=this.craftingSystem.canCraft(a),r=this.craftingSystem.isCrafting(a);s.classList.toggle("available",i&&!r),s.classList.toggle("disabled",!i||r),s.disabled=!i||r}})}}class F{constructor(e,t){c(this,"gameState");c(this,"automationManager");this.gameState=e,this.automationManager=t}render(){const e=this.gameState.getState(),t=this.automationManager.getAvailableMachines(),s=Object.entries(e.machines);if(t.length===0&&s.length===0)return"";const a=t.filter(r=>!e.machines[r]).map(r=>{const n=P[r],o=this.automationManager.canBuildMachine(r),m=n.cost.map(d=>{const u=e.resources[d.resourceId],h=d.resourceId==="marks"?"€":"";return`${d.amount}${h} ${(u==null?void 0:u.name)||d.resourceId}`}).join(", ");return`
          <div class="machine-build">
            <button 
              class="build-btn ${o?"available":"disabled"}"
              data-machine="${r}"
              ${o?"":"disabled"}
            >
              <div class="machine-name">Build ${n.name}</div>
              <div class="machine-cost">Cost: ${m}</div>
              <div class="machine-desc">${n.description}</div>
            </button>
          </div>
        `}).join(""),i=s.map(([r,n])=>{const o=this.automationManager.canUpgradeMachine(r),m=g[n.recipeId],d=this.automationManager.getMachineProgress(r),u=m?(m.craftTime*n.productionRate/1e3).toFixed(1):"0",h=m?(m.craftTime/1e3).toFixed(1):"0",p=m?Math.round(1/n.productionRate*100):100,f=n.upgradeCost.map(y=>{const C=e.resources[y.resourceId],A=y.amount*n.level,$=y.resourceId==="marks"?"€":"";return`${A}${$} ${(C==null?void 0:C.name)||y.resourceId}`}).join(", "),b=n.status==="running"?"🟢":n.status==="waiting_resources"?"🟡":"🔴",M=n.status==="running"?"Running":n.status==="waiting_resources"?"Waiting for Resources":"Paused",w=n.isActive&&n.status==="running";return`
        <div class="machine-item ${n.isActive?"active":"inactive"} machine-${n.status}" data-machine-id="${r}">
          <div class="machine-header">
            <h4>${n.name} (Level ${n.level})</h4>
            <button 
              class="toggle-btn" 
              data-toggle="${r}"
            >
              ${n.isActive?"⏸️ Pause":"▶️ Start"}
            </button>
          </div>
          <div class="machine-info">
            <div>Recipe: ${m==null?void 0:m.name}</div>
            <div>Speed: ${u}s (Manual: ${h}s) - ${p}% efficiency</div>
            <div class="machine-status">
              <span class="status-indicator">${b} ${M}</span>
              ${n.statusMessage?`<div class="status-message">${n.statusMessage}</div>`:""}
            </div>
          </div>
          <div class="progress-bar" data-machine-progress-container="${r}" style="display: ${w?"block":"none"};">
            <div class="progress-fill" data-machine-progress="${r}" style="width: ${d*100}%"></div>
          </div>
          <button 
            class="upgrade-btn ${o?"available":"disabled"}"
            data-upgrade="${r}"
            ${o?"":"disabled"}
          >
            Upgrade (${f})
          </button>
        </div>
      `}).join("");return`
      <div class="panel machines-panel">
        <h3>⚙️ Automation</h3>
        ${a}
        ${i}
      </div>
    `}attachEventListeners(e){e.querySelectorAll("[data-machine]").forEach(t=>{t.addEventListener("click",s=>{var i;const a=(i=s.target.closest("[data-machine]"))==null?void 0:i.getAttribute("data-machine");if(a&&this.automationManager.buildMachine(a)){const n=s.target;n.disabled=!0,n.classList.remove("available"),n.classList.add("disabled")}})}),e.querySelectorAll("[data-toggle]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-toggle");a&&this.automationManager.toggleMachine(a)})}),e.querySelectorAll("[data-upgrade]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-upgrade");a&&this.automationManager.upgradeMachine(a)})})}updateDynamicElements(e){const t=this.gameState.getState();e.querySelectorAll(".machine-item").forEach(r=>{const n=r.getAttribute("data-machine-id");if(n){const o=t.machines[n];if(!o)return;r.className=`machine-item ${o.isActive?"active":"inactive"} machine-${o.status}`;const m=r.querySelector(".status-indicator");if(m){const b=o.status==="running"?"🟢":o.status==="waiting_resources"?"🟡":"🔴",M=o.status==="running"?"Running":o.status==="waiting_resources"?"Waiting for Resources":"Paused";m.textContent=`${b} ${M}`}const d=r.querySelector(".status-message");d&&(o.statusMessage?(d.textContent=o.statusMessage,d.style.display="block"):d.style.display="none");const u=r.querySelector("[data-toggle]");u&&(u.textContent=o.isActive?"⏹️ Stop":"▶️ Start");const h=o.isActive&&o.status==="running",p=r.querySelector(`[data-machine-progress-container="${n}"]`);p&&(p.style.display=h?"block":"none");const f=r.querySelector(`[data-machine-progress="${n}"]`);if(f){const b=this.automationManager.getMachineProgress(n);f.style.width=`${b*100}%`}}}),e.querySelectorAll("[data-machine]").forEach(r=>{const n=r.getAttribute("data-machine");if(n){const o=this.automationManager.canBuildMachine(n);r.classList.toggle("available",o),r.classList.toggle("disabled",!o),r.disabled=!o}}),e.querySelectorAll("[data-upgrade]").forEach(r=>{const n=r.getAttribute("data-upgrade");if(n){const o=this.automationManager.canUpgradeMachine(n);r.classList.toggle("available",o),r.classList.toggle("disabled",!o),r.disabled=!o}})}}class G{constructor(e,t){c(this,"gameState");c(this,"marketSystem");this.gameState=e,this.marketSystem=t}render(){const e=this.gameState.getState();if(!e.uiState.showMarket)return"";const t=["wireStock","sheetMetal","leatherScraps","oil"];return`
      <div class="panel market-panel">
        <h3>💰 Resources & Market</h3>
        
        <div class="resources-section">
          <div class="resources-list">
            ${Object.values(e.resources).filter(a=>e.uiState.discoveredResources.has(a.id)&&a.id!=="marks").map(a=>{const i=S[a.id],r=(i==null?void 0:i.buyPrice)||(i==null?void 0:i.sellPrice)||0;return`
        <div class="resource-item-with-market">
          <div class="resource-info">
            <span class="resource-name">${r>0?`€${r} `:""}${a.name}</span>
            <span class="resource-amount" data-resource-amount="${a.id}">${Math.floor(a.amount)}</span>
          </div>
          <div class="resource-actions">
            ${t.includes(a.id)?`
              <button 
                class="inline-market-btn buy-btn ${this.marketSystem.canBuy(a.id)?"available":"disabled"}"
                data-buy="${a.id}"
                ${this.marketSystem.canBuy(a.id)?"":"disabled"}
                title="Buy ${a.name}"
              >
                +
              </button>
            `:""}
            ${this.marketSystem.canSell(a.id)?`
              <button 
                class="inline-market-btn sell-btn available"
                data-sell="${a.id}"
                title="Sell ${a.name}"
              >
                -
              </button>
            `:""}
          </div>
        </div>
      `}).join("")}
          </div>
        </div>
      </div>
    `}attachEventListeners(e){e.querySelectorAll("[data-buy]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-buy");a&&this.marketSystem.buy(a)})}),e.querySelectorAll("[data-sell]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-sell");a&&this.marketSystem.sell(a)})})}updateDynamicElements(e){const t=this.gameState.getState();Object.values(t.resources).forEach(i=>{if(t.uiState.discoveredResources.has(i.id)&&i.id!=="marks"){const r=e.querySelector(`[data-resource-amount="${i.id}"]`);r&&(r.textContent=Math.floor(i.amount).toString())}}),e.querySelectorAll("[data-buy]").forEach(i=>{const r=i.getAttribute("data-buy");if(r){const n=this.marketSystem.canBuy(r);i.classList.toggle("available",n),i.classList.toggle("disabled",!n),i.disabled=!n}}),e.querySelectorAll("[data-sell]").forEach(i=>{const r=i.getAttribute("data-sell");if(r){const n=this.marketSystem.canSell(r);i.classList.toggle("available",n),i.classList.toggle("disabled",!n),i.disabled=!n}})}}class U{constructor(e,t){c(this,"gameState");c(this,"stockControlSystem");this.gameState=e,this.stockControlSystem=t}render(){const e=this.gameState.getState();if(!e.uiState.showStockControl)return"";const t=this.stockControlSystem.getAvailablePersonnel(),s=this.stockControlSystem.getActivePersonnel(),a=this.stockControlSystem.getActiveRules(),i=this.stockControlSystem.getTotalMonthlyCost(),r=t.filter(d=>!e.stockControl.personnel[d]).map(d=>{const u=this.stockControlSystem.getPersonnelTemplate(d);if(!u)return"";const h=this.stockControlSystem.canHirePersonnel(d),p=u.hiringCost+u.monthlySalary;return`
          <div class="personnel-hire">
            <button 
              class="hire-btn ${h?"available":"disabled"}"
              data-hire="${d}"
              ${h?"":"disabled"}
            >
              <div class="personnel-name">Hire ${u.name}</div>
              <div class="personnel-cost">Cost: €${u.hiringCost} + €${u.monthlySalary}/10s</div>
              <div class="personnel-desc">${u.description}</div>
              <div class="personnel-total">Total: €${p} (includes first payment)</div>
            </button>
          </div>
        `}).join(""),n=s.map(d=>{const u=a.filter(h=>h.managedBy===d.id).length;return`
        <div class="personnel-item active">
          <div class="personnel-header">
            <h4>${d.name}</h4>
            <button 
              class="fire-btn" 
              data-fire="${d.id}"
            >
              🔥 Fire
            </button>
          </div>
          <div class="personnel-info">
            <div>Salary: €${d.monthlySalary}/10s</div>
            <div>Managing: ${u} rules</div>
            <div>Type: ${d.type}</div>
          </div>
        </div>
      `}).join(""),o=a.map(d=>{const u=e.resources[d.resourceId],h=e.stockControl.personnel[d.managedBy];return`
        <div class="rule-item ${d.isEnabled?"enabled":"disabled"}">
          <div class="rule-header">
            <span>${d.type.toUpperCase()} ${(u==null?void 0:u.name)||d.resourceId}</span>
            <button 
              class="toggle-rule-btn" 
              data-toggle-rule="${d.id}"
            >
              ${d.isEnabled?"⏸️":"▶️"}
            </button>
          </div>
          <div class="rule-info">
            <div>Threshold: ${d.threshold}</div>
            <div>Quantity: ${d.quantity}</div>
            <div>Manager: ${(h==null?void 0:h.name)||"Unknown"}</div>
          </div>
          <button 
            class="delete-rule-btn" 
            data-delete-rule="${d.id}"
          >
            🗑️ Delete
          </button>
        </div>
      `}).join(""),m=s.length>0?`
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
        
        ${i>0?`
          <div class="cost-summary">
            <strong>Operating Cost: €${i.toFixed(1)}/10s</strong>
            <div class="cost-warning ${e.resources.marks.amount<i*3?"low-funds":""}">
              ${e.resources.marks.amount<i*3?"⚠️ Low funds! Personnel will quit if unpaid.":"✅ Sufficient funds"}
            </div>
          </div>
        `:""}
        
        ${r?`
          <div class="personnel-section">
            <h4>Available Personnel</h4>
            ${r}
          </div>
        `:""}
        
        ${n?`
          <div class="personnel-section">
            <h4>Active Personnel</h4>
            ${n}
          </div>
        `:""}
        
        ${m}
        
        ${o?`
          <div class="rules-section">
            <h4>Active Rules</h4>
            ${o}
          </div>
        `:""}
        
        ${s.length===0&&t.length===0?`
          <p>Complete more market transactions to unlock stock control personnel.</p>
        `:""}
      </div>
    `}attachEventListeners(e){e.querySelectorAll("[data-hire]").forEach(t=>{t.addEventListener("click",s=>{var i;const a=(i=s.target.closest("[data-hire]"))==null?void 0:i.getAttribute("data-hire");a&&this.stockControlSystem.hirePersonnel(a)})}),e.querySelectorAll("[data-fire]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-fire");a&&confirm("Are you sure you want to fire this personnel?")&&this.stockControlSystem.firePersonnel(a)})}),e.querySelectorAll("[data-toggle-rule]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-toggle-rule");if(a){const r=this.gameState.getState().stockControl.rules[a];r&&this.stockControlSystem.updateRule(a,{isEnabled:!r.isEnabled})}})}),e.querySelectorAll("[data-delete-rule]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-delete-rule");a&&confirm("Are you sure you want to delete this rule?")&&this.stockControlSystem.deleteRule(a)})}),e.querySelectorAll("[data-quick-rule]").forEach(t=>{t.addEventListener("click",s=>{const a=s.target.getAttribute("data-quick-rule");this.createQuickRules(a)})})}createQuickRules(e){const t=this.stockControlSystem.getActivePersonnel();if(t.length!==0){if(e==="buy-materials"){const s=t.find(a=>a.type==="procurement");s&&["wireStock","sheetMetal","leatherScraps","oil"].forEach(i=>{this.stockControlSystem.createRule(i,"buy",5,5,s.id)})}else if(e==="sell-products"){const s=t.find(a=>a.type==="sales");s&&["wireSprings","metalBrackets","leatherGaskets","springAssemblies","repairKits"].forEach(i=>{this.stockControlSystem.createRule(i,"sell",10,5,s.id)})}}}updateDynamicElements(e){const t=this.gameState.getState();e.querySelectorAll("[data-hire]").forEach(r=>{const n=r.getAttribute("data-hire");if(n){const o=this.stockControlSystem.canHirePersonnel(n);r.classList.toggle("available",o),r.classList.toggle("disabled",!o),r.disabled=!o}});const a=this.stockControlSystem.getTotalMonthlyCost(),i=e.querySelector(".cost-warning");if(i){const r=t.resources.marks.amount<a*3;i.classList.toggle("low-funds",r),i.textContent=r?"⚠️ Low funds! Personnel will quit if unpaid.":"✅ Sufficient funds"}}}class K{constructor(e,t,s,a,i,r,n){c(this,"gameState");c(this,"craftingSystem");c(this,"automationManager");c(this,"marketSystem");c(this,"salvageSystem");c(this,"stockControlSystem");c(this,"container");c(this,"lastRenderState","");c(this,"isInitialized",!1);c(this,"craftingPanel");c(this,"machinesPanel");c(this,"marketPanel");c(this,"stockControlPanel");this.gameState=e,this.craftingSystem=t,this.automationManager=s,this.marketSystem=a,this.salvageSystem=i,this.stockControlSystem=r,this.container=n,this.craftingPanel=new O(e,t,i),this.machinesPanel=new F(e,s),this.marketPanel=new G(e,a),this.stockControlPanel=new U(e,r)}forceFullRender(){this.lastRenderState="",this.isInitialized=!1,this.render()}render(){const e=this.gameState.getState(),t=this.createStateHash(e);t!==this.lastRenderState||!this.isInitialized?(this.fullRender(),this.lastRenderState=t,this.isInitialized=!0):this.updateDynamicElements()}createStateHash(e){const t={discoveredResources:Array.from(e.uiState.discoveredResources).sort(),showMarket:e.uiState.showMarket,showStockControl:e.uiState.showStockControl,unlockedRecipes:Array.from(e.unlockedRecipes).sort(),unlockedMachines:Array.from(e.unlockedMachines).sort(),unlockedStockControl:Array.from(e.unlockedStockControl).sort(),machineIds:Object.keys(e.machines).sort(),personnelIds:Object.keys(e.stockControl.personnel).sort()};return JSON.stringify(t)}fullRender(){const e=this.gameState.getState();this.container.innerHTML=`
      <div class="game-container">
        <header class="game-header">
          <h1>🏭 Autobahn Workshop</h1>
          <div class="game-stats">
            <span id="marks-display">€${Math.floor(e.resources.marks.amount)} Marks</span>
            <button id="save-btn" class="save-btn">💾 Save</button>
            <button id="reset-btn" class="reset-btn">🔄 Reset</button>
          </div>
        </header>

        <div class="game-content">
          <div class="left-panel">
            ${this.craftingPanel.render()}
            ${this.stockControlPanel.render()}
          </div>
          
          <div class="center-panel">
            ${this.machinesPanel.render()}
          </div>
          
          <div class="right-panel">
            ${this.marketPanel.render()}
          </div>
        </div>
      </div>
    `,this.attachEventListeners()}updateDynamicElements(){const e=this.gameState.getState(),t=this.container.querySelector("#marks-display");t&&(t.textContent=`€${Math.floor(e.resources.marks.amount)} Marks`);const s=this.container.querySelector(".left-panel"),a=this.container.querySelector(".center-panel"),i=this.container.querySelector(".right-panel");s&&this.craftingPanel.updateDynamicElements(s),s&&this.stockControlPanel.updateDynamicElements(s),a&&this.machinesPanel.updateDynamicElements(a),i&&this.marketPanel.updateDynamicElements(i)}attachEventListeners(){var a,i;const e=this.container.querySelector(".left-panel"),t=this.container.querySelector(".center-panel"),s=this.container.querySelector(".right-panel");e&&this.craftingPanel.attachEventListeners(e),e&&this.stockControlPanel.attachEventListeners(e),t&&this.machinesPanel.attachEventListeners(t),s&&this.marketPanel.attachEventListeners(s),(a=this.container.querySelector("#save-btn"))==null||a.addEventListener("click",()=>{this.gameState.saveGame()}),(i=this.container.querySelector("#reset-btn"))==null||i.addEventListener("click",()=>{confirm("Are you sure you want to reset your progress?")&&(this.gameState.resetGame(),this.forceFullRender())})}}const v=class v{constructor(){c(this,"isEnabled",!1);c(this,"debugPanel",null);c(this,"gameState");c(this,"craftingSystem");c(this,"automationManager");c(this,"marketSystem");(new URLSearchParams(window.location.search).get("dev")==="true"||localStorage.getItem("autobahn-dev-mode")==="true")&&this.enable()}static getInstance(){return v.instance||(v.instance=new v),v.instance}initialize(e,t,s,a){this.gameState=e,this.craftingSystem=t,this.automationManager=s,this.marketSystem=a,this.isEnabled&&(this.createDebugPanel(),this.setupKeyboardShortcuts(),this.logSystemInfo())}enable(){this.isEnabled=!0,localStorage.setItem("autobahn-dev-mode","true"),console.log("🔧 Dev Mode Enabled"),this.gameState&&(this.createDebugPanel(),this.setupKeyboardShortcuts(),this.logSystemInfo())}disable(){this.isEnabled=!1,localStorage.removeItem("autobahn-dev-mode"),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),console.log("🔧 Dev Mode Disabled")}isDevMode(){return this.isEnabled}createDebugPanel(){if(this.debugPanel)return;this.debugPanel=document.createElement("div"),this.debugPanel.id="dev-panel",this.debugPanel.innerHTML=`
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
    `;const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e),document.body.appendChild(this.debugPanel),this.attachDebugEventListeners(),this.startPerformanceMonitoring()}attachDebugEventListeners(){var e,t,s,a,i,r,n,o,m,d;this.debugPanel&&((e=this.debugPanel.querySelector("#dev-panel-toggle"))==null||e.addEventListener("click",()=>{var p,f;const u=(p=this.debugPanel)==null?void 0:p.querySelector(".dev-panel-content"),h=(f=this.debugPanel)==null?void 0:f.querySelector("#dev-panel-toggle");u&&h&&(u.classList.toggle("collapsed"),h.textContent=u.classList.contains("collapsed")?"+":"−")}),(t=this.debugPanel.querySelector("#dev-add-resources"))==null||t.addEventListener("click",()=>{this.addTestResources()}),(s=this.debugPanel.querySelector("#dev-add-money"))==null||s.addEventListener("click",()=>{this.gameState.updateResource("marks",100),this.log("Added 100 marks")}),(a=this.debugPanel.querySelector("#dev-unlock-all"))==null||a.addEventListener("click",()=>{this.unlockAll()}),(i=this.debugPanel.querySelector("#dev-reset-ui"))==null||i.addEventListener("click",()=>{this.resetUIState()}),(r=this.debugPanel.querySelector("#dev-log-state"))==null||r.addEventListener("click",()=>{console.log("Game State:",this.gameState.getState()),this.log("Game state logged to console")}),(n=this.debugPanel.querySelector("#dev-export-save"))==null||n.addEventListener("click",()=>{this.exportSave()}),(o=this.debugPanel.querySelector("#dev-import-save"))==null||o.addEventListener("click",()=>{var u,h;(h=(u=this.debugPanel)==null?void 0:u.querySelector("#dev-save-file"))==null||h.click()}),(m=this.debugPanel.querySelector("#dev-save-file"))==null||m.addEventListener("change",u=>{this.importSave(u)}),(d=this.debugPanel.querySelector("#dev-clear-log"))==null||d.addEventListener("click",()=>{var h;const u=(h=this.debugPanel)==null?void 0:h.querySelector("#dev-log");u&&(u.innerHTML="")}))}setupKeyboardShortcuts(){document.addEventListener("keydown",e=>{this.isEnabled&&(e.ctrlKey&&e.shiftKey&&e.key==="D"&&(e.preventDefault(),this.debugPanel&&(this.debugPanel.style.display=this.debugPanel.style.display==="none"?"block":"none")),e.ctrlKey&&e.shiftKey&&e.key==="R"&&(e.preventDefault(),this.addTestResources()),e.ctrlKey&&e.shiftKey&&e.key==="M"&&(e.preventDefault(),this.gameState.updateResource("marks",100),this.log("Added 100 marks (hotkey)")))})}addTestResources(){["wireStock","sheetMetal","leatherScraps","oil"].forEach(t=>{this.gameState.updateResource(t,10)}),this.log("Added 10 of each basic resource")}unlockAll(){const e=this.gameState.getState();Object.keys(require("../config/gameConfig").RECIPES).forEach(t=>{e.unlockedRecipes.add(t)}),Object.keys(require("../config/gameConfig").MACHINES).forEach(t=>{e.unlockedMachines.add(t)}),e.uiState.showMarket=!0,e.uiState.showFullMarket=!0,this.log("Unlocked all recipes, machines, and UI elements")}resetUIState(){const e=this.gameState.getState();e.uiState={discoveredResources:new Set(["marks"]),showMarket:!1,showFullMarket:!1,showEmergencyLabor:!1},this.log("Reset UI state to initial values")}exportSave(){this.gameState.saveGame();const e=localStorage.getItem("autobahn-save");if(e){const t=new Blob([e],{type:"application/json"}),s=URL.createObjectURL(t),a=document.createElement("a");a.href=s,a.download=`autobahn-save-${new Date().toISOString().slice(0,19)}.json`,a.click(),URL.revokeObjectURL(s),this.log("Save exported")}}importSave(e){var a;const t=(a=e.target.files)==null?void 0:a[0];if(!t)return;const s=new FileReader;s.onload=i=>{var r;try{const n=(r=i.target)==null?void 0:r.result;localStorage.setItem("autobahn-save",n),location.reload()}catch(n){this.log(`Import failed: ${n}`)}},s.readAsText(t)}startPerformanceMonitoring(){let e=performance.now(),t=0,s=e;const a=()=>{var r;const i=performance.now();if(t++,i-s>=1e3){const n=Math.round(t*1e3/(i-s)),o=(r=this.debugPanel)==null?void 0:r.querySelector("#dev-fps");o&&(o.textContent=n.toString()),t=0,s=i}e=i,this.isEnabled&&requestAnimationFrame(a)};requestAnimationFrame(a)}log(e){var i;if(!this.isEnabled)return;const s=`[${new Date().toLocaleTimeString()}] ${e}`;console.log(`🔧 ${s}`);const a=(i=this.debugPanel)==null?void 0:i.querySelector("#dev-log");if(a){const r=document.createElement("div");r.textContent=s,a.appendChild(r),a.scrollTop=a.scrollHeight}}logSystemInfo(){console.group("🔧 Autobahn Dev Mode - System Info"),console.log("User Agent:",navigator.userAgent),console.log("Screen Resolution:",`${screen.width}x${screen.height}`),console.log("Viewport:",`${window.innerWidth}x${window.innerHeight}`),console.log("Local Storage Available:",typeof Storage<"u"),console.log("Performance API Available:",typeof performance<"u"),console.groupEnd()}getGameState(){var e;return(e=this.gameState)==null?void 0:e.getState()}setResource(e,t){this.gameState&&(this.gameState.getState().resources[e].amount=t,this.log(`Set ${e} to ${t}`))}triggerMilestone(e){this.gameState&&(this.gameState.checkMilestones(),this.log("Triggered milestone check"))}};c(v,"instance");let k=v;window.devMode=k.getInstance();class H{constructor(e){c(this,"gameState");c(this,"craftingSystem");c(this,"automationManager");c(this,"marketSystem");c(this,"salvageSystem");c(this,"stockControlSystem");c(this,"uiRenderer");c(this,"gameLoop",0);c(this,"devMode");this.devMode=k.getInstance(),this.gameState=new x,this.craftingSystem=new T(this.gameState),this.automationManager=new q(this.gameState,this.craftingSystem),this.marketSystem=new B(this.gameState),this.salvageSystem=new D(this.gameState),this.stockControlSystem=new j(this.gameState,this.marketSystem),this.uiRenderer=new K(this.gameState,this.craftingSystem,this.automationManager,this.marketSystem,this.salvageSystem,this.stockControlSystem,e),this.devMode.initialize(this.gameState,this.craftingSystem,this.automationManager,this.marketSystem),this.start()}forceUIRefresh(){this.uiRenderer.forceFullRender()}start(){this.devMode.log("Game starting..."),this.uiRenderer.render(),this.gameLoop=setInterval(()=>{this.update()},16),setInterval(()=>{this.gameState.saveGame()},3e4)}update(){const e=performance.now();this.automationManager.updateMachines(),this.stockControlSystem.update();const t=performance.now()-e,s=performance.now();this.uiRenderer.render();const a=performance.now()-s;if(this.devMode.isDevMode()){const i=document.querySelector("#dev-update-time"),r=document.querySelector("#dev-render-time");i&&(i.textContent=t.toFixed(2)),r&&(r.textContent=a.toFixed(2))}}destroy(){this.devMode.log("Game shutting down..."),this.gameLoop&&clearInterval(this.gameLoop)}}const N=document.querySelector("#app"),W=new H(N);window.addEventListener("beforeunload",()=>{W.destroy()});
