import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MetarFetcher } from '../src/metarFetcher';

describe('MetarFetcher', () => {
  let fetcher: MetarFetcher;

  beforeEach(() => {
    fetcher = new MetarFetcher();
    vi.spyOn(fetcher, 'sendRequest').mockResolvedValue('Test response');
  });

  it('getData calls sendRequest with station options', async () => {
    const result = await fetcher.getData('UKBB');
    expect(result).toBe('Test response');
    expect(fetcher.sendRequest).toHaveBeenCalledWith({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/observations/metar/stations/UKBB.TXT',
    });
  });

  it('getDecodedData calls sendRequest with decoded options', async () => {
    const result = await fetcher.getDecodedData('UKBB');
    expect(result).toBe('Test response');
    expect(fetcher.sendRequest).toHaveBeenCalledWith({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/observations/metar/decoded/UKBB.TXT',
    });
  });
});
