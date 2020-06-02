import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastRowGridComponent } from './last-row-grid.component';

describe('LastRowGridComponent', () => {
  let component: LastRowGridComponent;
  let fixture: ComponentFixture<LastRowGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastRowGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastRowGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
