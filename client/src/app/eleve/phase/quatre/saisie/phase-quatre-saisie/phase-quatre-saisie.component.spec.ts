import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseQuatreSaisieComponent } from './phase-quatre-saisie.component';

describe('PhaseQuatreSaisieComponent', () => {
  let component: PhaseQuatreSaisieComponent;
  let fixture: ComponentFixture<PhaseQuatreSaisieComponent>;

  beforeEach(async(() => {
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
