import { Component, ElementRef, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import { MsgService } from './service/msg.service';

@Component({
	selector: 'wall-display',
	templateUrl: './wall-display.component.html',
	styles: [``],
})
export class WallDisplayComponent {
	private json = ''

	constructor(private msgService: MsgService) {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('deep steam io', d);
			this.json = JSON.stringify(d, null , "  ");
		})
	}
}
