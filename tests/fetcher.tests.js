'use strict';

const assert = require('chai').assert;
const Fetcher = require('../lib/fetcher');

describe('Fetcher tests', function() {
	let fetcher;
	before(function() {
		fetcher = new Fetcher();
	});

	describe('When send request', function() {
		it('should return promise and expected response', function(done) {
			let promise = fetcher.sendRequest({
				host: 'tgftp.nws.noaa.gov',
				path: '/data/observations/metar/stations/UKBB.TXT'
			});
			promise.then(function(response) {
				assert.typeOf(promise, 'promise');
				assert.equal(response.includes('UKBB'), true);
				done();
			});
		});
		it('should return promise and expected decoded response', function(done) {
			let promise = fetcher.sendRequest({
				host: 'tgftp.nws.noaa.gov',
				path: '/data/observations/metar/decoded/UKBB.TXT'
			});
			promise.then(function(response) {
				assert.typeOf(promise, 'promise');
				assert.equal(response.includes('UKBB'), true);
				done();
			});
		});
	});
});