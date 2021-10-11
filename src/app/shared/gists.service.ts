import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawHttpClient } from '../core/raw-http.client';
import { Gist } from './gist.interface';

@Injectable({
  providedIn: 'root'
})
export class GistsService {

  constructor(private httpClient: HttpClient,
              private rawHttpClient: RawHttpClient,
              ) {
  }

  public getGists(): Observable<Gist[]> {
    return this.httpClient.get<Gist[]>('gists');
  }

  public getGistFileContent(fileURI: string): Observable<string> {
    return this.rawHttpClient.get(fileURI, { responseType: 'text'});
  }

  public getPublicGists(pagination: any): Observable<Gist[]> {
    return this.httpClient.get<Gist[]>('gists/public', { params: pagination });
  }

  public deleteGist(id: string): Observable<any> {
    return this.httpClient.delete(`gists/${id}`);
  }
}
