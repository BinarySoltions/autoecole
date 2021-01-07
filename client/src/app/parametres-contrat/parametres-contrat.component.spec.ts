import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresContratComponent } from './parametres-contrat.component';

describe('ParametresContratComponent', () => {
  let component: ParametresContratComponent;
  let fixture: ComponentFixture<ParametresContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});