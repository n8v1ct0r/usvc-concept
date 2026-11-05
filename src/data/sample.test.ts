import { existsSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { accountGroups, activity, holdingById, holdings, position } from '@/data/sample';
import { fmtUSD } from '@/lib/format';

describe('sample data', () => {
  it('lists the 12 named holdings with unique ids, heaviest first', () => {
    expect(holdings).toHaveLength(12);
    expect(new Set(holdings.map((h) => h.id)).size).toBe(12);
    const weights = holdings.map((h) => parseFloat(h.weight));
    expect([...weights].sort((a, b) => b - a)).toEqual(weights);
  });

  it('resolves company routes by id', () => {
    expect(holdingById('supabase')?.name).toBe('Supabase');
    expect(holdingById('nope')).toBeUndefined();
  });

  it('keeps the position figures internally consistent', () => {
    expect(position.value - position.invested).toBeCloseTo(position.change, 2);
    expect((position.change / position.invested) * 100).toBeCloseTo(position.changePct, 2);
  });

  it('sums the activity to the total invested', () => {
    const total = activity.reduce((sum, a) => sum + parseFloat(a.value.replace(/[$,]/g, '')), 0);
    expect(fmtUSD(total)).toBe(fmtUSD(position.invested));
  });

  it('routes every account row to a screen that exists', () => {
    const targets = accountGroups.flatMap((g) => g.rows.map((r) => r.to));
    expect(targets).toHaveLength(10);
    for (const t of targets) {
      expect(existsSync(path.resolve(__dirname, '..', 'app', `${t}.tsx`)), `${t}.tsx`).toBe(true);
    }
  });
});
