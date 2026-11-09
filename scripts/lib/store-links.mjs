import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
export const StoreLinks = require("../../assets/store-links.js");

// Anchor class -> campaign position. Every store anchor in a page must use one of these classes
// (or carry data-store-position) so no query string is ever typed by hand.
const POSITIONS = { "hero-store": "hero", "hero-badge": "hero", store: "card", badge: "products", "landing-badge": "hero", "landing-footer-badge": "footer" };

function positionFor(tag) {
  const explicit = tag.match(/\sdata-store-position="([^"]+)"/);
  if (explicit) return explicit[1];
  const classes = (tag.match(/\sclass="([^"]*)"/)?.[1] || "").split(/\s+/);
  const hit = classes.find((c) => POSITIONS[c]);
  if (!hit) throw new Error(`Store link without a campaign position: ${tag}`);
  return POSITIONS[hit];
}

/** Rewrite every App Store / Google Play href in `html` to its generated, tracked form. */
export function applyStoreLinks(html, page) {
  return html.replace(/<a\b[^>]*\shref="(https:\/\/(?:apps\.apple\.com|play\.google\.com)\/[^"]*)"[^>]*>/g, (tag, href) => {
    const raw = href.replace(/&amp;/g, "&");
    if (!StoreLinks.identify(raw)) return tag;
    const next = StoreLinks.retarget(raw, page, positionFor(tag)).replace(/&/g, "&amp;");
    return tag.replace(`href="${href}"`, `href="${next}"`);
  });
}
