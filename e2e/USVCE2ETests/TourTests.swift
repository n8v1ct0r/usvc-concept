import XCTest

/// Black-box UI test for the installed app (bundle id com.usvc.app), driven by testIDs
/// (React Native testID -> accessibilityIdentifier).
///
/// Walks every flow in the Claude Design prototype and, when E2E_SHOTS is set, saves one
/// screenshot per design frame (01 ... 28) for comparison with the reference renders.
/// Run with scripts/e2e.sh, which installs a fresh build first.
final class TourTests: XCTestCase {
  private let env = ProcessInfo.processInfo.environment
  private var app: XCUIApplication!

  override func setUp() {
    continueAfterFailure = false
    app = XCUIApplication(bundleIdentifier: env["E2E_BUNDLE_ID"] ?? "com.usvc.app")
  }

  // MARK: helpers

  private func el(_ id: String) -> XCUIElement {
    app.descendants(matching: .any).matching(identifier: id).firstMatch
  }

  @discardableResult
  private func wait(_ id: String, _ timeout: TimeInterval = 10, file: StaticString = #filePath, line: UInt = #line) -> XCUIElement {
    let e = el(id)
    XCTAssertTrue(e.waitForExistence(timeout: timeout), "missing \(id)", file: file, line: line)
    return e
  }

  private func tap(_ id: String, file: StaticString = #filePath, line: UInt = #line) {
    wait(id, file: file, line: line).tap()
  }

  private func label(_ id: String) -> String { el(id).label }

  /// Saves a full-screen PNG named after its design frame, after animations settle.
  private func shot(_ name: String, settle: TimeInterval = 0.9) {
    Thread.sleep(forTimeInterval: settle)
    guard let dir = env["E2E_SHOTS"] else { return }
    let png = XCUIScreen.main.screenshot().pngRepresentation
    try? png.write(to: URL(fileURLWithPath: dir).appendingPathComponent("\(name).png"))
  }

  private func back() { tap("nav-back") }

  // MARK: the tour

  func testFullTour() throws {
    app.launchArguments = ["-E2E", "YES"] // app stops endless decorative loops so XCUITest can idle
    app.launch()
    XCTAssertTrue(app.wait(for: .runningForeground, timeout: 30))

    // Onboarding 1-6 (fresh install starts on Welcome)
    wait("screen-welcome", 20)
    shot("01-welcome", settle: 1.5)
    tap("welcome-invest")
    wait("screen-who"); shot("02-who")
    tap("continue")
    wait("screen-identity"); shot("03-identity")
    tap("continue")
    wait("screen-before")
    XCTAssertFalse(el("continue").isEnabled, "Continue must be disabled until the prospectus box is checked")
    tap("read-prospectus")
    shot("04-before")
    tap("continue")
    wait("screen-faceid"); shot("05-faceid")
    tap("continue")
    wait("screen-bank"); shot("06-bank")
    tap("continue")

    // Home 7-9
    wait("screen-home")
    shot("07-home", settle: 1.6)
    XCTAssertTrue(label("home-value").contains("$12,482.12"), label("home-value"))

    // Frame 8: scrub to Jul 1, 2026 (series day 50 of 0...133) and hold while the host captures.
    let chart = wait("account-chart")
    if let dir = env["E2E_SHOTS"] {
      FileManager.default.createFile(atPath: dir + "/.scrub", contents: Data())
    }
    let start = chart.coordinate(withNormalizedOffset: CGVector(dx: 0.2, dy: 0.5))
    let end = chart.coordinate(withNormalizedOffset: CGVector(dx: 50.0 / 133.0, dy: 0.5))
    start.press(forDuration: 0.3, thenDragTo: end, withVelocity: XCUIGestureVelocity(300), thenHoldForDuration: 3.0)
    XCTAssertTrue(label("home-value").contains("$12,482.12"), "value returns to live after the scrub ends")

    tap("home-value")
    wait("screen-position"); shot("09-position")
    back()

    // Invest 10-14
    wait("screen-home")
    tap("tab-invest")
    wait("screen-amount")
    XCTAssertEqual(el("amount-display").label, "Amount $1,000")
    shot("10-amount")

    // keypad rules: clear, type 2 then 5 -> $25 (below minimum), then 00 -> $2,500
    tap("key-del"); tap("key-del"); tap("key-del"); tap("key-del")
    tap("key-2"); tap("key-5")
    XCTAssertEqual(el("amount-display").label, "Amount $25")
    XCTAssertFalse(el("amount-continue").isEnabled, "$25 is below the $500 minimum")
    tap("key-0"); tap("key-0")
    XCTAssertEqual(el("amount-display").label, "Amount $2,500")
    tap("key-del"); tap("key-del"); tap("key-del"); tap("key-del")
    tap("chip-1k")
    XCTAssertEqual(el("amount-display").label, "Amount $1,000")

    tap("amount-continue")
    wait("funding-sheet"); shot("11-sheet", settle: 1.0)
    tap("sheet-continue")
    wait("screen-review")
    XCTAssertFalse(el("confirm").isEnabled, "Confirm needs the prospectus box")
    tap("review-prospectus")
    shot("12-review")
    tap("confirm")
    wait("screen-submitted", 15)
    shot("13-submitted", settle: 1.2)
    XCTAssertTrue(el("submitted-amount").label.contains("$1,000.00"))
    tap("done")
    XCTAssertTrue(el("toast").waitForExistence(timeout: 2), "toast after Done")
    shot("13b-toast-submitted", settle: 0.3)
    wait("screen-home")
    Thread.sleep(forTimeInterval: 2.6)

    tap("action-recurring")
    wait("screen-recurring"); shot("14-recurring")
    tap("save-recurring")
    XCTAssertTrue(el("toast").waitForExistence(timeout: 2), "toast after Save")
    wait("screen-home")
    Thread.sleep(forTimeInterval: 2.6)

    // Holdings 15-17
    tap("tab-holdings")
    wait("screen-holdings"); shot("15-holdings", settle: 1.5)
    tap("holding-supabase")
    wait("screen-company"); shot("16-company", settle: 1.2)
    back()
    tap("our-approach")
    wait("screen-strategy"); shot("17-strategy")
    back()

    // Updates 18-19
    tap("tab-updates")
    wait("screen-updates"); shot("18-updates")
    tap("update-3")
    wait("screen-article"); shot("19-article")
    back()

    // Liquidity 20-21
    tap("tab-index")
    tap("action-liquidity")
    wait("screen-liquidity"); shot("20-liquidity")
    tap("toggle-notify")
    XCTAssertEqual(el("toggle-notify").value as? String, "1")
    tap("toggle-notify")
    tap("preview-offer")
    wait("screen-repurchase")
    let tender = wait("tender-input")
    tender.tap()
    tender.typeText("250.000")
    // dismiss the keyboard: tap a non-interactive area (the offer status card)
    app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.17)).tap()
    XCTAssertEqual(tender.value as? String, "250.000")
    shot("21-repurchase", settle: 1.2)
    back()
    back()

    // Account 22-27
    tap("tab-account")
    wait("screen-account"); shot("22-account")
    for (row, screen, frame) in [
      ("account-documents", "screen-documents", "23-documents"),
      ("account-fees", "screen-fees", "24-fees"),
      ("account-team", "screen-team", "25-team"),
      ("account-activity", "screen-activity", "26-activity"),
      ("account-disclosures", "screen-disclosures", "27-disclosures"),
    ] {
      tap(row)
      wait(screen); shot(frame)
      back()
      wait("screen-account")
    }

    // Theme 28
    tap("tab-index")
    wait("screen-home")
    tap("toggle-theme")
    shot("28-home-dark", settle: 1.2)
    tap("toggle-theme")

    // Sign out returns to Welcome
    tap("tab-account")
    tap("sign-out")
    wait("screen-welcome", 10)
  }
}
