import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FactDetailComponent } from './fact-detail.component';

describe('FactDetailComponent', () => {
  let component: FactDetailComponent;
  let fixture: ComponentFixture<FactDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FactDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
