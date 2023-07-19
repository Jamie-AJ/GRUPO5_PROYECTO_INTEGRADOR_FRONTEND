import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InversionUsuario } from 'src/app/interface/oportunidad_usuario.interface';
import { OportunidadUsuarioService } from 'src/app/services/oportunidad-usuario.service';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css']
})


export class InversionesComponent implements OnInit {

  title = 'Mis inversiones realizadas';
  pagination: any;
  public oportunidadesUsuario: InversionUsuario[] = [];
  tabs: string[] = ['A Tiempo', 'Pagadas','Con retraso' ]
  activeTabsIndex: number = 0;

  constructor(private oportunidadUsuario: OportunidadUsuarioService, private activeRouted:ActivatedRoute) { }
  
  ngOnInit(): void { 
    // this.getOportunidadesUsu();
    this.gerOportunidadUsuPage();
  }
  tabsChange(tab:number){
    this.activeTabsIndex = tab;
  }
  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Cobrada':
        return 'text-bg-success';
      case 'A Tiempo':
        return 'text-bg-warning';
      case 'Retrasado':
        return 'text-bg-danger';
      default:
        return '';
    }
    
  }
  getBadgeClassRango(riesgo: string): string {
    switch (riesgo) {
      case 'A':
        return 'text-bg-success';
      case 'B':
        return 'text-bg-success';
      case 'C':
        return 'text-bg-warning';
      default:
        return '';
    }
  }
  getOportunidadesUsu() { 
    this.oportunidadUsuario.getOportunidadesUsu().subscribe(resp => {
      console.log(resp);
      this.oportunidadesUsuario = resp;
    });
  }
  gerOportunidadUsuPage() {
    this.activeRouted.paramMap.subscribe((params) => { 
      let totalPages: number = +params.get('page')!;
      if(!totalPages){
        totalPages = 0;
      }
      this.oportunidadUsuario.getOportunidadesUsuPage(totalPages).subscribe(resp => { 
        console.log(resp);
        this.oportunidadesUsuario = resp.content as InversionUsuario[];
        this.pagination = resp;
      });
    });
    
  }
}
