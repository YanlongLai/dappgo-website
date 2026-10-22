# Evidence log

Baseline: website e4763e9e2098c982b51f12c7304ec90ad375f05c; News App 63f8cc051888669b05f8251c4038664e62299f1d. Both main checkouts clean, no competing claims. Existing loading skeletons omit the circular source marker; both paginators synchronously expand local data and never show a loading tail.

Outcome: pending implementation and independent review. Private evidence item: NEWS-SKELETON-20261022.

Evaluation/replan: the first full website quality run failed because the legacy static contract pinned the old keyframe name. Route: hypothesize; retain the loading design, update the contract to the new shimmer identifier and strengthen assertions for initially hidden, decorative, real-card skeleton structure before rerunning. The 14 behavioral interaction tests already passed.

Final validation: website full quality passes (product catalog, payload budgets, ownership/demo tests, parser checks, news contract/analysis, 15 interaction cases, readiness tests). Native 31 Node tests plus 1 config-plugin test pass, TypeScript passes, iOS and Android Expo/Hermes exports each pass independently. Native loading tests retain real React effects/state/reconciliation with mocked native hosts; no physical-device or simulator UI run is claimed. Both app stores are unchanged/not submitted by this item.

Browser evidence: CUA inspected 320/390/768/1440px skeleton layouts, all with no horizontal overflow; narrow uses the real card's block layout, wide uses its grid, source markers are 36px. Real Pages Functions/API returned US 283 and TW 464 stories at observation time. Real US pagination retained 10 cards while showing two tail skeletons/busy status, then appended to 20 and cleared busy. TW mobile at390px loaded10 cards without overflow. The short browser wait deadline missed the long-wait capture window; 8-second transition/cleanup is verified with deterministic web and real-React timing tests, not claimed as an observed browser screenshot.

Independent assurance: existing authorized read-only reviewer found three P2 lifecycle/refresh issues, all fixed and accepted in second review. Reviewer independently reran native31+1 and web15 cases. Final exact commit checks follow before promotion. Ads publisher loader, API/immutable pointer and native ads/consent gates remain unchanged; relevant contracts/tests pass.
