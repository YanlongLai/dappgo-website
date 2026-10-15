// Design catalog. Public destinations verified 2026-10-11; screenshots are examples.
export const products = [
  {id:'us',name:'US Stocks',icon:'us-stocks-icon-128.webp',web:'https://stocks.dappgo.com/us/',image:'screens/us.jpg',
   subtitle:{zh:'美股研究',en:'U.S. equity research'},
   description:{zh:'從市場概況到個股研究，把類股輪動、每日變化與公司新聞放在一起，快速建立對美股的理解。',en:'Build a clearer picture of U.S. equities with market breadth, sector rotation, company research and relevant news.'},
   features:{zh:['市場概況','類股輪動','個股與新聞'],en:['Market breadth','Sector rotation','Company research']},
   android:'https://play.google.com/store/apps/details?id=com.dappgo.usstocksapp',ios:'https://apps.apple.com/us/app/us-stocks/id6768116546',
   appCopy:{zh:'在手機瀏覽美股研究與新聞，收藏你持續關注的公司。',en:'Browse U.S. market research and news, and save the companies you follow.'}},
  {id:'tw',name:'TW Stocks',icon:'tw-stocks-icon-128.webp',web:'https://stocks.dappgo.com/tw/',image:'screens/tw.jpg',
   subtitle:{zh:'台股研究',en:'Taiwan equity research'},
   description:{zh:'從每日研究訊號、類股變化到三大法人籌碼，用台灣市場的脈絡理解個股，並延伸閱讀相關新聞。',en:'Understand Taiwan equities through daily research signals, sector movement, institutional flows and company news.'},
   features:{zh:['每日訊號','法人籌碼','台股脈絡'],en:['Daily signals','Institutional flows','Taiwan market context']},
   android:'https://play.google.com/store/apps/details?id=com.dappgo.twstocksapp',ios:'https://apps.apple.com/app/id6768116538',
   appCopy:{zh:'把台股訊號、法人籌碼與個股洞察，放進每天的研究習慣。',en:'Make Taiwan market signals, institutional flows and company insights part of your daily research.'}},
  {id:'options',name:'Options Explorer',icon:'options-icon-128.webp',web:'https://options.dappgo.com/us/',image:'screens/options.jpg',
   subtitle:{zh:'美股選擇權研究',en:'U.S. options research'},
   description:{zh:'把 Put、Call 研究與標的公司的估值、選擇權鏈放在一起，比較不同合約的條件與風險。',en:'Compare put-side and call-side research alongside company valuations, option-chain details and contract risk context.'},
   features:{zh:['Put / Call 研究','合約比較','估值脈絡'],en:['Put / Call research','Contract comparison','Valuation context']},
   android:'https://play.google.com/store/apps/details?id=com.dappgo.optionsapp',ios:'https://apps.apple.com/app/id6768116720',
   appCopy:{zh:'探索選擇權合約與研究說明，將關注的標的和合約加入收藏。',en:'Explore options contracts and research notes, with favorites for the tickers and contracts you follow.'}},
  {id:'news',name:'DappGo News',web:'https://news.dappgo.com/',image:'screens/news.jpg',
   subtitle:{zh:'依公司閱讀新聞',en:'Company-first news'},
   description:{zh:'依美國、台灣市場與股票篩選新聞，從最新消息開始閱讀。摘要、縮圖與原始來源，讓你更快找到值得深入了解的報導。',en:'Read published news by market and company, newest first. Scan summaries and available thumbnails, then open the original reporting.'},
   features:{zh:['市場與個股篩選','由新到舊','連回原始報導'],en:['Market and stock filters','Newest first','Original sources']},
   markets:[{zh:'美國新聞',en:'U.S. news',url:'https://news.dappgo.com/us/'},{zh:'台灣新聞',en:'Taiwan news',url:'https://news.dappgo.com/tw/'}]}
];
export const apps = [...products.filter(p=>p.android),{id:'number-merge',name:'Number Merge',icon:'number-merge-icon-128.webp',android:'https://play.google.com/store/apps/details?id=com.dappgo.numbermerge',ios:null,appCopy:{zh:'放下方塊、合併相同數字。用短暫的一局，練習規劃下一步。',en:'Drop tiles, merge matching numbers and plan your next move in a quick puzzle session.'}}];
