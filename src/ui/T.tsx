import { Platform, Text, type TextProps, type TextStyle } from 'react-native';

import { useColors } from '@/state/AppState';
import type { ColorToken } from '@/theme/tokens';

// Text primitive. Mirrors the design's CSS: sizes in pt, letter-spacing in em,
// line-height as a multiple (the device frame sets line-height 1.35), SF Pro,
// tabular numerals everywhere.

export type TProps = TextProps & {
  /** font size in pt (default 17, the design's body size) */
  s?: number;
  w?: '400' | '500' | '600' | '700';
  /** colour token (default text) */
  c?: ColorToken;
  /** raw colour, overrides c */
  color?: string;
  /** letter-spacing in em */
  ls?: number;
  /** line-height multiple (default 1.35) */
  lh?: number;
  upper?: boolean;
  align?: TextStyle['textAlign'];
};

/** SF Pro's natural line height as a multiple of its size (UIFont.lineHeight / pointSize). */
const SF_NATURAL_LINE = 1.1934;

export function T({ s = 17, w = '400', c = 'text', color, ls, lh = 1.35, upper, align, style, ...rest }: TProps) {
  const colors = useColors();
  const lineHeight = Math.round(s * lh * 100) / 100;
  // CSS centres glyphs in a line box smaller than the font (negative half-leading). React Native
  // on iOS skips its baseline offset in that case and the glyphs sit high by half the difference
  // (RCTAttributedTextUtils: no offset when lineHeight < font.lineHeight). Shift them back down;
  // transform is visual only, so the layout box stays exactly as designed.
  const lift = Platform.OS === 'ios' ? Math.max(0, (s * SF_NATURAL_LINE - lineHeight) / 2) : 0;
  return (
    <Text
      maxFontSizeMultiplier={s >= 32 ? 1.15 : 1.5}
      {...rest}
      style={[
        {
          fontSize: s,
          fontWeight: w,
          color: color ?? colors[c],
          lineHeight,
          fontVariant: ['tabular-nums'],
        },
        lift > 0 && { transform: [{ translateY: lift }] },
        ls !== undefined && { letterSpacing: ls * s },
        upper && { textTransform: 'uppercase' },
        align && { textAlign: align },
        style,
      ]}
    />
  );
}

/** New York italic span, used inside a T for the design's serif accents. */
export function Em({ children }: { children: React.ReactNode }) {
  return <Text style={{ fontFamily: 'ui-serif', fontStyle: 'italic', fontWeight: '400' }}>{children}</Text>;
}

/** 12/600, .12em, uppercase, text2. */
export function Eyebrow({ children, style, c = 'text2' }: { children: React.ReactNode; style?: TextStyle; c?: ColorToken }) {
  return (
    <T s={12} w="600" ls={0.12} upper c={c} style={style} accessibilityRole="header">
      {children}
    </T>
  );
}

/** Title 32/600, -0.02em, line-height 1.08. */
export function Title({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  return (
    <T s={32} w="600" ls={-0.02} lh={1.08} style={style} accessibilityRole="header">
      {children}
    </T>
  );
}

/** Caption 12/400, text3, line-height 1.45. */
export function Caption({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  return (
    <T s={12} c="text3" lh={1.45} style={style}>
      {children}
    </T>
  );
}
