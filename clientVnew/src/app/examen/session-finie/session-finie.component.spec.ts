import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SessionFinieComponent } from './session-finie.component';

describe('SessionFinieComponent', () => {
  let component: SessionFinieComponent;
  let fixture: ComponentFixture<SessionFinieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionFinieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionFinieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
