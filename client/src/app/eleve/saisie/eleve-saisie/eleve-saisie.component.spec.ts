import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveSaisieComponent } from './eleve-saisie.component';

describe('EleveSaisieComponent', () => {
  let component: EleveSaisieComponent;
  let fixture: ComponentFixture<EleveSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleveSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
