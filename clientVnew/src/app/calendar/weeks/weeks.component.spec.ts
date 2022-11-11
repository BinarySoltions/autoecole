import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeeksComponent } from './weeks.component';

describe('WeeksComponent', () => {
  let component: WeeksComponent;
  let fixture: ComponentFixture<WeeksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
