import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MsgService } from './service/msg.service';

import { AppComponent } from './app.component';
import { ApiTestComponent } from './api-test.component';
import { ControllerComponent } from './controller.component';
import { DeepstreamIoComponent } from './deepstream-io.component';
import { LivingPanelComponent } from './living-panel.component';
import { WallDisplayComponent } from './wall-display.component';
import { IndexComponent } from './index.component';

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
	{
		path: 'index',
		component: IndexComponent
	}, {
		path: 'api-test',
		component: ApiTestComponent
	}, {
		path: 'controller',
		component: ControllerComponent
	}, {
		path: 'living-panel',
		component: LivingPanelComponent
	}, {
		path: 'wall-display',
		component: WallDisplayComponent
	}, {
		path: '',
		redirectTo: '/index',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [
		AppComponent,
		ApiTestComponent,
		ControllerComponent,
		DeepstreamIoComponent,
		LivingPanelComponent,
		WallDisplayComponent,
		IndexComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
	],
	providers: [
		MsgService,
		DatePipe,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
