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
			state('display', style({ opacity: 1; zIndex: 0 })),
			state('hide', style({ opacity: 0; zIndex: 10000 })),
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
	private noise = false;

	constructor(private msgService: MsgService) {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('deep steam io', d);
			if (d.mic !== undefined &&
				d.mic.noise == true) {
				this.noise = true;
			}
		})
	}
}
