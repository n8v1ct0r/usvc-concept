import { describe, expect, it } from 'vitest';

import { applyKey, KEYPAD_KEYS, type KeypadKey } from '@/lib/keypad';

const type = (start: string, keys: KeypadKey[]) => keys.reduce(applyKey, start);

describe('applyKey (design keyPress)', () => {
  it('replaces a lone 0 with the first digit', () => {
    expect(applyKey('0', '5')).toBe('5');
  });

  it('appends digits', () => {
    expect(type('', ['1', '2', '5', '0'])).toBe('1250');
  });

  it('adds a leading 0 before a decimal point on an empty amount', () => {
    expect(applyKey('', '.')).toBe('0.');
  });

  it('allows only one decimal point', () => {
    expect(applyKey('12.5', '.')).toBe('12.5');
  });

  it('caps cents at two digits', () => {
    expect(type('12', ['.', '3', '4', '5'])).toBe('12.34');
  });

  it('caps the amount at seven digits, not counting the decimal point', () => {
    expect(type('1234567', ['8'])).toBe('1234567');
    expect(type('12345.6', ['7'])).toBe('12345.67');
    expect(type('123456.7', ['8'])).toBe('123456.7');
  });

  it('deletes the last character, down to empty', () => {
    expect(type('10', ['del', 'del', 'del'])).toBe('');
  });

  it('lays out the keypad as 1-9, ., 0, delete', () => {
    expect(KEYPAD_KEYS).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']);
  });
});
