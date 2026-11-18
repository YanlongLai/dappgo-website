// news.dappgo.com/go/<app>?c=<campaign>: one link per app for posts and the web.
// iOS -> App Store (pt/ct campaign tokens), Android -> Play (utm referrer),
// everything else -> the app's dappgo.com page. dappgo.com/go/<app>/ forwards here.
// Store ids, the App Store provider token and the source/campaign rules come from
// assets/store-links.js, the single source of truth for store links on dappgo.com.
import storeLinks from "../../../assets/store-links.js";

const { APPS: STORE_APPS, APPLE_PROVIDER_TOKEN, normalizeCampaign, normalizeSource } = storeLinks;

// Public link slug -> store-links key and landing page. Only these slugs are served.
export const APPS = Object.freeze({
  "us-stocks": { store: "us-stocks", web: "https://dappgo.com/us-stocks/" },
  "tw-stocks": { store: "tw-stocks", web: "https://dappgo.com/tw-stocks/" },
  "options": { store: "options-explorer", web: "https://dappgo.com/options/" },
  "number-rpg": { store: "number-rpg", web: "https://dappgo.com/number-rpg/" },
});

const DEFAULT_CAMPAIGN = "direct";

/** Bounded [a-z0-9-] slug of at most 40 characters (App Store ct limit); "direct" when empty. */
export function sanitizeCampaign(value) {
  return normalizeCampaign(typeof value === "string" ? value : "") || DEFAULT_CAMPAIGN;
}

/** utm_source from the campaign's first segment via the shared alias table ("threads", "ig", "x", …). */
export function sourceOf(campaign) {
  return normalizeSource(campaign.split("-")[0]) || "link";
}

/** "ios" | "android" | "web" from the User-Agent. iPadOS desktop-mode UAs fall back to web. */
export function platformOf(userAgent) {
  const ua = String(userAgent ?? "");
  if (/\b(iPhone|iPad|iPod)\b/.test(ua)) return "ios";
  if (/\bAndroid\b/i.test(ua)) return "android";
  return "web";
}

export function targetFor(app, platform, campaign, providerToken = APPLE_PROVIDER_TOKEN) {
  const entry = Object.hasOwn(APPS, app) ? APPS[app] : null;
  if (!entry) return "https://dappgo.com/";
  const ids = STORE_APPS[entry.store];
  const utm = new URLSearchParams({
    utm_source: sourceOf(campaign),
    utm_medium: campaign === DEFAULT_CAMPAIGN ? "link" : "social",
    utm_campaign: campaign,
  });
  if (platform === "ios" && ids.ios) {
    const url = new URL(`https://apps.apple.com/app/id${ids.ios}`);
    if (providerToken) url.searchParams.set("pt", providerToken);
    url.searchParams.set("ct", campaign);
    url.searchParams.set("mt", "8");
    return url.href;
  }
  if (platform === "android" && ids.android) {
    const url = new URL("https://play.google.com/store/apps/details");
    url.searchParams.set("id", ids.android);
    url.searchParams.set("referrer", utm.toString());
    return url.href;
  }
  const url = new URL(entry.web);
  for (const [key, value] of utm) url.searchParams.set(key, value);
  return url.href;
}

export function onRequest({ request, params }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD", "cache-control": "no-store" } });
  }
  const app = String(params?.app ?? "").toLowerCase();
  const campaign = sanitizeCampaign(new URL(request.url).searchParams.get("c"));
  const location = targetFor(app, platformOf(request.headers.get("user-agent")), campaign);
  return new Response(null, {
    status: 302,
    headers: { location, "cache-control": "no-store", vary: "User-Agent", "x-robots-tag": "noindex" },
  });
}
