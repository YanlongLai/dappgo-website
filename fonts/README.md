# Self-hosted Inter fonts

Expected files in this directory (NOT committed — gitignored / downloaded at build time):

- `Inter-Regular.woff2` (weight 400)
- `Inter-SemiBold.woff2` (weight 600)
- `Inter-ExtraBold.woff2` (weight 800)

Run `bash scripts/download-fonts.sh` from the repo root to populate them from the
upstream release at https://github.com/rsms/inter/releases.

The HTML pages reference these files via an inline `@font-face` block so the site
can drop `fonts.googleapis.com` and `fonts.gstatic.com` from its CSP.

## Homepage subsets

`/` and `/zh/` load Latin-only WOFF2 subsets from `assets/home/fonts/` (about 13–30 KB
each instead of 115 KB) so mobile first paint isn't waiting on full font files. Chinese
text falls back to system fonts either way. Regenerate them with fontTools:

```bash
U="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+2248,U+2260,U+2264-2265,U+25B2,U+25BC"
pyftsubset fonts/Inter-Regular.woff2 --unicodes="$U" --layout-features='*' --flavor=woff2 --output-file=assets/home/fonts/inter-400-latin.woff2
pyftsubset fonts/Inter-SemiBold.woff2 --unicodes="$U" --layout-features='*' --flavor=woff2 --output-file=assets/home/fonts/inter-600-latin.woff2
pyftsubset assets/demo/space-grotesk-semibold.ttf --unicodes="$U" --layout-features='*' --flavor=woff2 --output-file=assets/home/fonts/grotesk-600-latin.woff2
pyftsubset assets/demo/space-grotesk-regular.ttf --unicodes="$U" --layout-features='*' --flavor=woff2 --output-file=assets/home/fonts/grotesk-400-latin.woff2
```

Keep the `unicode-range` in `assets/home/home.css` in sync with `$U`.
