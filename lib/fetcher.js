'use strict';

const https = require('https');

class Fetcher {
	sendRequest(requestOptions) {
		return new Promise(function(resolve, reject) {
			let body;
			let req = https.get(requestOptions, function(response) {
				let bodyChunks = [];
				response.on('data', function(chunk) {
					bodyChunks.push(chunk);
				}).on('end', function() {
					body = Buffer.concat(bodyChunks);
					resolve(body.toString());
				})
			});
			req.on('error', function(e) {
				reject(e);
				console.log(e);
			});
		}); 
	}
}

module.exports = Fetcher;
