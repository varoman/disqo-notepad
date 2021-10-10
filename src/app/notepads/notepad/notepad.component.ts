import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gist } from '../../shared/gist.interface';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  @Input() public notepad: Gist;
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
