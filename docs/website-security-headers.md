# Website security-header handoff

## Current evidence

As of 2026-10-11T23:29:26Z, the Cloudflare Transform Rule `DappGo website security headers` is active for `dappgo.com` and `www.dappgo.com`. External HTTPS checks returned all five declared headers on the canonical host (`HTTP/2 200`) and on the `www` redirect (`HTTP/2 301`):

```text
Content-Security-Policy: frame-ancestors 'none';
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

The rule is scoped to the two website hostnames only. It does not alter the data, app, News, Postiz, Git, or private Tunnel hostnames.

The HTML meta CSP remains a defense-in-depth policy for browsers that honor it. `frame-ancestors` is intentionally not included in that meta policy because browsers only enforce it from an HTTP response header.

The machine-readable contract is checked in at
`config/security-headers.json` and is validated by `npm run quality`. It
supports an explicit pre-activation state and a verified live edge state;
the latter requires a UTC verification timestamp and Cloudflare rule
provenance so a stale hand-edited status cannot look deployed.

## Edge configuration

The following values are applied at the Cloudflare edge for the website hostnames:

```text
Content-Security-Policy: frame-ancestors 'none';
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

The HTTPS readiness prerequisite was verified before HSTS activation. Recheck the actual edge with `curl -sS -D - -o /dev/null https://dappgo.com/` after future DNS or hosting changes; a repository-only contract must not be treated as proof that the edge rule remains active.

## Analytics consent boundary

This work repairs the existing Google Analytics CSP allowlist. It does not change the current analytics identity or make a legal determination about consent. Any consent-gating or privacy-policy change remains an Owner/legal review item and must be tested separately before production promotion.
