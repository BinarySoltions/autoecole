import { TestBed } from '@angular/core/testing';

import { ChangementGuardService } from './changement-guard.service';

describe('ChangementGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangementGuardService = TestBed.get(ChangementGuardService);
    expect(service).toBeTruthy();
  });
});
