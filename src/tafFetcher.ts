import https from "https";
import { Fetcher } from "./fetcher";

export class TafFetcher extends Fetcher {
  private readonly optionsTpl: https.RequestOptions = {
    host: "tgftp.nws.noaa.gov",
    path: "/data/forecasts/taf/stations/{station}.TXT",
  };

  getData(station: string): Promise<string> {
    const options = { ...this.optionsTpl };
    options.path = options.path!.replace("{station}", station);
    return this.sendRequest(options);
  }
}
