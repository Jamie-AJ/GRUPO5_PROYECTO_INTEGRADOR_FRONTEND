import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountBankComponent } from './add-account-bank.component';

describe('AddAccountBankComponent', () => {
  let component: AddAccountBankComponent;
  let fixture: ComponentFixture<AddAccountBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccountBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
