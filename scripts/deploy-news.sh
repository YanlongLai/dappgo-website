#!/usr/bin/env bash
# Upload committed news/ and verify the HTML served to GPTBot. Never fetch or push.
set -Eeuo pipefail

usage() {
  echo "Usage: scripts/deploy-news.sh [--dry-run] [--allow-unmerged] [--generated-at-file FILE]"
}

dry_run=false
allow_unmerged=false
generated_at_file=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --dry-run) dry_run=true; shift ;;
    --allow-unmerged) allow_unmerged=true; shift ;;
    --generated-at-file)
      if [ "$#" -lt 2 ] || [ -z "$2" ]; then
        echo "--generated-at-file requires a file path" >&2
        exit 1
      fi
      generated_at_file="$2"
      shift 2
      ;;
    --help|-h) usage; exit 0 ;;
    *) usage >&2; exit 1 ;;
  esac
done

# Resolve a caller-relative timestamp path before changing directories.
case "$generated_at_file" in
  ""|/*) ;;
  *) generated_at_file="$PWD/$generated_at_file" ;;
esac
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
root="$(git -C "$script_dir/.." rev-parse --show-toplevel)"
cd "$root"
commit="$(git rev-parse HEAD)"

if [ -n "$(git status --porcelain=v1 --untracked-files=all -- news/)" ]; then
  echo "Refusing to deploy a dirty news/ tree; commit or discard its staged, unstaged and untracked changes first." >&2
  exit 1
fi
if [ "$allow_unmerged" != "true" ] && ! git merge-base --is-ancestor "$commit" refs/remotes/origin/master; then
  echo "Refusing to deploy: HEAD is not an ancestor of origin/master (or origin/master is unavailable). Use --allow-unmerged only for an intentional override." >&2
  exit 1
fi
if ! git check-ignore -q -- news/.wrangler/deploy-cache; then
  echo "Refusing to deploy: news/.wrangler/ must be ignored so Wrangler cannot dirty the clone." >&2
  exit 1
fi

expected_at="$(node "$script_dir/verify-news-deploy.mjs" timestamp "$root/news/us/index.html" "$generated_at_file")"
wrangler_argv=(npx --yes wrangler@4.149.0 pages deploy . --project-name dappgo-news --branch master --commit-hash "$commit" --commit-dirty=false)
if [ "$dry_run" = "true" ]; then
  printf 'cwd: %s\n' "$root/news"
  printf 'argv: '
  node -e 'console.log(JSON.stringify(process.argv.slice(1)))' "${wrangler_argv[@]}"
  printf 'expected generated_at_utc: %s\n' "$expected_at"
  exit 0
fi

cd "$root/news"
# Both Pages' local cache and its debug logs stay under the existing ignored directory.
export WRANGLER_CACHE_DIR="$root/news/.wrangler/cache"
export WRANGLER_LOG_PATH="$root/news/.wrangler/logs"
export CLOUDFLARE_ACCOUNT_ID=83066b4bb72b4d78d018900762c0c948
# Do not require or rewrite CLOUDFLARE_API_TOKEN: local operators can use Wrangler's login.
"${wrangler_argv[@]}"
node "$script_dir/verify-news-deploy.mjs" verify "$expected_at"
