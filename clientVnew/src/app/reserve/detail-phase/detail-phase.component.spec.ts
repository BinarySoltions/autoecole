import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailPhaseComponent } from './detail-phase.component';

describe('DetailPhaseComponent', () => {
  let component: DetailPhaseComponent;
  let fixture: ComponentFixture<DetailPhaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
