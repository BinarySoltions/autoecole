import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AjouterExamenComponent } from './ajouter-examen.component';

describe('AjouterExamenComponent', () => {
  let component: AjouterExamenComponent;
  let fixture: ComponentFixture<AjouterExamenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
