import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Appearance } from 'react-native';

import { palettes, type Palette, type ThemeName } from '@/theme/tokens';

// Device-local preferences only. No personal or financial data is stored.
const THEME_KEY = 'usvc.theme';
const ONBOARDED_KEY = 'usvc.onboarded';

export type InvestMode = 'one' | 'monthly';

type Toast = { id: number; message: string };

type AppStateValue = {
  ready: boolean;
  theme: ThemeName;
  c: Palette;
  toggleTheme: () => void;
  onboarded: boolean;
  setOnboarded: (value: boolean) => void;
  amount: string;
  setAmount: (value: string | ((prev: string) => string)) => void;
  mode: InvestMode;
  setMode: (mode: InvestMode) => void;
  faceId: boolean;
  setFaceId: (value: boolean) => void;
  notify: boolean;
  setNotify: (value: boolean) => void;
  tender: string;
  setTender: (value: string) => void;
  toast: Toast | null;
  showToast: (message: string) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export const DEFAULT_AMOUNT = '1000';

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
  const [onboarded, setOnboardedState] = useState(false);
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [mode, setMode] = useState<InvestMode>('one');
  const [faceId, setFaceId] = useState(true);
  const [notify, setNotify] = useState(false);
  const [tender, setTender] = useState('');
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [savedTheme, savedOnboarded] = await Promise.all([
          AsyncStorage.getItem(THEME_KEY),
          AsyncStorage.getItem(ONBOARDED_KEY),
        ]);
        if (!alive) return;
        if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
        setOnboardedState(savedOnboarded === '1');
      } catch {
        // Storage unavailable: fall back to system theme and the welcome flow.
      } finally {
        if (alive) setReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem(THEME_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const setOnboarded = useCallback((value: boolean) => {
    setOnboardedState(value);
    AsyncStorage.setItem(ONBOARDED_KEY, value ? '1' : '0').catch(() => {});
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const value = useMemo<AppStateValue>(
    () => ({
      ready,
      theme,
      c: palettes[theme],
      toggleTheme,
      onboarded,
      setOnboarded,
      amount,
      setAmount,
      mode,
      setMode,
      faceId,
      setFaceId,
      notify,
      setNotify,
      tender,
      setTender,
      toast,
      showToast,
    }),
    [ready, theme, toggleTheme, onboarded, setOnboarded, amount, mode, faceId, notify, tender, toast, showToast],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useApp(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useApp must be used inside <AppStateProvider>');
  return ctx;
}

/** Current palette. */
export function useColors(): Palette {
  return useApp().c;
}
