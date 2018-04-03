import { Component, ElementRef } from '@angular/core';
import { Headers, Http } from '@angular/http';
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

	change(): void {
	}
}
