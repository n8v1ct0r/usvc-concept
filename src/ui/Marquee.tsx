import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { holdings } from '@/data/sample';
import { useLoopMotion } from '@/lib/motion';
import { useColors } from '@/state/AppState';
import { T } from '@/ui/T';

// Design: holdings strip (list doubled), translateX 0 -> -50% over 40s, linear, infinite.
export function HoldingsMarquee() {
  const c = useColors();
  const [half, setHalf] = useState(0);
  const x = useSharedValue(0);
  const run = useLoopMotion();

  useEffect(() => {
    if (!half || !run) {
      cancelAnimation(x);
      return;
    }
    // resume from the current offset so pausing and resuming does not jump
    const remaining = 40000 * (1 - Math.abs(x.value) / half);
    x.value = withTiming(-half, { duration: remaining, easing: Easing.linear }, (done) => {
      if (done) {
        x.value = 0;
        x.value = withRepeat(withTiming(-half, { duration: 40000, easing: Easing.linear }), -1, false);
      }
    });
    return () => cancelAnimation(x);
  }, [half, run, x]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const strip = holdings.concat(holdings);

  return (
    <View
      accessible
      accessibilityLabel={`Holdings include ${holdings.map((h) => h.name).join(', ')}`}
      style={{ overflow: 'hidden', paddingTop: 12, paddingBottom: 18, borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.border }}
    >
      <Animated.View
        onLayout={(e) => setHalf(e.nativeEvent.layout.width / 2)}
        style={[{ flexDirection: 'row', alignSelf: 'flex-start', gap: 28, paddingRight: 28 }, style]}
      >
        {strip.map((h, i) => (
          <View key={`${h.id}-${i}`} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <StripLogo uri={h.logo} />
            <T s={15} w="600" c="text2" maxFontSizeMultiplier={1.2}>
              {h.name}
            </T>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

/** Bare 22pt logo, hidden if it fails to load (design: img onError hides it). */
function StripLogo({ uri }: { uri: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <Image
      source={{ uri }}
      onError={() => setFailed(true)}
      contentFit="cover"
      cachePolicy="disk"
      style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: '#FFFFFF' }}
    />
  );
}
