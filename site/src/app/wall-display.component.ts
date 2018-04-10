import { Component, ElementRef, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { MsgService } from './service/msg.service';

@Component({
	selector: 'wall-display',
	templateUrl: './wall-display.component.html',
	styles: [``],
})
export class WallDisplayComponent {
	private temperature = 40;

	constructor(private msgService: MsgService) {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			if (d.voicectrl !== undefined &&
				d.voicectrl.temperature !== undefined) {
				let temperature_max = 44;
				let temperature_min = 35;
				let t = d.voicectrl.temperature;
				if (t == '+') {
					this.temperature = this.temperature + 1;
				} else if (t == '-') {
					this.temperature = this.temperature - 1;
				} else if (typeof(t) == 'number') {
					this.temperature = Math.floor(t);
				}
				// clip
				if (this.temperature < temperature_min) {
					this.temperature = temperature_min;
				} else if (this.temperature > temperature_max) {
					this.temperature = temperature_max;
				}
			}
			console.log(this.temperature);
			console.log('deep steam io', d);
		})
	}
}
