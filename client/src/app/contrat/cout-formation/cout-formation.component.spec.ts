import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutFormationComponent } from './cout-formation.component';

describe('CoutFormationComponent', () => {
  let component: CoutFormationComponent;
  let fixture: ComponentFixture<CoutFormationComponent>;

  beforeEach(async(() => {
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
