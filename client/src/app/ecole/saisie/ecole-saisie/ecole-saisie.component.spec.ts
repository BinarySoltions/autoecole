import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleSaisieComponent } from './ecole-saisie.component';

describe('EcoleSaisieComponent', () => {
  let component: EcoleSaisieComponent;
  let fixture: ComponentFixture<EcoleSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcoleSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
