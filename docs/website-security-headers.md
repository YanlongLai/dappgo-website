# Website security-header handoff

## Current evidence

As of 2026-09-17, `https://dappgo.com/` returns `cache-control: max-age=600` but does not return an HTTP `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, `Referrer-Policy`, or `Permissions-Policy` header. The site therefore cannot claim that the host-level frame-embedding and transport policies are active.

The HTML meta CSP remains a defense-in-depth policy for browsers that honor it. `frame-ancestors` is intentionally not included in that meta policy because browsers only enforce it from an HTTP response header.

## Owner/hosting action still required

Apply the following at the actual edge or hosting layer that serves `dappgo.com`:

```text
Content-Security-Policy: frame-ancestors 'none';
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Do not apply HSTS or a stricter response CSP until the DNS/edge owner confirms that every production and rollback hostname supports HTTPS and the complete required provider allowlist. After applying, verify with `curl -sS -D - -o /dev/null https://dappgo.com/` and record the exact headers in the release evidence.

## Analytics consent boundary

This work repairs the existing Google Analytics CSP allowlist. It does not change the current analytics identity or make a legal determination about consent. Any consent-gating or privacy-policy change remains an Owner/legal review item and must be tested separately before production promotion.
