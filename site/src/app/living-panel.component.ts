import { Component, ElementRef, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { MsgService } from './service/msg.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

@Component({
	selector: 'living-panel',
	templateUrl: './living-panel.component.html',
	styles: [`
#main {
  width: 1920px;
  height: 1080px;
}
#content {
  position: relative;
  width: 1920px;
  height: 1080px;
  top: 0;
  left: 0;
  background-color: #000;
}
.resource {
  position: absolute;
  top:0; left:0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
img {
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
export class LivingPanelComponent {
	private state = {
		L10: 'hide',
		L11: 'hide',
		L12: 'hide',
		L13: 'hide',
		L14: 'hide',
		L20: 'hide',
		L30: 'hide',
		L40: 'hide',
		L50: 'hide',
	};
	private lastKey = '';
	private _el: HTMLElement;

	constructor(private msgService: MsgService,
				private el: ElementRef) {
		this._el = el.nativeElement;
	}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('deep steam io', d);
			if (d.weightscale !== undefined) {
				this.fadeInAnim('L11');
			}
			if (d.voicectrl !== undefined) {
				if (d.voicectrl.call == true) {
					this.fadeInAnim('L20');
				}
			}
			if (d.mic !== undefined) {
				if (d.mic.noise !== undefined) {
					this.fadeInAnim('L40');
				}
				if (d.mic.status !== undefined) {
					let key = {shower: 'L12', bathing: 'L13', other: 'L14', absent: 'L14'};
					if (key[d.mic.status] !== undefined) {
						this.fadeInAnim(key[d.mic.status]);
					}
				}
				if (d.mic.misc !== undefined) {
					if (d.mic.misc.reset !== undefined) {
						this.fadeInAnim('L10');
					}
					if (d.mic.misc.alertLong !== undefined) {
						this.fadeInAnim('L30');
					}
					if (d.mic.misc.results !== undefined) {
						this.fadeInAnim('L50');
					}
				}
			}
		})
	}

	fadeInAnim(key): void {
        let audio = (<HTMLAudioElement>this._el.querySelector("." + key));
        audio.play();
		this.state[key] = 'display';
		if (this.lastKey != '' && this.lastKey != key) {
			let k = this.lastKey;
			setTimeout(() => {
				this.state[k] = 'hide';
			}, 2000);
		}
		this.lastKey = key;
	}
}
