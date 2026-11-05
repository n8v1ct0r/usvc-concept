import { Pressable, Text, View } from 'react-native';

import type { Holding } from '@/data/sample';
import { useColors } from '@/state/AppState';
import { ChevronRight } from '@/ui/icons';
import { LogoTile } from '@/ui/primitives';
import { T } from '@/ui/T';

/** Holdings list row: logo tile, "WEIGHT 12.2%" label, name, chevron. */
export function HoldingRow({ holding, onPress }: { holding: Holding; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${holding.name}, weight ${holding.weight}`}
      testID={`holding-${holding.id}`}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: c.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <LogoTile monogram={holding.monogram} logo={holding.logo} />
      <View style={{ flex: 1, minWidth: 0 }}>
        <T s={11} w="600" ls={0.1} upper c="text3">
          Weight <Text style={{ color: c.text }}>{holding.weight}</Text>
        </T>
        <T w="600" style={{ marginTop: 1 }}>
          {holding.name}
        </T>
      </View>
      <ChevronRight color={c.text3} />
    </Pressable>
  );
}
