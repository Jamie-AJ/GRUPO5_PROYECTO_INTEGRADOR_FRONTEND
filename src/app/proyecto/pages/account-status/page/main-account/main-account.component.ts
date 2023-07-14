import { Component } from '@angular/core';

@Component({
  selector: 'app-main-account',
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.css']
})
export class MainAccountComponent {
  title: string = 'Estado de Cuenta';
  //COMPORTAMIENTO DE LOS TABS
  tabs: string[] = ['Depositos y Retiros', 'Cuentas Bancaria']
  //TAB ACTIVO
  activeTabsIndex: number = 0;
  
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
}
