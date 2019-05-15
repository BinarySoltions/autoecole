import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseTroisAffichageComponent } from './phase-trois-affichage.component';

describe('PhaseTroisAffichageComponent', () => {
  let component: PhaseTroisAffichageComponent;
  let fixture: ComponentFixture<PhaseTroisAffichageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseTroisAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseTroisAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
