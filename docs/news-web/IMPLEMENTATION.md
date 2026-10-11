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

## Verification contract

- Local: pointer/payload resolution, schema guard, title/summary normalization,
  image-present and image-absent render paths, image load failure fallback,
  360/390/768/1440px no-overflow checks, CSP/header inspection.
- Production: exact deployed Pages ID, `/tw/` and `/us/` HTTP/HTTPS routes,
  Pages Function proxy responses, browser console, and one ticker click in
  each market. A successful HTML response alone does not prove data rendering.
- Rollback: restore the previous Pages deployment or detach the custom domain;
  the existing dappgo.com site and data pipeline remain unchanged.
