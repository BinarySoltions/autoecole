import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RowGridComponent } from './row-grid.component';

describe('RowGridComponent', () => {
  let component: RowGridComponent;
  let fixture: ComponentFixture<RowGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RowGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
