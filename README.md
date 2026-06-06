## Synopsis

This npm package allows you to get [TAF](https://en.wikipedia.org/wiki/Terminal_aerodrome_forecast) and [METAR](https://en.wikipedia.org/wiki/METAR) reports.

## Installation

```
npm install metar-taf
```

## Usage

```ts
import { getMetar, getDecodedMetar, getTaf } from 'metar-taf';

// Raw METAR report
const metar = await getMetar('UKBB');
// 2016/08/18 19:00
// UKBB 181900Z 36003MPS 8000 SCT003 BKN007 17/17 Q1014 R88/290060 NOSIG

// Decoded METAR report
const decoded = await getDecodedMetar('UKBB');
// Boryspil, Ukraine (UKBB) 50-20N 030-58E 122M
// Aug 18, 2016 - 03:00 PM EDT / 2016.08.18 1900 UTC
// Wind: from the N (360 degrees) at 7 MPH (6 KT):0
// ...

// TAF report
const taf = await getTaf('UKBB');
// 2016/08/18 18:27
// TAF AMD UKBB 181722Z 1818/1918 VRB02MPS 4000 BR BKN004 BKN015
// ...
```

CommonJS is also supported:
```js
const { getMetar, getDecodedMetar, getTaf } = require('metar-taf');
```

## Error handling

Both `getData` and `getDecodedData` return a rejected `Promise` when the server responds with a non-2xx status code (e.g. unknown station → 404) or when the network request fails. Requests time out after 10 seconds.

```ts
try {
  const metar = await getMetar('ZZZZ');
} catch (err) {
  // err.message → 'Request failed with status 404'
}
```

## Requirements

Node.js ≥ 18.0.0

## Tests

```bash
npm test                  # unit tests (no network)
npm run test:integration  # live NOAA API calls
npm run cover             # unit tests with coverage
```

## Contributors

[M.Kovalevskyi](https://github.com/kovnick)

## License

Code released under [the MIT license](https://github.com/kovnick/metar-taf/blob/master/LICENSE).
