import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptationConditionComponent } from './acceptation-condition.component';

describe('AcceptationConditionComponent', () => {
  let component: AcceptationConditionComponent;
  let fixture: ComponentFixture<AcceptationConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptationConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptationConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
