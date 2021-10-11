import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotepadsService {

  public notepadsUpdateSubject = new Subject<void>();

  constructor() { }

}
