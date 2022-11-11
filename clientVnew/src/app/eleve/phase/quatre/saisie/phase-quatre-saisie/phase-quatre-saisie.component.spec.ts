import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhaseQuatreSaisieComponent } from './phase-quatre-saisie.component';

describe('PhaseQuatreSaisieComponent', () => {
  let component: PhaseQuatreSaisieComponent;
  let fixture: ComponentFixture<PhaseQuatreSaisieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseQuatreSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseQuatreSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
