import { View } from 'react-native';

import { feeBreakdown, feeTable } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { Card, KVRow, NavBar, ScrollScreen } from '@/ui/primitives';
import { Caption, Em, Eyebrow, T, Title } from '@/ui/T';

// Grid columns 1.4fr 1fr 1fr
const COLS = [1.4, 1, 1];

export default function FeesScreen() {
  const nav = useNav();
  const c = useColors();
  return (
    <ScrollScreen testID="screen-fees">
      <NavBar onBack={nav.back} />
      <Eyebrow style={{ marginTop: 12 }}>Our fees</Eyebrow>
      <Title style={{ marginTop: 8 }}>
        More of the upside <Em>stays with you.</Em>
      </Title>
      <Card style={{ marginTop: 24, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: c.border }} importantForAccessibility="no-hide-descendants">
          <View style={{ flex: COLS[0] }} />
          <T s={11} w="600" ls={0.1} upper style={{ flex: COLS[1] }}>
            USVC
          </T>
          <T s={11} w="600" ls={0.1} upper c="text3" style={{ flex: COLS[2] }}>
            Traditional
          </T>
        </View>
        {feeTable.map((r) => (
          <View
            key={r.label}
            accessible
            accessibilityLabel={`${r.label}: USVC ${r.usvc}, traditional ${r.traditional}`}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.border }}
          >
            <T s={15} c="text2" style={{ flex: COLS[0] }}>
              {r.label}
            </T>
            <T s={15} w="600" style={{ flex: COLS[1] }}>
              {r.usvc}
            </T>
            <T s={15} c="text2" style={{ flex: COLS[2] }}>
              {r.traditional}
            </T>
          </View>
        ))}
      </Card>
      <Eyebrow style={{ marginTop: 24 }}>Fees breakdown</Eyebrow>
      <Card outline style={{ marginTop: 8, paddingHorizontal: 16 }}>
        {feeBreakdown.map((r) => (
          <KVRow key={r.label} label={r.label} value={r.value} size={15} paddingV={13} />
        ))}
        <KVRow label="Forecast net annual expenses" value="2.50%" size={15} paddingV={13} labelBold last />
      </Card>
      <Caption style={{ marginTop: 12 }}>
        Estimates as of July 28, 2026. The fee waiver runs through at least November 24, 2027. No sales load when you invest directly with USVC. Up to
        3% through other channels.
      </Caption>
    </ScrollScreen>
  );
}
