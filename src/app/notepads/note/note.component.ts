import { Component, Input, OnInit } from '@angular/core';
import { GistsService } from '../../shared/gists.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from './note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() public note: Note;
  public noteForm: FormGroup;

  constructor(private notepadService: GistsService,
              private fb: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.note) {
      this.getNoteAndPopulateForm();
    }
  }

  private initForm(): void {
    this.noteForm = this.fb.group({
      filename: [''],
      content: [''],
    });
  }

  private getNoteAndPopulateForm(): void {
    this.notepadService
        .getGistFileContent(this.note.raw_url)
        .subscribe((res: string) => this.populateForm(res));
  }

  private populateForm(noteContent: string): void {
    this.noteForm.controls.filename.patchValue(this.note.filename);
    this.noteForm.controls.content.patchValue(noteContent);
  }
}
