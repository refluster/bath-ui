let deepstream = require('deepstream.io-client-js');
let client = deepstream('52.192.206.13:6020');
let Gpio = require('onoff').Gpio;

let ledApower = new Gpio(2, 'out');
let ledAswpower = new Gpio(3, 'out');
let ledAbright = new Gpio(4, 'out');
let ledAdark = new Gpio(17, 'out');
let ledBpower = new Gpio(27, 'out');
let ledBswpower = new Gpio(22, 'out');
let ledBbright = new Gpio(10, 'out');
let ledBdark = new Gpio(9, 'out');

function lightCtrl(d) {
	if (d.power == true) {
		console.log('light power on');
		ledApower.writeSync(1);
	} else if (d.power == false) {
		console.log('light power off');
		ledApower.writeSync(0);
	}
	if (d.swpower == true) {
		console.log('light power off');
		ledAswpower.writeSync(1);
		setTimeout(() => {
			ledAswpower.writeSync(0);
		}, 200);
	}
	if (d.bright > 0) {
		console.log('light bright ', d.bright);
		ledAbright.writeSync(1);
		setTimeout(() => {
			ledAbright.writeSync(0);
		}, 1000*d.bright);
	}
	if (d.dark > 0) {
		console.log('light dark ', d.dark);
		ledAdark.writeSync(1);
		setTimeout(() => {
			ledAdark.writeSync(0);
		}, 1000*d.dark);
	}
}

client.login();
client.event.subscribe('esdc/bath/test', data => {
	if (data.voicectrl !== undefined) {
		if (data.voicectrl.lightA !== undefined) {
			console.log('lightA');
			lightCtrl(data.voicectrl.lightA);
		}
		if (data.voicectrl.lightB !== undefined) {
			console.log('lightB');
			lightCtrl(data.voicectrl.lightB);
		}
	}
});
