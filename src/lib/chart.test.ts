import { describe, expect, it } from 'vitest';

import { chartGeometry, indexFromX, makeSeries, RANGES, SERIES, SERIES_DAYS } from '@/lib/chart';

describe('account value series', () => {
  it('has 134 daily points, May 12 to Sep 22 2026', () => {
    expect(SERIES).toHaveLength(SERIES_DAYS);
    expect(SERIES_DAYS).toBe(134);
  });

  it('pins every anchor to the sample position', () => {
    expect(SERIES[0]).toBe(10000);
    expect(SERIES[50]).toBe(11219.4);
    expect(SERIES[133]).toBe(12482.12);
  });

  it('is deterministic', () => {
    expect(makeSeries()).toEqual(SERIES);
  });
});

describe('chartGeometry', () => {
  const W = 362;
  const H = 150;

  it('shows the last 31 / 92 / 134 days for 1M / 3M / All', () => {
    expect(chartGeometry(SERIES, 'm1', W).count).toBe(31);
    expect(chartGeometry(SERIES, 'm3', W).count).toBe(92);
    expect(chartGeometry(SERIES, 'all', W).count).toBe(134);
    expect(chartGeometry(SERIES, 'ytd', W).offset).toBe(0);
    expect(RANGES.map((r) => r.label)).toEqual(['1M', '3M', 'YTD', 'All']);
  });

  it('spans the full width and keeps 12pt vertical padding', () => {
    const g = chartGeometry(SERIES, 'all', W, H);
    expect(g.x(0)).toBe(0);
    expect(g.x(g.count - 1)).toBe(W);
    const ys = SERIES.map((v) => g.y(v));
    expect(Math.min(...ys)).toBeCloseTo(12);
    expect(Math.max(...ys)).toBeCloseTo(H - 12);
  });

  it('builds a line path with one command per point and a closed area', () => {
    const g = chartGeometry(SERIES, 'm1', W, H);
    expect(g.path.startsWith('M0.0 ')).toBe(true);
    expect(g.path.match(/[ML]/g)).toHaveLength(31);
    expect(g.area.endsWith(`L${W} ${H} L0 ${H} Z`)).toBe(true);
  });
});

describe('indexFromX', () => {
  const g = chartGeometry(SERIES, 'm1', 362);

  it('maps the left and right edges to the first and last visible day', () => {
    expect(indexFromX(0, 362, g)).toBe(g.offset);
    expect(indexFromX(362, 362, g)).toBe(133);
  });

  it('clamps drags past either edge', () => {
    expect(indexFromX(-50, 362, g)).toBe(g.offset);
    expect(indexFromX(9999, 362, g)).toBe(133);
  });
});
