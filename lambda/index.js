const needle = require('needle')

exports.handler = (event, context, callback) => {
	function post(body) {
		console.log('body: %j', body);
		needle.post(process.env.HTTP_URL, { body }, { json: true }, (error, response) => {
			if (error || response.body.result !== 'SUCCESS') {
				console.log('Unable to emit event', response.body.toString())
				return callback()
			}
			console.log('post done by needle', response.body.toString())
			callback(null, { statusCode: 200 })
		})
	}

	console.log('event: %j', event);

	if (event.weightscale !== undefined) {
		let d = event.weightscale;
		let body = [{
			topic: 'event',
			action: 'emit',
			eventName: d.eventName,
			data: {weightscale: d.data}
		}];
		post(body);
	}
	if (event.mic !== undefined) {
		let d = event.mic;
		let body = [{
			topic: 'event',
			action: 'emit',
			eventName: d.eventName,
			data: {mic: d.data}
		}];
		post(body);
	}
	if (event.voicectrl !== undefined) {
		let d = event.voicectrl;
		let body = [{
			topic: 'event',
			action: 'emit',
			eventName: d.eventName,
			data: {voicectrl: d.data}
		}];
		post(body);
	}
}
