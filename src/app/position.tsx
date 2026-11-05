import { View } from 'react-native';

import { activity, position } from '@/data/sample';
import { fmtUSD } from '@/lib/format';
import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { Card, KVRow, NavBar, ScrollScreen } from '@/ui/primitives';
import { Eyebrow, T } from '@/ui/T';

export default function PositionScreen() {
  const nav = useNav();
  const c = useColors();
  const change = `+${fmtUSD(position.change)} (+${position.changePct.toFixed(2)}%)`;

  return (
    <ScrollScreen bottom={110} testID="screen-position">
      <NavBar onBack={nav.back} title="Your position" />
      <Eyebrow style={{ marginTop: 12 }}>Account value</Eyebrow>
      <T s={40} w="600" ls={-0.03} lh={1.1}>
        {fmtUSD(position.value)}
      </T>
      <T s={15} w="600" c="pos" style={{ marginTop: 4 }}>
        {change}
      </T>
      <Card style={{ marginTop: 24, paddingHorizontal: 16 }}>
        <KVRow label="Shares" value={position.shares} />
        <KVRow label="NAV per share" value={position.navPerShare} />
        <KVRow label="Total invested" value={fmtUSD(position.invested)} />
        <KVRow label="Value" value={fmtUSD(position.value)} />
        <KVRow label="Change" value={change} valueColor={c.pos} last />
      </Card>
      <T s={12} c="text3" style={{ marginTop: 8 }}>
        NAV as of {position.navAsOf}. NAV updates daily.
      </T>
      <Eyebrow style={{ marginTop: 28 }}>Activity</Eyebrow>
      {activity.map((a, i) => (
        <View
          key={`${a.date}-${i}`}
          accessible
          accessibilityLabel={`${a.title}, ${a.date}, ${a.status}, ${a.value}`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.border }}
        >
          <View style={{ flex: 1 }}>
            <T w="600">{a.title}</T>
            <T s={13} c="text2">
              {a.date} · {a.status}
            </T>
          </View>
          <T w="600">{a.value}</T>
        </View>
      ))}
    </ScrollScreen>
  );
}
