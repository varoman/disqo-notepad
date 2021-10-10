import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gist } from '../../shared/gist.interface';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  @Input() public notepad: Gist;
  public notepadForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.notepad) {
      this.notepadForm.controls.description.patchValue(this.notepad.description);
    }
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
