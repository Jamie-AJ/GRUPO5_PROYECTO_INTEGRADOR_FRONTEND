import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInversionesComponent } from './reports-inversiones.component';

describe('ReportsInversionesComponent', () => {
  let component: ReportsInversionesComponent;
  let fixture: ComponentFixture<ReportsInversionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsInversionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
