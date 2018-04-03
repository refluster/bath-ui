import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MsgService } from './service/msg.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
	{
		path: 'index',
		component: IndexComponent
	}, {
		path: '',
		redirectTo: '/index',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [
		AppComponent
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
