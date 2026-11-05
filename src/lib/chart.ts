// Account value series and chart geometry, ported from the design.
// Series: May 12 to Sep 22 2026 (134 days), anchors pinned to the sample position.

export const SERIES_DAYS = 134;

const ANCHORS: [number, number][] = [
  [0, 10000],
  [19, 10380],
  [20, 10880],
  [49, 10740],
  [50, 11219.4],
  [80, 11330],
  [81, 11830],
  [111, 11790],
  [112, 12290],
  [133, 12482.12],
];

export function makeSeries(): number[] {
  const v: number[] = [];
  for (let i = 0; i < SERIES_DAYS; i++) {
    let k = 0;
    while (k < ANCHORS.length - 2 && ANCHORS[k + 1][0] < i) k++;
    const [x0, y0] = ANCHORS[k];
    const [x1, y1] = ANCHORS[k + 1];
    const t = x1 === x0 ? 1 : (i - x0) / (x1 - x0);
    const w = Math.sin(t * Math.PI) * (Math.sin(i * 1.7) * 38 + Math.sin(i * 0.43) * 55);
    v.push(y0 + (y1 - y0) * t + w);
  }
  ANCHORS.forEach(([x, y]) => {
    v[x] = y;
  });
  return v;
}

export const SERIES = makeSeries();

export type RangeKey = 'm1' | 'm3' | 'ytd' | 'all';

export const RANGES: { key: RangeKey; label: string; days: number }[] = [
  { key: 'm1', label: '1M', days: 31 },
  { key: 'm3', label: '3M', days: 92 },
  { key: 'ytd', label: 'YTD', days: 134 },
  { key: 'all', label: 'All', days: 134 },
];

export type ChartGeometry = {
  offset: number; // series index of the first visible point
  count: number;
  path: string;
  area: string;
  x: (k: number) => number;
  y: (value: number) => number;
};

export function chartGeometry(
  series: number[],
  range: RangeKey,
  width: number,
  height = 150,
  pad = 12,
): ChartGeometry {
  const len = RANGES.find((r) => r.key === range)?.days ?? SERIES_DAYS;
  const offset = series.length - len;
  const pts = series.slice(offset);
  const mn = Math.min(...pts);
  const mx = Math.max(...pts);
  const x = (k: number) => (k / (pts.length - 1)) * width;
  const y = (value: number) => height - pad - ((value - mn) / (mx - mn || 1)) * (height - 2 * pad);
  const path = pts.map((val, k) => `${k ? 'L' : 'M'}${x(k).toFixed(1)} ${y(val).toFixed(1)}`).join(' ');
  const area = `${path} L${width} ${height} L0 ${height} Z`;
  return { offset, count: pts.length, path, area, x, y };
}

/** Touch x (0..width) -> absolute series index, clamped to the visible range. */
export function indexFromX(touchX: number, width: number, geo: Pick<ChartGeometry, 'offset' | 'count'>): number {
  const k = Math.round((touchX / width) * (geo.count - 1));
  return geo.offset + Math.max(0, Math.min(geo.count - 1, k));
}
