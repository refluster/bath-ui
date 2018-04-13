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
  background-color: #ba9;
}
img {
  width: 100%;
  height: 100%;
}
    `],
	animations: [
		trigger('fadeIn', [
			state('display', style({ opacity: 1 })),
			state('hide', style({ opacity: 0 })),
			transition('hide => display', animate('2000ms linear')),
			transition('display => hide', animate('0ms linear'))
		])
	]
})
export class WallDisplayComponent {
	private state = {
		B10: 'hide',
		B11: 'hide',
		B12: 'hide',
		B13: 'hide',
		B14: 'hide',
		B15: 'hide',
		B20: 'hide',
		B30: 'hide',
		B40: 'hide',
	};
	private B40 = 'display';
	private lastKey = '';

	constructor(private msgService: MsgService) {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('=========== deepsteam-io', d);
			if (d.weightscale !== undefined) {
				this.fadeInAnim('B10');
			}
			if (d.mic !== undefined) {
				if (d.mic.status !== undefined) {
					let s = d.mic.status;
					if (s == 'bathing') {
						this.fadeInAnim('B12');
					}
					if (s == 'other' || s == 'absent') {
						this.fadeInAnim('B15');
					}
				}
				if (d.mic.misc !== undefined) {
					if (d.mic.misc.recommend !== undefined) {
						this.fadeInAnim('B14');
					}
				}
			}
			if (d.voicectrl !== undefined) {
				if (d.voicectrl.temperature !== undefined) {
					let t = d.voicectrl.temperature;
					if (t == '+') {
						this.fadeInAnim('B11');
					}
				}
				if (d.voicectrl.changeMusic !== undefined) {
					this.fadeInAnim('B13');
				}
			}
		})
	}

	fadeInAnim(key): void {
		this.state[key] = 'display';
		if (this.lastKey != '') {
			let k = this.lastKey;
			setTimeout(() => {
				this.state[k] = 'hide';
			}, 2000);
		}
		this.lastKey = key;
	}
}
