# Evidence: WEB-BLUE-POLISH-20261028

Captured on 2026-10-28 (UTC) by a Claude desktop session (producer). Owner request: restore the earlier DappGo blue base, drop the Number Merge iOS "Coming soon" chip, add news images where available, split the US and TW wire, rename US to United States, use the submitted DappGo News app icon, and make the site more refined, interactive and technical.

| Criterion | Status | Evidence |
|---|---|---|
| Blue base restored | verified (local) | Tokens come from the pre-redesign site (`#245dde`, `#f6f7f9`, `#e8eefc`). The hero and business band are deep blue. System dark mode follows prefers-color-scheme. Checked at 1280 and 375 px. |
| Number Merge iOS removed | verified | The chip was removed, the catalog no longer has an `ios` entry, and llms.txt says Android only. A new home.test asserts this. |
| Wire split by market | verified | There are United States and Taiwan tabs (role=tablist, arrow keys work, the choice persists). The test asserts the US tab renders no TW links. |
| News images | verified (local) | The builder passes `image_url` only when `image_status == "available"` and the URL is https (the same rule as news.dappgo.com). Images are hotlinked with no-referrer, and a broken image falls back to a symbol tile. CSP img-src now allows https:. Today: 4 of 6 US stories have images. The TW payload has no available images, so TW shows tiles only. |
| United States naming | verified | Tabs, tape, newsroom button and product chips use United States. |
| News icon matches the submitted app | verified | `assets/app-icons/news-icon*.{png,webp}` is derived from dappgo-news-app `ios/.../App-Icon-1024x1024@1x.png`. |
| Interaction/tech polish | verified (local) | Hero canvas (paused offscreen and under reduced motion), publish-run console built from real pulse hashes and coverage, count-up stats, reveal, spotlight, pipeline light-up, scroll progress, nav current-section. |
| Quality gate | verified | `node scripts/quality-gate.mjs` passes. Console errors are limited to the existing AdSense sodar CSP block, which is unrelated to this change. |

## Open
- The scheduled pulse refresh is still unobserved. It needs the Owner-created `DAPPGO_WEBSITE_PUSH_TOKEN` Gitea secret; see WEB-REDESIGN-V2-20261027.
- TW payloads carry no usable images. Adding them belongs in the tw-stocks-core news image resolver, outside this repo.
- The worktree coordinator claim was not recorded because the `claim` command now requires a work-item manifest. This is degraded coordination, and no other active claims existed.

## Release reconciliation (2026-10-28)

| Gate | State | Evidence |
|---|---|---|
| Promoted | verified | PR #49 was merged as 54fc1bc7b7797a68a015b368766214e67d325425. All 5 GitHub checks passed (html x2, links x2, gitleaks scan). The links job was failing on master from #47 onward because of a dead Meta privacy URL in number-rpg/privacy; #49 fixed it with `/privacy/policy/`, a URL-only change. |
| Deployed | verified | The GitHub Pages build for 54fc1bc has status `built`. |
| Observed | verified | On dappgo.com (cache-busted), `/`, the home assets, `/data/pulse.json`, the News icon, `/llms.txt` and `/number-rpg/privacy/` return 200. The HTML carries `v=20261028-blue-3`, the wire tabs and the News icon, with no `chip-soon`. In a browser: chip `live` (2026-10-28), 3 market cards, United States and Taiwan tabs with 6 stories each, 4 of 4 publisher images loaded, 5 products, no Number Merge iOS, no horizontal scroll at 1024 px. The only console errors are the existing Cloudflare Insights and AdSense sodar CSP blocks. |
| Rollback | ready | Revert merge 54fc1bc on master. GitHub Pages then redeploys 2b6e37b. |

## Scheduled pulse check (2026-10-28 09:20 UTC)

| Check | State | Evidence |
|---|---|---|
| Gitea run | failed | Gitea run 1994 (`pulse.yml`, schedule, job 2239, runner `us-colab01-linux-host`) built a pulse with 3 markets and 12 headlines, then failed on push 3 times: `remote: Permission to YanlongLai/dappgo-website.git denied to YanlongLai.` / `The requested URL returned error: 403`, followed by `::error::pulse push failed after 3 attempts`. |
| Cause | Owner action | `DAPPGO_WEBSITE_PUSH_TOKEN` authenticates as YanlongLai but cannot write. A fine-grained token needs **Contents: Read and write** on `YanlongLai/dappgo-website`; a classic token needs `repo` (or `public_repo`). |
| GitHub master | no pulse commit | master is at `c7208c2d` (merge #61). No `chore(pulse)` commit by DappGo Pulse exists. The last `data/pulse.json` change is `79bd3ab2` (#60). |
| dappgo.com | stale by one TW run | `/data/pulse.json` was built at 04:06:06Z and has TW 2026-10-28 `generated_at_utc` 03:08:40Z, 19 BUY. That is later than 01:18:10Z, but only because #60 rebuilt it. The browser console and Taiwan card show 03:08 UTC and "19 BUY / 0 SELL". |
| Source has newer data | unpublished | A local rebuild at 09:37Z gives TW `generated_at_utc` 08:39:30Z, hash `1b986e8a…`, 17 BUY. It was not committed. |

Next: after the Owner fixes the token permission, trigger `pulse.yml` with workflow_dispatch and confirm a `published <sha>` line.
