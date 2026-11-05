import * as Haptics from 'expo-haptics';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { chartGeometry, indexFromX, SERIES, type RangeKey } from '@/lib/chart';
import { dateOf, fmtUSD } from '@/lib/format';
import { useColors } from '@/state/AppState';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const HEIGHT = 150;
const DASH = 1200;

/**
 * Account value chart (design: 362x150 at a 402pt device). Line draws in over 600ms.
 * Press and drag to scrub; a selection haptic fires on every new day.
 */
export function AccountChart({
  range,
  scrub,
  onScrub,
}: {
  range: RangeKey;
  /** absolute series index being scrubbed, or null */
  scrub: number | null;
  onScrub: (index: number | null) => void;
}) {
  const c = useColors();
  const [width, setWidth] = useState(0);
  const geo = useMemo(() => (width ? chartGeometry(SERIES, range, width, HEIGHT) : null), [range, width]);

  const dash = useSharedValue(DASH);
  useEffect(() => {
    dash.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) });
  }, [dash]);
  const lineProps = useAnimatedProps(() => ({ strokeDashoffset: dash.value }));

  // Selection haptic on every new day (design: "haptics: selection per chart day").
  const update = (x: number) => {
    if (!geo) return;
    const idx = indexFromX(x, width, geo);
    if (idx !== scrub) {
      Haptics.selectionAsync().catch(() => {});
      onScrub(idx);
    }
  };
  const end = () => onScrub(null);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .minDistance(0)
    .onBegin((e) => update(e.x))
    .onUpdate((e) => update(e.x))
    .onFinalize(() => end());

  const scrubbed = geo !== null && scrub !== null && scrub >= geo.offset;
  const sx = scrubbed ? geo.x(scrub - geo.offset) : 0;
  const sy = scrubbed ? geo.y(SERIES[scrub]) : 0;

  const first = geo ? geo.offset : 0;
  const summary = `Account value chart. ${dateOf(first)}: ${fmtUSD(SERIES[first])}. ${dateOf(SERIES.length - 1)}: ${fmtUSD(
    SERIES[SERIES.length - 1],
  )}.`;

  return (
    <GestureDetector gesture={pan}>
      <View
        testID="account-chart"
        accessible
        accessibilityRole="image"
        accessibilityLabel={summary}
        accessibilityHint="Press and drag to see the value on a given day."
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        style={{ height: HEIGHT }}
      >
        {geo ? (
          <Svg width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`} style={{ overflow: 'visible' }}>
            <Path d={geo.area} fill={c.accent} opacity={0.08} />
            <AnimatedPath
              d={geo.path}
              fill="none"
              stroke={c.accent}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={DASH}
              animatedProps={lineProps}
            />
            {scrubbed ? (
              <>
                <Line x1={sx} x2={sx} y1={0} y2={HEIGHT} stroke={c.text3} strokeWidth={1} strokeDasharray="3 3" />
                <Circle cx={sx} cy={sy} r={5} fill={c.accent} stroke={c.bg} strokeWidth={2.5} />
              </>
            ) : null}
          </Svg>
        ) : null}
      </View>
    </GestureDetector>
  );
}
