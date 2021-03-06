const needle = require('needle');

exports.handler = (event, context, callback) => {
	let eventName = 'esdc/bath/test';

	function post(body) {
		console.log('body: %j', body);
		needle.post(process.env.HTTP_URL, { body }, { json: true }, (error, response) => {
			if (error || response.body.result !== 'SUCCESS') {
				console.log('Unable to emit event', response.body.toString());
				return callback();
			}
			console.log('post done by needle', response.body.toString());
			callback(null, { statusCode: 200 });
		});
	}

	console.log('event: %j', event);

	/*
	if (event.weightscale !== undefined) {
	}
	if (event.mic !== undefined) {
		if (event.mic.status !== undefined &&
			event.mic.status == 'bathing') {
			event.voicectrl = {lightA: {dark: 5}};
		}
	}
	if (event.voicectrl !== undefined) {
	}
	*/

	let body = [{
		topic: 'event',
		action: 'emit',
		eventName: eventName,
		data: event,
	}];
	post(body);
};
