# AI reading implementation

Owner-confirmed free-only public reading policy implemented in website source. Added Content Signals to existing wildcard robots group without removing Google-adstxt support. Replaced stale moving-CDN discovery with canonical gateway pointers. Added a static Markdown guide and its sitemap entry, without private services, model calls, write tools or paid content conversion.

Cloudflare diagnostic before change: Level1 3/5, robots and sitemap valid; content signals absent; automatic Markdown negotiation unavailable on Free. Static guide availability must not be reported as negotiation support or full diagnostic completion.

Offline contract and four mutation tests passed; two existing web ownership/privacy tests passed. Scoped release gate passed dependency.graph, diff.dappgo-website and pipeline.contract. Independent review accepted final source with explicit Markdown-not-negotiation limitation.

Actual US pointer was inspected: data_url_v2 is dashboard/data-<prefix>.json and must resolve from the market root, not the pointer directory. Legacy GitHub Pages uses Jekyll; raw Markdown is published as ai-guide.txt to avoid changing global Jekyll or existing clean HTML routes.

Pending: merged source and live publication byte parity. No server rollout or native binary change is required. GitHub runner checks remain paused, not run/not passed; legacy GitHub Pages publication is the website's existing deployment mechanism, not a server workflow.
