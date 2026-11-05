import { View } from 'react-native';

import { activity, position } from '@/data/sample';
import { fmtUSD } from '@/lib/format';
import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { Plus } from '@/ui/icons';
import { Badge, NavBar, ScrollScreen } from '@/ui/primitives';
import { T } from '@/ui/T';

export default function ActivityScreen() {
  const nav = useNav();
  const c = useColors();
  return (
    <ScrollScreen testID="screen-activity">
      <NavBar onBack={nav.back} title="Activity" />
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} accessible accessibilityLabel={`Total invested ${fmtUSD(position.invested)}`}>
        <T s={14} c="text2">
          Total invested
        </T>
        <T s={14} w="600">
          {fmtUSD(position.invested)}
        </T>
      </View>
      <View style={{ marginTop: 8 }}>
        {activity.map((a, i) => (
          <View
            key={`${a.date}-${i}`}
            accessible
            accessibilityLabel={`${a.title}, ${a.date}, ${a.value}, ${a.status}`}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.border }}
          >
            <Badge fill={c.surface}>
              <Plus color={c.text} size={18} />
            </Badge>
            <View style={{ flex: 1 }}>
              <T w="600">{a.title}</T>
              <T s={13} c="text2">
                {a.date}
              </T>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <T w="600">{a.value}</T>
              <T s={12} w="600" c="pos">
                {a.status}
              </T>
            </View>
          </View>
        ))}
      </View>
    </ScrollScreen>
  );
}
