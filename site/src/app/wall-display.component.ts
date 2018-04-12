import { Component, ElementRef, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { MsgService } from './service/msg.service';

@Component({
	selector: 'wall-display',
	templateUrl: './wall-display.component.html',
	styles: [`
#main {
  width: 2160px;
  height: 3840px;
  position: absolute;
}
#c {
  position: absolute;
  width: 2160px;
  height: 3040px;
  top: 0;
  left: 0;
  background-color: #8888ff;
}
#l {
  position: absolute;
  width: 1080px;
  height: 800px;
  top: 3040px;
  left: 0;
  background-color: #ff8888;
}
#r {
  position: absolute;
  width: 1080px;
  height: 800px;
  top: 3040px;
  left: 1080px;
  background-color: #88ff88;
}
    `],
})
export class WallDisplayComponent {
	private disp_c = '';
	private disp_l = '';
	private disp_r = '';

	constructor(private msgService: MsgService) {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			if (d.voicectrl !== undefined &&
				d.voicectrl.temperature !== undefined) {
				if (t == '+') {
				} else if (t == '-') {
				} else if (typeof(t) == 'number') {
				}
			}
			console.log('deepsteam-io', d);
		})
	}
}
