[![Build Status](https://travis-ci.org/kovnick/metar-taf.svg?branch=master)](https://travis-ci.org/kovnick/metar-taf) [![Coverage Status](https://coveralls.io/repos/github/kovnick/metar-taf/badge.svg?branch=master)](https://coveralls.io/github/kovnick/metar-taf?branch=master) [![Code Climate](https://codeclimate.com/github/kovnick/metar-taf/badges/gpa.svg)](https://codeclimate.com/github/kovnick/metar-taf)

## Synopsis

This npm package allows you to get [TAF](https://en.wikipedia.org/wiki/Terminal_aerodrome_forecast) and [METAR](https://en.wikipedia.org/wiki/METAR) reports.

## Code Example

```
var MetarFetcher = require('metar-taf').MetarFetcher;
var TafFetcher = require('metar-taf').TafFetcher;

var metarFetcher = new MetarFetcher();
var tafFetcher = new TafFetcher();

metarFetcher.getData('UKBB').then(function(response) {
	console.log(response)
}, function(error) {
	console.error(error);
});
// 2016/08/18 19:00
// UKBB 181900Z 36003MPS 8000 SCT003 BKN007 17/17 Q1014 R88/290060 NOSIG

metarFetcher.getDecodedData('UKBB').then(function(response) {
	console.log(response)
}, function(error) {
	console.error(error);
});
// Boryspil, Ukraine (UKBB) 50-20N 030-58E 122M
// Aug 18, 2016 - 03:00 PM EDT / 2016.08.18 1900 UTC
// Wind: from the N (360 degrees) at 7 MPH (6 KT):0
// Visibility: 4 mile(s):0
// Sky conditions: mostly cloudy
// Temperature: 62 F (17 C)
// Dew Point: 62 F (17 C)
// Relative Humidity: 100%
// Pressure (altimeter): 29.94 in. Hg (1014 hPa)
// ob: UKBB 181900Z 36003MPS 8000 SCT003 BKN007 17/17 Q1014 R88/290060 NOSIG
// cycle: 19

tafFetcher.getData('UKBB').then(function(response) {
	console.log(response)
}, function(error) {
	console.error(error);
});
// 2016/08/18 18:27
// TAF
//       AMD TAF
//       AMD UKBB 181722Z 1818/1918 VRB02MPS 4000 BR BKN004 BKN015
//       TEMPO 1818/1905 0400 -SHRA FG BKN002 BKN020CB
//       BECMG 1905/1907 36003MPS 9999 NSW BKN015
//       TEMPO 1907/1918 02008G13MPS 2100 -SHRA SCT006 SCT020CB PROB40
//       TEMPO 1910/1916 VRB09G14MPS 2000 TSRA BKN015CB
```

## Tests

For run mocha unit tests:
```
npm test
```

For run istanbul code coverage:
```
npm run-script cover
```

## Contributors

[M.Kovalevskyi](https://github.com/kovnick)

## License

Code released under [the MIT license](https://github.com/kovnick/metar-taf/blob/master/LICENSE).
