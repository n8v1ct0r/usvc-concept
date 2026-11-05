import { useIsFocused } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Settings } from 'react-native';
import { cancelAnimation, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

// UI tests launch the app with `-E2E YES` (NSUserDefaults argument domain). Endless loops
// keep the app from ever going idle, which stalls XCUITest before every interaction.
const E2E = Platform.OS === 'ios' && !!Settings.get('E2E');

/**
 * Whether an endless decorative loop (marquee, pulse, caret) should run: only on the
 * focused screen, never with Reduce Motion on, and never under UI tests.
 */
export function useLoopMotion(): boolean {
  const focused = useIsFocused();
  const reduced = useReducedMotion();
  return focused && !reduced && !E2E;
}

/**
 * Design keyframes usvcPulse (opacity .35 <-> 1). `period` is the full cycle in ms.
 * Rests at full opacity whenever looping is off.
 */
export function usePulse(period: number) {
  const run = useLoopMotion();
  const o = useSharedValue(1);
  useEffect(() => {
    if (run) {
      o.value = withRepeat(withTiming(0.35, { duration: period / 2 }), -1, true);
    } else {
      cancelAnimation(o);
      o.value = 1;
    }
    return () => cancelAnimation(o);
  }, [run, period, o]);
  return useAnimatedStyle(() => ({ opacity: o.value }));
}
