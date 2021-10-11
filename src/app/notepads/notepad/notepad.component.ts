import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gist } from '../../shared/gist.interface';
import { SharedService } from '../../shared/shared.service';
import { GistsService } from '../../shared/gists.service';

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
              ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.notepad) {
      this.notepadForm.controls.description.patchValue(this.notepad.description);
    }
  }

  public onDeleteNotepad(): void {
    this.gistsService.deleteGist(this.notepad.id)
        .subscribe(() => this.deleteNotepad.emit());
  }

  public onViewStats(): void {
    this.sharedService.displayStats();
  }

  private initForm(): void {
    this.notepadForm = this.fb.group({
      description: [''],
    });
  }

}
