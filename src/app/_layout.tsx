import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppStateProvider, useApp } from '@/state/AppState';
import { ToastHost } from '@/ui/Toast';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppStateProvider>
          <RootNavigator />
        </AppStateProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { ready, onboarded, c, theme } = useApp();
  const router = useRouter();
  const launched = useRef(false);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(c.bg).catch(() => {});
  }, [c.bg]);

  // Cold start: first-time visitors land on Welcome. The splash stays up until the
  // redirect has landed so Home never flashes first.
  useEffect(() => {
    if (!ready || launched.current) return;
    launched.current = true;
    if (!onboarded) router.replace('/welcome');
    const t = setTimeout(() => SplashScreen.hideAsync().catch(() => {}), onboarded ? 0 : 120);
    return () => clearTimeout(t);
  }, [ready, onboarded, router]);

  if (!ready) return null;

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="welcome" options={{ gestureEnabled: false, animation: 'fade' }} />
        <Stack.Screen name="amount" options={{ gestureDirection: 'vertical', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="submitted" options={{ gestureEnabled: false }} />
      </Stack>
      <ToastHost />
    </>
  );
}
