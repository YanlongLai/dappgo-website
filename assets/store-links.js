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
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DappGoStoreLinks = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  "use strict";

  // App Store Connect "provider token" (pt=). NOT KNOWN YET: the Owner reads it from
  // App Store Connect > Analytics > Campaigns and pastes it here. While empty, links omit `pt`
  // and stay valid; `ct` is still sent, so campaign names are ready the moment the token is set.
  // This is the only place the token is defined.
  const APPLE_PROVIDER_TOKEN = "";

  const CAMPAIGN_SOURCE = "web";
  const CT_MAX = 40;

  const APPS = {
    "tw-stocks": { ios: "6768116538", android: "com.dappgo.twstocksapp" },
    "us-stocks": { ios: "6768116546", android: "com.dappgo.usstocksapp" },
    "options-explorer": { ios: "6768116720", android: "com.dappgo.optionsapp" },
    news: { android: "com.dappgo.newsapp" },
    "number-merge": { android: "com.dappgo.numbermerge" }
  };

  const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");

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

  return { APPLE_PROVIDER_TOKEN, APPS, CT_MAX, campaign, medium, appStoreUrl, playUrl, storeUrl, identify, retarget };
});
