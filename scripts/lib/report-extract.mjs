// Reduce a published daily-report payload to the compact, render-ready record kept in data/reports/.
// Every number is copied or counted from the payload; nothing is estimated here. Missing inputs stay null
// and the renderer omits the matching section.
const num = (value) => (typeof value === "number" && Number.isFinite(value) ? value : null);
const round = (value, digits = 2) => (num(value) === null ? null : Number(value.toFixed(digits)));
const median = (values) => {
  const sorted = values.filter((v) => num(v) !== null).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
const lastBarDate = (history) => {
  const bar = Array.isArray(history) && history.length ? history[history.length - 1] : null;
  const date = bar && (bar.date || bar.d);
  return /^\d{4}-\d{2}-\d{2}$/.test(date || "") ? date : null;
};
// The session a payload describes is the newest daily bar shared by most tickers, not the publish date:
// a Taiwan pre-open revision is dated the next morning but still carries the previous close.
function sessionDate(histories) {
  const counts = new Map();
  for (const history of histories) {
    const date = lastBarDate(history);
    if (date) counts.set(date, (counts.get(date) || 0) + 1);
  }
  let best = null;
  for (const [date, count] of counts) if (!best || count > best[1] || (count === best[1] && date > best[0])) best = [date, count];
  // A payload whose tickers disagree about the latest bar mixes two sessions; it gets no archive page.
  return best && best[1] >= histories.length * 0.9 ? best[0] : null;
}
function newYorkWeekday(iso) {
  const time = new Date(iso || "");
  if (Number.isNaN(time.getTime())) return null;
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(time).map((p) => [p.type, p.value]));
  return parts.weekday === "Sat" || parts.weekday === "Sun" ? null : `${parts.year}-${parts.month}-${parts.day}`;
}
const identity = (market, payload, session) => ({
  market,
  session_date: session,
  report_date: payload.last_updated || null,
  generated_at_utc: payload.generated_at_utc || null,
  schema_version: payload.schema_version || null,
  data_hash: payload.data_hash || null,
  universe: payload.universe ? { id: payload.universe.id || null, target_count: num(payload.universe.target_count), selection_method: payload.universe.selection_method || null } : null,
  coverage: payload.data_coverage
    ? { covered: num(payload.data_coverage.covered_count), expected: num(payload.data_coverage.expected_count), status: payload.data_coverage.status || null }
    : null
});

export function extractEquities(market, payload) {
  const entries = Object.entries(payload.ticker_data || {}).filter(([, t]) => t && t.indicators && num(t.indicators.latest_close) !== null);
  const session = sessionDate(entries.map(([, t]) => t.price_history));
  if (!session) return null;
  const tickers = entries.map(([symbol, t]) => {
    const ind = t.indicators;
    const changes = t.price_changes || {};
    const range = ind.range_52w || {};
    const row = {
      s: symbol,
      n: t.name || symbol,
      sec: t.sector || null,
      c: num(ind.latest_close),
      d1: round(num(changes["1d_pct"]) ?? t.price_change_pct),
      d5: round(changes["5d_pct"]),
      d30: round(changes["30d_pct"]),
      rsi: round(ind.rsi_14, 1),
      ma20: round(ind.ma_20),
      ma200: round(ind.ma_200),
      pos52: round(range.range_position_pct, 1),
      vr: num(ind.volume_today) !== null && num(ind.volume_5d_avg) > 0 ? round(ind.volume_today / ind.volume_5d_avg) : null,
      v: t.signals?.verdict || null
    };
    if (market === "tw") {
      row.f5 = num(t.chip?.foreign_5d);
      row.t5 = num(t.chip?.trust_5d);
    } else {
      row.earn = /^\d{4}-\d{2}-\d{2}$/.test(t.earnings_date_next || "") ? t.earnings_date_next : null;
    }
    return row;
  });
  const sectorOf = new Map();
  for (const [name, s] of Object.entries(payload.sector_rotation || {})) for (const symbol of s.tickers || []) sectorOf.set(symbol, name);
  for (const row of tickers) if (!row.sec) row.sec = sectorOf.get(row.s) || null;
  const d1 = tickers.map((t) => t.d1).filter((v) => v !== null);
  const withMa20 = tickers.filter((t) => t.ma20 !== null);
  const withMa200 = tickers.filter((t) => t.ma200 !== null);
  const withRsi = tickers.filter((t) => t.rsi !== null);
  const regime = payload.market_regime || {};
  const index = market === "tw" ? "taiex" : "spy";
  return {
    ...identity(market, payload, session),
    regime: {
      regime: regime.regime || null,
      index_trend: regime[`${index}_trend`] || null,
      index_above_50ma: typeof regime[`${index}_above_50ma`] === "boolean" ? regime[`${index}_above_50ma`] : null,
      index_above_200ma: typeof regime[`${index}_above_200ma`] === "boolean" ? regime[`${index}_above_200ma`] : null,
      breadth_score: round(regime.breadth_score, 3),
      advance_decline_ratio: round(regime.advance_decline_ratio),
      vol_regime: regime.vol_regime || null,
      sector_dispersion: round(regime.sector_dispersion, 3)
    },
    breadth: {
      n: tickers.length,
      advancers: d1.filter((v) => v > 0).length,
      decliners: d1.filter((v) => v < 0).length,
      unchanged: d1.filter((v) => v === 0).length,
      median_change: round(median(d1)),
      above_ma20: withMa20.filter((t) => t.c > t.ma20).length,
      with_ma20: withMa20.length,
      above_ma200: withMa200.filter((t) => t.c > t.ma200).length,
      with_ma200: withMa200.length,
      rsi_oversold: withRsi.filter((t) => t.rsi <= 30).length,
      rsi_overbought: withRsi.filter((t) => t.rsi >= 70).length,
      with_rsi: withRsi.length
    },
    sectors: Object.entries(payload.sector_rotation || {}).map(([name, s]) => ({
      name,
      n: (s.tickers || []).length,
      avg_change: round(s.avg_change_pct),
      avg_rsi: round(s.avg_rsi, 1),
      verdict: s.verdict || null,
      top_gainer: s.top_gainer?.ticker ? { s: s.top_gainer.ticker, d1: round(s.top_gainer.change_pct) } : null,
      top_loser: s.top_loser?.ticker ? { s: s.top_loser.ticker, d1: round(s.top_loser.change_pct) } : null,
      foreign_net_5d: market === "tw" ? num(s.foreign_net_5d_total) : undefined
    })),
    screen: (payload.recommendations || []).slice(0, 3).map((r) => ({
      s: r.symbol, n: r.name || r.symbol, score: num(r.score), close: num(r.latest_close), rsi: round(r.rsi, 1),
      signals_en: Array.isArray(r.signals_en) ? r.signals_en.slice(0, 4) : [], signals_zh: Array.isArray(r.signals) ? r.signals.slice(0, 4) : []
    })),
    tickers
  };
}

export function extractOptions(payload) {
  const prices = (payload.live_prices || []).filter((p) => p && num(p.price) !== null);
  // Option quotes and share prices in this payload are live at generation time, while the daily bars can
  // still end on the previous session. The session is therefore the New York calendar date of generation.
  const session = newYorkWeekday(payload.generated_at_utc);
  if (!session || !prices.length) return null;
  const meta = payload.ticker_metadata || {};
  const rows = (payload.strike_comparison || []).filter((r) => r && num(r.cp) !== null && num(r.strike) !== null && r.expiry);
  const compact = (r) => ({
    s: r.symbol, strategy: r.strategy, strike: num(r.strike), premium: round(r.premium), iv: round(r.iv, 1), otm: round(r.otm_pct, 1),
    dte: num(r.dte), expiry: r.expiry, annualized: round(r.annualized, 1), pop: round(r.pop, 1), cp: round(r.cp, 1),
    parts: r.cp_components
      ? { ret: round(r.cp_components.return_score, 1), safety: round(r.cp_components.safety_score, 1), delta: round(r.cp_components.delta_score, 1), theta: round(r.cp_components.theta_score, 1) }
      : null
  });
  const sorted = [...rows].sort((a, b) => b.cp - a.cp);
  const bySymbol = new Map();
  for (const r of sorted) if (!bySymbol.has(r.symbol)) bySymbol.set(r.symbol, r);
  const ivBySymbol = new Map();
  for (const r of rows) if (num(r.iv) !== null) ivBySymbol.set(r.symbol, [...(ivBySymbol.get(r.symbol) || []), r.iv]);
  const dte = rows.map((r) => r.dte).filter((v) => num(v) !== null);
  const stamps = Object.values(payload.options_matrices || {}).map((m) => m?.provenance?.source_timestamp).filter(Boolean).sort();
  const providers = [...new Set(Object.values(payload.options_matrices || {}).flatMap((m) => m?.provenance?.providers || []))];
  const pnlDates = payload.cumulative_pnl?.dates || [];
  const s = payload.summary;
  return {
    ...identity("options", payload, session),
    chain: { provider: providers.join(", ") || null, latest_quote_utc: stamps.length ? stamps[stamps.length - 1] : null, underlyings: Object.keys(payload.options_matrices || {}).length },
    prices: prices.map((p) => ({ s: p.symbol, n: meta[p.symbol]?.name || p.symbol, c: num(p.price), d1: round(p.change_pct) })),
    setups: {
      rows: rows.length,
      symbols: bySymbol.size,
      strategies: rows.reduce((acc, r) => ({ ...acc, [r.strategy]: (acc[r.strategy] || 0) + 1 }), {}),
      dte: { min: dte.length ? Math.min(...dte) : null, median: round(median(dte), 1), max: dte.length ? Math.max(...dte) : null, within_7: dte.filter((v) => v <= 7).length, over_21: dte.filter((v) => v > 21).length },
      best_per_symbol: [...bySymbol.values()].slice(0, 15).map(compact),
      median_iv: [...ivBySymbol].map(([symbol, values]) => ({ s: symbol, iv: round(median(values), 1), n: values.length })).sort((a, b) => b.iv - a.iv)
    },
    backtest: s && num(s.total_trades) !== null
      ? {
          from: pnlDates[0] || null, to: pnlDates[pnlDates.length - 1] || null,
          trades: s.total_trades, win_rate: round(s.win_rate, 1), profit_factor: round(s.profit_factor), avg_win: round(s.avg_win), avg_loss: round(s.avg_loss), total_pnl: round(s.total_pnl),
          strategies: Object.entries(payload.strategy_stats || {}).map(([name, v]) => ({ name, trades: num(v.trades), win_rate: round(v.win_rate, 1), total_pnl: round(v.total_pnl), avg_return: round(v.avg_return) }))
        }
      : null
  };
}

export const extract = (market, payload) => (market === "options" ? extractOptions(payload) : extractEquities(market, payload));
