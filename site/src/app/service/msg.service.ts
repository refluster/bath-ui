import { Injectable } from '@angular/core';

@Injectable()
export class MsgService {
	private hooks = {};

	constructor() { }

	push(key, param): void {
		console.log(key, param);
		this.hooks[key](param);
	}

	on(key, callback): void {
		console.log(key, callback);
		this.hooks[key] = callback;
	}
}
