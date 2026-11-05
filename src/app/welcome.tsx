import { View } from 'react-native';

import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { HoldingsMarquee } from '@/ui/Marquee';
import { FixedScreen, PrimaryButton, SecondaryButton, Spacer } from '@/ui/primitives';
import { Caption, Em, Eyebrow, T } from '@/ui/T';

export default function WelcomeScreen() {
  const nav = useNav();
  const { setOnboarded } = useApp();

  return (
    // design: padding 100pt 0 44pt, inner blocks carry their own 20pt side margin
    <FixedScreen top={38} contentStyle={{ paddingHorizontal: 0 }} testID="screen-welcome">
      <Eyebrow style={{ paddingHorizontal: 20 }}>A new fund by AngelList</Eyebrow>
      <T s={40} w="600" ls={-0.025} lh={1.05} style={{ paddingTop: 16, paddingHorizontal: 20 }} accessibilityRole="header">
        Back the companies building the future. <Em>Before it&apos;s obvious.</Em>
      </T>
      <T c="text2" style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        Exposure to private tech companies. Starting at $500. Open to all U.S. investors.
      </T>
      <Spacer />
      <HoldingsMarquee />
      <View style={{ paddingTop: 24, paddingHorizontal: 20, gap: 12 }}>
        <PrimaryButton label="Invest now" onPress={() => nav.to('who')} testID="welcome-invest" />
        <SecondaryButton
          label="Sign in"
          testID="welcome-sign-in"
          onPress={() => {
            setOnboarded(true);
            nav.reset('/');
          }}
        />
        <Caption style={{ textAlign: 'center' }}>
          Unofficial concept. Not affiliated with USVC.
        </Caption>
      </View>
    </FixedScreen>
  );
}
