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
metarFetcher.getDecodedData('UKBB').then(function(response) {
	console.log(response)
}, function(error) {
	console.error(error);
});
tafFetcher.getData('UKBB').then(function(response) {
	console.log(response)
}, function(error) {
	console.error(error);
});
```

## Tests

For run mocha unit tests:
```
npm test
```

For run istanbul code coverage:
```
npm run-script coverage
```

## Contributors

[M.Kovalevskyi](https://github.com/kovnick)

## License

Code released under [the MIT license](https://github.com/kovnick/metar-taf/blob/master/LICENSE).
