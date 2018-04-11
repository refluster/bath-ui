import { Component, ElementRef, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { MsgService } from './service/msg.service';

@Component({
	selector: 'living-panel',
	templateUrl: './living-panel.component.html',
	styles: [``],
})
export class LivingPanelComponent {
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
