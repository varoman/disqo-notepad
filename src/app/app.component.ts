import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public shouldDisplayStats: boolean;

  constructor(private sharedService: SharedService) {
    this.sharedService
        .displayStatsSubject
        .subscribe((shouldDisplayStats: boolean) => this.shouldDisplayStats = shouldDisplayStats);
  }
}
