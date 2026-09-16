# Evidence

Status: released and production-verified on 2026-09-16.

## Current checks

- [x] AI001 work item claimed as `WEBSITE-SHELL-ALIGN-20260916`.
- [x] Worktree ownership checked before edits.
- [x] Options shell verified at 1440px and 390px.
- [x] Terms shell verified at 1440px.
- [x] Support shell verified at 1440px and 390px.
- [x] 404 shell verified at 1440px and 390px.
- [x] Options locale toggle re-rendered the production commentary locally.
- [x] 404 locale, theme, and mobile menu controls were exercised locally.
- [x] Local console error/warning scan was empty on exercised pages.
- [x] HTMLHint passed for index, Options, Privacy, Terms, Support, and 404.
- [x] Local JavaScript syntax and local-reference checks passed.
- [x] `git diff --check` passed.

## Release record

- Implementation commits: `c0766ee`, `b961d31`, and `7f65e35`.
- Pull request: [#6](https://github.com/YanlongLai/dappgo-website/pull/6).
- Merge commit: `10eb3c121c23bf4ed157432acc04c3cea2ff7321`.
- PR Site Lint: [run 35160175079](https://github.com/YanlongLai/dappgo-website/actions/runs/35160175079) — `html` and `links` passed.
- Push Site Lint: [run 35160172621](https://github.com/YanlongLai/dappgo-website/actions/runs/35160172621) — `html` and `links` passed.
- Push gitleaks: [run 35160244853](https://github.com/YanlongLai/dappgo-website/actions/runs/35160244853) — passed.
- GitHub Pages: [run 35160244432](https://github.com/YanlongLai/dappgo-website/actions/runs/35160244432) — deployment passed for merge commit `10eb3c1`.

## Production verification

- On 2026-09-16, `curl -L` returned HTTP 200 for `/`, `/options`,
  `/options.html`, `/terms`, `/terms.html`, `/support`, `/support.html`,
  `/privacy`, `/privacy.html`, `/404.html`, `/assets/demo/page-shell.css`,
  and `/favicon.svg`.
- The live `/`, `/options`, `/terms`, `/support`, and `/privacy` documents
  contain the shared header/footer shell; `/404.html` contains the recovery
  shell as well.
- At 390×844, Options, Terms, Support, and 404 had no horizontal overflow;
  each retained the shared header, main content, and footer. At 1440px,
  Options also had no horizontal overflow.
- The live Options locale control switched from English to Traditional Chinese
  (`lang="zh-Hant"`) without a console error.

## Link-check boundary

- The initial Site Lint run `35159363164` exposed provider-specific responses:
  Google Forms returned 401 to automated anonymous probes and Instagram returned
  429 rate limiting, while both work in a normal browser. The workflow now
  excludes only those exact provider endpoints and keeps them on the manual
  smoke-test checklist.
- The same run identified two stale Privacy links. They were replaced with
  the current EDPB member directory and GitHub Customer Terms landing page;
  the succeeding Site Lint runs above validate the resulting document links.
