import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPayementComponent } from './detail-payement.component';

describe('DetailPayementComponent', () => {
  let component: DetailPayementComponent;
  let fixture: ComponentFixture<DetailPayementComponent>;

  beforeEach(async(() => {
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
