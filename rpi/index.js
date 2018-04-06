let deepstream = require('deepstream.io-client-js');
let client = deepstream('52.192.206.13:6020');

client.login();
client.event.subscribe('esdc/bath/test', data => {
	if (data.voicectrl !== undefined &&
		data.voicectrl.light !== undefined) {
		if (data.voicectrl.light == true) {
			console.log('light on');
		} else {
			console.log('light off');
		}
	}
})
