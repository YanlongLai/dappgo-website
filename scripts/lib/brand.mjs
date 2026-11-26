// DappGo brand W4 "Pulse link" (Owner-approved 2026-11-26). One place for the markup every page shell shares.
// English pages use the navy lockup (W4D, Manrope 800); Traditional Chinese pages the white one (W4A, Inter 800).
export const NAVY = "#0F1B3D";
export const AMBER = "#E8A33D";
export const PULSE_POINTS = "4,32 56,32 74,10 96,52 118,4 136,32 196,32";

// Header logo: the pulse tile (same mark as the favicon) beside the wordmark. Colours and size come from .brand in
// assets/home/home.css. The stacked "Dapp / pulse / Go" lockup stays on avatars, app icons and share images.
export const BRAND_HTML = `<svg class="brand-tile" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect width="64" height="64" rx="14" /><g transform="translate(6 24.7) scale(.26)"><polyline points="${PULSE_POINTS}" /></g></svg><span class="brand-word">DappGo</span>`;

const THEME_EN = `<meta name="theme-color" content="${NAVY}" />`;
const THEME_ZH = `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />\n    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="${NAVY}" />`;
export const themeColorMeta = (lang) => (lang === "zh" ? THEME_ZH : THEME_EN);

const preload = (file) => `<link rel="preload" href="/assets/home/fonts/${file}" as="font" type="font/woff2" crossorigin />`;
export const displayFontPreload = (lang) => preload(lang === "zh" ? "inter-800-latin.woff2" : "manrope-var-latin.woff2");
