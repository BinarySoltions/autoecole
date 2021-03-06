import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseQuatreAffichageComponent } from './phase-quatre-affichage.component';

describe('PhaseQuatreAffichageComponent', () => {
  let component: PhaseQuatreAffichageComponent;
  let fixture: ComponentFixture<PhaseQuatreAffichageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseQuatreAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseQuatreAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
