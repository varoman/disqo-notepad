import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotepadComponent } from './Notepad/notepad/notepad.component';
import { NoteComponent } from './Note/note/note.component';
import { StatisticsComponent } from './Statistics/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NotepadComponent,
    NoteComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
