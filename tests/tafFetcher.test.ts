import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTaf } from '../src/tafFetcher';
import { sendRequest } from '../src/fetcher';

vi.mock('../src/fetcher', () => ({
  sendRequest: vi.fn(),
}));

describe('getTaf', () => {
  beforeEach(() => {
    vi.mocked(sendRequest).mockResolvedValue('Test response');
  });

  it('getTaf builds the correct TAF path', async () => {
    await getTaf('UKBB');
    expect(sendRequest).toHaveBeenCalledWith({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/forecasts/taf/stations/UKBB.TXT',
      timeout: 10_000,
    });
  });

  it('rejects when sendRequest rejects', async () => {
    vi.mocked(sendRequest).mockRejectedValueOnce(new Error('Request failed with status 404'));
    await expect(getTaf('UKBB')).rejects.toThrow('Request failed with status 404');
  });
});
