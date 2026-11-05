import { View } from 'react-native';

import { team } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { NavBar, ScrollScreen } from '@/ui/primitives';
import { Caption, Em, Eyebrow, T, Title } from '@/ui/T';

export default function TeamScreen() {
  const nav = useNav();
  const c = useColors();
  return (
    <ScrollScreen testID="screen-team">
      <NavBar onBack={nav.back} />
      <Eyebrow style={{ marginTop: 12 }}>Our team</Eyebrow>
      <Title style={{ marginTop: 8 }}>
        Guided by experienced <Em>industry experts.</Em>
      </Title>
      <View style={{ marginTop: 20 }}>
        {team.map((p) => (
          <View
            key={p.name}
            accessible
            accessibilityLabel={`${p.name}, ${p.role}`}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.border }}
          >
            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }}>
              <T s={15} w="700" maxFontSizeMultiplier={1}>
                {p.initials}
              </T>
            </View>
            <View style={{ flex: 1 }}>
              <T w="600">{p.name}</T>
              <T s={14} c="text2">
                {p.role}
              </T>
            </View>
          </View>
        ))}
      </View>
      <Caption style={{ marginTop: 16 }}>Fictional names. This is an unofficial concept, not affiliated with USVC.</Caption>
    </ScrollScreen>
  );
}
