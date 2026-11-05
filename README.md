# USVC iOS

> **Unofficial concept. Not affiliated with USVC.** Sample data only. Team names are fictional.

Live demo: https://usvc-concept.vercel.app

An iPhone app concept for USVC, built from the Claude Design file "USVC iOS App" (25 screens, light and dark).

## What it does

- **Onboarding** in 5 steps: who can invest, identity, fit check with a prospectus gate, Face ID, linked bank. The identity and bank steps are display-only sample screens; nothing is collected.
- **Home**: account value with a count-up, a chart you can press and drag to see any day (with a selection haptic per day), 1M / 3M / YTD / All ranges, quick actions, the recurring plan, the latest update and top holdings.
- **Invest**: amount keypad with a $500 minimum, one-time or monthly, funding sheet, review with a prospectus gate, confirm with Face ID (real Face ID on a device that has it enrolled; a short scan animation otherwise), submitted status, toast on Home.
- **Holdings** list, company detail, investment strategy.
- **Updates** feed and article.
- **Liquidity**: repurchase offer explainer, notify toggle, repurchase request preview.
- **Account**: activity, documents, fees, team, disclosures, sign out.
- Light and dark themes (starts from the system setting; the dot on Home switches it).

No money moves and nothing is sent anywhere. The only network use is loading company and bank logos from the addresses the design specifies (Google's favicon service and the usvc.com image CDN); if a logo fails, its initials show instead.

## Web demo

The same app runs in a browser through Expo's web export. A small shell page (`web/shell.html`) shows it inside an iPhone frame on desktop and full screen on a phone, under a DEMO strip.

```bash
npm ci
./scripts/build-web.sh                # writes dist/: the app, the shell, and vercel.json routes
```

`/` serves the shell. `/?app=1` serves the app inside the frame.

## Run it

Requirements: macOS, Xcode 26, Node 22, CocoaPods.

```bash
npm ci
npx expo prebuild --platform ios      # generates ios/ (not committed)
npx expo run:ios                      # debug build on a simulator, with Metro
```

Release build for the simulator:

```bash
xcodebuild -workspace ios/USVC.xcworkspace -scheme USVC -configuration Release \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' -derivedDataPath build/dd build
```

## Check it

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # expo lint
npm test             # vitest: keypad rules, formatting, chart series and geometry, sample data
scripts/e2e.sh build/dd/Build/Products/Release-iphonesimulator/USVC.app [shots-dir] [simulator-udid]
```

`scripts/e2e.sh` installs a fresh build on a simulator and runs `e2e/TourTests.swift` (XCUITest). The tour
walks every flow in the design with assertions and, when you pass a shots directory, saves one screenshot
per design frame (01 to 28). Pass a simulator UDID; by default it looks for a device named "USVC Audit".

## Structure

```
src/app/          screens (expo-router): (tabs)/ Home, Holdings, Updates, Account; stack screens
src/ui/           primitives, icons, chart, tab bar, toast, marquee
src/lib/          formatting, keypad, chart series, navigation, motion policy
src/data/         sample content from the design
src/state/        theme, invest flow and preferences
e2e/              XCUITest tour
scripts/          e2e runner, icon renderer
archive/          earlier app version, kept for reference (not built)
```

## Known limits

- Sample data only. The company page has a description for Supabase only, because the design provides one only for it.
- The tab bar leaves out the design's backdrop blur (its fill is 92% opaque, so the difference is small).
- Documents, statements and the prospectus rows are display-only.
