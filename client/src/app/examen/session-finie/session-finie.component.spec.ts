import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFinieComponent } from './session-finie.component';

describe('SessionFinieComponent', () => {
  let component: SessionFinieComponent;
  let fixture: ComponentFixture<SessionFinieComponent>;

  beforeEach(async(() => {
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
