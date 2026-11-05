import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { amountDisplay, amountValue } from '@/lib/format';
import { applyKey, KEYPAD_KEYS, MIN_INVESTMENT, type KeypadKey } from '@/lib/keypad';
import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { scrim } from '@/theme/tokens';
import { Plus } from '@/ui/icons';
import { LinkedAccountCard } from '@/ui/LinkedAccount';
import { Badge, FixedScreen, NavBar, PrimaryButton, QuickChip } from '@/ui/primitives';
import { T } from '@/ui/T';

function ModeSwitch({ onMonthly }: { onMonthly: () => void }) {
  const { c, mode, setMode } = useApp();
  const seg = (key: 'one' | 'monthly', label: string, onPress: () => void) => {
    const on = mode === key;
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="tab"
        accessibilityLabel={label}
        accessibilityState={{ selected: on }}
        testID={`mode-${key}`}
        style={[
          { height: 32, paddingHorizontal: 16, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? c.bg : 'transparent' },
          on && key === 'one'
            ? { shadowColor: '#05162C', shadowOpacity: 0.12, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } }
            : null,
        ]}
      >
        <T s={13} w="600" c={on ? 'text' : 'text2'} maxFontSizeMultiplier={1.2}>
          {label}
        </T>
      </Pressable>
    );
  };
  return (
    <View style={{ flexDirection: 'row', backgroundColor: c.surface, borderRadius: 999, padding: 3 }}>
      {seg('one', 'One-time', () => setMode('one'))}
      {seg('monthly', 'Monthly', onMonthly)}
    </View>
  );
}

function Key({ k, onPress }: { k: KeypadKey; onPress: () => void }) {
  const { c } = useApp();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="keyboardkey"
      accessibilityLabel={k === 'del' ? 'Delete' : k === '.' ? 'Decimal point' : k}
      testID={`key-${k}`}
      style={({ pressed }) => ({
        width: '31.9%',
        flexGrow: 1,
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pressed ? c.surface : 'transparent',
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
    >
      <T s={26} w="500" lh={1.2} maxFontSizeMultiplier={1}>
        {k === 'del' ? '⌫' : k}
      </T>
    </Pressable>
  );
}

export default function AmountScreen() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const { c, amount, setAmount, setMode } = useApp();
  const [sheet, setSheet] = useState(false);

  const amt = amountValue(amount);
  const tooLow = amt < MIN_INVESTMENT;

  const toReview = () => {
    setSheet(false);
    nav.to('review');
  };

  const sheetLayer = sheet ? (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} testID="funding-sheet">
      <Animated.View entering={FadeIn.duration(250)} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Pressable
          onPress={() => setSheet(false)}
          accessibilityRole="button"
          accessibilityLabel="Close"
          style={{ flex: 1, backgroundColor: scrim.sheet }}
        />
      </Animated.View>
      <Animated.View
        entering={SlideInDown.duration(250)}
        accessibilityViewIsModal
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: c.bg,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          paddingTop: 12,
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 14,
        }}
      >
        <View style={{ width: 36, height: 5, borderRadius: 3, backgroundColor: c.border, alignSelf: 'center', marginBottom: 20 }} />
        <T s={20} w="600" ls={-0.01} accessibilityRole="header">
          Pay from
        </T>
        <LinkedAccountCard onPress={toReview} style={{ marginTop: 16 }} testID="pay-from-checking" />
        <View
          accessible
          accessibilityLabel="Add bank"
          style={{
            marginTop: 10,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: c.border,
            paddingVertical: 14,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            minHeight: 56,
          }}
        >
          <Badge fill={c.surface}>
            <Plus color={c.text} size={18} />
          </Badge>
          <T w="600">Add bank</T>
        </View>
        <PrimaryButton label="Continue" onPress={toReview} style={{ marginTop: 20 }} testID="sheet-continue" />
      </Animated.View>
    </View>
  ) : null;

  return (
    <FixedScreen overlay={sheetLayer} testID="screen-amount">
      <NavBar
        onBack={nav.back}
        close
        center={
          <ModeSwitch
            onMonthly={() => {
              setMode('monthly');
              nav.to('recurring');
            }}
          />
        }
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 120 }}>
        <T
          s={64}
          w="600"
          ls={-0.04}
          lh={1}
          c={amt > 0 ? 'text' : 'text3'}
          accessibilityLabel={`Amount ${amountDisplay(amount)}`}
          accessibilityLiveRegion="polite"
          testID="amount-display"
        >
          {amountDisplay(amount)}
        </T>
        <T s={14} c="text2">
          $500 minimum
        </T>
      </View>
      <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
        <QuickChip label="$500" testID="chip-500" onPress={() => setAmount('500')} />
        <QuickChip label="$1K" accessibilityLabel="$1,000" testID="chip-1k" onPress={() => setAmount('1000')} />
        <QuickChip label="$5K" accessibilityLabel="$5,000" testID="chip-5k" onPress={() => setAmount('5000')} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
        {KEYPAD_KEYS.map((k) => (
          <Key key={k} k={k} onPress={() => setAmount((a) => applyKey(a, k))} />
        ))}
      </View>
      <PrimaryButton
        label="Continue"
        disabled={tooLow}
        onPress={() => setSheet(true)}
        style={{ marginTop: 12 }}
        testID="amount-continue"
        accessibilityHint={tooLow ? 'Enter at least $500' : undefined}
      />
    </FixedScreen>
  );
}
