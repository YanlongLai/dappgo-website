# Published news snapshots

Run `node scripts/build-news-html.mjs` from the repository root to rebuild the US
and Taiwan landings, eligible stock pages, and `news/sitemap.xml`. The builder uses
only the formal DappGo dashboard pointers and immutable payloads, verifies their
hash identities, and loads and validates both markets before writing. It emits
headlines, source names, publication times, company links, and report metadata;
prices, signals, scores, summaries, commentary, and images are excluded.
Output is staged inside the worktree before replacement, with rollback backups
for file-operation failures.

The landings remain the templates. `dappgo:prerender:start` / `:end` comment markers
bound the fallback content inside `[data-stories]`; the client replaces that
content when it renders. `dappgo:news-jsonld:start` / `:end` bound the head's JSON-LD.
Descriptions and `data-stock-pages` are also generated. Preserve these markers
when editing the templates. Stock pages inherit the market template and use
absolute asset paths, self canonicals, and the same client/consent wiring.

A stock qualifies with at least three distinct HTTPS story URLs that have a
`published_at_utc`, ordered newest first. US paths use uppercase symbols and TW
paths use numeric codes. Generated pages carry
`<!-- dappgo:generated-stock-page -->`. Cleanup removes only marked obsolete
indexes and their empty directories; unrelated files and unmarked pages survive.
Never add hand-maintained content to a generated index. Links use `?stock=` when
there is no static page. The sitemap's stock `lastmod` is the newest story date.

The existing `.gitea/workflows/pulse.yml` rebuilds news after pulse verification
at 09:20, 20:15, and 22:45 UTC on weekdays. It stages new news files and commits
changed snapshots with the pulse to GitHub master. Cloudflare Pages project
`dappgo-news` deploys `news/` from that branch; no deployment command is added.

`npm run news:check` compares snapshots against current published data without
writing and lists only differing paths (exit 1 for differences). Unchanged inputs
produce no rewrites. Generated HTML and sitemap must total less than 2 MB.
`node --test scripts/build-news-html.test.mjs` uses fixtures and no network;
`node scripts/quality-gate.mjs` includes these and the news DOM/client contracts.
