#!/usr/bin/env bash
# Web demo build: Expo web export of the real app, plus the phone-frame shell page.
# Output: dist/ (static). "/" serves the shell; "/?app=1" serves the app inside the frame.
set -euo pipefail
cd "$(dirname "$0")/.."
npx expo export -p web
cp web/shell.html dist/shell.html
cp web/vercel.json dist/vercel.json
cp web/.vercelignore dist/.vercelignore
echo "built dist/ ($(du -sh dist | cut -f1))"
