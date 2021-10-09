import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotepadComponent } from './notepad/notepad.component';
import { NoteComponent } from './notepad/note/note.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NoteListComponent } from './notepad/note-list/note-list.component';
import { APIInterceptor } from './core/api.interceptor';
import { ChartComponent } from './statistics/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NotepadComponent,
    NoteComponent,
    StatisticsComponent,
    NoteListComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
