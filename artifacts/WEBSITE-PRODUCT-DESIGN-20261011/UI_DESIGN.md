# Interaction and visual specification

Reading this as: a product-focused corporate homepage for independent market readers, with a precise, confident visual language derived from DappGo's existing brand.

Mode: redesign with brand preservation. DESIGN_VARIANCE 5, MOTION_INTENSITY 3, VISUAL_DENSITY 4. Native semantic HTML/CSS; no new visual framework. Genuine product screenshots take precedence over generated marketing imagery because they show the actual products being linked.

## Visual system

- Retain the existing D icon and DappGo wordmark. Use local Space Grotesk at 400/600 and native Traditional Chinese fonts.
- Blue #245dde is the single interactive accent. Cool off-white page, near-white surfaces, ink text and soft blue product frames. Dark mode applies globally with a lighter accessible blue.
- Max width 1240px, desktop gutter 40px, mobile 20px. 8px spacing rhythm. Hero has compact 56-72px top padding; section spacing 72-96px desktop, 48-64px mobile.
- Type: 52-60px desktop hero, 36px mobile; 34-40px section headings; 18px leading descriptions; minimum 14px secondary copy. Avoid tiny decorative metadata.
- Radius scale: 8px controls, 16px app cards, 24px preview frames. Borders only separate functional groups. Reserve image dimensions to avoid layout shifts.
- Screens show actual product content. A caption explains screenshots are examples and live data is in the product. No decorative performance chart or fake market numbers.

## Interaction contract

| Element | Input / response | Keyboard and mobile |
|---|---|---|
| Product selector | Click replaces preview, summary and web destinations together. No automatic rotation. | Tabs support Arrow keys, Home/End and roving tabindex. Mobile becomes a 2x2 selector above preview. |
| Language | Switch all interface and product copy; keep product selection and scroll position. | Native button, explicit target language. Preference is optional, guarded localStorage. |
| Theme | Toggle whole-page light/dark; initial value follows OS unless explicitly stored. | Visible label and aria-label. System updates when no manual override exists. |
| Mobile menu | Expand links below fixed header; close after selection or Escape. | aria-expanded; normal document flow, no focus trap needed. |
| Store links | Exact public listing; no inferred unavailable-platform button. | Explicit App Store / Google Play text; normal anchors. |
| FAQ | Expand product-use clarification. | Native details/summary. |
| Screenshot | Fixed aspect ratio, descriptive alt, static preview. | On load error, retain explanation and usable product link. |

Focus: visible 3px blue outline; minimum 44px controls. Hover never required to reveal a destination. Motion is limited to 150-180ms opacity/transform feedback and removed for reduced-motion preferences. No sticky-scroll hijack, marquee or animated data illusion.

## Mobile composition

Hero copy precedes the bounded real-screen composition. Product selector stays above its panel, so switching products needs no scrolling back to a sidebar. Four app cards become a single column; both store links wrap into full-height touch targets. At narrow widths navigation becomes a menu and all content retains side gutters. News market links remain explicit.

## Review focus

Confirm the emphasis on research products with Number Merge in a secondary mobile collection. Confirm copy and visual direction in the prototype before changing the production homepage. The prototype intentionally excludes real advertising/tracking scripts; the existing production AdSense mismatch is a separate unresolved work item, not implicitly corrected by redesign.
