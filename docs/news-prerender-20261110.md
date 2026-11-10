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
`dappgo-news` is a direct-upload project; a push to master alone does not update
`news.dappgo.com`. After a successful push, the workflow checks that exact
commit's file list for `news/` changes and hands the commit SHA to a second job,
`deploy-news`, on the `dappgo-ci` runner (Wrangler 4.149 needs Node 22; the
`dappgo-pulse-host` runner has Node 20). That job clones GitHub master, checks out
exactly that commit and runs `scripts/deploy-news.sh`; its clone is removed on
exit. Pulse-only commits and unchanged scheduled runs skip deployment.

The Owner must add the repository secret `CLOUDFLARE_PAGES_TOKEN` to the **Gitea
repository hosting `.gitea/workflows/pulse.yml`**. Use a Cloudflare API token with
only **Account > Cloudflare Pages > Edit**, restricted to account
`83066b4bb72b4d78d018900762c0c948`. Only the deploy step receives that secret, under
the environment name `CLOUDFLARE_API_TOKEN`. Neither the token nor the account
environment variable is echoed. A missing secret emits `::warning::` and leaves
the pulse publish successful: the news HTML is committed but not deployed.
An upload or freshness failure fails the workflow after the commit has been
pushed. An unchanged later scheduled run will not retry the upload; rerun the
workflow manually with its boolean `deploy_news=true` input to force deployment
of the current master even if the build changes nothing.

The builder's `--generated-at-file FILE` option writes the exact US pointer
`generated_at_utc` used by that build, without refetching the pointer. The workflow
keeps this file beside the temporary clone, outside the committed files, and
passes it to the deploy script. Before upload, the script checks it against the
US landing's prerender report time. After upload, it polls
`https://news.dappgo.com/us/` as GPTBot, with bounded requests every five seconds
for up to three minutes, until the first `<time datetime>` inside the complete
`dappgo:prerender` block equals that timestamp. Story times and times outside the
block do not satisfy the check. A timeout exits non-zero.

The deploy script uses the same `wrangler@4.149.0` pin as Meta's
`scripts/web/pages-refresh.cjs`. The flag names `--project-name`, `--branch`,
`--commit-hash` and boolean `--commit-dirty` were verified against that release's
recorded `pages deploy --help` output in Cloudflare's
[upstream help snapshot](https://github.com/cloudflare/workers-sdk/blob/wrangler%404.149.0/packages/wrangler/src/__tests__/pages/deploy.test.ts).
`--commit-dirty=false` is accepted and retained. Wrangler was not executed for
this verification. The script runs from `news/`, confirms `news/.wrangler/` is
ignored by `news/.gitignore`, and places debug logs there too.
`WRANGLER_CACHE_DIR` and `WRANGLER_LOG_PATH` explicitly keep caches and logs in
`news/.wrangler/cache` and `news/.wrangler/logs`, including when a parent directory
has `node_modules`.

For a local deployment, use a clean `news/` tree and a current local
`origin/master` reference. The script does not fetch. HEAD must be an ancestor of
`origin/master`, so an older merged commit is also eligible for rollback.
`--allow-unmerged` explicitly bypasses only that ancestry check; dirty `news/`
files are always refused. With no `CLOUDFLARE_API_TOKEN` in the environment,
Wrangler uses the operator's own login. Without a build timestamp file, the
script reads the expected report time from the committed US landing.

```sh
bash scripts/deploy-news.sh --dry-run
bash scripts/deploy-news.sh
```

The upload command, run by the script from `news/`, is:

```sh
npx --yes wrangler@4.149.0 pages deploy . --project-name dappgo-news --branch master --commit-hash "$(git rev-parse HEAD)" --commit-dirty=false
```

For rollback, identify a previous successful master commit from the deployment
list and redeploy its committed `news/` without rebuilding. The direct command
also works when that older commit predates the deploy script. Run from the
repository root, substituting the chosen commit:

```sh
(cd news && CLOUDFLARE_ACCOUNT_ID=83066b4bb72b4d78d018900762c0c948 npx --yes wrangler@4.149.0 pages deployment list --project-name dappgo-news)
previous_commit=REPLACE_WITH_PREVIOUS_DEPLOYED_MASTER_COMMIT
git merge-base --is-ancestor "$previous_commit" origin/master
git worktree add --detach .news-rollback "$previous_commit"
(cd .news-rollback/news && CLOUDFLARE_ACCOUNT_ID=83066b4bb72b4d78d018900762c0c948 WRANGLER_CACHE_DIR=.wrangler/cache WRANGLER_LOG_PATH=.wrangler/logs npx --yes wrangler@4.149.0 pages deploy . --project-name dappgo-news --branch master --commit-hash "$(git rev-parse HEAD)" --commit-dirty=false)
git worktree remove .news-rollback
```

`npm run news:check` compares snapshots against current published data without
writing and lists only differing paths (exit 1 for differences). Unchanged inputs
produce no rewrites. Generated HTML and sitemap must total less than 2 MB.
`node --test scripts/build-news-html.test.mjs` uses fixtures and no network;
`node --test scripts/deploy-news.test.mjs` covers the deploy refusal rules, exact
dry-run argv, offline upload handling and freshness polling in temporary git
fixtures. `node scripts/quality-gate.mjs` includes both and the news DOM/client
contracts.
