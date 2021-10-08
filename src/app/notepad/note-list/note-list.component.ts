import { Component, OnInit } from '@angular/core';
import { NotepadService } from '../notepad.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  public notes: any[] = [];

  constructor(private notepadService: NotepadService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  private getNotes(): void {
    this.notepadService
        .getNotes()
        .subscribe((res: any) => this.notes = res);
  }

}
