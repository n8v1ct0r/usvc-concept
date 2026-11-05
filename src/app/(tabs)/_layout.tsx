import { Tabs } from 'expo-router/js-tabs';

import { useColors } from '@/state/AppState';
import { TabBar } from '@/ui/TabBar';

export default function TabsLayout() {
  const c = useColors();
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: c.bg } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="holdings" />
      <Tabs.Screen name="updates" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}
