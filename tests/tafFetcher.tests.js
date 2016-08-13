'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const TafFetcher = require('../lib/tafFetcher');

describe('TafFetcher tests', function() {
	let tafFetcher, sendRequestStub;
	before(function() {
		tafFetcher = new TafFetcher();
		sendRequestStub = sinon.stub(tafFetcher, 'sendRequest', function() {
			return 'Test response';
		});
	});
	after(function() {
		sendRequestStub.restore();
	});

	describe('When get data', function() {
		it('should call sendRequest with expected parameters and return expected value', function() {
			let result = tafFetcher.getData("UKBB");
			assert.equal(result, 'Test response');
			sinon.assert.calledWith(sendRequestStub, {
				host: 'tgftp.nws.noaa.gov',
				path: '/data/forecasts/taf/stations/UKBB.TXT'
			});
		});
	});
});