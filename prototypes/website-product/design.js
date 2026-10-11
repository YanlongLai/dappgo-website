import { products, apps } from './catalog.js';

const dictionary = {
  skip:['跳至主要內容','Skip to content'],navProducts:['我們的產品','Our products'],navApps:['下載 App','Get the apps'],navMethod:['如何運作','How it works'],navBusiness:['企業自動化','For your business'],menu:['選單','Menu'],
  eyebrow:['DAPPGO 研究工具','RESEARCH WITH DAPPGO'],heroTitle:['每天的市場，|看得更清楚。','Make sense of|the market.'],heroDesc:['從美股、台股到選擇權，把資料與新聞整理成容易閱讀的研究。','Explore U.S. stocks, Taiwan equities, options and company news with research tools built for everyday reading.'],explore:['探索產品','Explore products'],download:['下載 App','Get the apps'],realScreen:['實際 App 畫面','Actual app screens'],
  intro:['在瀏覽器開始，在手機繼續探索。','Start on the web. Explore on your phone.'],introNote:['美股、台股、選擇權與公司新聞','Equities, options and company news'],productsTitle:['找到你的研究入口。','Find your research starting point.'],productsDesc:['先選擇你關心的市場。每個產品，都有清楚的用途。','Choose what you want to understand. Each product gives you a focused place to start.'],appsTitle:['把喜歡的工具，帶在身邊。','Your tools, wherever you are.'],appsDesc:['四款 Android App，加上台股與 Options 的 iOS 版本。選擇適合你的裝置。','Four Android apps, with TW Stocks and Options Explorer also on iOS. Choose your device.'],
  methodTitle:['有來源，才有研究的起點。','Better context starts with the source.'],methodDesc:['從市場資料到公司新聞，把值得注意的線索放進同一個脈絡。','Connect market data and company news to understand the context behind the numbers.'],methodOne:['從資料出發','Start with the source'],methodOneDesc:['整理公開市場資料與新聞來源，保留可以追查的背景。','Organize market data and reporting while keeping their source context.'],methodTwo:['把線索放在一起','Connect the context'],methodTwoDesc:['結合市場、個股與研究說明，幫助你比較不同觀點。','Bring market, company and research notes together to compare different perspectives.'],methodThree:['選擇你的閱讀方式','Read your way'],methodThreeDesc:['用網頁快速查看，或用 App 建立自己的日常研究習慣。','Open a web tool for a quick look, or build a daily research habit with the apps.'],researchNote:['市場資料可能延遲。研究產品提供一般資訊與教育用途，沒有券商連結或下單功能。','Market data may be delayed. Research products provide general information and education, with no brokerage connection or order execution.'],
  businessLabel:['給你的團隊','FOR YOUR TEAM'],businessTitle:['把重複工作，|變成可靠的流程。','Turn repeat work|into a working system.'],businessDesc:['把建構 DappGo 的經驗，帶進你的資料整合、AI 應用與內容工作流程。','Bring the experience behind DappGo into your data integrations, AI applications and content workflows.'],contactCta:['聊聊你的想法','Let’s talk'],faqOne:['DappGo 的資料是即時行情嗎？','Does DappGo provide real-time quotes?'],faqOneDesc:['研究內容依已發布資料更新。請以各產品顯示的資料日期與來源為準，不能視為即時成交報價。','Research reflects published datasets. Check the date and source shown in each product; it is not a real-time trade quote.'],faqTwo:['新聞網站與股票 App 有什麼不同？','How does News differ from the stock apps?'],faqTwoDesc:['News 著重依市場與公司整理新聞；Stocks 提供市場、個股與研究資料，適合一起使用。','News organizes reporting by market and company. Stocks adds market, company and research data, so the two work well together.'],faqThree:['可以協助企業做什麼？','How can you help a business?'],faqThreeDesc:['從資料整理、重複性研究到內容流程，一起評估問題、輸入與輸出，再決定適合的自動化範圍。','We can assess data preparation, repeat research and content workflows together, then define useful inputs, outputs and automation.'],contactTitle:['有想法，歡迎聊聊。','Have a workflow in mind?'],privacy:['隱私權','Privacy'],terms:['服務條款','Terms'],support:['支援','Support'],
  exploreAlt:['Options Explorer 股票探索頁面，英文介面','Options Explorer stock exploration screen in English'],dashboardAlt:['Options Explorer 儀表板，英文介面','Options Explorer dashboard in English']
};
const storage = {get(k){try{return localStorage.getItem('dappgo-design-'+k)}catch{return null}},set(k,v){try{localStorage.setItem('dappgo-design-'+k,v)}catch{}}};
const query = new URLSearchParams(location.search);
let lang = query.get('lang') || storage.get('lang') || (navigator.language.startsWith('zh')?'zh':'en');
if (!['zh','en'].includes(lang)) lang='zh';
const colorScheme = matchMedia('(prefers-color-scheme: dark)');
let explicitTheme = query.get('theme') || storage.get('theme');
if(!['light','dark'].includes(explicitTheme)) explicitTheme=null;
let selected = 'us';
const $ = selector => document.querySelector(selector);
const t = key => dictionary[key][lang==='zh'?0:1];
const element = (tag,className,text) => {const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el};
function link(href,text,className){const a=element('a',className,text);a.href=href;return a}
function badge(platform,href,available){const node=available?link(href,'','store-badge'):element('span','store-badge store-badge--disabled');node.setAttribute('role',available?'link':'img');node.setAttribute('aria-disabled',String(!available));if(available){node.target='_blank';node.rel='noopener noreferrer'}const label=platform==='ios'?(available?'Open in the App Store':'App Store — Coming soon'):(available?'Open in Google Play':'Google Play — Coming soon');node.setAttribute('aria-label',label);['light','dark'].forEach(theme=>{const img=element('img','store-badge-image store-badge-image--'+theme);img.src=`../../assets/store-badges/${platform==='ios'?'app-store':'google-play'}-${theme}.jpg`;img.width=284;img.height=100;img.alt='';node.append(img)});if(!available)node.append(element('small','store-badge-status',lang==='zh'?'即將推出':'Coming soon'));return node}
function icon(product){const img=element('img',product.icon?'':'news-icon');img.src=product.icon?'../../assets/app-icons/'+product.icon:'../../icons/lucide/newspaper.svg';img.alt='';img.width=40;img.height=40;return img}
function renderTabs(){
  const tabs=$('#product-tabs');tabs.replaceChildren();tabs.setAttribute('aria-label',lang==='zh'?'產品':'Products');
  products.forEach(p=>{const b=element('button','product-tab');b.type='button';b.id='tab-'+p.id;b.role='tab';b.setAttribute('aria-controls','product-panel');b.setAttribute('aria-selected',String(selected===p.id));b.tabIndex=selected===p.id?0:-1;b.append(icon(p));const label=element('span');label.append(element('b','',p.name),element('small','',p.subtitle[lang]));b.append(label);b.addEventListener('click',()=>selectProduct(p.id));b.addEventListener('keydown',event=>{const index=products.findIndex(p=>p.id===selected);let target;if(['ArrowRight','ArrowDown'].includes(event.key))target=(index+1)%products.length;if(['ArrowLeft','ArrowUp'].includes(event.key))target=(index-1+products.length)%products.length;if(event.key==='Home')target=0;if(event.key==='End')target=products.length-1;if(target!==undefined){event.preventDefault();selectProduct(products[target].id);$('#tab-'+products[target].id).focus()}});tabs.append(b)});
}
function selectProduct(id){
  selected=id;
  document.querySelectorAll('[role=tab]').forEach(tab=>{const active=tab.id==='tab-'+id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
  const p=products.find(p=>p.id===id),panel=$('#product-panel');panel.setAttribute('aria-labelledby','tab-'+id);panel.replaceChildren();
  const body=element('div','product-body');body.append(element('h3','',p.name),element('p','',p.description[lang]));
  const features=element('div','features');p.features[lang].forEach(f=>features.append(element('span','',f)));body.append(features);
  const links=element('div','product-links');links.append(link(p.web,(lang==='zh'?'開啟網頁版':'Open web app')+' ↗','button primary'));
  if(p.markets){p.markets.forEach(m=>links.append(link(m.url,m[lang]+' ↗','text-link')))}else{links.append(link('#app-'+p.id,lang==='zh'?'取得手機 App':'Get the mobile app','text-link'))}
  body.append(links);panel.append(body);
  const frame=element('div','screen-container'),img=element('img');img.src=p.image;img.width=1280;img.height=720;img.alt=lang==='zh'?p.name+' 網頁實際畫面，2026 年 10 月 11 日擷取':p.name+' web screenshot captured October 11, 2026';
  img.addEventListener('error',()=>{frame.replaceChildren(element('p','image-error',lang==='zh'?'預覽暫時無法顯示，仍可開啟產品網頁。':'Preview unavailable. You can still open the product.'))},{once:true});frame.append(img);panel.append(frame,element('p','screen-note',lang==='zh'?'實際產品畫面，資料僅作介面示例。最新內容請開啟產品查看。':'Actual product screenshot with example data. Open the product for its latest published content.'));
}
function renderApps(){
  const grid=$('#app-grid');grid.replaceChildren();apps.forEach(p=>{const card=element('article','app-card');card.id='app-'+p.id;const img=icon(p);img.className='app-icon';img.width=60;img.height=60;const content=element('div');content.append(element('h3','',p.name),element('p','',p.appCopy[lang]));const links=element('div','store-links');links.append(badge('ios',p.ios,Boolean(p.ios)),badge('android',p.android,Boolean(p.android)));card.append(img,content,links);grid.append(card)})
}
function updateTheme(){document.documentElement.dataset.theme=explicitTheme||(colorScheme.matches?'dark':'light');$('#theme').setAttribute('aria-label',document.documentElement.dataset.theme==='dark'?(lang==='zh'?'切換淺色模式':'Switch to light theme'):(lang==='zh'?'切換深色模式':'Switch to dark theme'))}
function renderLocale(){
  document.documentElement.lang=lang==='zh'?'zh-Hant':'en';
  document.querySelectorAll('[data-copy]').forEach(el=>{const value=t(el.dataset.copy);if(['heroTitle','businessTitle'].includes(el.dataset.copy)){const parts=value.split('|');el.replaceChildren(document.createTextNode(parts[0]),document.createElement('br'),element('span','',parts[1]))}else el.textContent=value});
  document.querySelectorAll('[data-alt]').forEach(el=>el.alt=t(el.dataset.alt));
  $('#language').textContent=lang==='zh'?'EN':'中文';$('#language').setAttribute('aria-label',lang==='zh'?'Switch to English':'切換繁體中文');$('#nav').setAttribute('aria-label',lang==='zh'?'主要導覽':'Main navigation');$('.footer nav').setAttribute('aria-label',lang==='zh'?'法律資訊與支援':'Legal and support');
  renderTabs();selectProduct(selected);renderApps();updateTheme();
}
$('#language').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';storage.set('lang',lang);renderLocale()});
$('#theme').addEventListener('click',()=>{explicitTheme=document.documentElement.dataset.theme==='dark'?'light':'dark';storage.set('theme',explicitTheme);updateTheme()});
colorScheme.addEventListener('change',()=>{if(!explicitTheme)updateTheme()});
function closeMenu(){ $('#nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false') }
$('#menu').addEventListener('click',()=>{const open=$('#menu').getAttribute('aria-expanded')!=='true';$('#nav').classList.toggle('open',open);$('#menu').setAttribute('aria-expanded',String(open))});
$('#nav').addEventListener('click',event=>{if(event.target.closest('a'))closeMenu()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('#menu').getAttribute('aria-expanded')==='true'){closeMenu();$('#menu').focus()}});
renderLocale();
