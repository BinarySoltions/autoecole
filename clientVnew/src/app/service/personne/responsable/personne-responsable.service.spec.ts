import { TestBed } from '@angular/core/testing';

import { PersonneResponsableService } from './personne-responsable.service';

describe('PersonneResponsableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonneResponsableService = TestBed.get(PersonneResponsableService);
    expect(service).toBeTruthy();
  });
});
