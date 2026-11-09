# dappgo-website

> **Part of the [DappGo Stocks family](https://github.com/YanlongLai/dappgo-stocks-meta) (14 sibling repos).**
> If you've never worked on this family before, read `~/git/dappgo-stocks-meta/CLAUDE.md` first — it's the canonical entry point.

## Family quick links
- Repo map: `~/git/dappgo-stocks-meta/docs/REPO_MAP.md` — what each repo does
- Dependency flow: `~/git/dappgo-stocks-meta/docs/DEPENDENCY_FLOW.md` — when changing X, also touch Y
- Architecture: `~/git/dappgo-stocks-meta/docs/ARCHITECTURE.md` — data flow + diagrams
- Conventions: `~/git/dappgo-stocks-meta/docs/CONVENTIONS.md` — TS / Python / commit standards

## This repo's role
**Tier 5** | **Static HTML / CSS, GH Pages with custom CNAME `dappgo.com`** | Marketing landing page + AI-discoverability surface. Hosts `index.html`, `options/index.html` (app landing page; old report at `options/report/`), `privacy.html`, `terms.html`, `sitemap.xml`, `robots.txt`, and **`llms.txt`** which lists all CDN endpoints (data.json, manifest.json, weekly_summary.json) for AI crawlers.

- **Inputs**: hand-edited HTML; pulls icons + fonts locally.
- **Outputs**: `https://dappgo.com/` (GH Pages); `llms.txt` consumed by AI crawlers / MCP discovery.
- **When to touch**: marketing copy / new screenshot; new public CDN endpoint exposed (update `llms.txt` AND `sitemap.xml`); privacy / terms / GDPR copy. Number Merge has a separate local-only game data flow and Google AdMob / UMP disclosure; keep its wording aligned with `number-merge-app/docs/app-store-ios-readiness.md`.

## Sibling repos commonly edited together
- `~/git/{tw,us,options}-stocks-daily-report` — when these repos add a new public endpoint (e.g. a future TW `weekly_summary.json`), add it to `llms.txt`.
- `~/git/dappgo-stocks-mcp` — MCP tool catalogue should stay aligned with `llms.txt` URLs.

> If your change here ripples to sibling repos, see `DEPENDENCY_FLOW.md` BEFORE editing.

## Local commands

```bash
./scripts/download-fonts.sh        # refresh local font cache
python3 scripts/generate-icons.py  # regenerate favicons / app-icons
# preview locally:
python3 -m http.server 8080        # then open http://localhost:8080
```

## Release

Push to the repository's configured default branch (`master` in this checkout). GitHub Pages auto-deploys; CNAME `dappgo.com` is configured in repo settings.

## Files of note

```
index.html         landing page
og-image-v2.png    Open Graph / Meta / LinkedIn share preview card
options/index.html app landing pages are generated: node scripts/build-landing-pages.mjs
options/report/    legacy options daily report page
assets/store-links.js  the one place store ids + campaign params live
privacy.html       privacy policy
support.html       support FAQs and app-specific troubleshooting
terms.html         terms of service
llms.txt           AI crawler discovery — CDN endpoint catalogue
sitemap.xml        SEO sitemap — indexable HTML pages only (data/text endpoints go in llms.txt only)
robots.txt         crawler rules
CNAME              dappgo.com
```

## Rules of thumb

- When exposing a new data or text endpoint (JSON, TXT, Markdown), add it to `llms.txt` only. Do not add it to `sitemap.xml`.
- `sitemap.xml` lists only indexable HTML pages (and their clean-URL equivalents). Never list non-HTML resources there; Search Console reports them as "Discovered – currently not indexed".
- Don't reference internal/private repos in `llms.txt` — public CDN paths only.
- Schema: `llms.txt` references V1 CDN paths; bump when V2 ships (`schema.dappgo.com/v2/`).
