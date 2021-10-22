import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderPwdComponent } from './demander-pwd.component';

describe('DemanderPwdComponent', () => {
  let component: DemanderPwdComponent;
  let fixture: ComponentFixture<DemanderPwdComponent>;

  beforeEach(async(() => {
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
