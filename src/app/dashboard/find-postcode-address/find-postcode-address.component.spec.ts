import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPostcodeAddressComponent } from './find-postcode-address.component';

describe('FindPostcodeAddressComponent', () => {
  let component: FindPostcodeAddressComponent;
  let fixture: ComponentFixture<FindPostcodeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindPostcodeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPostcodeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
