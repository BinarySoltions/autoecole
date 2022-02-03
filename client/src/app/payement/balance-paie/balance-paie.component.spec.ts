import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancePaieComponent } from './balance-paie.component';

describe('BalancePaieComponent', () => {
  let component: BalancePaieComponent;
  let fixture: ComponentFixture<BalancePaieComponent>;

  beforeEach(async(() => {
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
