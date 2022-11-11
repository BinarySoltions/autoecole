import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MotoConduiteComponent } from './moto-conduite.component';

describe('MotoConduiteComponent', () => {
  let component: MotoConduiteComponent;
  let fixture: ComponentFixture<MotoConduiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoConduiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoConduiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
