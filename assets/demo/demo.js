/* Shared static-page behavior. No backend requests or form submissions. */
(() => {
  "use strict";

  const zh = {
    skip: "跳至主要內容",
    navProducts: "我們的產品",
    navMethod: "如何運作",
    navWorkflows: "企業自動化",
    contactCta: "聊聊你的想法",
    heroKicker: "讓研究，每天自動前進。",
    heroLine1: "市場再複雜，",
    heroLine2: "研究更清楚。",
    heroDescription: "每日市場研究、選擇權洞察與有目的的自動化，從資料來源一路走到發布。",
    exploreCta: "探索我們的產品",
    seeFlow: "看看如何運作",
    artTag: "以自動化串起每一步",
    realScreens: "真實 App 畫面 · 此處展示英文介面",
    indexIntro: "一個團隊，<br>串起更多可能。",
    indexResearch: "市場研究",
    indexAutomation: "AI 與自動化",
    indexApps: "日常應用",
    methodTitle: "背後的事很多，<br>眼前的洞察更清楚。",
    methodDescription:
      "DappGo 把市場資料、AI 分析和排程發布串在一起，讓研究有一套持續運作的流程。",
    workflowLabel: "DappGo 研究流程",
    source1: "市場報價",
    source2: "新聞與財報",
    source3: "選擇權資料",
    engineLabel: "研究引擎",
    destination1: "每日報告",
    destination2: "App 洞察",
    destination3: "社群更新",
    step1: "蒐集",
    step2: "分析",
    step3: "檢查",
    step4: "發布",
    workflowNote: "互動流程示意，並非即時服務狀態或監控數據。",
    productsTitle: "為好奇而做，<br>為每天而用。",
    productCategory: "你的選擇權研究夥伴",
    productIntro:
      "在同一個研究畫面裡探索市場資料、估值區間與選擇權鏈，理解 Sell Put 與 Sell Call 的問題。",
    screen1: "從這裡開始每日研究",
    screen1Detail: "報價、研究卡片與 AI 觀點，集中瀏覽。",
    screen2: "找到下一個值得研究的標的",
    screen2Detail: "所有支援股票，一處探索。",
    screen3: "不只看現價，更看脈絡",
    screen3Detail: "估值區間、選擇權資料與個股分析。",
    productCta: "探索 Options Explorer",
    researchNote:
      "提供研究與教育資訊，無券商連結或下單功能，不提供個人化投資建議。",
    realScreenNote: "近距離看看真實 App 介面",
    usTitle: "美股研究",
    usDescription: "整理公司新聞與每日市場研究，讓美股資訊更有脈絡。",
    twTitle: "台股研究",
    twDescription: "以在地市場脈絡與每日研究視角，觀察台灣股票。",
    productUpdates: "追蹤產品消息",
    playTag: "遊戲",
    gameDescription: "換個方式和數字相處。落下、合併，找出你的下一步。",
    businessEyebrow: "從我們的產品，到你的工作流程",
    businessTitle: "少一點重複工作，<br>多一點可能。",
    businessDescription:
      "打造 DappGo 產品的思維，也能用在你的企業。一起找出最值得自動化的流程。",
    business1: "讓資料，接得起來。",
    business1Text:
      "把分散的來源整理成結構化流程。定義輸入、保留來源脈絡，讓輸出真正對團隊有用。",
    business2: "讓 AI，用在對的地方。",
    business2Text:
      "讓 AI 專注完成明確的工作：摘要、整理或草擬。把檢查和例外處理也納入流程。",
    business3: "讓工作，持續往前。",
    business3Text:
      "串起排程、發布與監控，讓重複工作不再依賴有人記得操作下一步。",
    contactTitle: "保持好奇，<br>也保持聯繫。",
    contactDescription:
      "追蹤我們的研究與產品進展。或帶著一個值得改善的工作流程，來聊聊。",
    subscribeCta: "訂閱 DappGo 更新",
    demoNotice: "設計預覽 · 尚未發布至正式網站",
    siteNotice: "研究產品 · 有目的的自動化",
    privacy: "隱私權",
    terms: "服務條款",
    support: "支援",
  };
  const dynamic = {
    en: {
      play: "Play the flow",
      pause: "Pause the flow",
      dark: "Switch to dark theme",
      light: "Switch to light theme",
      menuOpen: "Open navigation",
      menuClose: "Close navigation",
      stages: [
        [
          "Start with the source.",
          "Gather market prices, company filings, news, and options data before building the research.",
        ],
        [
          "Turn information into context.",
          "Combine structured data and AI-assisted analysis to explore the story behind the numbers.",
        ],
        [
          "Make room for checks.",
          "Check freshness and required data before the next step. Incomplete inputs should stay visible, not become confident conclusions.",
        ],
        [
          "Put the research to work.",
          "Bring the output into daily reports, product screens, and scheduled social updates.",
        ],
      ],
      screens: ["Dashboard / 01", "Explore / 02", "Stock research / 03"],
      alts: [
        "Options Explorer dashboard with market quotes and research cards",
        "Options Explorer supported-stock exploration screen",
        "Options Explorer individual stock research with valuation and options data",
      ],
    },
    "zh-Hant": {
      play: "播放流程",
      pause: "暫停流程",
      dark: "切換深色模式",
      light: "切換淺色模式",
      menuOpen: "開啟導覽選單",
      menuClose: "關閉導覽選單",
      stages: [
        [
          "從資料來源開始。",
          "先蒐集市場報價、公司申報文件、新聞與選擇權資料，再進入研究分析。",
        ],
        [
          "從資訊，走向理解。",
          "結合結構化資料與 AI 輔助分析，探索數字背後的市場脈絡。",
        ],
        [
          "把檢查，放進流程。",
          "在下一步前檢查時效與必要資料。輸入有缺漏，就讓問題可見，不把不完整資訊包裝成肯定結論。",
        ],
        [
          "讓研究，來到你面前。",
          "把研究成果帶到每日報告、App 畫面與排程社群更新。",
        ],
      ],
      screens: ["儀表板 / 01", "探索 / 02", "個股研究 / 03"],
      alts: [
        "Options Explorer 儀表板，包含報價與研究卡片，展示英文介面",
        "Options Explorer 支援股票探索頁面，展示英文介面",
        "Options Explorer 個股研究，包含估值與選擇權資料，展示英文介面",
      ],
    },
  };
  const root = document.documentElement;
  const translated = [...document.querySelectorAll("[data-i18n]")];
  const en = Object.fromEntries(
    translated.map((el) => [el.dataset.i18n, el.innerHTML]),
  );
  const store = {
    get(key) {
      try {
        const current = localStorage.getItem(`dappgo-${key}`);
        if (current) return current;
        if (key === "locale") {
          const legacy = localStorage.getItem("dappgo-language");
          return legacy === "zh" ? "zh-Hant" : legacy === "en" ? "en" : null;
        }
        return null;
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`dappgo-${key}`, value);
      } catch {
        /* Optional preferences must not block the demo. */
      }
    },
  };
  let locale = store.get("locale") === "zh-Hant" ? "zh-Hant" : "en";
  let theme = store.get("theme") === "dark" ? "dark" : "light";
  let step = 0;
  let screen = 0;
  let playing = false;
  let timer = null;
  let inView = false;
  const workflow = document.querySelector("#workflow");
  const flowTabs = [...document.querySelectorAll("[data-step]")];
  const productTabs = [...document.querySelectorAll("[data-screen]")];
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  playing = !motionPreference.matches;
  const languageButton = document.querySelector("#language-toggle");
  const themeButton = document.querySelector("#theme-toggle");
  const menuButton = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#main-nav");
  const sources = ["dashboard", "explore", "ticker"];
  const productImageSource = document.querySelector("#product-image-source");
  const productAssets = Object.fromEntries(
    sources.map((name) => [
      name,
      {
        fallback: `/assets/screenshots/options/${name}.png`,
        srcset: `/assets/screenshots/options/${name}-330.webp 330w, /assets/screenshots/options/${name}-660.webp 660w, /assets/screenshots/options/${name}-1320.webp 1320w`,
      },
    ]),
  );

  function renderStep() {
    const copy = dynamic[locale];
    workflow.dataset.step = String(step);
    flowTabs.forEach((tab, index) => {
      tab.setAttribute("aria-selected", String(index === step));
      tab.tabIndex = index === step ? 0 : -1;
    });
    document
      .querySelector("#flow-detail")
      .setAttribute("aria-labelledby", `flow-tab-${step}`);
    document.querySelector("#flow-title").textContent = copy.stages[step][0];
    document.querySelector("#flow-description").textContent =
      copy.stages[step][1];
  }
  function renderProduct() {
    productTabs.forEach((tab, index) => {
      tab.setAttribute("aria-selected", String(index === screen));
      tab.tabIndex = index === screen ? 0 : -1;
    });
    document
      .querySelector("#product-panel")
      .setAttribute("aria-labelledby", `product-tab-${screen}`);
    const productImage = document.querySelector("#product-image");
    const asset = productAssets[sources[screen]];
    productImage.src = asset.fallback;
    if (productImageSource) productImageSource.srcset = asset.srcset;
    productImage.alt = dynamic[locale].alts[screen];
    document.querySelector("#view-label").textContent =
      dynamic[locale].screens[screen];
  }
  function renderPlay() {
    const active = playing && inView && !document.hidden;
    document
      .querySelector("#flow-play")
      .setAttribute("aria-pressed", String(playing));
    document.querySelector("#play-label").textContent =
      dynamic[locale][playing ? "pause" : "play"];
    document.querySelector("#play-glyph").textContent = playing ? "Ⅱ" : "▶";
    workflow.classList.toggle(
      "is-playing",
      active && !motionPreference.matches,
    );
    clearInterval(timer);
    timer = active
      ? setInterval(() => {
          step = (step + 1) % 4;
          renderStep();
        }, 3800)
      : null;
  }
  function renderTheme() {
    root.dataset.theme = theme;
    themeButton.setAttribute(
      "aria-label",
      dynamic[locale][theme === "light" ? "dark" : "light"],
    );
    document.querySelector('meta[name="theme-color"]').content =
      theme === "light" ? "#f6f7f9" : "#15191f";
  }
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      dynamic[locale][open ? "menuClose" : "menuOpen"],
    );
  }
  function renderLocale() {
    root.lang = locale;
    translated.forEach((el) => {
      el.innerHTML = (locale === "en" ? en : zh)[el.dataset.i18n];
    });
    languageButton.innerHTML =
      locale === "en"
        ? '中<span aria-hidden="true"> / </span><b>EN</b>'
        : '<b>中</b><span aria-hidden="true"> / </span>EN';
    languageButton.setAttribute(
      "aria-label",
      locale === "en"
        ? "中 / EN, switch to Traditional Chinese"
        : "中 / EN, switch to English",
    );
    document.title =
      locale === "en"
        ? "DappGo: Clearer markets. Smarter workflows."
        : "DappGo: 市場研究與智慧自動化";
    const labels = {
      ".brand": ["DappGo home", "DappGo 首頁"],
      ".main-nav": ["Main navigation", "主要導覽"],
      ".hero-art": [
        "Real Options Explorer app screens",
        "Options Explorer 真實 App 畫面",
      ],
      ".product-index": ["DappGo focus areas", "DappGo 服務領域"],
      ".flow-steps": ["Research workflow stages", "研究流程步驟"],
      ".product-tabs": ["Options Explorer screens", "Options Explorer 畫面"],
      ".social-links": ["Follow DappGo", "追蹤 DappGo"],
      ".footer-bottom nav": ["Legal and support", "法律資訊與支援"],
    };
    Object.entries(labels).forEach(([selector, values]) =>
      document
        .querySelector(selector)
        .setAttribute("aria-label", values[locale === "en" ? 0 : 1]),
    );
    document.querySelector(".phone-front img").alt = dynamic[locale].alts[0];
    document.querySelector(".phone-back img").alt = dynamic[locale].alts[1];
    const miniLabels =
      locale === "en"
        ? ["Input", "Structure", "Output"]
        : ["輸入", "結構化", "輸出"];
    document.querySelectorAll(".mini-flow span").forEach((el, index) => {
      el.textContent = miniLabels[index];
    });
    renderStep();
    renderProduct();
    renderPlay();
    renderTheme();
    setMenu(menu.classList.contains("is-open"));
  }
  function wireTabs(tabs, activate) {
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(index));
      tab.addEventListener("keydown", (event) => {
        let next = index;
        if (["ArrowRight", "ArrowDown"].includes(event.key))
          next = (index + 1) % tabs.length;
        else if (["ArrowLeft", "ArrowUp"].includes(event.key))
          next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        activate(next);
        tabs[next].focus();
      });
    });
  }
  wireTabs(flowTabs, (index) => {
    step = index;
    playing = false;
    renderStep();
    renderPlay();
  });
  wireTabs(productTabs, (index) => {
    screen = index;
    renderProduct();
  });
  languageButton.addEventListener("click", () => {
    locale = locale === "en" ? "zh-Hant" : "en";
    store.set("locale", locale);
    renderLocale();
  });
  themeButton.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    store.set("theme", theme);
    renderTheme();
  });
  menuButton.addEventListener("click", () =>
    setMenu(!menu.classList.contains("is-open")),
  );
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) setMenu(false);
  });
  document.querySelector("#flow-play").addEventListener("click", () => {
    playing = !playing;
    renderPlay();
  });
  document.addEventListener("visibilitychange", renderPlay);
  motionPreference.addEventListener("change", () => {
    if (motionPreference.matches) playing = false;
    renderPlay();
  });
  const observer = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      renderPlay();
    },
    { threshold: 0.15 },
  );
  observer.observe(workflow);
  renderLocale();
})();
