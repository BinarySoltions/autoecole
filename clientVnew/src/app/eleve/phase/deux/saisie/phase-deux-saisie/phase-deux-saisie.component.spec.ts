import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhaseDeuxSaisieComponent } from './phase-deux-saisie.component';

describe('PhaseDeuxSaisieComponent', () => {
  let component: PhaseDeuxSaisieComponent;
  let fixture: ComponentFixture<PhaseDeuxSaisieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseDeuxSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseDeuxSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
