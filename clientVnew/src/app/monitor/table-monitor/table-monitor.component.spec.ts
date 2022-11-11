import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableMonitorComponent } from './table-monitor.component';

describe('TableMonitorComponent', () => {
  let component: TableMonitorComponent;
  let fixture: ComponentFixture<TableMonitorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
