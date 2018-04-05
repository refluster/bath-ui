import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { MsgService } from './service/msg.service';

@Component({
	selector: 'controller',
	templateUrl: './controller.component.html',
    styles: [`
    `]
})
export class ControllerComponent {
	constructor(private msgService: MsgService, el: ElementRef, private http: HttpClient) {}

	ngOnInit(): void {
	}

	post(url, body): void {
		this.http.post(url, body)
			.subscribe(
				res => {
					console.log(res);
				},
				err => {
					console.log("Error occured");
				}
			);
	}

	push_weightcale(): void {
		const url = 'https://ljusw3bf2h.execute-api.ap-northeast-1.amazonaws.com/v0/bath/weightscale';
		const body = {data:
					  {wind:
					   {power: 30}
					  },
					  eventName: 'test_push'
					 };
		this.post(url, body);
	}
}
