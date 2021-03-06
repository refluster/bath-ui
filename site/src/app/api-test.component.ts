import { Component, ElementRef, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as deepstream from 'deepstream.io-client-js';

@Component({
	selector: 'api-test',
	templateUrl: './api-test.component.html',
	styles: [`
hr {margin: 8px 0px;}
#main {padding: 16px;}
    `],
})
export class ApiTestComponent {
	private json = '';

	constructor(private datePipe: DatePipe) {}

	ngOnInit(): void {
		let client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('esdc/bath/test', d => {
			console.log('deepsteam-io receive:', d);
			this.json = this.datePipe.transform(new Date(), 'medium')
				+ '\n--\n'
				+ JSON.stringify(d, null , "  ")
				+ '\n===========================\n\n'
				+ this.json;
		})
	}
}
