import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoteSortieComponent } from './note-sortie.component';

describe('NoteSortieComponent', () => {
  let component: NoteSortieComponent;
  let fixture: ComponentFixture<NoteSortieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
