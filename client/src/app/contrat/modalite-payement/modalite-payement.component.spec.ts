import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalitePayementComponent } from './modalite-payement.component';

describe('ModalitePayementComponent', () => {
  let component: ModalitePayementComponent;
  let fixture: ComponentFixture<ModalitePayementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalitePayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalitePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
