import { Component, ElementRef } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Component({
	selector: 'index',
	templateUrl: './index.component.html',
    styles: [`
summary {
display: inline-block;
}
calendar {
display: inline-block;
margin-left: auto;
}
#main {

}
.component {
margin: 10px;
padding: 10px;
}
    `]
})
export class IndexComponent {
	constructor() {}

	ngOnInit(): void {
	}
}
