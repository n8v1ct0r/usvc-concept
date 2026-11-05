import { describe, expect, it } from 'vitest';

import { amountDisplay, amountValue, dateOf, fmtUSD, groupThousands } from '@/lib/format';

describe('fmtUSD', () => {
  it('formats with thousands separators and two decimals', () => {
    expect(fmtUSD(12482.12)).toBe('$12,482.12');
    expect(fmtUSD(500)).toBe('$500.00');
    expect(fmtUSD(0)).toBe('$0.00');
    expect(fmtUSD(1234567.891)).toBe('$1,234,567.89');
  });

  it('keeps the sign in front of the dollar sign', () => {
    expect(fmtUSD(-2.05)).toBe('-$2.05');
  });
});

describe('groupThousands', () => {
  it('groups digit strings', () => {
    expect(groupThousands('1000000')).toBe('1,000,000');
    expect(groupThousands('999')).toBe('999');
  });
});

describe('dateOf (series day index, day 0 = May 12 2026)', () => {
  it('maps the series anchors to the design dates', () => {
    expect(dateOf(0)).toBe('May 12, 2026');
    expect(dateOf(50)).toBe('Jul 1, 2026'); // frame 8: "chart scrubbed to Jul 1, 2026"
    expect(dateOf(133)).toBe('Sep 22, 2026'); // NAV as of date
  });
});

describe('amountDisplay (keypad string)', () => {
  it('shows $0 for an empty amount', () => {
    expect(amountDisplay('')).toBe('$0');
  });

  it('groups the whole part and keeps typed decimals as typed', () => {
    expect(amountDisplay('1000')).toBe('$1,000');
    expect(amountDisplay('1234.5')).toBe('$1,234.5');
    expect(amountDisplay('0.')).toBe('$0.');
  });

  it('parses to a number for the $500 minimum check', () => {
    expect(amountValue('')).toBe(0);
    expect(amountValue('499.99')).toBeCloseTo(499.99);
    expect(amountValue('1000')).toBe(1000);
  });
});
