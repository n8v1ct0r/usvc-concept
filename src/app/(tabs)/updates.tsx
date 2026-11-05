import { Pressable, View } from 'react-native';

import { updates } from '@/data/sample';
import { useNav } from '@/lib/nav';
import { Card, ScrollScreen } from '@/ui/primitives';
import { Em, Eyebrow, T, Title } from '@/ui/T';

export default function UpdatesScreen() {
  const nav = useNav();
  return (
    <ScrollScreen tabs testID="screen-updates">
      <View style={{ height: 32, justifyContent: 'center' }}>
        <Eyebrow>Updates</Eyebrow>
      </View>
      <Title style={{ marginTop: 12 }}>
        From the <Em>team.</Em>
      </Title>
      <View style={{ marginTop: 20, gap: 12 }}>
        {updates.map((u, i) => (
          <Pressable
            key={u.title}
            onPress={() => nav.to('article')}
            accessibilityRole="button"
            accessibilityLabel={`${u.kind}, ${u.date}. ${u.title}. ${u.summary}`}
            testID={`update-${i}`}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <Card outline style={{ padding: 16, gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T s={12} w="600" ls={0.08} upper c="text3">
                  {u.kind}
                </T>
                <T s={12} c="text3">
                  {u.date}
                </T>
              </View>
              <T s={20} w="600" ls={-0.01} lh={1.2}>
                {u.title}
              </T>
              <T s={14} c="text2" lh={1.4}>
                {u.summary}
              </T>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollScreen>
  );
}
