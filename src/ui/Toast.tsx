import { useEffect } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/state/AppState';
import { ToastCheck } from '@/ui/icons';
import { T } from '@/ui/T';

// Design keyframes usvcToast, 2.4s: 0-12% slide in from -24pt, hold, 88-100% slide out.
const IN = 288;
const HOLD = 1824;
const OUT = 288;

export function ToastHost() {
  const { toast } = useApp();
  if (!toast) return null;
  return <ToastPill key={toast.id} message={toast.message} />;
}

function ToastPill({ message }: { message: string }) {
  const { c } = useApp();
  const insets = useSafeAreaInsets();
  const p = useSharedValue(0);

  useEffect(() => {
    const ease = Easing.inOut(Easing.ease);
    p.value = withSequence(withTiming(1, { duration: IN, easing: ease }), withDelay(HOLD, withTiming(0, { duration: OUT, easing: ease })));
    AccessibilityInfo.announceForAccessibility(message);
  }, [message, p]);

  const style = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: (1 - p.value) * -24 }],
  }));

  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: insets.top, left: 0, right: 0, alignItems: 'center', zIndex: 40 }}>
      <Animated.View
        testID="toast"
        accessibilityLiveRegion="polite"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: c.navBg,
            paddingVertical: 10,
            paddingLeft: 12,
            paddingRight: 16,
            borderRadius: 999,
            shadowColor: '#05162C',
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 8 },
          },
          style,
        ]}
      >
        <ToastCheck color={c.navText} />
        <T s={14} w="600" c="navText">
          {message}
        </T>
      </Animated.View>
    </View>
  );
}
