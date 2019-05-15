import { TestBed } from '@angular/core/testing';

import { EleveService } from './eleve.service';

describe('EleveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EleveService = TestBed.get(EleveService);
    expect(service).toBeTruthy();
  });
});
