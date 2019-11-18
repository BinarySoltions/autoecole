import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleConduiteComponent } from './ecole-conduite.component';

describe('EcoleConduiteComponent', () => {
  let component: EcoleConduiteComponent;
  let fixture: ComponentFixture<EcoleConduiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcoleConduiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcoleConduiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
