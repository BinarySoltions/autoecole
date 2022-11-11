import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhaseUneAffichageComponent } from './phase-une-affichage.component';

describe('PhaseUneAffichageComponent', () => {
  let component: PhaseUneAffichageComponent;
  let fixture: ComponentFixture<PhaseUneAffichageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseUneAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseUneAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
