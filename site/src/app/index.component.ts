import { Component, ElementRef } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MsgService } from './service/msg.service';
import { DeepstreamIoComponent } from './deepstream-io.component';

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
	private text = 'hoge';

	constructor(private msgService: MsgService, el: ElementRef) {
	};

	ngOnInit(): void {
		this.msgService.on('test', d => {
			this.text = d;
		});
	}

	change(): void {
		this.msgService.push('test', 'fuga');
	}
}
