import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseDeuxAffichageComponent } from './phase-deux-affichage.component';

describe('PhaseDeuxAffichageComponent', () => {
  let component: PhaseDeuxAffichageComponent;
  let fixture: ComponentFixture<PhaseDeuxAffichageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseDeuxAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseDeuxAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
