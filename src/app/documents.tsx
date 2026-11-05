import { View } from 'react-native';

import { statements } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { Card, NavBar, ScrollScreen } from '@/ui/primitives';
import { Caption, Eyebrow, T } from '@/ui/T';

function DocRow({ label, last = false }: { label: string; last?: boolean }) {
  const c = useColors();
  return (
    <View
      accessible
      accessibilityLabel={`${label}, PDF`}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 52,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: c.border,
      }}
    >
      <T w="500">{label}</T>
      <T s={13} w="600" c="accent">
        PDF
      </T>
    </View>
  );
}

export default function DocumentsScreen() {
  const nav = useNav();
  const c = useColors();
  return (
    <ScrollScreen testID="screen-documents">
      <NavBar onBack={nav.back} title="Documents" />
      <Eyebrow style={{ marginTop: 20 }}>Fund</Eyebrow>
      <Card style={{ marginTop: 8, paddingHorizontal: 16 }}>
        <DocRow label="Prospectus" />
        <DocRow label="Fund docs" last />
      </Card>
      <Eyebrow style={{ marginTop: 24 }}>Statements</Eyebrow>
      <Card style={{ marginTop: 8, paddingHorizontal: 16 }}>
        {statements.map((s) => (
          <DocRow key={s} label={s} />
        ))}
      </Card>
      <Eyebrow style={{ marginTop: 24 }}>Tax</Eyebrow>
      <View
        style={{
          marginTop: 8,
          borderRadius: 16,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: c.border,
          paddingVertical: 20,
          paddingHorizontal: 16,
          alignItems: 'center',
        }}
      >
        <T s={15} c="text2" align="center">
          Your 1099 will appear here.
        </T>
      </View>
      <Caption style={{ marginTop: 12 }}>
        One 1099. No K-1. Read the prospectus carefully before investing.
      </Caption>
    </ScrollScreen>
  );
}
