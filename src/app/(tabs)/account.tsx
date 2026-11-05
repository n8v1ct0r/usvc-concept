import { Pressable, View } from 'react-native';

import { accountGroups, investor } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { Card, LinkRow, ScrollScreen } from '@/ui/primitives';
import { Eyebrow, T } from '@/ui/T';

export default function AccountScreen() {
  const nav = useNav();
  const { c, faceId, setOnboarded } = useApp();

  const signOut = () => {
    setOnboarded(false);
    nav.reset('/welcome');
  };

  return (
    <ScrollScreen tabs testID="screen-account">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, height: 56 }} accessible accessibilityLabel={`${investor.name}, ${investor.since}`}>
        <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: c.navBg, alignItems: 'center', justifyContent: 'center' }}>
          <T s={18} w="700" c="navText" maxFontSizeMultiplier={1}>
            {investor.initials}
          </T>
        </View>
        <View>
          <T s={20} w="600" ls={-0.01}>
            {investor.name}
          </T>
          <T s={14} c="text2">
            {investor.since}
          </T>
        </View>
      </View>
      {accountGroups.map((g) => (
        <View key={g.title}>
          <Eyebrow style={{ marginTop: 24 }}>{g.title}</Eyebrow>
          <Card style={{ marginTop: 8, paddingHorizontal: 16 }}>
            {g.rows.map((r) => (
              <LinkRow
                key={r.label}
                label={r.label}
                value={r.to === 'faceid' ? (faceId ? 'Face ID on' : 'Face ID off') : r.value}
                onPress={() => nav.to(r.to)}
                testID={`account-${r.label.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </Card>
        </View>
      ))}
      <Pressable
        onPress={signOut}
        accessibilityRole="button"
        accessibilityLabel="Sign out"
        testID="sign-out"
        style={({ pressed }) => ({
          marginTop: 24,
          minHeight: 52,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: c.border,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pressed ? c.surface : 'transparent',
        })}
      >
        <T w="600">Sign out</T>
      </Pressable>
    </ScrollScreen>
  );
}
