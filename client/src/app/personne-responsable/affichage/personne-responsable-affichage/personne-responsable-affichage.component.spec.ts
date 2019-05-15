import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneResponsableAffichageComponent } from './personne-responsable-affichage.component';

describe('PersonneResponsableAffichageComponent', () => {
  let component: PersonneResponsableAffichageComponent;
  let fixture: ComponentFixture<PersonneResponsableAffichageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneResponsableAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneResponsableAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
