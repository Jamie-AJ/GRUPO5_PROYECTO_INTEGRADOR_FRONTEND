import { Component } from '@angular/core';

@Component({
  selector: 'app-list-oportunities',
  templateUrl: './list-oportunities.component.html',
  styleUrls: ['./list-oportunities.component.css']
})
export class ListOportunitiesComponent {
  title = 'Oportunidades de inversión'
  tabs: string[] = ['Activos', 'Todos' ]
  activeTabsIndex: number = 0;
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
}
