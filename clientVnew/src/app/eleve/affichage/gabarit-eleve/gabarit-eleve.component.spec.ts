import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GabaritEleveComponent } from './gabarit-eleve.component';

describe('GabaritEleveComponent', () => {
  let component: GabaritEleveComponent;
  let fixture: ComponentFixture<GabaritEleveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GabaritEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabaritEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
