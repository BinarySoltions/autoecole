import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemanderPwdComponent } from './demander-pwd.component';

describe('DemanderPwdComponent', () => {
  let component: DemanderPwdComponent;
  let fixture: ComponentFixture<DemanderPwdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemanderPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemanderPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
