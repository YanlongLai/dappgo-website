# Technical design

## Source

- Add `news/ads.txt` containing one exact line:
  `google.com, pub-7851819017318644, DIRECT, f08c47fec0942fa0`
- Extend `news/tests/contract.mjs` to require the file, exact bytes after
  normalizing only the final newline, and no BOM or extra declarations.

## Verification

- Run the News contract suite, all News tests, the website quality gate, and
  `git diff --check`.
- Merge through the normal repository path, then deploy only the merged `news/`
  Pages directory using the existing Wrangler project.
- Read back status, content type, body, redirects, and route availability from
  the custom domain and deployment URL.
- Inspect Cloudflare Security Events read-only before considering any rule
  change. If a rule is proven to block Google, use the smallest reversible
  exception possible and re-verify; otherwise make no security change.

## AdSense

The AdSense publisher loader already exists in the News HTML. `ads.txt` is a
separate root-level declaration. Adding the site is an account action; final
review submission remains a separately confirmed action.
