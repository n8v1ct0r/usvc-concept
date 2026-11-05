// Renders the app icon and launch-screen marks from the Claude Design "App icon" board:
// navy #05162C tile, white "USVC", SF Pro Bold 340/1024, letter-spacing -0.06em.
// Usage (macOS): swift scripts/make-icons.swift
import AppKit

let navy = NSColor(srgbRed: 5 / 255, green: 22 / 255, blue: 44 / 255, alpha: 1)

func render(width: Int, height: Int, background: NSColor?, textColor: NSColor, fontSize: CGFloat, to path: String) {
  guard let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4,
    hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)
  else { fatalError("bitmap") }
  rep.size = NSSize(width: width, height: height)
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
  let rect = NSRect(x: 0, y: 0, width: width, height: height)
  if let bg = background {
    bg.setFill()
    rect.fill()
  } else {
    NSColor.clear.setFill()
    rect.fill(using: .copy)
  }
  let font = NSFont.systemFont(ofSize: fontSize, weight: .bold)
  let attrs: [NSAttributedString.Key: Any] = [
    .font: font,
    .foregroundColor: textColor,
    .kern: -0.06 * fontSize,
  ]
  let text = NSAttributedString(string: "USVC", attributes: attrs)
  let bounds = text.boundingRect(with: NSSize(width: 10000, height: 10000), options: [.usesLineFragmentOrigin])
  // Horizontal: centre the advance width (the trailing kern is not ink, so add it back).
  let x = (CGFloat(width) - (bounds.width + 0.06 * fontSize)) / 2
  // Vertical: centre the cap height. draw(at:) places the line origin |descender| below the baseline.
  let baseline = (CGFloat(height) - font.capHeight) / 2
  text.draw(at: NSPoint(x: x, y: baseline + font.descender))
  NSGraphicsContext.restoreGraphicsState()
  guard let data = rep.representation(using: .png, properties: [:]) else { fatalError("png") }
  try! data.write(to: URL(fileURLWithPath: path))
  print("wrote \(path) \(width)x\(height)")
}

let root = FileManager.default.currentDirectoryPath
render(width: 1024, height: 1024, background: navy, textColor: .white, fontSize: 340, to: "\(root)/assets/images/icon.png")
render(width: 720, height: 240, background: nil, textColor: navy, fontSize: 200, to: "\(root)/assets/images/splash-icon.png")
render(width: 720, height: 240, background: nil, textColor: .white, fontSize: 200, to: "\(root)/assets/images/splash-icon-dark.png")
