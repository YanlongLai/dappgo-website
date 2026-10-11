# Website security headers — live edge evidence

## Scope

Activated the existing website security-header contract at Cloudflare for
`dappgo.com` and `www.dappgo.com`. No application subdomain was included.

## Cloudflare evidence

- Rule: `DappGo website security headers`
- Rule status: active
- Host expression: `http.host in {"dappgo.com" "www.dappgo.com"}`
- Verified at: `2026-10-11T23:29:26Z`
- Canonical response: `https://dappgo.com/` → `HTTP/2 200`, `server: cloudflare`
- Redirect response: `https://www.dappgo.com/` → `HTTP/2 301`, `location: https://dappgo.com/`
- Both responses returned all five declared headers:

```text
Content-Security-Policy: frame-ancestors 'none';
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Regression boundary

The rule is website-host scoped. It does not cover or modify `data`, `news`,
`stocks`, `options`, `postiz`, `git`, or private Tunnel hostnames. Existing
website catalog, routes, store links, and quality checks remain the source
for application behavior.

## Decision

`cloudflare-edge-live-verified`. Restic natural-run verification remains a
separate pending operational observation and is not inferred from this change.
