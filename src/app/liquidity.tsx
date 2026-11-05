import { Pressable, View } from 'react-native';

import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { Card, NavBar, ScrollScreen, Toggle } from '@/ui/primitives';
import { Eyebrow, T } from '@/ui/T';

const HOW = [
  'Shares are not listed on any exchange and are illiquid.',
  'The Fund may offer to repurchase up to 5% of total NAV per quarter, at the sole discretion of the Board of Trustees.',
  'Offers are not guaranteed and may be oversubscribed.',
  'Buy and redeem at NAV.',
];

export default function LiquidityScreen() {
  const nav = useNav();
  const { c, notify, setNotify } = useApp();
  return (
    <ScrollScreen testID="screen-liquidity">
      <NavBar onBack={nav.back} title="Liquidity" />
      <Card style={{ marginTop: 20, padding: 16, flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.text3 }} />
        <T w="600" style={{ flex: 1 }}>
          No repurchase offer is open right now.
        </T>
      </Card>
      <Eyebrow style={{ marginTop: 24 }}>How repurchase offers work</Eyebrow>
      <View style={{ marginTop: 12, gap: 12 }}>
        {HOW.map((p) => (
          <T key={p} s={16} lh={1.5}>
            {p}
          </T>
        ))}
      </View>
      <Card outline style={{ marginTop: 24, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T w="600">Notify me</T>
          <T s={14} c="text2">
            When the Board opens an offer.
          </T>
        </View>
        <Toggle value={notify} onChange={setNotify} label="Notify me when the Board opens an offer" testID="toggle-notify" />
      </Card>
      <Pressable
        onPress={() => nav.to('repurchase')}
        accessibilityRole="button"
        accessibilityLabel="Preview an open offer"
        testID="preview-offer"
        style={{ marginTop: 20, minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
      >
        <T s={14} w="600" c="accent">
          Preview an open offer
        </T>
      </Pressable>
    </ScrollScreen>
  );
}
