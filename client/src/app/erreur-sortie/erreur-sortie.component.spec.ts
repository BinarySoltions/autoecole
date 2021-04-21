import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurSortieComponent } from './erreur-sortie.component';

describe('ErreurSortieComponent', () => {
  let component: ErreurSortieComponent;
  let fixture: ComponentFixture<ErreurSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErreurSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
