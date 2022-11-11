import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResiliationComponent } from './resiliation.component';

describe('ResiliationComponent', () => {
  let component: ResiliationComponent;
  let fixture: ComponentFixture<ResiliationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResiliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
