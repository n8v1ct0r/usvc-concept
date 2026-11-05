import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { holdings, position, RISK_SHORT } from '@/data/sample';
import { RANGES, SERIES, type RangeKey } from '@/lib/chart';
import { dateOf, fmtUSD } from '@/lib/format';
import { useNav } from '@/lib/nav';
import { useApp } from '@/state/AppState';
import { AccountChart } from '@/ui/Chart';
import { HoldingRow } from '@/ui/HoldingRow';
import { ChevronRight, DocumentIcon, Drop, Plus, Recurring, ThemeDot } from '@/ui/icons';
import { ActionTile, Badge, Card, IconButton, RangeChip, ScrollScreen } from '@/ui/primitives';
import { Caption, Eyebrow, T } from '@/ui/T';

// Value count-up runs once per launch (design: 600ms, ease-out cubic).
let countedUp = false;

function useCountUp(): number {
  const [p, setP] = useState(countedUp ? 1 : 0);
  useEffect(() => {
    if (countedUp) return;
    let raf = 0;
    const t0 = Date.now();
    const step = () => {
      const t = Math.min(1, (Date.now() - t0) / 600);
      setP(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(step);
      else countedUp = true;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return p;
}

export default function HomeScreen() {
  const { c, toggleTheme, theme } = useApp();
  const nav = useNav();
  const ease = useCountUp();
  const [range, setRange] = useState<RangeKey>('all');
  const [scrub, setScrub] = useState<number | null>(null);

  const scrubbed = scrub !== null;
  const displayValue = scrubbed ? fmtUSD(SERIES[scrub]) : fmtUSD(position.value * ease);
  const displayChange = scrubbed
    ? dateOf(scrub)
    : `+${fmtUSD(position.change * ease)} (+${(position.changePct * ease).toFixed(2)}%)`;
  const displaySub = scrubbed ? 'Account value' : `Total invested ${fmtUSD(position.invested)}`;

  return (
    <ScrollScreen tabs testID="screen-home" contentStyle={{ gap: 24 }}>
      <View style={{ height: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Eyebrow>Your USVC</Eyebrow>
        <IconButton
          onPress={toggleTheme}
          label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          style={{ marginRight: -12 }}
          testID="toggle-theme"
        >
          <ThemeDot color={c.text2} />
        </IconButton>
      </View>

      <Pressable
        onPress={() => nav.to('position')}
        accessibilityRole="button"
        accessibilityLabel={`Account value ${displayValue}, ${displayChange}. ${displaySub}. Opens your position.`}
        testID="home-value"
      >
        <T s={48} w="600" ls={-0.03} lh={1}>
          {displayValue}
        </T>
        <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <T s={15} w="600" color={scrubbed ? c.text2 : c.pos}>
            {displayChange}
          </T>
          <T s={15} c="text3">
            {displaySub}
          </T>
        </View>
        <T s={13} c="text2" style={{ marginTop: 6 }}>
          NAV per share {position.navPerShare}, as of {position.navAsOf}
        </T>
      </Pressable>

      <View>
        <AccountChart range={range} scrub={scrub} onScrub={setScrub} />
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
          {RANGES.map((r) => (
            <RangeChip
              key={r.key}
              label={r.label}
              selected={range === r.key}
              onPress={() => {
                setRange(r.key);
                setScrub(null);
              }}
            />
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <ActionTile label="Invest" icon={<Plus color={c.text} />} onPress={() => nav.to('amount')} />
        <ActionTile label="Recurring" icon={<Recurring color={c.text} />} onPress={() => nav.to('recurring')} />
        <ActionTile label="Documents" icon={<DocumentIcon color={c.text} />} onPress={() => nav.to('documents')} />
        <ActionTile label="Liquidity" icon={<Drop color={c.text} />} onPress={() => nav.to('liquidity')} />
      </View>

      <Pressable
        onPress={() => nav.to('recurring')}
        accessibilityRole="button"
        accessibilityLabel="$500.00 monthly. Next Oct 1, 2026 from Checking ••0921"
        testID="home-recurring"
      >
        <Card style={{ padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Badge fill={c.bg}>
            <Recurring color={c.text} size={20} />
          </Badge>
          <View style={{ flex: 1 }}>
            <T w="600">$500.00 monthly</T>
            <T s={14} c="text2">
              Next Oct 1, 2026 from Checking ••0921
            </T>
          </View>
          <ChevronRight color={c.text3} />
        </Card>
      </Pressable>

      <View>
        <Eyebrow style={{ marginBottom: 12 }}>Latest update</Eyebrow>
        <Pressable onPress={() => nav.to('article')} accessibilityRole="button" accessibilityLabel="Reporting. One 1099. No K-1." testID="home-update">
          <Card outline style={{ padding: 16 }}>
            <T s={12} c="text3">
              Reporting
            </T>
            <T s={20} w="600" ls={-0.01} lh={1.2} style={{ marginTop: 4 }}>
              One 1099. No K-1.
            </T>
            <T s={14} c="text2" style={{ marginTop: 6 }}>
              Most private market investments issue K-1s. USVC issues a single 1099.
            </T>
          </Card>
        </Pressable>
      </View>

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <Eyebrow>Our holdings</Eyebrow>
          <Pressable onPress={() => nav.tab('holdings')} accessibilityRole="button" accessibilityLabel="See all holdings" hitSlop={8}>
            <T s={13} w="600" c="accent" style={{ paddingVertical: 8 }}>
              See all
            </T>
          </Pressable>
        </View>
        {holdings.slice(0, 3).map((h) => (
          <HoldingRow key={h.id} holding={h} onPress={() => nav.toCompany(h.id)} />
        ))}
      </View>

      <Caption>{RISK_SHORT}</Caption>
    </ScrollScreen>
  );
}
