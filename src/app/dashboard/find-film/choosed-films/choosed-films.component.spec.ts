import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosedFilmsComponent } from './choosed-films.component';

describe('ChoosedFilmsComponent', () => {
  let component: ChoosedFilmsComponent;
  let fixture: ComponentFixture<ChoosedFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosedFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosedFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
