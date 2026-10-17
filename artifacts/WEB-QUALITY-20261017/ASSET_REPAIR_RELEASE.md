# Asset repair release

Owner approved asset packaging repair, review, redeployment, verification and
cleanup in this turn. No credentials, ads rules, data source, schedules or native
store submission are changed.

## Immutable source selection

- Meta assembler: `846dc49a06e131e6b83e63c3c9a93dd728cfc1e1`, PR 586 merged
  normally with exact head protection at 2026-10-17T19:27:14Z. Four packaging
  source/test files are byte-identical to independently reviewed `54a5a042`.
- US: `80cd2313f958e432d0a460551e6b4e7a98c554e9` (PR 40).
- TW: `3ec332c86f59c5530e3822757530f8cdb3707f30` (PR 23).
- Options: `ce4310a013c56b9f90d3d2e30de2603a97286178` (PR 39).
- Homepage/News: `07b814c02726e01611b9dc8280065d7791babe8d` (PR 34), unchanged
  by this redeployment. News root remains `/us/?lang=en`.

Only the Stocks and Options public bundles are rebuilt with the canonical
assembler from these clean sources. Private release manifests remain outside the
uploaded `public/` directory. The metadata repository merge does not authorize
or require a self-hosted service deployment.

Verified rollback targets: Stocks `63d2ec90-a458-4726-8e0b-e7934f506bba`;
Options `7bff8d9f-f977-4ce0-b3ce-89e81277ae51`. Failed initial uploads and all
earlier verification failures remain recorded in POST_RELEASE.md.

Build, deployment and live acceptance receipts follow only after execution.

## Executed deployment and verification

Canonical clean-source assembly completed with Node 20.20.2. Country commits,
lock hashes and raw export digests exactly match the original frozen release;
only transformed upload paths and affected JS fingerprints changed.

| Project | Bundle digest | Production deployment |
| --- | --- | --- |
| Stocks | `cd798702c8de625853739896bd1fbba7f96e40328a33d0cca39be04233ea3ecb` | `91089fc0-53fa-4e94-a110-a87c2bb45d1b` |
| Options | `2f4e86c8e1ceb99f584a73f051dae649a90bf33aa603722fdee9145533b72c6c` | `0c7b36b0-95f7-4ea7-90b6-dd39dc64adce` |

Wrangler 4.149.0 uploaded only public/. Cloudflare project API independently
confirmed these exact canonical IDs, expected App commit metadata and successful
deployment stages ending 2026-10-17T19:28:26Z. No auth material was output or changed.

Public receipts record per-URL timestamp, deployment ID, expected/actual SHA-256:
- stocks-public-receipt.json: 91 URLs, 86 exact-byte assets, zero failures.
- options-public-receipt.json: 46 URLs, 43 exact-byte assets, zero failures.
- All 111 relocated vendor font/image assets are included and match byte-for-byte.
- Eight HTML responses are explicitly status-only because Cloudflare injects its
  challenge bootstrap. They are not misrepresented as byte-identical responses.
- Root Pages control files and the 404 document are excluded from positive asset
  URL checks; negative routing is separately verified in route-receipt.json.

Fresh production browser tabs loaded all three apps with loaded fonts and no
uncaught console errors. US and TW at actual measured 390px: stock search, empty
input clearing and restored list passed, document horizontal overflow zero.
Options at 390px and 320px: Explore/search/empty/clear passed; no document overflow.
TW desktop 1280px also loaded and search/clear passed. First-use tutorials were
dismissed through their visible skip controls, not removed from source.

Options direct Explore refresh retained the stock directory and correctly showed
"Quotes are not available yet" with Retry. Clicking Retry restored quote values
and removed the warning. This is verified degraded-state recovery, not a claim
that every deep-link load immediately has quote data. RN's known native-driver
warning fell back to JS animation; no asset-load exceptions were present.

Screenshots: us-stocks-mobile-production.png, tw-stocks-mobile-production.png,
options-mobile-production.png. These are desktop browser responsive checks, not
physical iOS/Android or native store release acceptance. No native submission.

Independent Boole audited all 137 receipt rows against manifests and fetched 18
FontAwesome, navigation @3x PNG and rewritten JS samples across all three Apps,
both custom and immutable hostnames at 19:31:37–38 UTC. Every sample returned
200 and the expected digest. Asset-delivery blocker independently resolved.
The 14 route checks passed: nine successful routes, four intentional 404s and
News root exact 302 `/us/?lang=en`. Parent completed the remaining TW 390px
search/clear check afterward; fonts loaded, list restored, zero overflow/errors.

GitHub Actions were neither run nor checked. External lychee scan remains skipped,
not passed. All explicitly scoped deployment and browser checks passed; no claim
is made about unrelated sessions, whole-production service health, native devices
or store acceptance. Evidence-only merge and verified safe cleanup remain the
last workflow steps, with no further Pages or self-hosted deployment required.
