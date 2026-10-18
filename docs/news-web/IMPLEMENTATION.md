# DappGo News implementation

Status: feature implementation, Cloudflare Pages target. This package keeps
the existing RSS/data pipeline as the only writer and adds a read-only static
reader under `news/`.

## Data boundary

Each market page reads a same-origin Pages Function at
`/api/markets/{market}/dashboard/latest.json`. That function allows only `us`
and `tw`, and only `latest.json` or a hash-shaped immutable
`data-*.json` filename; it fetches the corresponding formal gateway resource
server-side from `data.dappgo.com`. This avoids relying on gateway CORS and
does not create an open URL proxy. The browser then resolves only its
same-market `data_url_v2` (`dashboard/data-*.json`) and validates that
`ticker_data` exists before replacing the loading state. It never reads the
moving legacy `data_url`, calls an RSS/provider endpoint, or triggers a
pipeline run. A pointer change is announced in a banner so a reader does not
lose their place.

The existing payload supplies `ticker_data[*].news[]` with title, summary,
source, URL, date/time and optional image metadata. A permitted available
`image_url` is rendered. Missing, restricted or failed media removes only the
media slot and leaves a full-width text card. Summaries that repeat the title
are reduced to avoid duplicate copy; no summary is invented.

## Public routes

## Existing AI reading cards

Both market readers show a scoped AI card after the All/7/30-day filters.
Language changes rerender existing published commentary immediately without
network or model calls. The report-level ai_commentary / ai_commentary_en map
is the only admitted per-ticker analysis. Ticker-local news_commentary never
replaces the AI view; when its plan is explicitly accepted, a selected
publisher quotation or source-specific summary appears below the analysis,
labelled as an unverified publisher account. Rejected or absent source plans
add no context. All-market selection uses the concise report summary where supplied,
or the first paragraph of the matching locale's report summary, never a
concatenation of ticker text. Missing or placeholder locale/scope data hides
the card. Provider text is escaped and engine markers/Markdown emphasis are
normalized. The card identifies itself as latest-report analysis, independent
of the article date filter. Supplied title_zh/title_en and summary_zh/summary_en
are preferred for articles; no translation is fabricated if absent.

Run `node news/tests/analysis.mjs` and `node news/tests/contract.mjs` before
promotion. Deploy from the clean merged checkout's `news/` root so Pages Functions
are included. Version CSS/JS URLs together when reader assets change.

## Public destinations

- `news.dappgo.com/tw/` — Taiwan edition and ticker reader.
- `news.dappgo.com/us/` — United States edition and ticker reader.

The static output can be deployed as its own Cloudflare Pages project, keeping
the existing `dappgo.com` GitHub Pages site and its release path unchanged.
`news/wrangler.toml` pins the Pages project name and compatibility date, while
`news/_routes.json` invokes Pages Functions only for `/api/*`; ordinary HTML,
CSS, JavaScript and images remain static and do not consume Function requests.
The custom domain is an external Pages/DNS configuration gate, not a code
assumption. The deployment record must capture the Pages project, deployment
ID, custom-domain state and live HTTP checks.

## Reader navigation contract

The market switcher is intentionally ordered `US` then `TW` on both editions.
The selected stock, date range, search query and language are represented by
the page query string (`stock`, `range`, `q`, and `lang`). State changes use
`history.replaceState` so a reader can follow an article in the same tab and
use the browser Back button to return to the same reader selection. A `popstate`
listener restores that selection without a data refetch. The source link keeps
the source URL and visible publication date in the card; it does not open a
new tab or add editorial claims.

The company header contains only the section crumb and selected company name.
The former symbol/market line and explanatory copy are deliberately not part
of the rendered contract. Keep this removal in both `/us/` and `/tw/` when
updating the reader template.

## Landing language contract

The News root (`news.dappgo.com/`) routes to the US edition. On the US page,
language resolution is explicit URL `lang`, then the reader's saved manual
choice, then the first browser language (`zh*` means Chinese), then English.
This makes a new English browser see US English and a new Chinese browser see
US Chinese without overriding a reader's deliberate language switch. The TW
edition keeps its Chinese market default, subject to the same URL and saved
choice overrides.

## Verification contract

- Local: pointer/payload resolution, schema guard, title/summary normalization,
  image-present and image-absent render paths, image load failure fallback,
  360/390/768/1440px no-overflow checks, CSP/header inspection.
- Production: exact deployed Pages ID, `/tw/` and `/us/` HTTP/HTTPS routes,
  Pages Function proxy responses, browser console, and one ticker click in
  each market. A successful HTML response alone does not prove data rendering.
- Rollback: restore the previous Pages deployment or detach the custom domain;
  the existing dappgo.com site and data pipeline remain unchanged.
