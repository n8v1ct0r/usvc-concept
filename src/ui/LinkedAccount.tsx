import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { linkedAccount } from '@/data/sample';
import { useColors } from '@/state/AppState';
import { Check } from '@/ui/icons';
import { LogoTile } from '@/ui/primitives';
import { T } from '@/ui/T';

/** Selected sample account: accent outline, bank logo, "Checking ••0921", check badge. */
export function LinkedAccountCard({ onPress, style, testID }: { onPress?: () => void; style?: StyleProp<ViewStyle>; testID?: string }) {
  const c = useColors();
  const body = (
    <View
      style={[
        {
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: c.accent,
          paddingVertical: 14,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        },
        style,
      ]}
    >
      <LogoTile monogram={linkedAccount.monogram} logo={linkedAccount.logo} size={40} radius={12} fontSize={13} background="white" />
      <View style={{ flex: 1 }}>
        <T w="600">{linkedAccount.label}</T>
        <T s={14} c="text2">
          {linkedAccount.bank}
        </T>
      </View>
      <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: c.accent, alignItems: 'center', justifyContent: 'center' }}>
        <Check color="#FFFFFF" size={12} strokeWidth={2.4} />
      </View>
    </View>
  );
  const label = `${linkedAccount.label}, ${linkedAccount.bank}, selected`;
  if (!onPress) {
    return (
      <View accessible accessibilityLabel={label}>
        {body}
      </View>
    );
  }
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} testID={testID} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      {body}
    </Pressable>
  );
}
