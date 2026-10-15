# Evidence

2026-10-15: Apple public lookup country=us returned trackId 6768116546, trackName US Stocks, version 1.0.3 and the requested store destination. Baseline master 16eb27b72f9db9869b8136bf4742121479ecb2d8 is clean. Implementation and deployment pending. GitHub Actions excluded.

Implementation updates the canonical product catalog, production homepage and design catalog. Initial quality check correctly caught two stale availability-count expectations; updated them to seven active badges and one disabled Number Merge iOS badge, retaining all assertions. Full npm run quality now passes: catalog, asset budgets, 12 Node tests, JavaScript syntax and four Python discovery tests. Added a product-scoped active-link regression to reject reintroduction of a disabled US iOS placeholder. Git diff whitespace validation passed. Website Pages configuration is legacy branch publishing from master/root; no Actions path used.

Independent read-only assurance by Herschel (task 01a141e0-9eb0-78c1-8665-df7990f9353f) found no blockers on five-file implementation diff SHA-256 9e2ebe1e52f3b6fad569b43c311954e353bf2cfe61ff23681a3ba14ccad624c5 against baseline 16eb27b. Confirmed correct Apple URL, accessible translated badge label and unchanged other products. Minor limitation: prototype check is literal-file scoped; independent manual review confirmed correct US product entry. No credential or store mutation.

## Deployment and closeout

PR https://github.com/YanlongLai/dappgo-website/pull/26 merged source commit 6396864d5d9c31b6bd36b84acf35cedbb0b96198 into master merge 44aaed1442c3dc27e86f39b8fd1364d363865426 at 2026-10-15T23:24:51Z. Legacy Pages build for that exact merge is built, updated 2026-10-15T23:25:57Z, error null. Public catalog now reports US Stocks iOS live with the supplied Apple link. Production browser reload confirmed an active US Stocks App Store anchor in both Traditional Chinese and English, alongside the unchanged Android link. Number Merge remains the only disabled iOS badge. No GitHub Actions run or inspection.

Website canonical master was fast-forwarded cleanly. PR attachment was attempted but the app refused because this long thread has over 100 artifact identities; the authoritative PR link is retained here. Only this completed website worktree is eligible for cleanup. Four mobile advertising phase-one/two worktrees remain unfinished and are explicitly retained; they are not part of this website deployment or cleanup. No credentials changed.
