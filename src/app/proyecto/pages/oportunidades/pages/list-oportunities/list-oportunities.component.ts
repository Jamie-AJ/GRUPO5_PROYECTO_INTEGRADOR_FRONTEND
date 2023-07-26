import { Component, OnInit } from '@angular/core';

import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { OportunidadesService } from 'src/app/services/oportunidades.service';

@Component({
  selector: 'app-list-oportunities',
  templateUrl: './list-oportunities.component.html',
  styleUrls: ['./list-oportunities.component.css']
})
export class ListOportunitiesComponent implements OnInit{
  title = 'Oportunidades de inversión'
  
  tabs: string[] = ['Todos', 'Activos' ]

  activeTabsIndex: number = 0;
  oportunidad: Oportunidades[] = [];
  oportunidadActivas: Oportunidades[] = [];

  

  constructor(private oportunidades:OportunidadesService){}
  ngOnInit(): void {
    this.getOportunidades();
    this.getOportundadesActivas();
  }
  //METODO PARA ACTIVAR EL TAB
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
  getBadgeClass(riesgo: string): string {
    switch (riesgo) {
      case 'Activo':
        return 'text-bg-success';
      case 'No Activo':
        return 'text-bg-danger';
      default:
        return '';
    }
  }
  getOportunidades(){
    this.oportunidades.getOportunidad().subscribe(resp => {
      console.log(resp);
      this.oportunidad = resp as Oportunidades[];
    });
  }
  getOportundadesActivas() {
    this.oportunidades.getOportunidadActivas().subscribe(resp => { 
      console.log(resp);
      this.oportunidadActivas = resp as Oportunidades[];
    })
  }

}
