import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMetar, getDecodedMetar } from '../src/metarFetcher';
import { sendRequest } from '../src/fetcher';

vi.mock('../src/fetcher', () => ({
  sendRequest: vi.fn(),
}));

describe('getMetar / getDecodedMetar', () => {
  beforeEach(() => {
    vi.mocked(sendRequest).mockResolvedValue('Test response');
  });

  it('getMetar builds the correct METAR path', async () => {
    await getMetar('UKBB');
    expect(sendRequest).toHaveBeenCalledWith({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/observations/metar/stations/UKBB.TXT',
      timeout: 10_000,
    });
  });

  it('getDecodedMetar builds the correct decoded path', async () => {
    await getDecodedMetar('UKBB');
    expect(sendRequest).toHaveBeenCalledWith({
      host: 'tgftp.nws.noaa.gov',
      path: '/data/observations/metar/decoded/UKBB.TXT',
      timeout: 10_000,
    });
  });

  it('rejects when sendRequest rejects', async () => {
    vi.mocked(sendRequest).mockRejectedValueOnce(new Error('Request failed with status 404'));
    await expect(getMetar('UKBB')).rejects.toThrow('Request failed with status 404');
  });
});
