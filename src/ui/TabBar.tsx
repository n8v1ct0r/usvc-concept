import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/state/AppState';
import { Plus, TabAccount, TabHoldings, TabHome, TabUpdates } from '@/ui/icons';
import { TAB_BAR_HEIGHT } from '@/ui/primitives';
import { T } from '@/ui/T';

// Design tab bar: 92pt tall (58 + home indicator), 5 columns, raised navy Invest button in the middle.
// Background is the design's 92%-opaque tabBg. The design's 20px backdrop blur is left out:
// behind a 92% fill it is barely visible, and expo-blur's paused property animator keeps the
// app from ever going idle (it stalled every XCUITest step by 60s).

const TABS: Record<string, { label: string; Icon: typeof TabHome }> = {
  index: { label: 'Home', Icon: TabHome },
  holdings: { label: 'Holdings', Icon: TabHoldings },
  updates: { label: 'Updates', Icon: TabUpdates },
  account: { label: 'Account', Icon: TabAccount },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const { c } = useApp();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const tabButton = (routeName: string) => {
    const index = state.routes.findIndex((r) => r.name === routeName);
    const route = state.routes[index];
    const meta = TABS[routeName];
    if (!route || !meta) return <View style={{ flex: 1 }} key={routeName} />;
    const focused = state.index === index;
    const color = focused ? c.text : c.text3;
    return (
      <Pressable
        key={routeName}
        accessibilityRole="tab"
        accessibilityLabel={meta.label}
        accessibilityState={{ selected: focused }}
        testID={`tab-${routeName}`}
        onPress={() => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        }}
        style={{ flex: 1, height: 50, alignItems: 'center', gap: 4 }}
      >
        <meta.Icon color={color} />
        <T s={10} w="600" color={color} lh={1.2} maxFontSizeMultiplier={1.2}>
          {meta.label}
        </T>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: TAB_BAR_HEIGHT + insets.bottom,
        borderTopWidth: 1,
        borderTopColor: c.border,
        zIndex: 25,
      }}
    >
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: c.tabBg }} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 8, paddingHorizontal: 8 }}>
        {tabButton('index')}
        {tabButton('holdings')}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Invest"
            testID="tab-invest"
            onPress={() => router.push('/amount')}
            style={({ pressed }) => ({
              width: 56,
              height: 56,
              marginTop: -26,
              borderRadius: 28,
              backgroundColor: c.navBg,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#05162C',
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 8 },
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Plus color={c.navText} size={26} strokeWidth={2.4} />
          </Pressable>
        </View>
        {tabButton('updates')}
        {tabButton('account')}
      </View>
    </View>
  );
}
