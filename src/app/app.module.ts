import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotepadComponent } from './notepads/notepad/notepad.component';
import { NoteComponent } from './notepads/note/note.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { GithubAPIInterceptor } from './core/githubAPI.interceptor';
import { ChartComponent } from './statistics/chart/chart.component';
import { NotepadsComponent } from './notepads/notepads.component';


@NgModule({
	declarations: [
		AppComponent,
		NotepadsComponent,
		NotepadComponent,
		NoteComponent,
		StatisticsComponent,
		ChartComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: GithubAPIInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
