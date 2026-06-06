import https from 'https';
import { sendRequest } from './fetcher';

const optionsTpl: https.RequestOptions & { path: string } = {
  host: 'tgftp.nws.noaa.gov',
  path: '/data/forecasts/taf/stations/{station}.TXT',
  timeout: 10_000,
};

export function getTaf(station: string): Promise<string> {
  return sendRequest({
    ...optionsTpl,
    path: optionsTpl.path.replace('{station}', station),
  });
}
