# AI reading implementation

Owner-confirmed free-only public reading policy implemented in website source. Added Content Signals to existing wildcard robots group without removing Google-adstxt support. Replaced stale moving-CDN discovery with canonical gateway pointers. Added a static Markdown guide and its sitemap entry, without private services, model calls, write tools or paid content conversion.

Cloudflare diagnostic before change: Level1 3/5, robots and sitemap valid; content signals absent; automatic Markdown negotiation unavailable on Free. Static guide availability must not be reported as negotiation support or full diagnostic completion.

Offline contract and four mutation tests passed; two existing web ownership/privacy tests passed. Scoped release gate passed dependency.graph, diff.dappgo-website and pipeline.contract. Independent review accepted final source with explicit Markdown-not-negotiation limitation.

Actual US pointer was inspected: data_url_v2 is dashboard/data-<prefix>.json and must resolve from the market root, not the pointer directory. Legacy GitHub Pages uses Jekyll; raw Markdown is published as ai-guide.txt to avoid changing global Jekyll or existing clean HTML routes.

Published: PR #16 merged as 985dbc45c844db6ac0f6d054094b9f3b771527ae. GitHub Pages reports built for that exact commit. At 2026-10-10T05:00Z, canonical robots.txt, llms.txt, ai-guide.txt and sitemap.xml all byte-match the merged source. Only robots.txt required a single-URL Cloudflare cache purge; no zone-wide or app-data purge was performed. The raw Markdown guide is served as text/plain, not HTML.

Cloudflare live diagnostic now reports Level 1 4/5, including Content Signals. Automatic Markdown Negotiation remains excluded from the Free scope; higher-level private authentication, tools and commerce were not enabled. Screenshot: /Users/yan/.cache/dappgo/ai-readiness-final-20261009.png.

Canonical gateway verification passed US, TW and Options schema/hash/coverage/freshness checks. No server rollout or native binary change is required. No GitHub runner check is counted as passed; repository Actions permission is enabled for its existing legacy GitHub Pages publication mechanism. Source merge, Pages build and live file verification are separately observed evidence. Preferences express search=yes, ai-input=yes, ai-train=no; they do not guarantee crawler compliance or license third-party news.
