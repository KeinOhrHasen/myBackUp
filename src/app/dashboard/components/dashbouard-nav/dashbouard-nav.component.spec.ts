import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbouardNavComponent } from './dashbouard-nav.component';

describe('DashbouardNavComponent', () => {
  let component: DashbouardNavComponent;
  let fixture: ComponentFixture<DashbouardNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbouardNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbouardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
