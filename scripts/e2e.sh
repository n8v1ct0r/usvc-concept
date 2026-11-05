#!/usr/bin/env bash
# End-to-end tour on an iOS simulator: installs a fresh build, runs e2e/TourTests,
# and (optionally) saves one screenshot per design frame.
#
# Usage: scripts/e2e.sh <path/to/USVC.app> [shots-dir] [simulator-udid]
#   Build the app first, e.g.
#   xcodebuild -workspace ios/USVC.xcworkspace -scheme USVC -configuration Release \
#     -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' -derivedDataPath build/dd build
set -euo pipefail

APP="${1:?path to USVC.app}"
SHOTS="${2:-}"
# Target a specific device: `booted` is ambiguous when another simulator is running.
# Default: a dedicated "USVC Audit" simulator, so no personal simulator is reset.
UDID="${3:-$(xcrun simctl list devices available | grep -m1 'USVC Audit' | grep -oE '[0-9A-F-]{36}')}"
[ -n "$UDID" ] || { echo "No simulator given and no 'USVC Audit' device found." >&2; exit 2; }
BUNDLE_ID="com.usvc.app"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "device: $UDID"
xcrun simctl boot "$UDID" 2>/dev/null || true
xcrun simctl bootstatus "$UDID" -b >/dev/null
xcrun simctl ui "$UDID" appearance light
xcrun simctl status_bar "$UDID" override --time "9:41" --dataNetwork wifi --wifiMode active --wifiBars 3 \
  --cellularMode active --cellularBars 4 --batteryState charged --batteryLevel 100

xcrun simctl uninstall "$UDID" "$BUNDLE_ID" 2>/dev/null || true
xcrun simctl install "$UDID" "$APP"

WATCH_PID=""
if [ -n "$SHOTS" ]; then
  mkdir -p "$SHOTS"
  rm -f "$SHOTS/.scrub"
  # Frame 8 (chart mid-scrub) must be captured while the test holds the drag.
  (
    for _ in $(seq 1 3000); do
      if [ -e "$SHOTS/.scrub" ]; then
        sleep 1.3
        xcrun simctl io "$UDID" screenshot "$SHOTS/08-home-scrub.png" >/dev/null 2>&1
        rm -f "$SHOTS/.scrub"
        exit 0
      fi
      sleep 0.1
    done
  ) &
  WATCH_PID=$!
fi

set +e
TEST_RUNNER_E2E_SHOTS="$SHOTS" TEST_RUNNER_E2E_BUNDLE_ID="$BUNDLE_ID" \
  xcodebuild test -project "$ROOT/e2e/USVCE2E.xcodeproj" -scheme USVCE2ETests \
  -destination "id=$UDID" -derivedDataPath "$ROOT/e2e/build" 2>&1 | tee "${SHOTS:-/tmp}/e2e-xcodebuild.log" | grep -E "Test Case|error:|failed|passed|\*\* TEST"
STATUS=${PIPESTATUS[0]}
set -e

[ -n "$WATCH_PID" ] && kill "$WATCH_PID" 2>/dev/null || true
xcrun simctl status_bar "$UDID" clear
exit "$STATUS"
