// DappGo brand W4 "Pulse link" (Owner-approved 2026-11-26). One place for the markup every page shell shares.
// English pages use the navy lockup (W4D, Manrope 800); Traditional Chinese pages the white one (W4A, Inter 800).
export const NAVY = "#0F1B3D";
export const AMBER = "#E8A33D";
export const PULSE_POINTS = "4,32 56,32 74,10 96,52 118,4 136,32 196,32";

// Horizontal lockup: Dapp + amber pulse + Go. The header uses the pulse with short tails so the name still reads
// as one word; the full-length pulse stays on avatars, app icons and share images.
// Colours and size come from .brand in assets/home/home.css.
export const PULSE_POINTS_SHORT = "46,32 56,32 74,10 96,52 118,4 136,32 146,32";
export const BRAND_HTML = `<span class="brand-word" role="img" aria-label="DappGo"><span aria-hidden="true">Dapp</span><svg class="brand-pulse" viewBox="46 0 100 60" aria-hidden="true" focusable="false"><polyline points="${PULSE_POINTS_SHORT}" /></svg><span aria-hidden="true">Go</span></span>`;

const THEME_EN = `<meta name="theme-color" content="${NAVY}" />`;
const THEME_ZH = `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />\n    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="${NAVY}" />`;
export const themeColorMeta = (lang) => (lang === "zh" ? THEME_ZH : THEME_EN);

const preload = (file) => `<link rel="preload" href="/assets/home/fonts/${file}" as="font" type="font/woff2" crossorigin />`;
export const displayFontPreload = (lang) => preload(lang === "zh" ? "inter-800-latin.woff2" : "manrope-var-latin.woff2");
