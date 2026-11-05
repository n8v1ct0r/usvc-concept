import { View } from 'react-native';

import { useNav } from '@/lib/nav';
import { Card, FixedScreen, NavBar } from '@/ui/primitives';
import { Em, Eyebrow, T, Title } from '@/ui/T';

const STEPS = [
  { n: '01', title: 'Emerging managers', body: 'USVC becomes an LP in select venture funds.' },
  { n: '02', title: 'Growth rounds', body: 'Following winners into later rounds.' },
  {
    n: '03',
    title: 'Secondaries',
    body: 'Buying existing ownership stakes in private companies with traction, sourced through the AngelList network and data.',
  },
];

export default function StrategyScreen() {
  const nav = useNav();
  return (
    <FixedScreen testID="screen-strategy">
      <NavBar onBack={nav.back} />
      <Eyebrow style={{ marginTop: 12 }}>Our approach</Eyebrow>
      <Title style={{ marginTop: 8 }}>
        Our <Em>investment</Em> strategy
      </Title>
      <View style={{ marginTop: 24, gap: 12 }}>
        {STEPS.map((s) => (
          <Card key={s.n} style={{ paddingVertical: 18, paddingHorizontal: 16 }}>
            <T s={11} w="600" ls={0.1} upper c="text3">
              {s.n}
            </T>
            <T s={20} w="600" ls={-0.01} style={{ marginTop: 4 }}>
              {s.title}
            </T>
            <T s={15} c="text2" lh={1.45} style={{ marginTop: 6 }}>
              {s.body}
            </T>
          </Card>
        ))}
      </View>
    </FixedScreen>
  );
}
