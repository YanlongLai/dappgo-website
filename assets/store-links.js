/*
 * Single source of truth for DappGo store links and their campaign parameters.
 *
 * Every App Store / Google Play link on dappgo.com is generated from this file (see
 * scripts/lib/store-links.mjs for the HTML rewriter); do not hand-type store query strings.
 *
 * Campaign name:  web-<page>-<position>   (App Store ct=, max 40 characters)
 * Google Play:    referrer=utm_source=web & utm_medium=<page>-<position>
 *
 * Works in the browser (window.DappGoStoreLinks) and in Node (require / createRequire).
 */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DappGoStoreLinks = api;
})(typeof globalThis === "object" ? globalThis : this, function (root) {
  "use strict";

  // App Store Connect "provider token" (pt=). NOT KNOWN YET: the Owner reads it from
  // App Store Connect > Analytics > Campaigns and pastes it here. While empty, links omit `pt`
  // and stay valid; `ct` is still sent, so campaign names are ready the moment the token is set.
  // This is the only place the token is defined.
  const APPLE_PROVIDER_TOKEN = "";

  const CAMPAIGN_SOURCE = "web";
  const CT_MAX = 40;
  const ATTRIBUTION_KEY = "dg-src";
  const SOURCE_ALIASES = Object.freeze({
    web: "web",
    webapp: "webapp",
    facebook: "fb",
    fb: "fb",
    meta: "fb",
    instagram: "ig",
    ig: "ig",
    threads: "threads",
    linkedin: "li",
    li: "li",
    twitter: "x",
    x: "x",
    "t.co": "x",
    youtube: "yt",
    yt: "yt",
    app: "app"
  });

  const APPS = {
    "tw-stocks": { ios: "6768116538", android: "com.dappgo.twstocksapp" },
    "us-stocks": { ios: "6768116546", android: "com.dappgo.usstocksapp" },
    "options-explorer": { ios: "6768116720", android: "com.dappgo.optionsapp" },
    news: { android: "com.dappgo.newsapp" },
    "number-rpg": { ios: "6827756398", android: "com.dappgo.numberrpg" },
    "number-merge": { android: "com.dappgo.numbermerge" }
  };

  const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");

  // Return a fixed source code, or null when the incoming value is not recognised.
  function normalizeSource(raw) {
    if (typeof raw !== "string") return null;
    return SOURCE_ALIASES[raw.trim().toLowerCase()] || null;
  }

  // Campaigns may be forwarded only after they have been reduced to a bounded slug.
  function normalizeCampaign(raw) {
    if (typeof raw !== "string") return null;
    const value = raw.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/g, "");
    return value || null;
  }

  // "tw", "hero" -> "tw-hero"; used for utm_medium and (prefixed) for ct.
  function medium(page, position) {
    const out = `${slug(page)}-${slug(position)}`;
    if (!slug(page) || !slug(position)) throw new Error(`Invalid store campaign: ${page}/${position}`);
    return out;
  }

  function campaign(page, position) {
    const ct = `${CAMPAIGN_SOURCE}-${medium(page, position)}`;
    if (ct.length > CT_MAX) throw new Error(`App Store campaign longer than ${CT_MAX} characters: ${ct}`);
    return ct;
  }

  function appStoreUrl(app, page, position) {
    const id = APPS[app]?.ios;
    if (!id) throw new Error(`No App Store id for ${app}`);
    const params = [];
    if (APPLE_PROVIDER_TOKEN) params.push(`pt=${encodeURIComponent(APPLE_PROVIDER_TOKEN)}`);
    params.push(`ct=${campaign(page, position)}`, "mt=8");
    return `https://apps.apple.com/app/id${id}?${params.join("&")}`;
  }

  function playUrl(app, page, position) {
    const pkg = APPS[app]?.android;
    if (!pkg) throw new Error(`No Google Play package for ${app}`);
    const referrer = encodeURIComponent(`utm_source=${CAMPAIGN_SOURCE}&utm_medium=${medium(page, position)}`);
    return `https://play.google.com/store/apps/details?id=${pkg}&referrer=${referrer}`;
  }

  function storeUrl(os, app, page, position) {
    return os === "ios" ? appStoreUrl(app, page, position) : playUrl(app, page, position);
  }

  // Which app / platform an existing store URL points at, ignoring any query string or path style.
  function identify(url) {
    const apple = String(url).match(/^https:\/\/apps\.apple\.com\/(?:[a-z]{2}\/)?(?:app\/(?:[^/?#]+\/)?)id(\d+)/);
    if (apple) {
      const app = Object.keys(APPS).find((key) => APPS[key].ios === apple[1]);
      return app ? { os: "ios", app } : null;
    }
    const play = String(url).match(/^https:\/\/play\.google\.com\/store\/apps\/details\?(?:[^#]*&)?id=([\w.]+)/);
    if (play) {
      const app = Object.keys(APPS).find((key) => APPS[key].android === play[1]);
      return app ? { os: "android", app } : null;
    }
    return null;
  }

  // Same destination, new campaign position.
  function retarget(url, page, position) {
    const hit = identify(url);
    if (!hit) throw new Error(`Not a known DappGo store URL: ${url}`);
    return storeUrl(hit.os, hit.app, page, position);
  }

  function queryValue(search, wanted) {
    try {
      const params = new URLSearchParams(search || "");
      for (const [key, value] of params) if (key.toLowerCase() === wanted) return value;
    } catch {
      // A malformed location must not stop the page from rendering.
    }
    return null;
  }

  function attributionFromLocation(locationLike) {
    const search = typeof locationLike === "string" ? locationLike : locationLike?.search;
    const source = normalizeSource(queryValue(search, "utm_source"));
    if (!source) return null;
    return { source, campaign: normalizeCampaign(queryValue(search, "utm_campaign")) };
  }

  function sessionStorageFor(owner = root) {
    try {
      return owner?.sessionStorage || null;
    } catch {
      return null;
    }
  }

  function storedAttribution(storage) {
    if (!storage) return null;
    try {
      const raw = storage.getItem(ATTRIBUTION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const source = normalizeSource(typeof parsed === "object" && parsed ? parsed.source : raw);
      if (!source) return null;
      return { source, campaign: normalizeCampaign(typeof parsed === "object" && parsed ? parsed.campaign : null) };
    } catch {
      return null;
    }
  }

  function saveAttribution(storage, attribution) {
    if (!storage || !attribution) return;
    try {
      storage.setItem(ATTRIBUTION_KEY, JSON.stringify({ source: attribution.source, campaign: attribution.campaign || null }));
    } catch {
      // Storage is optional; the current page can still use the in-memory value.
    }
  }

  function parseUrl(url) {
    if (typeof url !== "string") return null;
    const htmlEncoded = url.includes("&amp;");
    try {
      return { value: new URL(url.replace(/&amp;/g, "&")), htmlEncoded };
    } catch {
      return null;
    }
  }

  function formatUrl(parsed, htmlEncoded) {
    const output = parsed.toString();
    return htmlEncoded ? output.replace(/&/g, "&amp;") : output;
  }

  const GENERATED_SOURCE = "(webapp|threads|web|fb|ig|li|x|yt|app)";

  // Read the page/position suffix from the campaign made by this module.
  function generatedCampaignSuffix(value) {
    const match = String(value || "").match(new RegExp(`^${GENERATED_SOURCE}-(.+-.+)$`));
    return match && /^[a-z0-9-]+$/.test(match[2]) ? match[2] : null;
  }

  // Rewrite only URLs generated by this module. Unknown destinations and malformed campaigns stay unchanged.
  function withSource(url, source, campaignName) {
    const normalizedSource = normalizeSource(source);
    if (!normalizedSource || normalizedSource === CAMPAIGN_SOURCE) return url;
    const parsed = parseUrl(url);
    if (!parsed) return url;
    const { value, htmlEncoded } = parsed;
    const hit = identify(value.toString());
    if (!hit) return url;

    if (hit.os === "ios") {
      if (value.searchParams.get("mt") !== "8") return url;
      const suffix = generatedCampaignSuffix(value.searchParams.get("ct"));
      if (!suffix) return url;
      const next = `${normalizedSource}-${suffix}`;
      if (next.length > CT_MAX) return url;
      value.searchParams.set("ct", next);
      return formatUrl(value, htmlEncoded);
    }

    const referrer = value.searchParams.get("referrer");
    const match = referrer?.match(new RegExp(`^utm_source=([^&]+)&utm_medium=([a-z0-9-]+)(?:&utm_campaign=[a-z0-9-]+)?$`));
    if (!match || match[1] !== normalizeSource(match[1]) || !match[2].includes("-")) return url;
    const campaignSlug = normalizeCampaign(campaignName);
    const nextReferrer = `utm_source=${normalizedSource}&utm_medium=${match[2]}${campaignSlug ? `&utm_campaign=${campaignSlug}` : ""}`;
    value.searchParams.set("referrer", nextReferrer);
    return formatUrl(value, htmlEncoded);
  }

  let browserAttribution = null;

  function getBrowserAttribution(options = {}) {
    if (browserAttribution) return browserAttribution;
    const storage = Object.prototype.hasOwnProperty.call(options, "storage") ? options.storage : sessionStorageFor(root);
    const incoming = attributionFromLocation(options.location || root.location);
    return incoming || storedAttribution(storage);
  }

  function applyToDocument(documentLike, attribution) {
    if (!documentLike || !attribution || typeof documentLike.querySelectorAll !== "function") return;
    let anchors;
    try {
      anchors = documentLike.querySelectorAll("a[href]");
    } catch {
      return;
    }
    for (const anchor of anchors) {
      try {
        const current = anchor.href || anchor.getAttribute?.("href");
        const next = withSource(current, attribution.source, attribution.campaign);
        if (next && next !== current) anchor.href = next;
      } catch {
        // One malformed anchor must not prevent other store links from being rewritten.
      }
    }
  }

  function wireBrowser(options = {}) {
    const documentLike = options.document || root.document;
    if (!documentLike) return null;
    const storage = Object.prototype.hasOwnProperty.call(options, "storage") ? options.storage : sessionStorageFor(root);
    const locationLike = options.location || root.location;
    const run = () => {
      const incoming = attributionFromLocation(locationLike);
      browserAttribution = incoming || storedAttribution(storage);
      if (incoming) saveAttribution(storage, incoming);
      applyToDocument(documentLike, browserAttribution);
    };
    if (documentLike.readyState === "loading" && typeof documentLike.addEventListener === "function") documentLike.addEventListener("DOMContentLoaded", run, { once: true });
    else run();
    return browserAttribution;
  }

  if (root?.document) wireBrowser();

  return {
    APPLE_PROVIDER_TOKEN,
    APPS,
    CT_MAX,
    ATTRIBUTION_KEY,
    SOURCE_ALIASES,
    campaign,
    medium,
    appStoreUrl,
    playUrl,
    storeUrl,
    identify,
    retarget,
    normalizeSource,
    normalizeCampaign,
    withSource,
    attributionFromLocation,
    getBrowserAttribution,
    applyToDocument,
    wireBrowser
  };
});
