import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountStatusComponent } from './acount-status.component';

describe('AcountStatusComponent', () => {
  let component: AcountStatusComponent;
  let fixture: ComponentFixture<AcountStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcountStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcountStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
