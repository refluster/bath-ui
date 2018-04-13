import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { MsgService } from './service/msg.service';

@Component({
	selector: 'controller',
	templateUrl: './controller.component.html',
    styles: [`
      ul {
        list-style-type: none;
        margin: 4px 0px;
      }
      li {
        margin: 2px 0px;
      }
      hr {
        margin: 8px 0px;
      }
      #main {padding: 16px;}
    `]
})
export class ControllerComponent {
	private weightscale_data = [
		{json: {userid: 0, weight: 60, bmi: 23}, text: 'user0'},
		{json: {userid: 1, weight: 48, bmi: 20}, text: 'user1'},
	];
	private mic_data = [
		{json: {noise: true}, text: 'noise'},
		{json: {status: 'shower'}, text: 'status/shower'},
		{json: {status: 'bodywash'}, text: 'status/bodywash'},
		{json: {status: 'bathing'}, text: 'status/bathing'},
		{json: {status: 'absent'}, text: 'status/absent'},
	];
	private voicectrl_data = [
		{json: {lightA: {power: true}}, text: 'lightA power on'},
		{json: {lightA: {power: false}}, text: 'lightA power off'},
		{json: {lightA: {swpower: true}}, text: 'lightA swpower'},
		{json: {lightA: {bright: 5}}, text: 'lightA bright 5'},
		{json: {lightA: {dark: 3}}, text: 'lightA bright 3'},
		{json: {lightB: {power: true}}, text: 'lightB power on'},
		{json: {lightB: {power: false}}, text: 'lightB power off'},
		{json: {lightB: {swpower: true}}, text: 'lightB swpower'},
		{json: {lightB: {bright: 5}}, text: 'lightB bright 5'},
		{json: {lightB: {dark: 3}}, text: 'lightB bright 3'},
		{json: {temperature: '+'}, text: 'temperature +'},
		{json: {temperature: '-'}, text: 'temperature -'},
		{json: {temperature: 42}, text: 'temperature 42'},
		{json: {temperature: 41}, text: 'temperature 41'},
		{json: {temperature: 40}, text: 'temperature 40'},
		{json: {temperature: 39}, text: 'temperature 39'},
		{json: {temperature: 38}, text: 'temperature 38'},
		{json: {temperature: 37}, text: 'temperature 37'},
	];

	constructor(private msgService: MsgService, el: ElementRef, private http: HttpClient) {}

	ngOnInit(): void {
	}

	post(url, data): void {
		this.http.post(url, data)
			.subscribe(
				res => {
					console.log(res);
				},
				err => {
					console.log("Error occured");
				}
			);
	}

	push_weightscale(data): void {
		const url = 'https://ljusw3bf2h.execute-api.ap-northeast-1.amazonaws.com/v0/bath/weightscale';
		this.post(url, data);
	}

	push_mic(data): void {
		const url = 'https://ljusw3bf2h.execute-api.ap-northeast-1.amazonaws.com/v0/bath/mic';
		this.post(url, data);
	}

	push_voicectrl(data): void {
		const url = 'https://ljusw3bf2h.execute-api.ap-northeast-1.amazonaws.com/v0/bath/voicectrl';
		this.post(url, data);
	}
}
