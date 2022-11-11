import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EleveInfoComponent } from './eleve-info.component';

describe('EleveInfoComponent', () => {
  let component: EleveInfoComponent;
  let fixture: ComponentFixture<EleveInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EleveInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
