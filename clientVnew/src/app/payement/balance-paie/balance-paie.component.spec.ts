import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BalancePaieComponent } from './balance-paie.component';

describe('BalancePaieComponent', () => {
  let component: BalancePaieComponent;
  let fixture: ComponentFixture<BalancePaieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancePaieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancePaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
