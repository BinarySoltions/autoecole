import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporterRegistreComponent } from './exporter-registre.component';

describe('ExporterRegistreComponent', () => {
  let component: ExporterRegistreComponent;
  let fixture: ComponentFixture<ExporterRegistreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExporterRegistreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExporterRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
