import { TestBed } from '@angular/core/testing';

import { ShowModalService } from './show-modal.service';

describe('ShowModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowModalService = TestBed.get(ShowModalService);
    expect(service).toBeTruthy();
  });
});
