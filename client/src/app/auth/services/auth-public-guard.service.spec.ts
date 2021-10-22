import { TestBed } from '@angular/core/testing';

import { AuthPublicGuardService } from './auth-public-guard.service';

describe('AuthPublicGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthPublicGuardService = TestBed.get(AuthPublicGuardService);
    expect(service).toBeTruthy();
  });
});
