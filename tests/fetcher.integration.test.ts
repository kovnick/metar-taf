import { describe, it, expect } from 'vitest';
import { getMetar, getDecodedMetar } from '../src/metarFetcher';
import { getTaf } from '../src/tafFetcher';

describe('Integration', () => {
  it('getMetar returns data containing station code', { timeout: 10000 }, async () => {
    const result = await getMetar('UKBB');
    expect(result).toContain('UKBB');
  });

  it('getDecodedMetar returns data containing station code', { timeout: 10000 }, async () => {
    const result = await getDecodedMetar('UKBB');
    expect(result).toContain('UKBB');
  });

  it('getTaf returns data containing station code', { timeout: 10000 }, async () => {
    const result = await getTaf('UKBB');
    expect(result).toContain('UKBB');
  });
});
