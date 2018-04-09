let deepstream = require('deepstream.io-client-js');
let client = deepstream('52.192.206.13:6020');
let Gpio = require('onoff').Gpio;

let led = new Gpio(4, 'out');

client.login();
client.event.subscribe('esdc/bath/test', data => {
	if (data.voicectrl !== undefined &&
		data.voicectrl.light !== undefined) {
		if (data.voicectrl.light == true) {
			console.log('light on');
			led.writeSync(1);
		} else {
			console.log('light off');
			led.writeSync(0);
		}
	}
});
