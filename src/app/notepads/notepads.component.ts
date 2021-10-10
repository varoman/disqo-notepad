import { Component, OnInit } from '@angular/core';
import { GistsService } from '../shared/gists.service';
import { Gist } from '../shared/gist.interface';

@Component({
  selector: 'app-notepads',
  templateUrl: './notepads.component.html',
  styleUrls: ['./notepads.component.scss']
})
export class NotepadsComponent implements OnInit {

  public notepads: Gist[];

  constructor(private gistsService: GistsService) { }

  ngOnInit(): void {
      this.getNotes()
  }

  private getNotes(): void {
    this.gistsService
        .getGists()
        .subscribe((notepads: Gist[]) => this.notepads = notepads);
  }

}
