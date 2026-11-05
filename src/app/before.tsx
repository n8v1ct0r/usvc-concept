import { useState } from 'react';
import { View } from 'react-native';

import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { Card, CheckRow, FixedScreen, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Em, Eyebrow, T, Title } from '@/ui/T';

function Bullets({ mark, color, items }: { mark: string; color: string; items: string[] }) {
  return (
    <View style={{ marginTop: 10, gap: 8 }}>
      {items.map((item) => (
        <View key={item} style={{ flexDirection: 'row', gap: 10 }}>
          <T s={16} w="700" color={color} importantForAccessibility="no" accessibilityElementsHidden>
            {mark}
          </T>
          <T s={16} style={{ flex: 1 }}>
            {item}
          </T>
        </View>
      ))}
    </View>
  );
}

export default function BeforeScreen() {
  const nav = useNav();
  const c = useColors();
  const [readProsp, setReadProsp] = useState(false);

  return (
    <FixedScreen testID="screen-before">
      <NavBar onBack={nav.back} right="Step 3 of 5" />
      <Title style={{ marginTop: 12 }}>
        Built for the <Em>long game.</Em>
      </Title>
      <View style={{ marginTop: 24, gap: 12 }}>
        <Card style={{ padding: 16 }}>
          <Eyebrow>Built for investors who</Eyebrow>
          <Bullets mark="+" color={c.pos} items={['think in years, not months', 'value patience', 'want ownership, not exposure']} />
        </Card>
        <Card outline style={{ padding: 16 }}>
          <Eyebrow>Not the right fit if you</Eyebrow>
          <Bullets mark="x" color={c.text3} items={['need short-term liquidity', 'want to trade, not invest', "can't tolerate risk"]} />
        </Card>
      </View>
      <Spacer />
      <CheckRow checked={readProsp} onToggle={() => setReadProsp((v) => !v)} label="I've read the prospectus" paddingV={12} testID="read-prospectus">
        <T s={15}>
          I&apos;ve read the{' '}
          <T s={15} w="600" c="accent">
            prospectus
          </T>
        </T>
      </CheckRow>
      <PrimaryButton label="Continue" disabled={!readProsp} onPress={() => nav.to('faceid')} testID="continue" />
    </FixedScreen>
  );
}
