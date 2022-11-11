import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddDrivingComponent } from './add-driving.component';

describe('AddDrivingComponent', () => {
  let component: AddDrivingComponent;
  let fixture: ComponentFixture<AddDrivingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDrivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
