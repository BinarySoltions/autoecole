import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonneResponsableAffichageComponent } from './personne-responsable-affichage.component';

describe('PersonneResponsableAffichageComponent', () => {
  let component: PersonneResponsableAffichageComponent;
  let fixture: ComponentFixture<PersonneResponsableAffichageComponent>;

  beforeEach(waitForAsync(() => {
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
