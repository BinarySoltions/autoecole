import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPhaseComponent } from './detail-phase.component';

describe('DetailPhaseComponent', () => {
  let component: DetailPhaseComponent;
  let fixture: ComponentFixture<DetailPhaseComponent>;

  beforeEach(async(() => {
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
