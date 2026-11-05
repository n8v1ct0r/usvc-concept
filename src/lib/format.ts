// Number and date formatting, ported from the design's fmt / dateOf / amountDisplay.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function groupThousands(intDigits: string): string {
  return intDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** $12,482.12 */
export function fmtUSD(n: number): string {
  const sign = n < 0 ? '-' : '';
  const [int, dec] = Math.abs(n).toFixed(2).split('.');
  return `${sign}$${groupThousands(int)}.${dec}`;
}

/** Series day index -> "Jul 1, 2026". Day 0 is May 12, 2026. */
export function dateOf(dayIndex: number): string {
  const d = new Date(2026, 4, 12);
  d.setDate(d.getDate() + dayIndex);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Keypad string -> "$1,000" / "$1,000.5" / "$0" (no forced decimals). */
export function amountDisplay(amount: string): string {
  if (!amount) return '$0';
  const [int, dec] = amount.split('.');
  const grouped = groupThousands(String(Number(int || '0')));
  return amount.includes('.') ? `$${grouped}.${dec}` : `$${grouped}`;
}

export function amountValue(amount: string): number {
  return parseFloat(amount || '0') || 0;
}
