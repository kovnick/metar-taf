import https from 'https';
import { Fetcher } from './fetcher';

export class MetarFetcher extends Fetcher {
  private readonly optionsTpl: https.RequestOptions = {
    host: 'tgftp.nws.noaa.gov',
    path: '/data/observations/metar/{mode}/{station}.TXT',
  };

  getData(station: string): Promise<string> {
    const options = { ...this.optionsTpl };
    options.path = options.path!
      .replace('{mode}', 'stations')
      .replace('{station}', station);
    return this.sendRequest(options);
  }

  getDecodedData(station: string): Promise<string> {
    const options = { ...this.optionsTpl };
    options.path = options.path!
      .replace('{mode}', 'decoded')
      .replace('{station}', station);
    return this.sendRequest(options);
  }
}
