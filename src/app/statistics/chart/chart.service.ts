import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public chartDataSubject: Subject<any[]> = new Subject();

  constructor() {}
}
