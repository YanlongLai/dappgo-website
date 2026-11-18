// Render the daily-report archive from data/reports/<market>/<session>.json.
// Every sentence below is assembled from fields of the record; when a field is missing the sentence or
// section is dropped. Nothing is forecast and no number is rounded beyond display precision.
import { esc, localPath, ORIGIN, renderPage, UI } from "./content-shell.mjs";

const GENERATOR = "build-content.mjs";
const L = (lang, en, zh) => (lang === "zh" ? zh : en);
const has = (v) => typeof v === "number" && Number.isFinite(v);
const nf = (v, digits = 2, min = 0) => (has(v) ? v.toLocaleString("en-US", { minimumFractionDigits: min, maximumFractionDigits: digits }) : "—");
const signed = (v, digits = 2) => (has(v) ? `${v > 0 ? "+" : v < 0 ? "−" : ""}${nf(Math.abs(v), digits, digits)}` : "—");
const pct = (v, digits = 2) => (has(v) ? `<span class="${v > 0 ? "up" : v < 0 ? "down" : ""}">${signed(v, digits)}%</span>` : "—");
const pctText = (v, digits = 2) => (has(v) ? `${signed(v, digits)}%` : "—");
const share = (part, whole) => (has(part) && has(whole) && whole > 0 ? Math.round((part / whole) * 100) : null);
const money = (market, v) => (has(v) ? (market === "tw" ? nf(v, 2) : `$${nf(v, 2, 2)}`) : "—");

const MARKETS = {
  us: {
    tz: "America/New_York", close: "16:00", benchmark: { en: "SPY", zh: "SPY" },
    name: { en: "US stocks", zh: "美股" }, city: { en: "New York", zh: "紐約" },
    app: "/us-stocks/", web: "https://stocks.dappgo.com/us/",
    universe: (n) => ({ en: `${n} US-listed stocks and ETFs on DappGo's reviewed watchlist`, zh: `DappGo 審核追蹤清單中的 ${n} 檔美國掛牌股票與 ETF` })
  },
  tw: {
    tz: "Asia/Taipei", close: "13:30", benchmark: { en: "the TAIEX", zh: "加權指數" },
    name: { en: "Taiwan stocks", zh: "台股" }, city: { en: "Taipei", zh: "台北" },
    app: "/tw-stocks/", web: "https://stocks.dappgo.com/tw/",
    universe: (n) => ({ en: `${n} Taiwan-listed names: the 100 largest companies by market value plus the 0050 ETF`, zh: `${n} 檔台灣上市標的：市值前 100 大公司加上 0050 ETF` })
  },
  options: {
    tz: "America/New_York", close: "16:00",
    name: { en: "US options", zh: "美股選擇權" }, city: { en: "New York", zh: "紐約" },
    app: "/options/", web: "https://options.dappgo.com/us/"
  }
};
const REGIME = {
  risk_on: { en: "risk-on", zh: "風險偏好" }, risk_off: { en: "risk-off", zh: "風險規避" }, mixed: { en: "mixed", zh: "訊號分歧" },
  neutral: { en: "neutral", zh: "中性" }, unknown: { en: "not classified", zh: "無法判定" }
};
const TREND = { up: { en: "up", zh: "向上" }, down: { en: "down", zh: "向下" }, sideways: { en: "sideways", zh: "橫盤" } };
const VOL = { calm: { en: "calm", zh: "低" }, choppy: { en: "moderate", zh: "中等" }, high: { en: "high", zh: "偏高" } };
const HEAT = { HOT: { en: "Hot", zh: "熱" }, WARM: { en: "Warm", zh: "偏熱" }, NEUTRAL: { en: "Neutral", zh: "中性" }, COOL: { en: "Cool", zh: "偏冷" }, COLD: { en: "Cold", zh: "冷" } };
const SECTORS = {
  Technology: "科技", Communication: "通訊服務", "Consumer Discretionary": "非必需消費", "Consumer Staples": "必需消費", Financials: "金融", Healthcare: "醫療保健",
  Industrials: "工業", Energy: "能源", Utilities: "公用事業", Materials: "原物料", "Real Estate": "不動產", ETF: "ETF",
  半導體: "Semiconductors", 電子零組件: "Electronic components", 其他電子: "Other electronics", 金融: "Financials", 塑化: "Plastics and petrochemicals",
  電子代工: "Electronics manufacturing", 網通AI: "Networking and AI hardware", 光電: "Optoelectronics", 油電燃氣: "Oil, gas and power", 生技醫材: "Biotech and medical devices",
  航運: "Shipping", 食品內需: "Food and domestic demand", 鋼鐵: "Steel", 汽車: "Automotive", 電機機械: "Electrical machinery", 電子通路: "Electronics distribution",
  貿易百貨: "Trading and retail", 其他: "Other", 水泥: "Cement", 玻璃陶瓷: "Glass and ceramics", 電器電纜: "Wire and cable", 紡織纖維: "Textiles"
};
const isCjk = (s) => /[㐀-鿿]/.test(s);
const sectorName = (lang, name) => {
  if (!name) return "—";
  if (lang === "zh") return isCjk(name) ? name : SECTORS[name] || name;
  return isCjk(name) ? SECTORS[name] || name : name;
};
const label = (map, key, lang) => (map[key] ? map[key][lang] : key || "—");

const WEEKDAYS = { en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], zh: ["日", "一", "二", "三", "四", "五", "六"] };
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function dateParts(date) {
  const [y, m, d] = date.split("-").map(Number);
  return { y, m, d, wd: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
}
export const longDate = (lang, date) => {
  const { y, m, d, wd } = dateParts(date);
  return lang === "zh" ? `${y} 年 ${m} 月 ${d} 日（${WEEKDAYS.zh[wd]}）` : `${WEEKDAYS.en[wd]}, ${MONTHS[m - 1]} ${d}, ${y}`;
};
const shortDate = (lang, date) => {
  const { y, m, d } = dateParts(date);
  return lang === "zh" ? date : `${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`;
};
function zoned(iso, timeZone) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(iso)).map((p) => [p.type, p.value]));
  return { date: `${parts.year}-${parts.month}-${parts.day}`, hm: `${parts.hour}:${parts.minute}` };
}
// Whether this revision was generated before or after the session's regular close, in the market's own time zone.
export function timing(record) {
  const m = MARKETS[record.market];
  const utc = record.generated_at_utc.replace("T", " ").slice(0, 16);
  const local = zoned(record.generated_at_utc, m.tz);
  const after = local.date > record.session_date || (local.date === record.session_date && local.hm >= m.close);
  return { utc, local, after, close: m.close };
}
function asOf(lang, record) {
  const m = MARKETS[record.market];
  const t = timing(record);
  const sameDay = t.local.date === record.session_date;
  const localText = L(lang, `${t.local.hm} ${m.city.en} time${sameDay ? "" : ` on ${t.local.date}`}`, `${m.city.zh}時間${sameDay ? "" : ` ${t.local.date} `}${t.local.hm}`);
  const state = t.after
    ? L(lang, `after the session's ${t.close} close`, `在當日 ${t.close} 收盤之後`)
    : L(lang, `before the session's ${t.close} close, so prices on this page are the latest available at that time and the final close may differ`, `早於當日 ${t.close} 收盤，因此本頁價格為當時最新報價，與最終收盤價可能不同`);
  const cov = record.coverage && has(record.coverage.covered) && has(record.coverage.expected)
    ? L(lang, ` Coverage: ${record.coverage.covered} of ${record.coverage.expected} tickers.`, `資料涵蓋 ${record.coverage.expected} 檔中的 ${record.coverage.covered} 檔。`)
    : "";
  return L(
    lang,
    `<p class="asof"><b>Session ${record.session_date}.</b> Report generated ${t.utc} UTC (${localText}), ${state}.${cov} Source payload <code>${record.data_hash.slice(0, 12)}</code>.</p>`,
    `<p class="asof"><b>交易日 ${record.session_date}。</b>報告產生於 ${t.utc} UTC（${localText}），${state}。${cov}來源資料雜湊 <code>${record.data_hash.slice(0, 12)}</code>。</p>`
  );
}

const table = (caption, head, rows, textCols = 1) => `      <div class="table-scroll"><table class="data">${caption ? `<caption>${caption}</caption>` : ""}
        <thead><tr>${head.map((h, i) => `<th scope="col"${i < textCols ? ' class="text"' : ""}>${h}</th>`).join("")}</tr></thead>
        <tbody>
${rows.map((cells) => `          <tr>${cells.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td${i < textCols ? ' class="text name"' : ""}>${c}</td>`)).join("")}</tr>`).join("\n")}
        </tbody>
      </table></div>`;
const paras = (list) => list.filter(Boolean).map((p) => `      <p>${p}</p>`).join("\n");
const tickerName = (lang, t) => (lang === "en" && isCjk(t.n) ? `<span lang="zh-Hant">${esc(t.n)}</span>` : esc(t.n));
const listSymbols = (lang, rows, max = 6) => {
  const shown = rows.slice(0, max).map((t) => esc(t.s)).join(L(lang, ", ", "、"));
  return rows.length > max ? `${shown}${L(lang, ` and ${rows.length - max} more`, ` 等 ${rows.length} 檔`)}` : shown;
};
const dayPath = (market, date) => `/reports/${market}/${date}/`;

function pager(lang, market, prev, next) {
  const p = (target) => localPath(lang, target);
  const older = prev ? `<a href="${p(dayPath(market, prev.session_date))}" rel="prev">← ${esc(shortDate(lang, prev.session_date))}</a>` : "<span></span>";
  const newer = next ? `<a href="${p(dayPath(market, next.session_date))}" rel="next">${esc(shortDate(lang, next.session_date))} →</a>` : "<span></span>";
  const all = `<a href="${p(`/reports/${market}/`)}">${esc(L(lang, `All ${MARKETS[market].name.en} reports`, `全部${MARKETS[market].name.zh}報告`))}</a>`;
  return `      <nav class="pager" aria-label="${esc(L(lang, "Other sessions", "其他交易日"))}">${older}${all}${newer}</nav>`;
}

function aboutSection(lang, record) {
  const m = MARKETS[record.market];
  const p = (target) => localPath(lang, target);
  const guide = record.market === "options" ? "how-to-read-the-options-report" : "how-to-read-the-daily-stock-report";
  return `      <h2>${L(lang, "About this page", "關於本頁")}</h2>
${paras([
  L(
    lang,
    `This page is built by code from one published revision of the DappGo ${m.name.en} daily report, identified by the payload hash shown at the top. The figures are copied or counted from that payload; the sentences only describe them. If a later revision of the same session is published, this page is rebuilt from it and the time stamp changes.`,
    `本頁由程式根據 DappGo ${m.name.zh}每日報告的單一已發布版本產生，版本以頁首的資料雜湊標示。數字直接取自或計數自該份資料，文字僅描述這些數字。同一交易日若有更新版本發布，本頁會依新版本重建，時間戳記也會隨之更新。`
  ),
  L(
    lang,
    `Read <a href="${p(`/guides/${guide}/`)}">how to read this report</a>, <a href="${p("/guides/how-dappgo-computes-signals/")}">how the signals are computed</a> and the <a href="${p("/guides/glossary/")}">glossary</a>. The live report, with charts and per-ticker detail, is in the <a href="${p(m.app)}">app</a> and on the <a href="${m.web}">web</a>. Found an error? See the <a href="${p("/editorial-policy/")}">corrections policy</a>.`,
    `延伸閱讀：<a href="${p(`/guides/${guide}/`)}">如何閱讀這份報告</a>、<a href="${p("/guides/how-dappgo-computes-signals/")}">訊號計算方式</a>與<a href="${p("/guides/glossary/")}">名詞解釋</a>。含圖表與個股細節的即時報告可在 <a href="${p(m.app)}">App</a> 與<a href="${m.web}">網頁版</a>閱讀。發現錯誤？請見<a href="${p("/editorial-policy/")}">更正政策</a>。`
  )
])}`;
}

function article(lang, record, headline, description) {
  return {
    "@context": "https://schema.org", "@type": "Article", headline, description,
    inLanguage: UI[lang].htmlLang, datePublished: record.generated_at_utc, dateModified: record.generated_at_utc,
    mainEntityOfPage: ORIGIN + localPath(lang, dayPath(record.market, record.session_date)),
    author: { "@type": "Organization", name: "DappGo", url: ORIGIN + localPath(lang, "/about/") },
    publisher: { "@type": "Organization", name: "DappGo", url: ORIGIN, logo: { "@type": "ImageObject", url: `${ORIGIN}/icons/icon-512.png` } }
  };
}

function crumbsFor(lang, market, date) {
  const p = (target) => localPath(lang, target);
  const base = [
    { name: UI[lang].home, href: p("/") },
    { name: UI[lang].reports, href: p("/reports/") }
  ];
  if (!market) return [...base.slice(0, 1), { name: UI[lang].reports }];
  if (!date) return [...base, { name: MARKETS[market].name[lang] }];
  return [...base, { name: MARKETS[market].name[lang], href: p(`/reports/${market}/`) }, { name: date }];
}

// ───────────────────────── equities ─────────────────────────
const movers = (record) => {
  const rows = record.tickers.filter((t) => has(t.d1));
  const sorted = [...rows].sort((a, b) => b.d1 - a.d1);
  return { gainers: sorted.filter((t) => t.d1 > 0).slice(0, 5), losers: sorted.filter((t) => t.d1 < 0).slice(-5).reverse(), sorted };
};
const gapTo = (t, key) => (has(t.c) && has(t[key]) && t[key] !== 0 ? ((t.c - t[key]) / t[key]) * 100 : null);

function equityAnalysis(lang, record, prev) {
  const m = MARKETS[record.market];
  const { regime: g, breadth: b } = record;
  const out = [];
  const pct20 = share(b.above_ma20, b.with_ma20);
  const pct200 = share(b.above_ma200, b.with_ma200);
  const uni = m.universe(b.n)[lang];
  let first = L(lang, `For the session of ${longDate("en", record.session_date)}, the DappGo regime model reads the tracked universe (${uni}) as <b>${label(REGIME, g.regime, "en")}</b>.`, `${longDate("zh", record.session_date)}這個交易日，DappGo 市場環境模型將追蹤範圍（${uni}）判讀為<b>${label(REGIME, g.regime, "zh")}</b>。`);
  if (typeof g.index_above_50ma === "boolean" && typeof g.index_above_200ma === "boolean") {
    const pos = (above) => L(lang, above ? "above" : "below", above ? "站上" : "低於");
    first += L(
      lang,
      ` ${m.benchmark.en === "SPY" ? "SPY" : "The TAIEX"} is ${pos(g.index_above_50ma)} its 50-day average and ${pos(g.index_above_200ma)} its 200-day average; its 20-day trend is ${label(TREND, g.index_trend, "en")} and realised volatility is in the ${label(VOL, g.vol_regime, "en")} band.`,
      `${m.benchmark.zh}${pos(g.index_above_50ma)} 50 日均線、${pos(g.index_above_200ma)} 200 日均線，20 日趨勢${label(TREND, g.index_trend, "zh")}，實現波動屬${label(VOL, g.vol_regime, "zh")}區間。`
    );
  }
  out.push(first);

  if (pct20 !== null) {
    const band = pct20 < 30
      ? L(lang, "Below 30% is the level the model treats as weak breadth, which is enough on its own for a risk-off reading.", "低於 30% 即模型定義的廣度偏弱，單一條件就足以判為風險規避。")
      : pct20 > 55
        ? L(lang, "Above 55% is the breadth the model requires, together with the benchmark above its 50-day average and volatility not high, for a risk-on reading.", "高於 55% 是模型判為風險偏好所需的廣度門檻，另須指數站上 50 日均線且波動不屬偏高。")
        : L(lang, "That sits between the model's 30% and 55% breadth thresholds, so breadth alone decides nothing here.", "此數值介於模型的 30% 與 55% 門檻之間，單看廣度無法定調。");
    out.push(
      L(
        lang,
        `${b.above_ma20} of ${b.with_ma20} tickers (${pct20}%) are priced above their own 20-day moving average${pct200 !== null ? `, and ${b.above_ma200} of ${b.with_ma200} (${pct200}%) above their 200-day average` : ""}. ${band} On the day ${b.advancers} rose and ${b.decliners} fell${b.unchanged ? `, with ${b.unchanged} unchanged` : ""}; the median move was ${pctText(b.median_change)}.`,
        `${b.with_ma20} 檔中有 ${b.above_ma20} 檔（${pct20}%）價格高於自身 20 日均線${pct200 !== null ? `，${b.with_ma200} 檔中有 ${b.above_ma200} 檔（${pct200}%）高於 200 日均線` : ""}。${band}當日 ${b.advancers} 檔上漲、${b.decliners} 檔下跌${b.unchanged ? `、${b.unchanged} 檔平盤` : ""}，漲跌幅中位數為 ${pctText(b.median_change)}。`
      )
    );
  }

  const ranked = record.sectors.filter((s) => has(s.avg_change) && s.name !== "ETF");
  const multi = ranked.filter((s) => s.n >= 2);
  const pool = (multi.length >= 2 ? multi : ranked).sort((a, b2) => b2.avg_change - a.avg_change);
  if (pool.length >= 2) {
    const best = pool[0];
    const worst = pool[pool.length - 1];
    const scope = multi.length >= 2 ? L(lang, "Among sectors with at least two tracked names", "在至少有兩檔追蹤標的的類股中") : L(lang, "Across sectors", "各類股中");
    out.push(
      L(
        lang,
        `${scope}, ${sectorName("en", best.name)} had the strongest average move at ${pctText(best.avg_change)} and ${sectorName("en", worst.name)} the weakest at ${pctText(worst.avg_change)}, a spread of ${nf(best.avg_change - worst.avg_change, 2, 2)} percentage points.${has(g.sector_dispersion) ? ` The standard deviation of sector averages was ${nf(g.sector_dispersion, 2, 2)} points; a larger figure means sectors moved less in step.` : ""}`,
        `${scope}，${sectorName("zh", best.name)}平均漲跌 ${pctText(best.avg_change)} 最強，${sectorName("zh", worst.name)} ${pctText(worst.avg_change)} 最弱，兩者相差 ${nf(best.avg_change - worst.avg_change, 2, 2)} 個百分點。${has(g.sector_dispersion) ? `各類股平均漲跌的標準差為 ${nf(g.sector_dispersion, 2, 2)} 個百分點，數字越大代表類股走勢越不同步。` : ""}`
      )
    );
  }

  const withRsi = record.tickers.filter((t) => has(t.rsi));
  const low = withRsi.filter((t) => t.rsi <= 30).sort((a, b2) => a.rsi - b2.rsi);
  const high = withRsi.filter((t) => t.rsi >= 70).sort((a, b2) => b2.rsi - a.rsi);
  if (withRsi.length) {
    const lowText = low.length ? L(lang, `${low.length} ${low.length === 1 ? "ticker has" : "tickers have"} a 14-day RSI at or below 30 (${listSymbols("en", low)})`, `14 日 RSI 在 30 以下的有 ${low.length} 檔（${listSymbols("zh", low)}）`) : L(lang, "No ticker has a 14-day RSI at or below 30", "沒有標的的 14 日 RSI 在 30 以下");
    const highText = high.length ? L(lang, `${high.length} at or above 70 (${listSymbols("en", high)})`, `70 以上的有 ${high.length} 檔（${listSymbols("zh", high)}）`) : L(lang, "none is at or above 70", "也沒有標的在 70 以上");
    out.push(L(lang, `${lowText}, and ${highText}. An RSI extreme records how one-sided recent trading has been. It is not, by itself, evidence that the move is about to reverse.`, `${lowText}，${highText}。RSI 極端值反映近期買賣力道有多一面倒，本身並不足以證明走勢即將反轉。`));
  }

  if (record.market === "tw") {
    const withFlow = record.tickers.filter((t) => has(t.f5));
    if (withFlow.length) {
      const foreign = withFlow.reduce((sum, t) => sum + t.f5, 0);
      const trust = record.tickers.filter((t) => has(t.t5)).reduce((sum, t) => sum + t.t5, 0);
      const side = (v) => L(lang, v >= 0 ? "net buying" : "net selling", v >= 0 ? "買超" : "賣超");
      out.push(
        L(
          lang,
          `Summed over the ${withFlow.length} names with institutional data, foreign investors' five-day position is ${side(foreign)} of ${nf(Math.abs(foreign), 0)} lots and investment trusts' is ${side(trust)} of ${nf(Math.abs(trust), 0)} lots (one lot is 1,000 shares). ${Math.sign(foreign) === Math.sign(trust) || !trust ? "The two groups are on the same side." : "The two groups are on opposite sides."}`,
          `合計 ${withFlow.length} 檔有法人資料的標的，外資近五日${side(foreign)} ${nf(Math.abs(foreign), 0)} 張，投信近五日${side(trust)} ${nf(Math.abs(trust), 0)} 張。${Math.sign(foreign) === Math.sign(trust) || !trust ? "兩者方向一致。" : "兩者方向相反。"}`
        )
      );
    }
  }

  if (prev) {
    const prev20 = share(prev.breadth.above_ma20, prev.breadth.with_ma20);
    if (pct20 !== null && prev20 !== null) {
      const same = prev.regime.regime === g.regime;
      out.push(
        L(
          lang,
          `Against the previous session in this archive (${prev.session_date}), the share of tickers above the 20-day average ${prev20 === pct20 ? `held at ${pct20}%` : `moved from ${prev20}% to ${pct20}%`}, and the regime reading ${same ? `stayed ${label(REGIME, g.regime, "en")}` : `changed from ${label(REGIME, prev.regime.regime, "en")} to ${label(REGIME, g.regime, "en")}`}.`,
          `與本檔案庫的前一個交易日（${prev.session_date}）相比，高於 20 日均線的比例${prev20 === pct20 ? `維持在 ${pct20}%` : `由 ${prev20}% 變為 ${pct20}%`}，市場環境判讀${same ? `維持${label(REGIME, g.regime, "zh")}` : `由${label(REGIME, prev.regime.regime, "zh")}轉為${label(REGIME, g.regime, "zh")}`}。`
        )
      );
    }
  }
  return out;
}

export function renderEquityDay(lang, record, prev, next) {
  const market = record.market;
  const m = MARKETS[market];
  const { regime: g, breadth: b } = record;
  const t = timing(record);
  const priceHead = t.after ? L(lang, "Close", "收盤") : L(lang, "Price", "價格");
  const pct20 = share(b.above_ma20, b.with_ma20);
  const { gainers, losers, sorted } = movers(record);
  const p = (target) => localPath(lang, target);
  const sym = (row) => esc(row.s);
  const moverRow = (r) => [sym(r), tickerName(lang, r), money(market, r.c), pct(r.d1), pct(r.d5), pct(r.d30), nf(r.rsi, 1, 1)];
  const moverHead = [L(lang, "Ticker", "代號"), L(lang, "Name", "名稱"), priceHead, L(lang, "1 day", "1 日"), L(lang, "5 days", "5 日"), L(lang, "30 days", "30 日"), "RSI 14"];

  const title = L(lang, `${m.name.en} report, ${shortDate("en", record.session_date)}: ${label(REGIME, g.regime, "en")}, ${b.advancers} up and ${b.decliners} down | DappGo`, `${m.name.zh}每日報告 ${record.session_date}：${label(REGIME, g.regime, "zh")}，${b.advancers} 漲 ${b.decliners} 跌｜DappGo`);
  const lead = gainers[0];
  const lag = losers[0];
  const description = L(
    lang,
    `${m.name.en} on ${shortDate("en", record.session_date)}: regime ${label(REGIME, g.regime, "en")}, ${pct20 ?? "—"}% of ${b.n} tracked tickers above the 20-day average, median move ${pctText(b.median_change)}.${lead ? ` Strongest ${lead.s} ${pctText(lead.d1)}` : ""}${lag ? `, weakest ${lag.s} ${pctText(lag.d1)}.` : "."} Sector table, RSI extremes and every ticker.`,
    `${record.session_date} ${m.name.zh}：市場環境${label(REGIME, g.regime, "zh")}，${b.n} 檔追蹤標的中 ${pct20 ?? "—"}% 高於 20 日均線，漲跌幅中位數 ${pctText(b.median_change)}。${lead ? `最強 ${lead.s} ${pctText(lead.d1)}` : ""}${lag ? `，最弱 ${lag.s} ${pctText(lag.d1)}。` : "。"}含類股表、RSI 極端值與全部個股。`
  );

  const figures = `      <dl class="figures wide">
        <div><dt>${L(lang, "Market regime", "市場環境")}</dt><dd>${esc(label(REGIME, g.regime, lang).replace(/^./, (c) => c.toUpperCase()))}</dd></div>
        <div><dt>${L(lang, "Above 20-day average", "高於 20 日均線")}</dt><dd>${pct20 ?? "—"}%<small>${b.above_ma20} / ${b.with_ma20}</small></dd></div>
        <div><dt>${L(lang, "Up / down", "上漲／下跌")}</dt><dd>${b.advancers} / ${b.decliners}</dd></div>
        <div><dt>${L(lang, "Median move", "漲跌幅中位數")}</dt><dd>${pct(b.median_change)}</dd></div>
      </dl>`;

  const sectorRows = [...record.sectors].sort((a, b2) => (b2.avg_change ?? -99) - (a.avg_change ?? -99)).map((s) => [
    esc(sectorName(lang, s.name)), String(s.n), pct(s.avg_change), nf(s.avg_rsi, 1, 1), esc(label(HEAT, s.verdict, lang)),
    s.top_gainer ? `${esc(s.top_gainer.s)} ${pct(s.top_gainer.d1)}` : "—", s.top_loser ? `${esc(s.top_loser.s)} ${pct(s.top_loser.d1)}` : "—"
  ]);
  const sectorSection = sectorRows.length
    ? `      <h2>${L(lang, "Sectors", "類股")}</h2>
${paras([L(lang, "Average one-day move and average 14-day RSI of the tracked tickers in each sector. The temperature label combines the two; the guide on signals gives the exact rule.", "各類股內追蹤標的的單日平均漲跌與 14 日 RSI 平均。溫度標籤由這兩項綜合而成，確切規則見訊號計算指南。")])}
${table(null, [L(lang, "Sector", "類股"), L(lang, "Tickers", "檔數"), L(lang, "Avg move", "平均漲跌"), L(lang, "Avg RSI", "平均 RSI"), L(lang, "Temperature", "溫度"), L(lang, "Strongest", "最強"), L(lang, "Weakest", "最弱")], sectorRows)}`
    : "";

  const withRsi = record.tickers.filter((r) => has(r.rsi));
  const extremes = [...withRsi.filter((r) => r.rsi <= 30).sort((a, b2) => a.rsi - b2.rsi), ...withRsi.filter((r) => r.rsi >= 70).sort((a, b2) => b2.rsi - a.rsi)];
  const show52 = extremes.some((r) => has(r.pos52));
  const extremeSection = extremes.length
    ? `      <h2>${L(lang, "Momentum extremes", "動能極端值")}</h2>
${paras([L(lang, `Tickers with a 14-day RSI at or below 30, then at or above 70. The gap column is the distance of the price from the 20-day average${show52 ? "; the 52-week column places the price between the 52-week low (0%) and high (100%)" : ""}.`, `先列 14 日 RSI 在 30 以下者，再列 70 以上者。乖離欄為價格與 20 日均線的距離${show52 ? "；52 週位置欄表示價格落在 52 週低點（0%）到高點（100%）之間的位置" : ""}。`)])}
${table(null, [L(lang, "Ticker", "代號"), L(lang, "Name", "名稱"), "RSI 14", priceHead, L(lang, "Gap to 20-day avg", "20 日均線乖離"), ...(show52 ? [L(lang, "52-week position", "52 週位置")] : [])], extremes.map((r) => [sym(r), tickerName(lang, r), nf(r.rsi, 1, 1), money(market, r.c), pct(gapTo(r, "ma20")), ...(show52 ? [has(r.pos52) ? `${nf(r.pos52, 0)}%` : "—"] : [])]), 2)}`
    : "";

  const screenIntro = L(
    lang,
    "The screen lists up to three tickers that meet every one of these conditions in this revision: price below the 20-day average, RSI between 30 and 55, MACD histogram above zero or stochastic %K above %D, and 20-day historical volatility no more than 1.2 times the universe median. A match describes a set-up. It is not a recommendation to trade.",
    "此篩選最多列出三檔在本版本同時符合下列條件的標的：價格低於 20 日均線、RSI 介於 30 至 55、MACD 柱狀體大於零或 KD 的 K 值高於 D 值，以及 20 日歷史波動率不超過追蹤範圍中位數的 1.2 倍。符合條件只是描述一種型態，並非交易建議。"
  );
  const screenSection = `      <h2>${L(lang, "Mean-reversion screen", "均值回歸篩選")}</h2>
${paras([screenIntro, record.screen.length ? null : L(lang, "No ticker met all of the conditions in this revision.", "本版本沒有標的同時符合全部條件。")])}
${record.screen.length ? table(null, [L(lang, "Ticker", "代號"), L(lang, "Name", "名稱"), priceHead, "RSI 14", L(lang, "Score", "分數"), L(lang, "Conditions met", "符合條件")], record.screen.map((r) => [sym(r), tickerName(lang, r), money(market, r.close), nf(r.rsi, 1, 1), nf(r.score, 0), esc((lang === "zh" ? r.signals_zh : r.signals_en).join(L(lang, "; ", "；")))]), 2) : ""}`;

  let extra = "";
  if (market === "us") {
    const limit = new Date(Date.UTC(...((d) => [d.y, d.m - 1, d.d + 14])(dateParts(record.session_date)))).toISOString().slice(0, 10);
    const upcoming = record.tickers.filter((r) => r.earn && r.earn >= record.session_date && r.earn <= limit).sort((a, b2) => a.earn.localeCompare(b2.earn));
    if (upcoming.length) {
      extra = `      <h2>${L(lang, "Earnings dates in the next 14 days", "未來 14 天的財報日")}</h2>
${paras([L(lang, "Next earnings dates carried in the report for tracked tickers. Companies can move these dates; confirm with the company's investor-relations page.", "報告中所載追蹤標的的下一次財報日。公司可能調整日期，請以公司投資人關係頁面為準。")])}
${table(null, [L(lang, "Ticker", "代號"), L(lang, "Name", "名稱"), L(lang, "Date", "日期"), priceHead, L(lang, "30 days", "30 日")], upcoming.map((r) => [sym(r), tickerName(lang, r), r.earn, money(market, r.c), pct(r.d30)]), 2)}`;
    }
  } else {
    const flows = record.tickers.filter((r) => has(r.f5));
    if (flows.length) {
      const byForeign = [...flows].sort((a, b2) => b2.f5 - a.f5);
      const pick = [...byForeign.slice(0, 5), ...byForeign.slice(-5)];
      extra = `      <h2>${L(lang, "Institutional flows", "法人籌碼")}</h2>
${paras([L(lang, "The five largest foreign net buys and the five largest foreign net sells over the last five sessions, in lots of 1,000 shares, with investment-trust flow for the same names.", "近五個交易日外資買超最多與賣超最多的各五檔（單位：張），並列同一標的的投信買賣超。")])}
${table(null, [L(lang, "Ticker", "代號"), L(lang, "Name", "名稱"), L(lang, "Foreign 5-day net", "外資 5 日"), L(lang, "Trust 5-day net", "投信 5 日"), priceHead, L(lang, "5 days", "5 日")], pick.map((r) => [sym(r), tickerName(lang, r), signed(r.f5, 0), signed(r.t5, 0), money(market, r.c), pct(r.d5)]), 2)}`;
    }
  }

  const allHead = [L(lang, "Ticker", "代號"), L(lang, "Name", "名稱"), L(lang, "Sector", "類股"), priceHead, L(lang, "1 day", "1 日"), L(lang, "5 days", "5 日"), L(lang, "30 days", "30 日"), "RSI 14", L(lang, "Gap to 20-day avg", "20 日均線乖離")];
  const allRows = sorted.map((r) => [sym(r), tickerName(lang, r), esc(sectorName(lang, r.sec)), money(market, r.c), pct(r.d1), pct(r.d5), pct(r.d30), nf(r.rsi, 1, 1), pct(gapTo(r, "ma20"))]);

  const body = `      <header class="doc-head">
        <p class="doc-kicker">${esc(L(lang, `${m.name.en} · Daily report`, `${m.name.zh}・每日報告`))}</p>
        <h1>${esc(L(lang, `${m.name.en} daily report: ${longDate("en", record.session_date)}`, `${m.name.zh}每日報告：${longDate("zh", record.session_date)}`))}</h1>
        ${asOf(lang, record)}
      </header>
${figures}
      <h2>${L(lang, "What the numbers say", "數字解讀")}</h2>
${paras(equityAnalysis(lang, record, prev))}
${sectorSection}
      <h2>${L(lang, "Largest moves of the session", "當日漲跌幅最大")}</h2>
${gainers.length ? table(L(lang, "Largest gains", "漲幅最大"), moverHead, gainers.map(moverRow), 2) : ""}
${losers.length ? table(L(lang, "Largest losses", "跌幅最大"), moverHead, losers.map(moverRow), 2) : ""}
${extremeSection}
${screenSection}
${extra}
      <h2>${L(lang, `All ${b.n} tracked tickers`, `全部 ${b.n} 檔追蹤標的`)}</h2>
${paras([L(lang, "Sorted by one-day move. The 5-day and 30-day columns are the price changes carried in the report.", "依單日漲跌幅排序。5 日與 30 日欄位為報告所載的價格變動。")])}
${table(null, allHead, allRows, 3)}
${aboutSection(lang, record)}
${pager(lang, market, prev, next)}`;

  return renderPage({ lang, path: dayPath(market, record.session_date), title, description, section: "reports", crumbs: crumbsFor(lang, market, record.session_date), body, ads: true, jsonld: [article(lang, record, title.replace(/ \| DappGo$|｜DappGo$/, ""), description)], generator: GENERATOR });
}

// ───────────────────────── options ─────────────────────────
const strategyName = (lang, s) => (s === "sell_put" ? L(lang, "Put", "賣權") : s === "sell_call" ? L(lang, "Call", "買權") : esc(s));

function optionsAnalysis(lang, record, prev) {
  const s = record.setups;
  const out = [];
  const puts = s.strategies.sell_put || 0;
  const calls = s.strategies.sell_call || 0;
  const mix = calls ? L(lang, `${puts} short puts and ${calls} short calls`, `${puts} 筆賣出賣權與 ${calls} 筆賣出買權`) : L(lang, "all of them short puts", "全部為賣出賣權");
  out.push(
    L(
      lang,
      `In this revision ${s.rows} option-selling candidates across ${s.symbols} underlyings passed the report's filters, ${mix}. Expiries run from ${s.dte.min} to ${s.dte.max} days out with a median of ${nf(s.dte.median, 1)} days; ${s.dte.within_7} of the ${s.rows} expire within seven days and ${s.dte.over_21} are more than 21 days out.`,
      `本版本共有 ${s.symbols} 檔標的、${s.rows} 筆賣方候選合約通過報告的篩選，${mix}。到期日距今 ${s.dte.min} 至 ${s.dte.max} 天，中位數 ${nf(s.dte.median, 1)} 天；${s.rows} 筆中有 ${s.dte.within_7} 筆在七天內到期，${s.dte.over_21} 筆距到期超過 21 天。`
    )
  );
  const top = s.best_per_symbol[0];
  if (top) {
    out.push(
      L(
        lang,
        `The highest composite score is ${nf(top.cp, 1, 1)} for the ${esc(top.s)} ${nf(top.strike, 2)} ${strategyName("en", top.strategy).toLowerCase()} expiring ${top.expiry} (${top.dte} ${top.dte === 1 ? "day" : "days"}): premium $${nf(top.premium, 2, 2)}, strike ${nf(Math.abs(top.otm), 1, 1)}% ${top.strategy === "sell_call" ? "above" : "below"} the share price, model probability of expiring out of the money ${nf(top.pop, 1, 1)}%.${top.dte < 30 ? ` Its displayed annualized yield of ${nf(top.annualized, 1, 1)}% multiplies a ${top.dte}-day premium out to a full year, which is why the score discounts yields from contracts shorter than 30 days.` : ""}`,
        `綜合分數最高的是 ${esc(top.s)} 履約價 ${nf(top.strike, 2)} 的${strategyName("zh", top.strategy)}，${top.expiry} 到期（${top.dte} 天），分數 ${nf(top.cp, 1, 1)}：權利金 $${nf(top.premium, 2, 2)}，履約價${top.strategy === "sell_call" ? "高於" : "低於"}股價 ${nf(Math.abs(top.otm), 1, 1)}%，模型估計到期時處於價外的機率為 ${nf(top.pop, 1, 1)}%。${top.dte < 30 ? `表列年化報酬 ${nf(top.annualized, 1, 1)}% 是把 ${top.dte} 天的權利金換算成一整年，因此綜合分數會對不滿 30 天的合約報酬打折。` : ""}`
      )
    );
  }
  const iv = s.median_iv;
  if (iv.length >= 4) {
    const hi = iv.slice(0, 3).map((r) => `${esc(r.s)} (${nf(r.iv, 1, 1)}%)`);
    const lo = iv[iv.length - 1];
    out.push(
      L(
        lang,
        `Implied volatility among the listed contracts is highest for ${hi.join(", ")} and lowest for ${esc(lo.s)} (${nf(lo.iv, 1, 1)}%). High implied volatility is what makes a premium large; it is the market's price for a wide expected range, so the richest premiums sit on the names the market expects to move most.`,
        `表列合約中，隱含波動率最高的是 ${hi.join("、")}，最低的是 ${esc(lo.s)}（${nf(lo.iv, 1, 1)}%）。權利金之所以高，正是因為隱含波動率高；那是市場替較大的預期波動區間所定的價格，所以權利金最豐厚的標的，也是市場預期波動最大的標的。`
      )
    );
  }
  const d1 = record.prices.map((r) => r.d1).filter(has);
  if (d1.length) {
    const sortedMoves = [...d1].sort((a, b) => a - b);
    const mid = sortedMoves.length >> 1;
    const med = sortedMoves.length % 2 ? sortedMoves[mid] : (sortedMoves[mid - 1] + sortedMoves[mid]) / 2;
    out.push(
      L(
        lang,
        `Of the ${d1.length} underlyings with a quote, ${d1.filter((v) => v > 0).length} were up and ${d1.filter((v) => v < 0).length} down when the report was generated; the median move was ${pctText(med)}.${med < 0 ? " Falling share prices raise the premium on offer for new short puts and, at the same time, the chance that existing ones are assigned." : med > 0 ? " Rising share prices move existing short puts further out of the money and shrink the premium available on new ones." : ""}`,
        `${d1.length} 檔有報價的標的中，報告產生時 ${d1.filter((v) => v > 0).length} 檔上漲、${d1.filter((v) => v < 0).length} 檔下跌，漲跌幅中位數 ${pctText(med)}。${med < 0 ? "股價下跌時，新賣出賣權可收的權利金變高，既有部位被履約的機率也同時升高。" : med > 0 ? "股價上漲時，既有的賣出賣權離價內更遠，新合約可收的權利金則隨之縮小。" : ""}`
      )
    );
  }
  if (prev) {
    out.push(
      L(
        lang,
        `Against the previous session in this archive (${prev.session_date}), listed candidates ${prev.setups.rows === s.rows ? `held at ${s.rows}` : `went from ${prev.setups.rows} to ${s.rows}`} and the median time to expiry ${prev.setups.dte.median === s.dte.median ? `stayed at ${nf(s.dte.median, 1)} days` : `went from ${nf(prev.setups.dte.median, 1)} to ${nf(s.dte.median, 1)} days`}.`,
        `與本檔案庫的前一個交易日（${prev.session_date}）相比，候選合約${prev.setups.rows === s.rows ? `維持 ${s.rows} 筆` : `由 ${prev.setups.rows} 筆變為 ${s.rows} 筆`}，到期天數中位數${prev.setups.dte.median === s.dte.median ? `維持 ${nf(s.dte.median, 1)} 天` : `由 ${nf(prev.setups.dte.median, 1)} 天變為 ${nf(s.dte.median, 1)} 天`}。`
      )
    );
  }
  return out;
}

export function renderOptionsDay(lang, record, prev, next) {
  const m = MARKETS.options;
  const s = record.setups;
  const top = s.best_per_symbol[0];
  const title = L(lang, `US options report, ${shortDate("en", record.session_date)}: ${s.rows} put-selling candidates on ${s.symbols} underlyings | DappGo`, `美股選擇權每日報告 ${record.session_date}：${s.symbols} 檔標的、${s.rows} 筆賣方候選｜DappGo`);
  const description = L(
    lang,
    `US options on ${shortDate("en", record.session_date)}: ${s.rows} option-selling candidates across ${s.symbols} underlyings, median ${nf(s.dte.median, 1)} days to expiry.${top ? ` Top composite score ${nf(top.cp, 1, 1)} (${top.s} ${nf(top.strike, 2)}, ${top.expiry}).` : ""} Premium, implied volatility, probability and score components.`,
    `${record.session_date} 美股選擇權：${s.symbols} 檔標的、${s.rows} 筆賣方候選合約，到期天數中位數 ${nf(s.dte.median, 1)} 天。${top ? `綜合分數最高 ${nf(top.cp, 1, 1)}（${top.s} ${nf(top.strike, 2)}，${top.expiry}）。` : ""}含權利金、隱含波動率、機率與分數組成。`
  );
  const figures = `      <dl class="figures wide">
        <div><dt>${L(lang, "Candidates", "候選合約")}</dt><dd>${s.rows}</dd></div>
        <div><dt>${L(lang, "Underlyings", "標的數")}</dt><dd>${s.symbols}</dd></div>
        <div><dt>${L(lang, "Median days to expiry", "到期天數中位數")}</dt><dd>${nf(s.dte.median, 1)}</dd></div>
        <div><dt>${L(lang, "Top composite score", "最高綜合分數")}</dt><dd>${top ? nf(top.cp, 1, 1) : "—"}${top ? `<small>${esc(top.s)} ${nf(top.strike, 2)} · ${top.expiry}</small>` : ""}</dd></div>
      </dl>`;
  const names = new Map(record.prices.map((r) => [r.s, r]));
  const setupHead = [L(lang, "Underlying", "標的"), L(lang, "Type", "類型"), L(lang, "Strike", "履約價"), L(lang, "Share price", "股價"), L(lang, "Distance", "價外幅度"), L(lang, "Premium", "權利金"), L(lang, "Expiry", "到期日"), L(lang, "Days", "天數"), L(lang, "IV", "IV"), L(lang, "Annualized", "年化"), L(lang, "Prob. OTM", "價外機率"), L(lang, "Score", "分數")];
  const setupRows = s.best_per_symbol.map((r) => [esc(r.s), strategyName(lang, r.strategy), nf(r.strike, 2), money("us", names.get(r.s)?.c), `${nf(Math.abs(r.otm), 1, 1)}%`, `$${nf(r.premium, 2, 2)}`, r.expiry, String(r.dte), `${nf(r.iv, 1, 1)}%`, `${nf(r.annualized, 1, 1)}%`, `${nf(r.pop, 1, 1)}%`, nf(r.cp, 1, 1)]);
  const partRows = s.best_per_symbol.filter((r) => r.parts).slice(0, 8).map((r) => [`${esc(r.s)} ${nf(r.strike, 2)}`, nf(r.parts.ret, 1, 1), nf(r.parts.safety, 1, 1), nf(r.parts.delta, 1, 1), nf(r.parts.theta, 1, 1), nf(r.cp, 1, 1)]);
  const moves = [...record.prices].filter((r) => has(r.d1)).sort((a, b) => b.d1 - a.d1);
  const moveRows = [...moves.slice(0, 5), ...moves.slice(-5)].map((r) => [esc(r.s), esc(r.n), money("us", r.c), pct(r.d1)]);
  const b = record.backtest;
  const backtest = b
    ? `      <h2>${L(lang, "Backtest reference", "回測參考")}</h2>
${paras([
  L(
    lang,
    `The report carries a fixed reference backtest covering ${b.from} to ${b.to}: ${nf(b.trades, 0)} simulated option-selling trades with a ${nf(b.win_rate, 1, 1)}% win rate and a profit factor of ${nf(b.profit_factor, 2, 2)}. ${has(b.profit_factor) && b.profit_factor < 1 ? "A profit factor below 1 means total losses exceeded total gains even though most trades won. That is the characteristic risk of selling premium: many small wins and a few large losses." : "A profit factor above 1 means total gains exceeded total losses over that window."} The window is short and does not include the session on this page; it is a description of that period, not an estimate of future results.`,
    `報告附帶一份固定的參考回測，期間為 ${b.from} 至 ${b.to}：共 ${nf(b.trades, 0)} 筆模擬賣方交易，勝率 ${nf(b.win_rate, 1, 1)}%，獲利因子 ${nf(b.profit_factor, 2, 2)}。${has(b.profit_factor) && b.profit_factor < 1 ? "獲利因子低於 1，代表即使多數交易獲利，總虧損仍大於總獲利。這正是賣方策略的典型風險：多次小賺，少數幾次大賠。" : "獲利因子高於 1，代表該期間總獲利大於總虧損。"}回測期間不長，也不包含本頁的交易日；它只描述那段期間，並非對未來結果的估計。`
  )
])}
${table(null, [L(lang, "Strategy", "策略"), L(lang, "Trades", "交易數"), L(lang, "Win rate", "勝率"), L(lang, "Average return", "平均報酬")], b.strategies.map((r) => [r.name === "sell_put" ? L(lang, "Short put", "賣出賣權") : r.name === "sell_call" ? L(lang, "Short call", "賣出買權") : esc(r.name), nf(r.trades, 0), `${nf(r.win_rate, 1, 1)}%`, pct(r.avg_return)]))}`
    : "";
  const chain = record.chain?.latest_quote_utc
    ? L(lang, ` Option quotes: ${esc(record.chain.provider || "provider not stated")}, latest fetch ${record.chain.latest_quote_utc.replace("T", " ").slice(0, 16)} UTC.`, `選擇權報價來源：${esc(record.chain.provider || "未標示")}，最後擷取時間 ${record.chain.latest_quote_utc.replace("T", " ").slice(0, 16)} UTC。`)
    : "";
  const body = `      <header class="doc-head">
        <p class="doc-kicker">${esc(L(lang, "US options · Daily report", "美股選擇權・每日報告"))}</p>
        <h1>${esc(L(lang, `US options daily report: ${longDate("en", record.session_date)}`, `美股選擇權每日報告：${longDate("zh", record.session_date)}`))}</h1>
        ${asOf(lang, record).replace("</p>", `${chain}</p>`)}
      </header>
${figures}
      <h2>${L(lang, "What the numbers say", "數字解讀")}</h2>
${paras(optionsAnalysis(lang, record, prev))}
      <h2>${L(lang, "Highest-scored candidate per underlying", "各標的分數最高的候選合約")}</h2>
${paras([L(lang, "One row per underlying, ordered by composite score. Distance is how far the strike sits from the share price. Probability is the model's estimate that the option expires out of the money. These are cash-secured or covered positions to study; selling options can lose far more than the premium received.", "每檔標的列一筆，依綜合分數排序。價外幅度為履約價與股價的距離，價外機率為模型估計到期時處於價外的機率。這些是供研究用的現金擔保或掩護性部位；賣出選擇權的虧損可能遠大於所收權利金。")])}
${table(null, setupHead, setupRows, 2)}
${partRows.length ? `      <h3>${L(lang, "Score components", "分數組成")}</h3>
${paras([L(lang, "Each component is scaled 0 to 100. The composite is 30% return, 25% safety margin, 25% delta and 20% theta efficiency.", "各組成皆為 0 至 100 分。綜合分數為報酬 30%、安全邊際 25%、Delta 25%、Theta 效率 20%。")])}
${table(null, [L(lang, "Contract", "合約"), L(lang, "Return", "報酬"), L(lang, "Safety margin", "安全邊際"), "Delta", L(lang, "Theta efficiency", "Theta 效率"), L(lang, "Composite", "綜合")], partRows)}` : ""}
      <h2>${L(lang, "Implied volatility by underlying", "各標的隱含波動率")}</h2>
${paras([L(lang, "Median implied volatility across each underlying's listed candidates, highest first. The count is how many of its contracts are in the list.", "各標的表列候選合約的隱含波動率中位數，由高至低。筆數為該標的列入的合約數。")])}
${table(null, [L(lang, "Underlying", "標的"), L(lang, "Name", "名稱"), L(lang, "Median IV", "IV 中位數"), L(lang, "Contracts", "筆數"), L(lang, "Share price", "股價"), L(lang, "1 day", "1 日")], s.median_iv.slice(0, 12).map((r) => [esc(r.s), esc(names.get(r.s)?.n || r.s), `${nf(r.iv, 1, 1)}%`, String(r.n), money("us", names.get(r.s)?.c), pct(names.get(r.s)?.d1)]), 2)}
      <h2>${L(lang, "Underlying moves", "標的漲跌")}</h2>
${table(L(lang, "Five largest gains and five largest losses among the tracked underlyings", "追蹤標的中漲幅與跌幅最大的各五檔"), [L(lang, "Underlying", "標的"), L(lang, "Name", "名稱"), L(lang, "Share price", "股價"), L(lang, "1 day", "1 日")], moveRows, 2)}
${backtest}
${aboutSection(lang, record)}
${pager(lang, "options", prev, next)}`;
  return renderPage({ lang, path: dayPath("options", record.session_date), title, description, section: "reports", crumbs: crumbsFor(lang, "options", record.session_date), body, ads: true, jsonld: [article(lang, record, title.replace(/ \| DappGo$|｜DappGo$/, ""), description)], generator: GENERATOR });
}

export const renderDay = (lang, record, prev, next) => (record.market === "options" ? renderOptionsDay(lang, record, prev, next) : renderEquityDay(lang, record, prev, next));

// ───────────────────────── indexes ─────────────────────────
const MARKET_INTRO = {
  us: {
    en: [
      "One page for every US trading session DappGo has reported on. Each page records how the market looked in that day's report: the regime reading, how many tracked tickers sat above their moving averages, sector averages, the largest moves, RSI extremes, and a full table of every ticker.",
      "The universe is a reviewed watchlist of large US-listed stocks and ETFs. The US report is published during the New York session, so each page states the exact time it was generated and whether that was before the 16:00 close. Use the table below to compare sessions, then open a date for the detail."
    ],
    zh: [
      "DappGo 報告過的每個美股交易日各有一頁，記錄當天報告呈現的市場樣貌：市場環境判讀、多少追蹤標的站上均線、類股平均、漲跌幅最大的個股、RSI 極端值，以及全部標的的完整表格。",
      "追蹤範圍是一份經審核的大型美國掛牌股票與 ETF 清單。美股報告在紐約盤中發布，因此每頁都會標明產生時間，以及是否早於 16:00 收盤。先用下表比較各交易日，再點進日期看細節。"
    ]
  },
  tw: {
    en: [
      "One page for every Taiwan trading session DappGo has reported on. Each page records the regime reading against the TAIEX, breadth across the tracked names, sector averages, the largest moves, RSI extremes, foreign and investment-trust flows, and a full table of every ticker.",
      "The universe is the 100 largest Taiwan-listed companies by market value plus the 0050 ETF. Institutional flow data arrives after the 13:30 close, so the archive keeps the newest revision of each session, which can be generated the next morning. Each page states its generation time."
    ],
    zh: [
      "DappGo 報告過的每個台股交易日各有一頁，記錄以加權指數為基準的市場環境判讀、追蹤標的的市場廣度、類股平均、漲跌幅最大的個股、RSI 極端值、外資與投信買賣超，以及全部標的的完整表格。",
      "追蹤範圍是市值前 100 大的台灣上市公司加上 0050 ETF。法人買賣超資料在 13:30 收盤後才公布，因此檔案庫保留每個交易日的最新版本，該版本可能在隔日早上產生。每頁都會標明產生時間。"
    ]
  },
  options: {
    en: [
      "One page for every session of the DappGo US options report. Each page records which option-selling candidates passed the report's filters that day, how they scored, where implied volatility was highest, and how the underlying shares moved.",
      "The report studies cash-secured puts and covered calls on a reviewed list of US underlyings. It is a research tool: selling options carries the risk of losses much larger than the premium received, and every page repeats the report's reference backtest with its limits stated."
    ],
    zh: [
      "DappGo 美股選擇權報告的每個交易日各有一頁，記錄當天哪些賣方候選合約通過報告篩選、分數如何、哪些標的隱含波動率最高，以及標的股價的漲跌。",
      "報告研究的是一份經審核的美股標的清單上的現金擔保賣權與掩護性買權。它是研究工具：賣出選擇權的虧損可能遠大於所收權利金，每頁也都會附上報告的參考回測並說明其限制。"
    ]
  }
};

function indexRows(lang, market, records) {
  const p = (target) => localPath(lang, target);
  const link = (r) => `<a href="${p(dayPath(market, r.session_date))}">${r.session_date}</a>`;
  if (market === "options") {
    return {
      head: [L(lang, "Session", "交易日"), L(lang, "Candidates", "候選合約"), L(lang, "Underlyings", "標的數"), L(lang, "Median days to expiry", "到期天數中位數"), L(lang, "Top score", "最高分數"), L(lang, "Highest median IV", "IV 中位數最高")],
      rows: records.map((r) => {
        const top = r.setups.best_per_symbol[0];
        const iv = r.setups.median_iv[0];
        return [link(r), String(r.setups.rows), String(r.setups.symbols), nf(r.setups.dte.median, 1), top ? `${esc(top.s)} ${nf(top.cp, 1, 1)}` : "—", iv ? `${esc(iv.s)} ${nf(iv.iv, 1, 1)}%` : "—"];
      })
    };
  }
  return {
    head: [L(lang, "Session", "交易日"), L(lang, "Regime", "市場環境"), L(lang, "Above 20-day avg", "高於 20 日均線"), L(lang, "Up / down", "上漲／下跌"), L(lang, "Median move", "漲跌幅中位數"), L(lang, "Strongest", "最強"), L(lang, "Weakest", "最弱")],
    rows: records.map((r) => {
      const { gainers, losers } = movers(r);
      const s20 = share(r.breadth.above_ma20, r.breadth.with_ma20);
      return [link(r), esc(label(REGIME, r.regime.regime, lang)), s20 === null ? "—" : `${s20}%`, `${r.breadth.advancers} / ${r.breadth.decliners}`, pct(r.breadth.median_change), gainers[0] ? `${esc(gainers[0].s)} ${pct(gainers[0].d1)}` : "—", losers[0] ? `${esc(losers[0].s)} ${pct(losers[0].d1)}` : "—"];
    })
  };
}

export function renderMarketIndex(lang, market, records) {
  const m = MARKETS[market];
  const newest = [...records].reverse();
  const { head, rows } = indexRows(lang, market, newest);
  const p = (target) => localPath(lang, target);
  const first = records[0].session_date;
  const last = records[records.length - 1].session_date;
  const title = L(lang, `${m.name.en} daily report archive | DappGo`, `${m.name.zh}每日報告檔案庫｜DappGo`);
  const description = L(
    lang,
    `${records.length} ${m.name.en} sessions from ${first} to ${last}, one page each, with the figures of that day's DappGo report and the time it was generated.`,
    `${first} 至 ${last} 共 ${records.length} 個${m.name.zh}交易日，每日一頁，收錄當天 DappGo 報告的數字與產生時間。`
  );
  const guide = market === "options" ? "how-to-read-the-options-report" : "how-to-read-the-daily-stock-report";
  const body = `      <header class="doc-head">
        <p class="doc-kicker">${esc(L(lang, "Daily report archive", "每日報告檔案庫"))}</p>
        <h1>${esc(L(lang, `${m.name.en} daily reports`, `${m.name.zh}每日報告`))}</h1>
        <p class="doc-lede">${esc(L(lang, `${records.length} sessions, ${first} to ${last}. Newest first.`, `共 ${records.length} 個交易日，${first} 至 ${last}，由新到舊。`))}</p>
      </header>
${paras(MARKET_INTRO[market][lang].map(esc))}
${paras([L(lang, `New to the report? Start with <a href="${p(`/guides/${guide}/`)}">how to read it</a> and <a href="${p("/guides/how-dappgo-computes-signals/")}">how the signals are computed</a>.`, `第一次閱讀？先看<a href="${p(`/guides/${guide}/`)}">如何閱讀這份報告</a>與<a href="${p("/guides/how-dappgo-computes-signals/")}">訊號計算方式</a>。`)])}
      <h2>${L(lang, "Sessions", "交易日列表")}</h2>
${table(null, head, rows)}`;
  return renderPage({ lang, path: `/reports/${market}/`, title, description, section: "reports", ogType: "website", crumbs: crumbsFor(lang, market), body, generator: GENERATOR });
}

export function renderHub(lang, byMarket) {
  const p = (target) => localPath(lang, target);
  const summary = (market, r) => {
    if (market === "options") return L(lang, `${r.setups.rows} candidates`, `${r.setups.rows} 筆候選`);
    const s20 = share(r.breadth.above_ma20, r.breadth.with_ma20);
    return `${label(REGIME, r.regime.regime, lang)} · ${s20 ?? "—"}%`;
  };
  const column = (market) => {
    const records = [...byMarket[market]].reverse();
    return `        <section>
          <h2>${esc(MARKETS[market].name[lang])}</h2>
          <ul>
${records.slice(0, 6).map((r) => `            <li><a href="${p(dayPath(market, r.session_date))}">${r.session_date}<span>${esc(summary(market, r))}</span></a></li>`).join("\n")}
          </ul>
          <a class="hub-more" href="${p(`/reports/${market}/`)}">${esc(L(lang, `All ${records.length} sessions →`, `全部 ${records.length} 個交易日 →`))}</a>
        </section>`;
  };
  const total = Object.values(byMarket).reduce((sum, list) => sum + list.length, 0);
  const title = L(lang, "Daily market report archive: US stocks, Taiwan stocks and US options | DappGo", "每日市場報告檔案庫：美股、台股與美股選擇權｜DappGo");
  const description = L(lang, `${total} daily report pages for US stocks, Taiwan stocks and US options, each built from one published DappGo report with its generation time and source hash.`, `美股、台股與美股選擇權共 ${total} 頁每日報告，每頁皆由一份已發布的 DappGo 報告產生，並標明產生時間與來源雜湊。`);
  const body = `      <header class="doc-head">
        <p class="doc-kicker">${esc(L(lang, "Reports", "每日報告"))}</p>
        <h1>${esc(L(lang, "Daily market report archive", "每日市場報告檔案庫"))}</h1>
        <p class="doc-lede">${esc(L(lang, "What each DappGo daily report said, session by session, for three markets.", "逐日記錄 DappGo 三個市場的每日報告內容。"))}</p>
      </header>
${paras([
  L(lang, "DappGo publishes a daily research report for US stocks, Taiwan stocks and US options. The apps and web apps always show the latest report. This archive keeps a readable page for every past session, so you can see what the report measured on a given day and how the readings changed from one session to the next.", "DappGo 每日發布美股、台股與美股選擇權的研究報告。App 與網頁版永遠顯示最新一份；本檔案庫則為每個過去的交易日保留一頁，方便查閱某一天報告量到了什麼，以及各項判讀如何逐日變化。"),
  L(lang, `Each page is generated by code from one published report payload. It shows the session date, the time the report was generated, and a short hash that identifies the payload. The text describes the numbers and does not forecast. How the measurements are defined is set out in <a href="${p("/guides/how-dappgo-computes-signals/")}">how DappGo computes its signals</a>; who we are and how we handle corrections is in the <a href="${p("/editorial-policy/")}">editorial policy</a>.`, `每一頁都由程式根據單一已發布的報告資料產生，並標示交易日、報告產生時間，以及用來識別該份資料的簡短雜湊。文字只描述數字，不做預測。各項量測的定義見<a href="${p("/guides/how-dappgo-computes-signals/")}">DappGo 訊號怎麼算</a>；我們是誰、如何處理更正，見<a href="${p("/editorial-policy/")}">編輯政策</a>。`)
])}
      <div class="hub-grid">
${["us", "tw", "options"].map(column).join("\n")}
      </div>`;
  return renderPage({ lang, path: "/reports/", title, description, section: "reports", ogType: "website", crumbs: crumbsFor(lang), body, generator: GENERATOR });
}
