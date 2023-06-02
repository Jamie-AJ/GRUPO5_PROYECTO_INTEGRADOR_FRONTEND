import { Component, OnInit } from '@angular/core';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { OportunidadesService } from 'src/app/services/oportunidades.service';

@Component({
  selector: 'app-oportunities',
  templateUrl: './oportunities.component.html',
  styleUrls: ['./oportunities.component.css']
})
export class OportunitiesComponent implements OnInit{
  title = 'Oportunidades de Inversión'
  public objOportunidades:Oportunidades[] = [];

  constructor(private oportunidadesService: OportunidadesService) { }

  ngOnInit(): void {
    this.getOportunidadesPorUser();
  }

  getOportunidadesPorUser(){
    this.oportunidadesService.getOportunidadPorUsuario().subscribe(resp => {
      console.log(resp);
      this.objOportunidades = resp as Oportunidades[]; 
    })
  }
}
