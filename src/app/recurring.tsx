import { View } from 'react-native';

import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { ChevronRight } from '@/ui/icons';
import { Card, FixedScreen, NavBar, PrimaryButton, Spacer } from '@/ui/primitives';
import { Caption, Eyebrow, T } from '@/ui/T';

const ROWS: { label: string; value: string; chevron: boolean }[] = [
  { label: 'Frequency', value: 'Monthly', chevron: true },
  { label: 'Day', value: '1st of the month', chevron: true },
  { label: 'Source', value: 'Checking ••0921', chevron: true },
  { label: 'Next investment', value: 'Oct 1, 2026', chevron: false },
];

export default function RecurringScreen() {
  const nav = useNav();
  const { c, setMode, showToast } = useApp();

  const save = () => {
    setMode('one');
    nav.back();
    showToast('Recurring investment saved');
  };

  return (
    <FixedScreen testID="screen-recurring">
      <NavBar onBack={nav.back} title="Recurring investment" />
      <View style={{ alignItems: 'center', paddingTop: 28, paddingBottom: 8 }}>
        <Eyebrow>Each month</Eyebrow>
        <T s={56} w="600" ls={-0.04} lh={1.1}>
          $500.00
        </T>
      </View>
      <Card style={{ marginTop: 20, paddingHorizontal: 16 }}>
        {ROWS.map((r, i) => (
          <View
            key={r.label}
            accessible
            accessibilityLabel={`${r.label}, ${r.value}`}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
              minHeight: 52,
              borderBottomWidth: i < ROWS.length - 1 ? 1 : 0,
              borderBottomColor: c.border,
            }}
          >
            <T c="text2">{r.label}</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <T w="600">{r.value}</T>
              {r.chevron ? <ChevronRight color={c.text3} /> : null}
            </View>
          </View>
        ))}
      </Card>
      <Caption style={{ marginTop: 12 }}>
        Each purchase is priced at the next calculated NAV after it is accepted. No sales load. Pause or change any time.
      </Caption>
      <Spacer />
      <PrimaryButton label="Save" onPress={save} style={{ marginTop: 20 }} testID="save-recurring" />
    </FixedScreen>
  );
}
