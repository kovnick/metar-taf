import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TafFetcher } from '../src/tafFetcher';

describe('TafFetcher', () => {
  let fetcher: TafFetcher;

  beforeEach(() => {
    fetcher = new TafFetcher();
    vi.spyOn(fetcher, 'sendRequest').mockResolvedValue('Test response');
  });

  it('getData calls sendRequest with station options', async () => {
    const result = await fetcher.getData('UKBB');
    expect(result).toBe('Test response');
    expect(fetcher.sendRequest).toHaveBeenCalledWith({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/forecasts/taf/stations/UKBB.TXT',
    });
  });
});
