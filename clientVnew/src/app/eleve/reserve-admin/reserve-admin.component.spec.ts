import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReserveAdminComponent } from './reserve-admin.component';

describe('ReserveAdminComponent', () => {
  let component: ReserveAdminComponent;
  let fixture: ComponentFixture<ReserveAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
