import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhaseTroisAffichageComponent } from './phase-trois-affichage.component';

describe('PhaseTroisAffichageComponent', () => {
  let component: PhaseTroisAffichageComponent;
  let fixture: ComponentFixture<PhaseTroisAffichageComponent>;

  beforeEach(waitForAsync(() => {
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
