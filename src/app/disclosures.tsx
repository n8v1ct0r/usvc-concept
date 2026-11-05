import { View } from 'react-native';

import { disclosures } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { NavBar, ScrollScreen } from '@/ui/primitives';
import { T } from '@/ui/T';

export default function DisclosuresScreen() {
  const nav = useNav();
  return (
    <ScrollScreen testID="screen-disclosures">
      <NavBar onBack={nav.back} title="Disclosures" />
      <View style={{ marginTop: 16, gap: 14 }}>
        {disclosures.map((d) => (
          <T key={d.slice(0, 40)} s={14} c="text2" lh={1.55}>
            {d}
          </T>
        ))}
      </View>
    </ScrollScreen>
  );
}
