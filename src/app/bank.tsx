import { View } from 'react-native';

import { banks } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { Search } from '@/ui/icons';
import { LinkedAccountCard } from '@/ui/LinkedAccount';
import { FixedScreen, LogoTile, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Em, Eyebrow, T, Title } from '@/ui/T';

// Display-only bank picker with a sample linked account, as designed. Nothing is connected.

export default function BankScreen() {
  const nav = useNav();
  const { c, setOnboarded } = useApp();

  return (
    <FixedScreen testID="screen-bank">
      <NavBar onBack={nav.back} right="Step 5 of 5" />
      <Title style={{ marginTop: 12 }}>
        Link a <Em>bank.</Em>
      </Title>
      <View
        accessible
        accessibilityLabel="Search banks"
        style={{ marginTop: 20, height: 48, borderRadius: 14, backgroundColor: c.surface, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 }}
      >
        <Search color={c.text3} />
        <T s={16} c="text3">
          Search banks
        </T>
      </View>
      <View style={{ marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {banks.map((b) => (
          <View
            key={b.name}
            accessible
            accessibilityLabel={b.name}
            style={{
              width: '31.2%',
              flexGrow: 1,
              borderRadius: 14,
              backgroundColor: c.surface,
              paddingVertical: 14,
              paddingHorizontal: 10,
              alignItems: 'center',
              gap: 8,
              minHeight: 88,
            }}
          >
            <LogoTile monogram={b.monogram} logo={b.logo} size={40} radius={10} fontSize={13} background="white" />
            <T s={12} w="600" c="text2" align="center">
              {b.name}
            </T>
          </View>
        ))}
      </View>
      <Eyebrow style={{ marginTop: 20 }}>Linked account</Eyebrow>
      <LinkedAccountCard style={{ marginTop: 10 }} />
      <Spacer />
      <PrimaryButton
        label="Continue"
        testID="continue"
        onPress={() => {
          setOnboarded(true);
          nav.reset('/');
        }}
      />
    </FixedScreen>
  );
}
