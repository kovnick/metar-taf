'use strict';

const Fetcher = require('./fetcher');

class TafFetcher extends Fetcher {
	constructor() {
		super();
		this.optionsTpl = {
			host: 'tgftp.nws.noaa.gov',
			path: '/data/forecasts/taf/stations/{station}.TXT'
		};
	}

	getData(station) {
		let options = Object.assign({}, this.optionsTpl);
		options.path = options.path.replace('{station}', station);
		return this.sendRequest(options);
	}
}

module.exports = TafFetcher;
