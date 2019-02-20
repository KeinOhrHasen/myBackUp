import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToDashboardComponent } from './back-to-dashboard.component';

describe('BackToDashboardComponent', () => {
  let component: BackToDashboardComponent;
  let fixture: ComponentFixture<BackToDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackToDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
