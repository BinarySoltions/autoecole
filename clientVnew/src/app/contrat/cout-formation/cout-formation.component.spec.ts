import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoutFormationComponent } from './cout-formation.component';

describe('CoutFormationComponent', () => {
  let component: CoutFormationComponent;
  let fixture: ComponentFixture<CoutFormationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoutFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoutFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
