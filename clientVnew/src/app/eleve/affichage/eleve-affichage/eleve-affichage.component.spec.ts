import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EleveAffichageComponent } from './eleve-affichage.component';

describe('EleveAffichageComponent', () => {
  let component: EleveAffichageComponent;
  let fixture: ComponentFixture<EleveAffichageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EleveAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
