import { Pressable, View } from 'react-native';

import { holdings, HOLDINGS_AS_OF, HOLDINGS_NOTE } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { HoldingRow } from '@/ui/HoldingRow';
import { ScrollScreen } from '@/ui/primitives';
import { Caption, Em, Eyebrow, T, Title } from '@/ui/T';

export default function HoldingsScreen() {
  const nav = useNav();
  return (
    <ScrollScreen tabs testID="screen-holdings">
      <View style={{ height: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Eyebrow>Our holdings</Eyebrow>
        <Pressable onPress={() => nav.to('strategy')} accessibilityRole="button" accessibilityLabel="Our approach" hitSlop={8} testID="our-approach">
          <T s={13} w="600" c="accent" style={{ paddingVertical: 8 }}>
            Our approach
          </T>
        </Pressable>
      </View>
      <Title style={{ marginTop: 12 }}>
        Exceptional companies with <Em>room to compound.</Em>
      </Title>
      <T s={14} c="text2" style={{ marginTop: 12 }}>
        {HOLDINGS_AS_OF}
      </T>
      <View style={{ marginTop: 16 }}>
        {holdings.map((h) => (
          <HoldingRow key={h.id} holding={h} onPress={() => nav.toCompany(h.id)} />
        ))}
      </View>
      <Caption style={{ marginTop: 16 }}>{HOLDINGS_NOTE}</Caption>
    </ScrollScreen>
  );
}
