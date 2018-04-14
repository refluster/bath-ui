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
	private demo_data = [
		{json: {mic: {misc: {reset: true}}, voicectrl: {lightA: {dark: 10}}}, text: 'リセット'},
		{json: {weightscale: true, voicectrl: {lightA: {bright: 10}}}, text: '体重計に乗る'},
		{json: {mic: {status: 'shower'}}, text: 'シャワー'},
		{json: {voicectrl: {temperature: '+'}}, text: 'もっと温かく'},
		{json: {mic: {status: 'bathing'}, voicectrl: {lightA: {dark: 5}}}, text: '浴槽に入る'},
		{json: {voicectrl: {changeMusic: true}}, text: '音楽を変えて'},
		{json: {mic: {misc: {recommend: true}}, voicectrl: {lightA: {bright: 10}}}, text: '浴槽から出ることを促す'},
		{json: {mic: {status: 'absent'}}, text: '浴槽から出る'},
		{json: {voicectrl: {call: true}}, text: 'もうすぐ上がる'},
		{json: {mic: {misc: {alertLong: true}}}, text: '長湯アラート'},
		{json: {mic: {noise: true}}, text: '転倒'},
		{json: {mic: {misc: {results: true}}}, text: '入浴結果'},
		{json: {mic: {misc: {rotate: 0}}}, text: 'bath disp rot 0'},
		{json: {mic: {misc: {rotate: 90}}}, text: 'bath disp rot 90'},
		{json: {mic: {misc: {rotate: 180}}}, text: 'bath disp rot 180'},
		{json: {mic: {misc: {rotate: 270}}}, text: 'bath disp rot 270'},
	];
	private misc_data = [
		{json: {misc: {recommend: true}}, text: 'recommend'},
		{json: {misc: {alertLong: true}}, text: 'alert long bathing'},
	];
	private weightscale_data = [
		{json: {userid: 0, weight: 60, bmi: 23}, text: 'user0'},
	];
	private mic_data = [
		{json: {noise: true}, text: 'noise'},
		{json: {status: 'shower'}, text: 'status/shower'},
		{json: {status: 'bodywash'}, text: 'status/bodywash'},
		{json: {status: 'bathing'}, text: 'status/bathing'},
		{json: {status: 'absent'}, text: 'status/absent'},
	];
	private voicectrl_data = [
		{json: {call: true}, text: 'call'},
		{json: {changeMusic: true}, text: 'change music'},
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

	push_event(data): void {
		const url = 'https://ljusw3bf2h.execute-api.ap-northeast-1.amazonaws.com/v0/bath/event';
		this.post(url, data);
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
