import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GistsService } from '../../shared/gists.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from './note.model';
import { Subscription } from 'rxjs';
import { Validation } from '../../core/validation';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {

  @Input() public note: Note;
  public noteForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(private gistsService: GistsService,
              private fb: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.note) {
      this.getNoteAndPopulateForm();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initForm(): void {
    const { required, maxLength } = Validation;
    this.noteForm = this.fb.group({
      filename: ['', [required, maxLength(255)]],
      content: ['', [required, maxLength(1000)]],
    });
  }

  private getNoteAndPopulateForm(): void {
    const subscription =
    this.gistsService
        .getGistFileContent(this.note.raw_url)
        .subscribe((res: string) => this.populateForm(res));
    this.subscriptions.add(subscription);
  }

  private populateForm(noteContent: string): void {
    this.noteForm.controls.filename.patchValue(this.note.filename);
    this.noteForm.controls.content.patchValue(noteContent);
  }
}
