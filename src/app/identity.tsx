import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { usePulse } from '@/lib/motion';
import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { Lock } from '@/ui/icons';
import { FixedScreen, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Em, T, Title } from '@/ui/T';

// Display-only, exactly as designed: sample values and placeholders in static fields.
// No input is collected or stored.

function Field({ label, value, placeholder, focused, children }: { label: string; value?: string; placeholder?: string; focused?: boolean; children?: React.ReactNode }) {
  const c = useColors();
  return (
    <View
      accessible
      accessibilityLabel={`${label}, ${value ?? placeholder ?? ''}`}
      style={{
        borderRadius: 14,
        backgroundColor: c.surface,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: focused ? 1.5 : 0,
        borderColor: c.accent,
      }}
    >
      <T s={12} w="600" ls={0.08} upper c="text2">
        {label}
      </T>
      {children ?? (
        <T c={value ? 'text' : 'text3'} style={{ marginTop: 2 }}>
          {value ?? placeholder}
        </T>
      )}
    </View>
  );
}

function Caret() {
  const c = useColors();
  const style = usePulse(1000);
  return <Animated.View style={[{ width: 2, height: 18, backgroundColor: c.accent, marginLeft: 2 }, style]} />;
}

export default function IdentityScreen() {
  const nav = useNav();
  const c = useColors();
  return (
    <FixedScreen testID="screen-identity">
      <NavBar onBack={nav.back} right="Step 2 of 5" />
      <Title style={{ marginTop: 12 }}>
        Verify your <Em>identity.</Em>
      </Title>
      <View style={{ marginTop: 24, gap: 12 }}>
        <Field label="Legal name" value="Alex Rivera" />
        <Field label="Date of birth" placeholder="MM / DD / YYYY" />
        <Field label="Home address" placeholder="Street, city, state, ZIP" />
        <Field label="Social Security number" placeholder="••• •• ••••" focused>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <T ls={0.2}>••• •• ••••</T>
            <Caret />
          </View>
        </Field>
        <View style={{ flexDirection: 'row', gap: 10, paddingTop: 4, paddingHorizontal: 4 }}>
          <View style={{ marginTop: 1 }}>
            <Lock color={c.text2} />
          </View>
          <T s={14} c="text2" lh={1.4} style={{ flex: 1 }}>
            <T s={14} w="600" lh={1.4}>
              Why we ask.
            </T>{' '}
            Federal law requires us to verify your identity before you invest. We encrypt this data and never show it in full again.
          </T>
        </View>
      </View>
      <Spacer />
      <PrimaryButton label="Continue" onPress={() => nav.to('before')} testID="continue" />
    </FixedScreen>
  );
}
