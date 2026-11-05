import * as WebBrowser from 'expo-web-browser';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { holdingById, HOLDINGS_AS_OF, HOLDINGS_NOTE } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { useColors } from '@/state/AppState';
import { ExternalArrow } from '@/ui/icons';
import { FixedScreen, LogoTile, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Caption, T } from '@/ui/T';

export default function CompanyScreen() {
  const nav = useNav();
  const c = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const h = holdingById(String(id));

  if (!h) {
    return (
      <FixedScreen testID="screen-company-missing">
        <NavBar onBack={nav.back} />
        <T s={32} w="600" ls={-0.02} lh={1.08} style={{ marginTop: 24 }} accessibilityRole="header">
          Holding not found
        </T>
        <T c="text2" lh={1.45} style={{ marginTop: 12 }}>
          This company is not in the current holdings list.
        </T>
        <Spacer />
        <PrimaryButton label="See all holdings" onPress={() => nav.tab('holdings')} />
      </FixedScreen>
    );
  }

  return (
    <FixedScreen testID="screen-company">
      <NavBar onBack={nav.back} />
      <View style={{ marginTop: 20 }}>
        <LogoTile monogram={h.monogram} logo={h.logo} size={72} radius={20} fontSize={26} />
      </View>
      {/* lh 1.6: the nested 13pt figure grows the CSS line box to 13 x 1.35 = 17.55pt */}
      <T s={11} w="600" ls={0.1} upper c="text3" lh={1.6} style={{ marginTop: 20 }}>
        Weight <Text style={{ color: c.text, fontSize: 13 }}>{h.weight}</Text>
      </T>
      <T s={32} w="600" ls={-0.02} lh={1.08} style={{ marginTop: 4 }} accessibilityRole="header">
        {h.name}
      </T>
      {h.description ? (
        <T c="text2" lh={1.45} style={{ marginTop: 16 }}>
          {h.description}
        </T>
      ) : null}
      {h.domain ? (
        <Pressable
          onPress={() => WebBrowser.openBrowserAsync(`https://${h.domain}`).catch(() => {})}
          accessibilityRole="link"
          accessibilityLabel={`Visit ${h.domain}`}
          testID="visit-site"
          style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 44, alignSelf: 'flex-start' }}
        >
          <T s={16} w="600" c="accent">
            Visit {h.domain}
          </T>
          <ExternalArrow color={c.accent} />
        </Pressable>
      ) : null}
      <Spacer />
      <Caption>
        {HOLDINGS_AS_OF}. {HOLDINGS_NOTE}
      </Caption>
    </FixedScreen>
  );
}
