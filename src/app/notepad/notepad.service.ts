import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotepadService {

  constructor(private httpClient: HttpClient) {
  }

  getNotes(): Observable<Object> {
    return this.httpClient.get('gists')
  }
}
