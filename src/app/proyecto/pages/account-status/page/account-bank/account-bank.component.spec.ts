import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AccountBankComponent } from "./account-bank.component";

describe('AccountBankComponent', () => {
    let component: AccountBankComponent;
    let fixture: ComponentFixture<AccountBankComponent>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountBankComponent]
        })
            .compileComponents();
    })
    fixture = TestBed.createComponent(AccountBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
