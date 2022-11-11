import { TestBed } from '@angular/core/testing';

import { PublicErrorInterceptorService } from './public-error-interceptor.service';

describe('PublicErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicErrorInterceptorService = TestBed.get(PublicErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});
