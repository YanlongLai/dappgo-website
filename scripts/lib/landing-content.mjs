// Copy for the app landing pages. Names and subtitles follow the new store listings
// (GROWTH_20261109/STORE_PAGE_DESIGN.md). Features describe what the apps already do.
// `page` is the campaign page name (assets/store-links.js): web-<page>-<position>.

export const DISCLAIMER = {
  en: "Research and education only. Quotes may be delayed. No brokerage connection or trade execution; not personalized investment advice.",
  zh: "內容僅供研究與學習參考，報價可能有延遲。本服務不串接券商、不代為下單，也不構成個人投資建議。"
};

export const APPS = {
  "tw-stocks": {
    store: "tw-stocks",
    slug: "tw-stocks",
    page: "tw",
    icon: "/assets/app-icons/tw-stocks-icon-128.webp?v=20261028",
    iconLarge: "/assets/app-icons/tw-stocks-icon.png",
    appId: "6768116538",
    web: "https://stocks.dappgo.com/tw/",
    ogImage: "https://dappgo.com/og-image-v2.png",
    ogImageAlt: { en: "DappGo market research and automation", zh: "DappGo 市場研究與自動化" },
    phone: null,
    en: {
      brand: "TW Stocks",
      descriptor: "Taiwan Stock Market",
      subtitle: "TWSE signals, sectors & flows",
      kicker: "Taiwan stocks · iOS, Android & web",
      title: "TW Stocks: Taiwan Stock Market Signals & Flows | DappGo",
      description: "TW Stocks: daily TWSE signals, institutional flows, sector rotation and AI summaries for Taiwan stocks. Free on iOS, Android and the web. Research only.",
      features: [
        ["Daily signals for 100+ TWSE stocks", "After the close, each stock is sorted into buy, hold or watch, with its trend on one page."],
        ["Institutional flows and sector rotation", "See where foreign investors, investment trusts and dealers are buying, and which sectors the money is moving into."],
        ["AI summary on every stock page", "A short plain-language read of the day’s signal, price action and flows, grounded in the published data."]
      ]
    },
    zh: {
      brand: "TW Stocks",
      descriptor: "台股訊號・盤後籌碼",
      subtitle: "三大法人、類股輪動、AI 摘要，每日更新",
      kicker: "台股 · iOS、Android 與網頁版",
      title: "TW Stocks：台股訊號・盤後籌碼｜DappGo",
      description: "TW Stocks 每日整理台股訊號、三大法人動向、類股輪動與 AI 摘要。可在 iOS、Android 與網頁使用，僅供研究參考。",
      features: [
        ["100 檔以上個股的每日訊號", "收盤後，每檔個股分成買進、持有或觀望，走勢與訊號集中在同一頁。"],
        ["三大法人與類股輪動", "看外資、投信、自營商買超在哪裡，資金正在流向哪些類股。"],
        ["每檔個股都有 AI 摘要", "用淺白文字整理當日訊號、價格表現與資金動向，內容以已發布的資料為依據。"]
      ]
    }
  },
  "us-stocks": {
    store: "us-stocks",
    slug: "us-stocks",
    page: "us",
    icon: "/assets/app-icons/us-stocks-icon-128.webp?v=20261028",
    iconLarge: "/assets/app-icons/us-stocks-icon.png",
    appId: "6768116546",
    web: "https://stocks.dappgo.com/us/",
    ogImage: "https://dappgo.com/og-image-v2.png",
    ogImageAlt: { en: "DappGo market research and automation", zh: "DappGo 市場研究與自動化" },
    phone: null,
    en: {
      brand: "US Stocks",
      descriptor: "AI Stock Signals",
      subtitle: "Insider, 13F & sector rotation",
      kicker: "US stocks · iOS, Android & web",
      title: "US Stocks: AI Stock Signals, Insider & 13F | DappGo",
      description: "US Stocks: daily AI stock signals with insider trades, 13F institutional holdings and sector rotation. Free on iOS, Android and the web. Research only.",
      features: [
        ["Daily signals for curated US tickers", "After the US close, each ticker is sorted into buy, hold or watch, with market breadth and regime in view."],
        ["Insider trades and 13F holdings", "Follow insider transactions and institutional 13F positions next to each stock’s signal."],
        ["Sector rotation and AI summaries", "See which sectors lead or lag, and read a short AI summary grounded in the published data."]
      ]
    },
    zh: {
      brand: "US Stocks",
      descriptor: "美股訊號・AI 分析",
      subtitle: "機構持股、內部人交易、產業輪動，每日更新",
      kicker: "美股 · iOS、Android 與網頁版",
      title: "US Stocks：美股訊號・AI 分析｜DappGo",
      description: "US Stocks 每日整理美股訊號、機構持股 13F、內部人交易與產業輪動，附 AI 摘要。可在 iOS、Android 與網頁使用，僅供研究參考。",
      features: [
        ["精選美股的每日訊號", "美股收盤後，每檔個股分成買進、持有或觀望，並附上市場廣度與多空環境。"],
        ["內部人交易與機構持股", "在每檔個股的訊號旁，查看內部人交易與機構 13F 持股。"],
        ["產業輪動與 AI 摘要", "看哪些產業領先或落後，並閱讀以已發布資料為依據的 AI 摘要。"]
      ]
    }
  },
  options: {
    store: "options-explorer",
    slug: "options",
    page: "options",
    icon: "/assets/app-icons/options-icon-128.webp?v=20261028",
    iconLarge: "/assets/app-icons/options-icon.png",
    appId: "6768116720",
    web: "https://options.dappgo.com/us/",
    ogImage: "https://dappgo.com/og-options.png",
    ogImageAlt: { en: "Options Explorer by DappGo", zh: "DappGo Options Explorer" },
    phone: { src: "/assets/screenshots/options/dashboard", width: 660, height: 1434 },
    en: {
      brand: "Options Explorer",
      descriptor: "Option Chain",
      subtitle: "Put selling, open interest, IV",
      kicker: "US options · iOS, Android & web",
      title: "Options Explorer: Option Chain, Open Interest & IV | DappGo",
      description: "Options Explorer: ranked put-selling setups, open interest and implied volatility for US stock options, updated daily. Free on iOS, Android and the web.",
      features: [
        ["Ranked put-selling setups", "Each day’s top-scored short-put candidates, with strike, expiry, probability of profit and annualised return."],
        ["Open interest and implied volatility", "Compare contracts by open interest, IV and premium before deciding what to study."],
        ["Contracts side by side", "Line up strikes and expiries for the US stocks and ETFs we cover."]
      ]
    },
    zh: {
      brand: "Options Explorer",
      descriptor: "美股選擇權",
      subtitle: "賣方研究、未平倉量、隱含波動率，每日更新",
      kicker: "美股選擇權 · iOS、Android 與網頁版",
      title: "Options Explorer：美股選擇權研究｜DappGo",
      description: "Options Explorer 每日整理美股選擇權的賣出賣權排行、未平倉量與隱含波動率。可在 iOS、Android 與網頁使用，僅供研究參考。",
      features: [
        ["賣出賣權排行", "每天依分數排序的賣出賣權候選，列出履約價、到期日、獲利機率與年化報酬。"],
        ["未平倉量與隱含波動率", "用未平倉量、隱含波動率與權利金比較合約，再決定要研究哪一檔。"],
        ["合約並排比較", "把我們涵蓋的美股與 ETF 的履約價和到期日並排檢視。"]
      ]
    }
  }
};

export const UI = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    ogLocaleAlt: "zh_TW",
    langName: "中文",
    langLabel: "切換至繁體中文",
    home: "Home",
    navApps: "Apps",
    skip: "Skip to content",
    homeLabel: "DappGo home",
    heroDownload: "Download",
    openWeb: "Open web app",
    featuresTitle: "What you get",
    featuresLede: "Three things the app does every trading day.",
    updatedTitle: "Updated daily",
    updatedBody: "Reports are rebuilt after each market close and published to the app and the web. Report dates and data sources are shown in the app.",
    moreTitle: "More from DappGo",
    moreLede: "The same daily research, one app per market.",
    ctaTitle: "Get {brand}",
    ctaLede: "Free on iOS and Android. Prefer a browser? The web app has the same reports.",
    appStoreAlt: "Download on the App Store",
    playAlt: "Get it on Google Play",
    legalNav: "Legal and support",
    support: "Support",
    privacy: "Privacy",
    terms: "Terms",
    phoneLabel: "App preview",
    phonePlaceholder: "Screenshot coming soon",
    disclaimerLabel: "Disclaimer"
  },
  zh: {
    htmlLang: "zh-Hant",
    ogLocale: "zh_TW",
    ogLocaleAlt: "en_US",
    langName: "EN",
    langLabel: "Switch to English",
    home: "首頁",
    navApps: "App",
    skip: "跳至主要內容",
    homeLabel: "DappGo 首頁",
    heroDownload: "下載",
    openWeb: "開啟網頁版",
    featuresTitle: "你會得到",
    featuresLede: "每個交易日，App 都會幫你整理這三件事。",
    updatedTitle: "每日更新",
    updatedBody: "每個市場收盤後重新產出報告，同步發布到 App 與網頁。報告日期與資料來源會顯示在 App 內。",
    moreTitle: "DappGo 的其他 App",
    moreLede: "同樣的每日研究，每個市場一個 App。",
    ctaTitle: "下載 {brand}",
    ctaLede: "iOS 與 Android 免費下載。想先用瀏覽器看？網頁版有同樣的報告。",
    appStoreAlt: "Download on the App Store",
    playAlt: "Get it on Google Play",
    legalNav: "法律與支援",
    support: "支援",
    privacy: "隱私權政策",
    terms: "服務條款",
    phoneLabel: "App 預覽",
    phonePlaceholder: "截圖即將更新",
    disclaimerLabel: "免責聲明"
  }
};
