import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GabaritFactureComponent } from './gabarit-facture.component';

describe('GabaritFactureComponent', () => {
  let component: GabaritFactureComponent;
  let fixture: ComponentFixture<GabaritFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GabaritFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GabaritFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
