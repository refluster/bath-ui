const needle = require('needle')

exports.handler = (event, context, callback) => {
	console.log('handler', event);

	if (event.data !== undefined) {
		console.log('============ data');
		let d = event.data;
		/*
		let url = 'https://api.push7.jp/api/v1/' + d.app_no + '/send';
		let body = {
			title: d.title,
			icon: 'https://www.google.com/i.png',
			body: d.body,
			url: d.url,
			apikey: d.api_key,
		};

		needle.post(url, body, { json: true }, (error, response) => {
			if (error || response.body.result !== 'SUCCESS') {
				console.log('Unable to emit event', response.body.toString())
				return callback()
			}
			console.log('post done by needle', response.body.toString())
			callback(null, { statusCode: 200 })
		})
		insertDB(d);
		*/
	}
}
