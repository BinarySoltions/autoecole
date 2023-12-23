import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendEmailComponent } from './modal-send-email.component';

describe('ModalSendEmailComponent', () => {
  let component: ModalSendEmailComponent;
  let fixture: ComponentFixture<ModalSendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSendEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
