import { TestBed } from '@angular/core/testing';

import { ApiPerfixInterceptor } from './api-perfix.interceptor';

describe('ApiPerfixInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiPerfixInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiPerfixInterceptor = TestBed.inject(ApiPerfixInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
