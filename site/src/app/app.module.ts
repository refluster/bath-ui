import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MsgService } from './service/msg.service';

import { AppComponent } from './app.component';
import { ControllerComponent } from './controller.component';
import { DeepstreamIoComponent } from './deepstream-io.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
	{
		path: 'index',
		component: IndexComponent
	}, {
		path: 'controller',
		component: ControllerComponent
	}, {
		path: '',
		redirectTo: '/index',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [
		AppComponent,
		ControllerComponent,
		DeepstreamIoComponent,
		IndexComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
	],
	providers: [
		MsgService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
