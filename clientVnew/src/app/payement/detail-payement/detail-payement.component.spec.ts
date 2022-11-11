import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailPayementComponent } from './detail-payement.component';

describe('DetailPayementComponent', () => {
  let component: DetailPayementComponent;
  let fixture: ComponentFixture<DetailPayementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
