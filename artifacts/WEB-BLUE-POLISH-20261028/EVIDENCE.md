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
