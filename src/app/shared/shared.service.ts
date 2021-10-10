import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public displayStatsSubject = new Subject<boolean>();

  constructor() { }

  public displayStats() {
    this.displayStatsSubject.next(true);
  }

  public hideStats() {
    this.displayStatsSubject.next(false);
  }
}
