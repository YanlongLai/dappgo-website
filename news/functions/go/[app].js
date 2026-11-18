// news.dappgo.com/go/<app>?c=<campaign>: one link per app for posts and the web.
// iOS -> App Store (pt/ct campaign tokens), Android -> Play (utm referrer),
// everything else -> the app's dappgo.com page. dappgo.com/go/<app>/ forwards here.

// App Store Connect provider token (App Analytics -> campaign link generator). Public, not a secret.
// Empty until the Owner copies it from ASC; ct is still sent so links work today.
export const APP_STORE_PROVIDER_TOKEN = "";

export const APPS = Object.freeze({
  "us-stocks": { ios: "6768116546", android: "com.dappgo.usstocksapp", web: "https://dappgo.com/us-stocks/" },
  "tw-stocks": { ios: "6768116538", android: "com.dappgo.twstocksapp", web: "https://dappgo.com/tw-stocks/" },
  "options": { ios: "6768116720", android: "com.dappgo.optionsapp", web: "https://dappgo.com/options/" },
  "number-rpg": { ios: "6827756398", android: "com.dappgo.numberrpg", web: "https://dappgo.com/number-rpg/" },
});

const DEFAULT_CAMPAIGN = "direct";

/** Lowercase, [a-z0-9-] only, single dashes, at most 40 chars (App Store ct limit). */
export function sanitizeCampaign(value) {
  const clean = String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)
    .replace(/-$/, "");
  return clean || DEFAULT_CAMPAIGN;
}

/** "ios" | "android" | "web" from the User-Agent. iPadOS desktop-mode UAs fall back to web. */
export function platformOf(userAgent) {
  const ua = String(userAgent ?? "");
  if (/\b(iPhone|iPad|iPod)\b/.test(ua)) return "ios";
  if (/\bAndroid\b/i.test(ua)) return "android";
  return "web";
}

export function targetFor(app, platform, campaign, providerToken = APP_STORE_PROVIDER_TOKEN) {
  const entry = Object.hasOwn(APPS, app) ? APPS[app] : null;
  if (!entry) return "https://dappgo.com/";
  const source = campaign.split("-")[0] || DEFAULT_CAMPAIGN;
  const utm = new URLSearchParams({
    utm_source: source,
    utm_medium: campaign === DEFAULT_CAMPAIGN ? "link" : "social",
    utm_campaign: campaign,
  });
  if (platform === "ios") {
    const url = new URL(`https://apps.apple.com/app/id${entry.ios}`);
    if (providerToken) url.searchParams.set("pt", providerToken);
    url.searchParams.set("ct", campaign);
    url.searchParams.set("mt", "8");
    return url.href;
  }
  if (platform === "android") {
    const url = new URL("https://play.google.com/store/apps/details");
    url.searchParams.set("id", entry.android);
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
