# Self-hosted Inter fonts

Expected files in this directory (NOT committed — gitignored / downloaded at build time):

- `Inter-Regular.woff2` (weight 400)
- `Inter-SemiBold.woff2` (weight 600)
- `Inter-ExtraBold.woff2` (weight 800)

Run `bash scripts/download-fonts.sh` from the repo root to populate them from the
upstream release at https://github.com/rsms/inter/releases.

The HTML pages reference these files via an inline `@font-face` block so the site
can drop `fonts.googleapis.com` and `fonts.gstatic.com` from its CSP.
