import { Component, ElementRef, OnInit } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';

@Component({
	selector: 'api-test',
	templateUrl: './api-test.component.html',
	styles: [``],
})
export class ApiTestComponent {
	private json = ''

	constructor() {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('deep steam io', d);
			this.json = JSON.stringify(d, null , "  ");
		})
	}
}
