import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneResponsableSaisieComponent } from './personne-responsable-saisie.component';

describe('PersonneResponsableSaisieComponent', () => {
  let component: PersonneResponsableSaisieComponent;
  let fixture: ComponentFixture<PersonneResponsableSaisieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneResponsableSaisieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneResponsableSaisieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
