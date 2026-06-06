import https from 'https';
import { sendRequest } from './fetcher';

const optionsTpl: https.RequestOptions & { path: string } = {
  host: 'tgftp.nws.noaa.gov',
  path: '/data/observations/metar/{mode}/{station}.TXT',
  timeout: 10_000,
};

export function getMetar(station: string): Promise<string> {
  return sendRequest({
    ...optionsTpl,
    path: optionsTpl.path
      .replace('{mode}', 'stations')
      .replace('{station}', station),
  });
}

export function getDecodedMetar(station: string): Promise<string> {
  return sendRequest({
    ...optionsTpl,
    path: optionsTpl.path
      .replace('{mode}', 'decoded')
      .replace('{station}', station),
  });
}
