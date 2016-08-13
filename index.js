'use strict';

// var metarFetcher = new MetarFetcher();
// var tafFetcher = new TafFetcher();

// metarFetcher.getData('UKBB').then(function(response) {
// 	console.log(response)
// }, function(error) {
// 	console.error(error);
// });
// metarFetcher.getDecodedData('UKBB').then(function(response) {
// 	console.log(response)
// }, function(error) {
// 	console.error(error);
// });
// tafFetcher.getData('UKBB').then(function(response) {
// 	console.log(response)
// }, function(error) {
// 	console.error(error);
// });

module.exports = {
	MetarFetcher: require('./lib/metarFetcher'),
	TafFetcher: require('./lib/tafFetcher')
};