# Website quality platform

`config/product-catalog.json` is the single checked-in map of public DappGo
products, market routes and native-store availability. The catalog is not a
runtime API; it is a release contract used to detect cross-session link drift
before the static site is published.

Run the full local gate with:

```bash
npm run quality
```

The gate checks the catalog against `index.html`, `llms.txt`, `robots.txt` and
`sitemap.xml`, validates the existing ownership/privacy tests and JavaScript,
and applies conservative raster-size budgets. GitHub Actions remains paused by
Owner instruction; this local gate is the authoritative check for this site.

## Security header boundary

`config/security-headers.json` is an edge contract, not proof that headers are
already active. The current site is served by GitHub Pages, so a root
`_headers` file would not apply. Apply the contract at the actual Cloudflare
edge/host, then verify the live response with:

```bash
curl -sS -D - -o /dev/null https://dappgo.com/
```

HSTS remains conditional until every production and rollback hostname is
confirmed HTTPS-ready. The gate intentionally keeps this pending state
visible rather than reporting a false security pass.
