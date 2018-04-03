import { Component, ElementRef, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
//import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as deepstream from 'deepstream.io-client-js';
import { MsgService } from './service/msg.service';

import { Router } from '@angular/router';

@Component({
	selector: 'deepstream-io',
	template: `deep stream io`,
	providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
	styles: [``],
})
export class DeepstreamIoComponent {
	private _el: HTMLElement;

	constructor(el: ElementRef,
				private msgService: MsgService,
				private location: LocationStrategy) {
		this._el = el.nativeElement;
	}

	ngOnInit(): void {
		console.log('push');
		var client = deepstream('52.192.206.13:6020');
		client.login();
		client.event.subscribe('test_push', d => {
			//this.msgService.push('mask', {backgroundColor: '#fff', opacity: '.5', display: 'block'});
			console.log('deep steam io');
		})
	}
}
