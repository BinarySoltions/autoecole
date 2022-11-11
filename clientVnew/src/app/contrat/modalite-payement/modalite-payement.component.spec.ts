import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalitePayementComponent } from './modalite-payement.component';

describe('ModalitePayementComponent', () => {
  let component: ModalitePayementComponent;
  let fixture: ComponentFixture<ModalitePayementComponent>;

  beforeEach(waitForAsync(() => {
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
