'use strict';

const Fetcher = require('./fetcher');

class MetarFetcher extends Fetcher {
	constructor() {
		super();
		this.optionsTpl = {
			host: 'tgftp.nws.noaa.gov',
			path: '/data/observations/metar/{mode}/{station}.TXT'
		};
	}

	getData(station) {
		let options = Object.assign({}, this.optionsTpl);
		options.path = options.path.replace('{mode}', 'stations');
		options.path = options.path.replace('{station}', station);
		return this.sendRequest(options);
	}

	getDecodedData(station) {
		let options = Object.assign({}, this.optionsTpl);
		options.path = options.path.replace('{mode}', 'decoded');
		options.path = options.path.replace('{station}', station);
		return this.sendRequest(options);
	}
}

module.exports = MetarFetcher;