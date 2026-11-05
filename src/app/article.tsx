import { View } from 'react-native';

import { useNav } from '@/lib/nav';
import { NavBar, ScrollScreen } from '@/ui/primitives';
import { Caption, Em, Eyebrow, T, Title } from '@/ui/T';

const PARAGRAPHS = [
  'Most private market investments issue K-1s, which can complicate tax filing. USVC issues a single 1099.',
  'USVC Venture Capital Access Fund is registered under the Investment Company Act of 1940, with independent board oversight. It is distributed by North Capital Private Securities (NCPS), member FINRA/SIPC.',
  'Your 1099 will appear in Documents when it is ready.',
];

export default function ArticleScreen() {
  const nav = useNav();
  return (
    <ScrollScreen testID="screen-article">
      <NavBar onBack={nav.back} />
      <Eyebrow style={{ marginTop: 12 }}>Reporting</Eyebrow>
      <Title style={{ marginTop: 8 }}>
        One 1099. <Em>No K-1.</Em>
      </Title>
      <View style={{ marginTop: 20, gap: 16 }}>
        {PARAGRAPHS.map((p) => (
          <T key={p} lh={1.5}>
            {p}
          </T>
        ))}
      </View>
      <Caption style={{ marginTop: 28 }}>Read the prospectus carefully before investing.</Caption>
    </ScrollScreen>
  );
}
