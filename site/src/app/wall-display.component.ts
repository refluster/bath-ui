import { Component, ElementRef, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { MsgService } from './service/msg.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

@Component({
	selector: 'wall-display',
	templateUrl: './wall-display.component.html',
	styles: [`
#main {
  width: 2160px;
  height: 3840px;
}
#content {
  position: relative;
  width: 2160px;
  height: 3840px;
  top: 0;
  left: 0;
  background-color: #ba9;
}
.resource {
  position: absolute;
  top:0; left:0;
  width: 100%;
  height: 100%;
}
    `],
	animations: [
		trigger('fadeIn', [
			state('display', style({ opacity: 1 })),
			state('hide', style({ opacity: 0 })),
			transition('hide => display', animate('0ms linear')),
			transition('display => hide', animate('2000ms linear'))
		])
	]
})
export class WallDisplayComponent {
	private temperature = 40;
	private state = {
		B10: 'display',
		B11: 'display',
		B12: 'display',
		B13: 'display',
		B14: 'display',
		B15: 'display',
		B20: 'display',
		B30: 'display',
		B40: 'display',
	};
	private B40 = 'display';
	private lastImage = '';

	constructor(private msgService: MsgService) {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('voice');
			if (d.weightscale !== undefined) {
			}
			if (d.voicectrl !== undefined &&
				d.voicectrl.temperature !== undefined) {
				let t = d.voicectrl.temperature;
				if (t == '+') {
					console.log('+');
					this.state.B40 = 'hide';
					this.temperature = this.temperature + 1;
				} else if (t == '-') {
				} else if (typeof(t) == 'number') {
				}
			}
			console.log('deepsteam-io', d);
		})
	}
}
