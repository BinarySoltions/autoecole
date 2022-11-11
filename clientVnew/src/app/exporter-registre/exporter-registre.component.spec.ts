import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExporterRegistreComponent } from './exporter-registre.component';

describe('ExporterRegistreComponent', () => {
  let component: ExporterRegistreComponent;
  let fixture: ComponentFixture<ExporterRegistreComponent>;

  beforeEach(waitForAsync(() => {
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
