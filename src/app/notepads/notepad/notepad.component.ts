import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GistsService } from '../../shared/gists.service';
import { Notepad } from './notepad.interface';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  @Input() public notepad: Notepad;
  public notepadForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    if (this.notepad) {
      this.notepadForm.controls.description.patchValue(this.notepad.description);
    }
  }

  private initForm(): void {
    this.notepadForm = this.fb.group({
      description: [''],
    });
  }

}
