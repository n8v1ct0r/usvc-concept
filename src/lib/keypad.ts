// Amount keypad reducer, ported from the design's keyPress().

export type KeypadKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.' | 'del';

export const KEYPAD_KEYS: KeypadKey[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];

export const MIN_INVESTMENT = 500;

export function applyKey(amount: string, key: KeypadKey): string {
  if (key === 'del') return amount.slice(0, -1);
  if (key === '.') return amount.includes('.') ? amount : (amount || '0') + '.';
  if (amount.includes('.') && amount.split('.')[1].length >= 2) return amount;
  if (amount.replace('.', '').length >= 7) return amount;
  return amount === '0' ? key : amount + key;
}
