import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFilmComponent } from './find-film.component';

describe('FindFilmComponent', () => {
  let component: FindFilmComponent;
  let fixture: ComponentFixture<FindFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
