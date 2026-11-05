import { TextInput, View } from 'react-native';

import { position } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { Card, FixedScreen, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Eyebrow, T } from '@/ui/T';

export default function RepurchaseScreen() {
  const nav = useNav();
  const { c, tender, setTender } = useApp();
  return (
    <FixedScreen testID="screen-repurchase">
      <NavBar onBack={nav.back} title="Repurchase request" />
      <Card style={{ marginTop: 20, padding: 16, flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.pos }} />
        <View style={{ flex: 1 }}>
          <T w="600">Offer open</T>
          <T s={14} c="text2">
            Window Oct 6 to Nov 3, 2026
          </T>
        </View>
      </Card>
      <Eyebrow style={{ marginTop: 24 }}>Shares to tender</Eyebrow>
      <View
        style={{
          marginTop: 10,
          borderRadius: 14,
          backgroundColor: c.surface,
          paddingVertical: 14,
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: c.accent,
        }}
      >
        <TextInput
          value={tender}
          onChangeText={setTender}
          placeholder="0.000"
          placeholderTextColor={c.text3}
          keyboardType="decimal-pad"
          accessibilityLabel={`Shares to tender, of ${position.shares}`}
          testID="tender-input"
          maxFontSizeMultiplier={1.2}
          style={{
            fontSize: 28,
            fontWeight: '600',
            letterSpacing: -0.56,
            width: 200,
            color: c.text,
            padding: 0,
            fontVariant: ['tabular-nums'],
          }}
        />
        <T s={13} c="text2">
          of {position.shares}
        </T>
      </View>
      <T s={13} c="text2" style={{ marginTop: 8 }}>
        Repurchased at NAV. NAV per share {position.navPerShare}, as of {position.navAsOf}.
      </T>
      <Card outline style={{ marginTop: 20, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16 }}>
        <T s={14} c="text2" lh={1.45}>
          The Fund may repurchase up to 5% of total NAV this quarter. Offers may be oversubscribed. If so, requests are reduced pro rata and you may
          not sell all the shares you tender.
        </T>
      </Card>
      <Spacer />
      <PrimaryButton label="Submit request" onPress={nav.back} style={{ marginTop: 20 }} testID="submit-request" />
    </FixedScreen>
  );
}
