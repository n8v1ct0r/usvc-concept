import Svg, { Circle, Path, Rect } from 'react-native-svg';

// Icons ported 1:1 from the design's inline SVGs (same viewBox, path data, stroke widths).

type P = { color: string; size?: number; strokeWidth?: number };

export function ChevronBack({ color }: P) {
  return (
    <Svg width={12} height={20} viewBox="0 0 12 20" fill="none">
      <Path d="M10 2L2 10l8 8" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CloseX({ color }: P) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

export function ChevronRight({ color }: P) {
  return (
    <Svg width={8} height={14} viewBox="0 0 8 14" fill="none">
      <Path d="M1.5 1.5L6.5 7l-5 5.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Check on the 14-unit grid (checkboxes, status steps, linked-account badge). */
export function Check({ color, size = 14, strokeWidth = 2.2 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M2.5 7.5l3 3L11.5 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Toast check (16-unit grid). */
export function ToastCheck({ color }: P) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M3 8.5l3.2 3L13 4.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** Simple check used on onboarding "No accreditation required" tile (18-unit grid). */
export function Check18({ color }: P) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M3 9.5l4 4L15 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function Plus({ color, size = 24, strokeWidth = 2.2 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function Recurring({ color, size = 24 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12a8 8 0 0 1 13.6-5.7L20 8.5M20 4v4.5h-4.5" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 12a8 8 0 0 1-13.6 5.7L4 15.5M4 20v-4.5h4.5" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function DocumentIcon({ color, size = 24 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 3h8l5 5v13H6z" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 3v5h5M9 13h7M9 17h7" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function Drop({ color, size = 24 }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ThemeDot({ color }: P) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={7} stroke={color} strokeWidth={1.8} />
      <Path d="M10 3a7 7 0 0 1 0 14z" fill={color} />
    </Svg>
  );
}

/** Face ID glyph (52-unit grid). */
export function FaceId({ color, size = 52, strokeWidth = 2.6 }: P) {
  const common = { stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <Svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <Path d="M4 16V9a5 5 0 0 1 5-5h7M36 4h7a5 5 0 0 1 5 5v7M48 36v7a5 5 0 0 1-5 5h-7M16 48H9a5 5 0 0 1-5-5v-7" {...common} />
      <Path d="M17 20v4M35 20v4M26 20v9h-3" {...common} />
      <Path d="M18 34c2.5 3 5.2 4.5 8 4.5s5.5-1.5 8-4.5" {...common} />
    </Svg>
  );
}

export function Lock({ color }: P) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Rect x={3} y={8} width={12} height={8} rx={2} stroke={color} strokeWidth={1.6} />
      <Path d="M6 8V5.5a3 3 0 0 1 6 0V8" stroke={color} strokeWidth={1.6} />
    </Svg>
  );
}

export function Search({ color }: P) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Circle cx={8} cy={8} r={5.5} stroke={color} strokeWidth={2} />
      <Path d="M12.5 12.5L16 16" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ExternalArrow({ color }: P) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path d="M3 9l6-6M4 3h5v5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TabHome({ color }: P) {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
      <Path d="M4 12l9-8 9 8v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M10 23v-7h6v7" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function TabHoldings({ color }: P) {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
      <Rect x={4} y={4} width={8} height={8} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Rect x={14} y={4} width={8} height={8} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Rect x={4} y={14} width={8} height={8} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Rect x={14} y={14} width={8} height={8} rx={2} stroke={color} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

export function TabUpdates({ color }: P) {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
      <Path d="M5 5h16v16H5z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 10h8M9 14h8M9 18h5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TabAccount({ color }: P) {
  return (
    <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
      <Circle cx={13} cy={9} r={4.5} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M4.5 23a8.5 8.5 0 0 1 17 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
