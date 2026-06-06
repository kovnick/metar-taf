import { describe, it, expect, beforeAll } from 'vitest';
import { Fetcher } from '../src/fetcher';

describe('Fetcher', () => {
  let fetcher: Fetcher;

  beforeAll(() => {
    fetcher = new Fetcher();
  });

  it('returns METAR data containing station code', { timeout: 10000 }, async () => {
    const result = await fetcher.sendRequest({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/observations/metar/stations/UKBB.TXT',
    });
    expect(result).toContain('UKBB');
  });

  it('returns decoded METAR data containing station code', { timeout: 10000 }, async () => {
    const result = await fetcher.sendRequest({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/observations/metar/decoded/UKBB.TXT',
    });
    expect(result).toContain('UKBB');
  });
});
