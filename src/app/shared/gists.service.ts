import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawHttpClient } from '../core/raw-http.client';
import { Notepad } from '../notepads/notepad/notepad.interface';

@Injectable({
  providedIn: 'root'
})
export class GistsService {

  constructor(private httpClient: HttpClient,
              private rawHttpClient: RawHttpClient,
              ) {
  }

  public getGists(): Observable<Notepad[]> {
    return this.httpClient.get<Notepad[]>('gists');
  }

  public getGistFileContent(fileURI: string): Observable<string> {
    return this.rawHttpClient.get(fileURI, { responseType: 'text'});
  }

  public getPublicGists(pagination: any): Observable<Notepad[]> {
    return this.httpClient.get<Notepad[]>('gists/public', { params: pagination });
  }
}
