import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteEventsComponent } from './modal-delete-events.component';

describe('ModalDeleteEventsComponent', () => {
  let component: ModalDeleteEventsComponent;
  let fixture: ComponentFixture<ModalDeleteEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
