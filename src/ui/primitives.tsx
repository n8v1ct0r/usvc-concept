import { Image } from 'expo-image';
import { useEffect, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '@/state/AppState';
import { layout } from '@/theme/tokens';
import { Check, ChevronBack, ChevronRight, CloseX } from '@/ui/icons';
import { Eyebrow, T } from '@/ui/T';

// Screen geometry: the design's device content starts at 70pt (status bar 62 + 8)
// and fixed screens end 44pt from the bottom (home indicator 34 + 10).
export const TOP_GAP = 8;
export const BOTTOM_GAP = 10;
/** Tab bar content height above the home indicator (92 - 34). */
export const TAB_BAR_HEIGHT = 58;

/** Full-screen column (onboarding, invest, detail screens). Scrolls only if content overflows. */
export function FixedScreen({
  children,
  top = TOP_GAP,
  bottom = BOTTOM_GAP,
  overlay,
  contentStyle,
  testID,
}: {
  children: ReactNode;
  /** extra top padding below the safe area (design 70pt = inset + 8) */
  top?: number;
  bottom?: number;
  /** absolutely positioned layers drawn above the scroll view (sheet, scan) */
  overlay?: ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}) {
  const insets = useSafeAreaInsets();
  const c = useColors();
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }} testID={testID}>
      <ScrollView
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingTop: insets.top + top,
            paddingHorizontal: layout.side,
            paddingBottom: insets.bottom + bottom,
          },
          contentStyle,
        ]}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      {overlay}
    </View>
  );
}

/** Scrolling screen. `tabs` reserves room for the floating tab bar (design: 110pt). */
export function ScrollScreen({
  children,
  tabs = false,
  bottom,
  contentStyle,
  testID,
}: {
  children: ReactNode;
  tabs?: boolean;
  /** design bottom padding in pt, including the home indicator (tabs 110, stack 60) */
  bottom?: number;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}) {
  const insets = useSafeAreaInsets();
  const c = useColors();
  const designBottom = bottom ?? (tabs ? 110 : 60);
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }} testID={testID}>
      <ScrollView
        contentContainerStyle={[
          {
            paddingTop: insets.top + TOP_GAP,
            paddingHorizontal: layout.side,
            // design values assume a 34pt home indicator
            paddingBottom: designBottom - 34 + insets.bottom,
          },
          contentStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export function Spacer() {
  return <View style={{ flex: 1 }} />;
}

/** 44x44 icon button, pulled 12pt into the left margin like the design. */
export function IconButton({
  onPress,
  label,
  children,
  style,
  testID,
}: {
  onPress: () => void;
  label: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={4}
      testID={testID}
      style={({ pressed }) => [
        { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.5 : 1 },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

/** Header row: back (or close) button, then an optional title or right-aligned label. */
export function NavBar({
  onBack,
  close = false,
  title,
  right,
  center,
}: {
  onBack: () => void;
  close?: boolean;
  title?: string;
  /** right-aligned eyebrow text, e.g. "Step 1 of 5" */
  right?: string;
  /** centred control (amount screen mode switch) */
  center?: ReactNode;
}) {
  const c = useColors();
  const spread = right !== undefined || center !== undefined;
  return (
    <View
      style={{
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: spread ? 'space-between' : 'flex-start',
        gap: spread ? 0 : 4,
      }}
    >
      <IconButton onPress={onBack} label={close ? 'Close' : 'Back'} style={{ marginLeft: -12 }} testID="nav-back">
        {close ? <CloseX color={c.text} /> : <ChevronBack color={c.text} />}
      </IconButton>
      {title ? (
        <T w="600" accessibilityRole="header">
          {title}
        </T>
      ) : null}
      {center}
      {right !== undefined ? <Eyebrow>{right}</Eyebrow> : null}
      {center !== undefined ? <View style={{ width: 32 }} /> : null}
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityHint?: string;
};

/** 56pt primary CTA: navy fill, 14 radius. Pressed scale .98 / .9 opacity, disabled .4. */
export function PrimaryButton({ label, onPress, disabled, icon, style, testID, accessibilityHint }: ButtonProps) {
  const c = useColors();
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      accessibilityHint={accessibilityHint}
      testID={testID}
      style={({ pressed }) => [
        {
          height: layout.cta,
          borderRadius: layout.radius.button,
          backgroundColor: c.navBg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: disabled ? 0.4 : pressed ? 0.9 : 1,
          transform: [{ scale: pressed && !disabled ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      {icon}
      <T w="600" c="navText" maxFontSizeMultiplier={1.3}>
        {label}
      </T>
    </Pressable>
  );
}

/** 56pt secondary button: 1pt border, transparent. */
export function SecondaryButton({ label, onPress, style, testID }: ButtonProps) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      testID={testID}
      style={({ pressed }) => [
        {
          height: layout.cta,
          borderRadius: layout.radius.button,
          borderWidth: 1,
          borderColor: c.border,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: pressed ? c.surface : 'transparent',
        },
        style,
      ]}
    >
      <T w="600" maxFontSizeMultiplier={1.3}>
        {label}
      </T>
    </Pressable>
  );
}

/** Filled surface card, 16 radius. */
export function Card({
  children,
  style,
  outline = false,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** bordered, unfilled variant */
  outline?: boolean;
}) {
  const c = useColors();
  return (
    <View
      style={[
        { borderRadius: layout.radius.card, overflow: 'hidden' },
        outline ? { borderWidth: 1, borderColor: c.border } : { backgroundColor: c.surface },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** Label / value row with a bottom divider (card lists). */
export function KVRow({
  label,
  value,
  valueColor,
  last = false,
  labelBold = false,
  size = 17,
  paddingV = 14,
  gap = 0,
}: {
  label: string;
  value: string;
  valueColor?: string;
  last?: boolean;
  labelBold?: boolean;
  size?: number;
  paddingV?: number;
  /** space between label and value (the design sets 16 on one review row only) */
  gap?: number;
}) {
  const c = useColors();
  return (
    <View
      accessible
      accessibilityLabel={`${label}, ${value}`}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap,
        paddingVertical: paddingV,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: c.border,
      }}
    >
      <T s={size} c={labelBold ? 'text' : 'text2'} w={labelBold ? '600' : '400'} style={{ flexShrink: 1 }}>
        {label}
      </T>
      <T s={size} w="600" color={valueColor} align="right" style={{ flexShrink: 1 }}>
        {value}
      </T>
    </View>
  );
}

/** Tappable list row with a trailing chevron (account groups). */
export function LinkRow({
  label,
  value,
  onPress,
  last = false,
  testID,
}: {
  label: string;
  value?: string;
  onPress: () => void;
  last?: boolean;
  testID?: string;
}) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
      testID={testID}
      style={({ pressed }) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 52,
        paddingVertical: 12,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: c.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <T w="500">{label}</T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {value ? (
          <T s={14} c="text2">
            {value}
          </T>
        ) : null}
        <ChevronRight color={c.text3} />
      </View>
    </Pressable>
  );
}

/**
 * Monogram tile with the remote logo drawn over it; the logo hides if it fails to load
 * (design: onError hides the img and the initials show through).
 */
export function LogoTile({
  monogram,
  logo,
  size = 44,
  radius = 12,
  fontSize = 15,
  background = 'surface',
}: {
  monogram: string;
  logo?: string;
  size?: number;
  radius?: number;
  fontSize?: number;
  background?: 'surface' | 'white';
}) {
  const c = useColors();
  const [failed, setFailed] = useState(false);
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: background === 'white' ? '#FFFFFF' : c.surface,
        borderWidth: 1,
        borderColor: c.border,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <T s={fontSize} w="700" color={background === 'white' ? c.text : undefined} lh={1.2} maxFontSizeMultiplier={1}>
        {monogram}
      </T>
      {logo && !failed ? (
        <Image
          source={{ uri: logo }}
          onError={() => setFailed(true)}
          contentFit="cover"
          cachePolicy="disk"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF' }}
        />
      ) : null}
    </View>
  );
}

/** Small square badge holding an icon or initials (40x40, 12 radius). */
export function Badge({
  children,
  size = 40,
  radius = 12,
  fill,
  style,
}: {
  children: ReactNode;
  size?: number;
  radius?: number;
  fill: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        { width: size, height: size, borderRadius: radius, backgroundColor: fill, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** iOS-style switch drawn to the design: 51x31, knob 27, navy when on. */
export function Toggle({ value, onChange, label, testID }: { value: boolean; onChange: (v: boolean) => void; label: string; testID?: string }) {
  const c = useColors();
  const progress = useSharedValue(value ? 1 : 0);
  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 200 });
  }, [value, progress]);
  const track = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [c.toggleOff, c.navBg]),
  }));
  const knob = useAnimatedStyle(() => ({ left: 2 + progress.value * 20 }));
  return (
    <Pressable
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      hitSlop={8}
      testID={testID}
    >
      <Animated.View style={[{ width: 51, height: 31, borderRadius: 16 }, track]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 2,
              width: 27,
              height: 27,
              borderRadius: 13.5,
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 2 },
            },
            knob,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

/** Checkbox row: 24pt box, 7 radius, navy when checked, label to the right. */
export function CheckRow({
  checked,
  onToggle,
  children,
  label,
  paddingV = 0,
  testID,
}: {
  checked: boolean;
  onToggle: () => void;
  children: ReactNode;
  /** accessible name */
  label: string;
  paddingV?: number;
  testID?: string;
}) {
  const c = useColors();
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked }}
      testID={testID}
      style={{ flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 44, paddingVertical: paddingV }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 7,
          borderWidth: 1.5,
          borderColor: checked ? c.navBg : c.checkOff,
          backgroundColor: checked ? c.navBg : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked ? <Check color={c.navText} /> : null}
      </View>
      {children}
    </Pressable>
  );
}

/** Pill chip for chart ranges: 32pt, navy when selected. */
export function RangeChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} range`}
      accessibilityState={{ selected }}
      testID={`range-${label}`}
      style={{
        height: 32,
        paddingHorizontal: 14,
        borderRadius: layout.radius.chip,
        backgroundColor: selected ? c.navBg : c.surface,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <T s={13} w="600" c={selected ? 'navText' : 'text2'} maxFontSizeMultiplier={1.3} style={{ fontVariant: [] }}>
        {label}
      </T>
    </Pressable>
  );
}

/** Quick-amount chip: 36pt outline pill, pressed scale .95. */
export function QuickChip({ label, onPress, accessibilityLabel, testID }: { label: string; onPress: () => void; accessibilityLabel?: string; testID?: string }) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
      style={({ pressed }) => ({
        height: 36,
        paddingHorizontal: 18,
        borderRadius: layout.radius.chip,
        borderWidth: 1,
        borderColor: c.border,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
    >
      <T s={14} w="600" maxFontSizeMultiplier={1.3} style={{ fontVariant: [] }}>
        {label}
      </T>
    </Pressable>
  );
}

/** Square action tile (Home): 18 radius, icon + 12/600 label, pressed scale .95. */
export function ActionTile({ label, icon, onPress }: { label: string; icon: ReactNode; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      testID={`action-${label.toLowerCase()}`}
      style={({ pressed }) => ({
        flex: 1,
        aspectRatio: 1,
        borderRadius: layout.radius.actionTile,
        backgroundColor: pressed ? c.surface2 : c.surface,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      })}
    >
      {icon}
      <T s={12} w="600" maxFontSizeMultiplier={1.2}>
        {label}
      </T>
    </Pressable>
  );
}

/** Generic pressable with the design's pressed scale. */
export function Tap({ scale = 0.98, style, ...rest }: PressableProps & { scale?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <Pressable
      accessibilityRole="button"
      {...rest}
      style={({ pressed }) => [style, pressed && { transform: [{ scale }], opacity: 0.85 }]}
    />
  );
}
