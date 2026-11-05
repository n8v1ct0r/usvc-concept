import type { ReactNode } from 'react';
import { View } from 'react-native';

import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { Check18 } from '@/ui/icons';
import { Badge, Card, FixedScreen, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Em, T, Title } from '@/ui/T';

export default function WhoScreen() {
  const nav = useNav();
  const c = useColors();

  const rows: { badge: ReactNode; title: string; body: string }[] = [
    {
      badge: (
        <T s={13} w="700" c="navText" maxFontSizeMultiplier={1}>
          US
        </T>
      ),
      title: 'U.S. individuals',
      body: 'Open to all U.S. investors, regardless of income or net worth.',
    },
    {
      badge: (
        <T s={13} w="700" c="navText" maxFontSizeMultiplier={1}>
          $
        </T>
      ),
      title: '$500 minimum',
      body: 'Buy and redeem at NAV. Daily NAV.',
    },
    { badge: <Check18 color={c.navText} />, title: 'No accreditation required', body: 'No network required. No performance fees.' },
  ];

  return (
    <FixedScreen testID="screen-who">
      <NavBar onBack={nav.back} right="Step 1 of 5" />
      <Title style={{ marginTop: 12 }}>
        Who can <Em>invest.</Em>
      </Title>
      <Card style={{ marginTop: 28 }}>
        {rows.map((r, i) => (
          <View
            key={r.title}
            accessible
            accessibilityLabel={`${r.title}. ${r.body}`}
            style={{
              flexDirection: 'row',
              gap: 14,
              paddingVertical: 18,
              paddingHorizontal: 16,
              alignItems: 'center',
              borderBottomWidth: i < rows.length - 1 ? 1 : 0,
              borderBottomColor: c.border,
            }}
          >
            <Badge fill={c.navBg}>{r.badge}</Badge>
            <View style={{ flex: 1 }}>
              <T w="600">{r.title}</T>
              <T s={14} c="text2">
                {r.body}
              </T>
            </View>
          </View>
        ))}
      </Card>
      <Spacer />
      <PrimaryButton label="Continue" onPress={() => nav.to('identity')} testID="continue" />
    </FixedScreen>
  );
}
