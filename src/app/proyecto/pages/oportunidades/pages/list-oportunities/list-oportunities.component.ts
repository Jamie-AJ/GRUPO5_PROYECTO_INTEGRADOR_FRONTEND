import { Component } from '@angular/core';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { OportunidadesService } from 'src/app/services/oportunidades.service';

@Component({
  selector: 'app-list-oportunities',
  templateUrl: './list-oportunities.component.html',
  styleUrls: ['./list-oportunities.component.css']
})
export class ListOportunitiesComponent {
  title = 'Oportunidades de inversión'
  tabs: string[] = ['Todos', 'Activos' ]
  activeTabsIndex: number = 0;
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
  oportunidad:Oportunidades[] =[];

  constructor(private oportunidades:OportunidadesService){}
  ngOnInit(): void {
    this.getOportunidades();
  }

  getOportunidades(){
    this.oportunidades.getOportunidad().subscribe(resp => {
      console.log(resp);
      this.oportunidad = resp as Oportunidades[];
    });

  }

}
