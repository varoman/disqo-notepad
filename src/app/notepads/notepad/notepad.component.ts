import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gist } from '../../shared/gist.interface';
import { SharedService } from '../../shared/shared.service';
import { GistsService } from '../../shared/gists.service';
import { NotepadsService } from '../notepads.service';
import { Validation } from '../../core/validation';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  @Input() public notepad: Gist;
  @Output() public deleteNotepad = new EventEmitter<void>();
  public notepadForm: FormGroup;

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private gistsService: GistsService,
              private notepadsService: NotepadsService,
              ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.notepad) {
      this.notepadForm.controls.description.patchValue(this.notepad.description);
    }
  }

  public onSave(): void {
    alert('not implemented');
  }

  public onDeleteNotepad(): void {
    this.gistsService.deleteGist(this.notepad.id)
        .subscribe(() => this.notepadsService.notepadsUpdateSubject.next());
  }

  public onViewStats(): void {
    this.sharedService.displayStats();
  }

  private initForm(): void {
    const { required, maxLength } = Validation;
    this.notepadForm = this.fb.group({
      description: ['', [required, maxLength(255)]],
    });
  }

}
