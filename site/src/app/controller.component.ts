import { Component, ElementRef } from '@angular/core';
import { Headers, Http } from '@angular/http';
import needle from 'needle';
import { MsgService } from './service/msg.service';

@Component({
	selector: 'controller',
	templateUrl: './controller.component.html',
    styles: [`
    `]
})
export class ControllerComponent {
	constructor(private msgService: MsgService, el: ElementRef) {}

	ngOnInit(): void {
	}

	push_weightcale(): void {
		const url = 'https://ljusw3bf2h.execute-api.ap-northeast-1.amazonaws.com/v0/bath/weightscale';
		const body = {data:
					  {wind:
					   {power: 30}
					  },
					  eventName: 'test_push'
					 a};
		console.log(needle);
		needle.post(url, body, { json: true }, (error, response) => {
			console.log('error: %j', error);
			console.log('response: %j', response);
			console.log('post done by needle %j', response.body);
		});
	}
}
