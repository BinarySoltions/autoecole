import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseTroisSaisieComponent } from './phase-trois-saisie.component';

describe('PhaseTroisSaisieComponent', () => {
  let component: PhaseTroisSaisieComponent;
  let fixture: ComponentFixture<PhaseTroisSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseTroisSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseTroisSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
