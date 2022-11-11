import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayementComponent } from './payement.component';

describe('PayementComponent', () => {
  let component: PayementComponent;
  let fixture: ComponentFixture<PayementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
