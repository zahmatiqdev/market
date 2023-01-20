import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressStartComponent } from './address-start.component';

describe('AddressStartComponent', () => {
  let component: AddressStartComponent;
  let fixture: ComponentFixture<AddressStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
