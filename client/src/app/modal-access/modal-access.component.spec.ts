import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccessComponent } from './modal-access.component';

describe('ModalAccessComponent', () => {
  let component: ModalAccessComponent;
  let fixture: ComponentFixture<ModalAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
