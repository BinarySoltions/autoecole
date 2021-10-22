import { TestBed } from '@angular/core/testing';

import { PublicInterceptorService } from './public-interceptor.service';

describe('PublicInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicInterceptorService = TestBed.get(PublicInterceptorService);
    expect(service).toBeTruthy();
  });
});
