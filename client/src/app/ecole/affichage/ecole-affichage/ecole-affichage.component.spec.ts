import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleAffichageComponent } from './ecole-affichage.component';

describe('EcoleAffichageComponent', () => {
  let component: EcoleAffichageComponent;
  let fixture: ComponentFixture<EcoleAffichageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcoleAffichageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
