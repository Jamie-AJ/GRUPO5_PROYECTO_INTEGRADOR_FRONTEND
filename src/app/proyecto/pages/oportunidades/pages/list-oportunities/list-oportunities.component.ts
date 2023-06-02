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
  //TABS
  tabs: string[] = ['Activos', 'Todos' ]
  //TAB ACTIVA
  activeTabsIndex: number = 0;

  //VARIABLAES
  public oportunidades:Oportunidades[] =[];
  public objOportunidades:Oportunidades = new Oportunidades();
  constructor(private oportunidadesService:OportunidadesService){}
  
  ngOnInit():void{
    this.getOportunidades();
  }
  
  getOportunidades(){
    this.oportunidadesService.getOportunidades().subscribe((data: any)=>{

      this.oportunidades = data;
      console.log(data);
    })
  }
  //METODO PARA ACTIVAR EL TAB
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
}
