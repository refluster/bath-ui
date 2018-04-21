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
  transform-origin: 0px 0px;
}
.resource {
  position: absolute;
  top:0; left:0;
  width: 100%;
  height: 100%;
  background-color: #ba9;
}
video, img {
  width: 100%;
  height: 100%;
}
    `],
	animations: [
		trigger('fadeIn', [
			state('display', style({ opacity: 1, zIndex: 0 })),
			state('hide', style({ opacity: 0, zIndex: 10000 })),
			transition('hide => display', animate('2000ms linear')),
			transition('display => hide', animate('0ms linear'))
		])
	]
})
export class WallDisplayComponent {
	private state = {
		B00: 'hide',
		B10: 'hide',
		B11: 'hide',
		B12: 'hide',
		B13: 'hide',
		B14: 'hide',
		B15: 'hide',
		B20: 'hide',
		B30: 'hide',
		B40: 'hide',
		B4k60p: 'hide',
		B4k30p: 'hide',
		B2k60p: 'hide',
	};
	private B40 = 'display';
	private lastKey = '';
	private transform = '';
	private _el: HTMLElement;

	constructor(private msgService: MsgService, el: ElementRef) {
		this._el = el.nativeElement;
	}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('=========== deepsteam-io', d);
			if (d.weightscale !== undefined) {
				this.fadeInAnim('B10');
			}
			if (d.mic !== undefined) {
				if (d.mic.noise !== undefined) {
					this.fadeInAnim('B40');
				}
				if (d.mic.status !== undefined) {
					let key = {bathing: 'B12', other: 'B15', absent: 'B15'};
					if (key[d.mic.status] !== undefined) {
						this.fadeInAnim(key[d.mic.status]);
					}
				}
				if (d.mic.misc !== undefined) {
					if (d.mic.misc.reset !== undefined) {
						this.fadeInAnim('B00');
					}
					if (d.mic.misc.recommend !== undefined) {
						this.fadeInAnim('B14');
					}
					if (d.mic.misc.alertLong !== undefined) {
						this.fadeInAnim('B30');
					}
					if (d.mic.misc.rotate !== undefined) {
						switch (d.mic.misc.rotate) {
						case 0:
							this.transform = '';
							break;
						case 90:
							this.transform = 'matrix(0,1,-1,0,3840,0)';
							break;
						case 180:
							this.transform = 'matrix(-1,0,-0,-1,2160,3840)';
							break;
						case 270:
							this.transform = 'matrix(-0,-1,1,0,0,2160)';
							break;
						}
					}
					if (d.mic.misc.test !== undefined) {
						switch (d.mic.misc.test) {
						case '4k60p':
							this.fadeInAnim('B4k60p');
							break;
						case '4k30p':
							this.fadeInAnim('B4k30p');
							break;
						case '2k60p':
							this.fadeInAnim('B2k60p');
							break;
						}
					}
				}
			}
			if (d.voicectrl !== undefined) {
				if (d.voicectrl.call == true) {
					this.fadeInAnim('B20');
				}
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
		let video = (<HTMLVideoElement>this._el.querySelector('#v' + key));
		if (video != null) {
			video.play();
		}
		if (this.lastKey != '' && this.lastKey != key) {
			let k = this.lastKey;
			setTimeout(() => {
				this.state[k] = 'hide';
			}, 2000);
		}
		this.lastKey = key;
	}
}
