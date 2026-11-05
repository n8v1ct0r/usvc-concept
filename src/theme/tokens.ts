// Colour tokens from the Claude Design file "USVC iOS App.dc.html" (this.C).
// Brand navy #05162C. Light is primary.

export type ThemeName = 'light' | 'dark';

export type Palette = {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  text2: string;
  text3: string;
  border: string;
  accent: string;
  pos: string;
  navBg: string;
  navText: string;
  tabBg: string;
  toggleOff: string;
  checkOff: string;
};

export const palettes: Record<ThemeName, Palette> = {
  light: {
    bg: '#FFFFFF',
    surface: '#F3F5F8',
    surface2: '#E8ECF2',
    text: '#05162C',
    text2: '#5A6B80',
    text3: '#6B7A8F',
    border: '#E3E8EF',
    accent: '#1B4BD6',
    pos: '#137A4A',
    navBg: '#05162C',
    navText: '#FFFFFF',
    tabBg: 'rgba(255,255,255,0.92)',
    toggleOff: '#E8ECF2',
    checkOff: '#C7D0DC',
  },
  dark: {
    bg: '#05162C',
    surface: '#0E2444',
    surface2: '#173257',
    text: '#FFFFFF',
    text2: '#A6B5C9',
    text3: '#8E9DB3',
    border: '#1C3559',
    accent: '#7C9EFF',
    pos: '#5BD495',
    navBg: '#FFFFFF',
    navText: '#05162C',
    tabBg: 'rgba(5,22,44,0.92)',
    toggleOff: '#173257',
    checkOff: '#3A5580',
  },
};

export type ColorToken = keyof Palette;

// Scrim colours used by the sheet and the Face ID overlay.
export const scrim = {
  sheet: 'rgba(5,22,44,0.45)',
  scan: 'rgba(5,22,44,0.55)',
};

// Layout constants from the design system board.
export const layout = {
  side: 20, // side margin
  tapTarget: 44,
  cta: 56,
  radius: { button: 14, card: 16, tile: 12, actionTile: 18, sheet: 28, chip: 999 },
};
