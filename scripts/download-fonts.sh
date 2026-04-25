#!/usr/bin/env bash
# Download self-hosted Inter font WOFF2 files from the rsms/inter v4.1 GitHub release.
# Run once from the repo root before deploying:   bash scripts/download-fonts.sh
# Expected output files:
#   fonts/Inter-Regular.woff2
#   fonts/Inter-SemiBold.woff2
#   fonts/Inter-ExtraBold.woff2
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FONT_DIR="$ROOT_DIR/fonts"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

mkdir -p "$FONT_DIR"

VERSION="v4.1"
ARCHIVE="Inter-4.1.zip"
URL="https://github.com/rsms/inter/releases/download/${VERSION}/${ARCHIVE}"

echo "Downloading Inter ${VERSION} from ${URL}"
curl -fL -o "$TMP_DIR/$ARCHIVE" "$URL"

echo "Extracting WOFF2 files"
unzip -j -o "$TMP_DIR/$ARCHIVE" \
  "web/Inter-Regular.woff2" \
  "web/Inter-SemiBold.woff2" \
  "web/Inter-ExtraBold.woff2" \
  -d "$FONT_DIR"

echo "Done. Files in $FONT_DIR:"
ls -lh "$FONT_DIR"
