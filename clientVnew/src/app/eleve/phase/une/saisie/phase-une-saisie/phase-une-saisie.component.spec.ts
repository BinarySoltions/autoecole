import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhaseUneSaisieComponent } from './phase-une-saisie.component';

describe('PhaseUneSaisieComponent', () => {
  let component: PhaseUneSaisieComponent;
  let fixture: ComponentFixture<PhaseUneSaisieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseUneSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseUneSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
