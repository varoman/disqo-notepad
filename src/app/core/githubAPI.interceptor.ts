import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class GithubAPIInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, 
            next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': environment.accessToken,
    });

    const salt = (new Date()).getTime().toString();
    const options = {
      url: `${environment.apiEndpoint}/${request.url}`,
      headers,
      // hack to prevent api request caching.
      params: request.params.append('salt', salt),
    };

    return next.handle(request.clone(options));
  }
}
