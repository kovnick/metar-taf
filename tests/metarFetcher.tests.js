'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');
const MetarFetcher = require('../lib/metarFetcher');

describe('MetarFetcher tests', function() {
	let metarFetcher, sendRequestStub;
	before(function() {
		metarFetcher = new MetarFetcher();
		sendRequestStub = sinon.stub(metarFetcher, 'sendRequest', function() {
			return 'Test response';
		});
	});
	after(function() {
		sendRequestStub.restore();
	});

	describe('When get data', function() {
		it('should call sendRequest with expected parameters and return expected value', function() {
			let result = metarFetcher.getData("UKBB");
			assert.equal(result, 'Test response');
			sinon.assert.calledWith(sendRequestStub, {
				host: 'tgftp.nws.noaa.gov',
				path: '/data/observations/metar/stations/UKBB.TXT'
			});
		});
	});

	describe('When get decoded data', function() {
		it('should call sendRequest with expected parameters and return expected value', function() {
			let result = metarFetcher.getDecodedData("UKBB");
			assert.equal(result, 'Test response');
			sinon.assert.calledWith(sendRequestStub, {
				host: 'tgftp.nws.noaa.gov',
				path: '/data/observations/metar/decoded/UKBB.TXT'
			});
		});
	});
});