import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmerChangementComponent } from './confirmer-changement.component';

describe('ConfirmerChangementComponent', () => {
  let component: ConfirmerChangementComponent;
  let fixture: ComponentFixture<ConfirmerChangementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmerChangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmerChangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
