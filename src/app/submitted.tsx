import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { amountValue, fmtUSD } from '@/lib/format';
import { usePulse } from '@/lib/motion';
import { useNav } from '@/lib/nav';
import { DEFAULT_AMOUNT, useApp } from '@/state/AppState';
import { Check } from '@/ui/icons';
import { Card, FixedScreen, PrimaryButton, Spacer } from '@/ui/primitives';
import { Em, Eyebrow, T, Title } from '@/ui/T';

const AnimatedPath = Animated.createAnimatedComponent(Path);

/** Check that draws in over 400ms after 100ms (design: usvcDraw on the success mark). */
function DrawnCheck({ color }: { color: string }) {
  const dash = useSharedValue(60);
  useEffect(() => {
    dash.value = withDelay(100, withTiming(0, { duration: 400, easing: Easing.out(Easing.quad) }));
  }, [dash]);
  const props = useAnimatedProps(() => ({ strokeDashoffset: dash.value }));
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
      <AnimatedPath d="M10 23l8 8L34 14" stroke={color} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={60} animatedProps={props} />
    </Svg>
  );
}

function PulseDot({ color }: { color: string }) {
  const style = usePulse(1400);
  return <Animated.View style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }, style]} />;
}

export default function SubmittedScreen() {
  const nav = useNav();
  const { c, amount, setAmount, setMode, showToast } = useApp();
  const cents = fmtUSD(amountValue(amount));

  const steps = [
    {
      key: 'submitted',
      label: 'Submitted',
      meta: 'Sep 23, 2026',
      mark: (
        <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: c.pos, alignItems: 'center', justifyContent: 'center' }}>
          <Check color="#FFFFFF" size={13} strokeWidth={2.4} />
        </View>
      ),
    },
    {
      key: 'accepted',
      label: 'Accepted',
      meta: 'Pending',
      mark: (
        <View style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: c.accent, alignItems: 'center', justifyContent: 'center' }}>
          <PulseDot color={c.accent} />
        </View>
      ),
    },
    {
      key: 'issued',
      label: 'Shares issued',
      meta: 'Next NAV',
      mark: <View style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: c.border }} />,
    },
  ];

  const done = () => {
    setAmount(DEFAULT_AMOUNT);
    setMode('one');
    nav.reset('/');
    showToast('Investment submitted');
  };

  return (
    <FixedScreen top={38} testID="screen-submitted">
      <View style={{ alignItems: 'center', gap: 16 }}>
        <View style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: c.navBg, alignItems: 'center', justifyContent: 'center' }}>
          <DrawnCheck color={c.navText} />
        </View>
        <Title style={{ textAlign: 'center' }}>
          Investment <Em>submitted.</Em>
        </Title>
        <T s={40} w="600" ls={-0.03} lh={1} testID="submitted-amount">
          {cents}
        </T>
      </View>
      <Card style={{ marginTop: 32, paddingVertical: 4, paddingHorizontal: 16 }}>
        {steps.map((s, i) => (
          <View
            key={s.key}
            accessible
            accessibilityLabel={`${s.label}, ${s.meta}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              paddingVertical: 14,
              borderBottomWidth: i < steps.length - 1 ? 1 : 0,
              borderBottomColor: c.border,
            }}
          >
            {s.mark}
            <T w="600" c={s.key === 'issued' ? 'text2' : 'text'} style={{ flex: 1 }}>
              {s.label}
            </T>
            <T s={13} c={s.key === 'issued' ? 'text3' : 'text2'}>
              {s.meta}
            </T>
          </View>
        ))}
      </Card>
      <Eyebrow style={{ marginTop: 24 }}>What happens next</Eyebrow>
      <T s={15} c="text2" lh={1.45} style={{ marginTop: 8 }}>
        We pull {cents} from Checking ••0921. Units are generally purchased at the next calculated NAV per share after the investment is accepted. NAV
        updates daily. Your shares appear on Home once issued.
      </T>
      <Spacer />
      <PrimaryButton label="Done" onPress={done} style={{ marginTop: 20 }} testID="done" />
    </FixedScreen>
  );
}
