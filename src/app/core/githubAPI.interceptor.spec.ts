import { TestBed } from '@angular/core/testing';

import { GithubAPIInterceptor } from './githubAPI.interceptor';

describe('ApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GithubAPIInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GithubAPIInterceptor = TestBed.inject(GithubAPIInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
