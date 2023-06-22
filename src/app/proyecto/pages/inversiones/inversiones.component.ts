import { Component, OnInit } from '@angular/core';
import { InversionUsuario } from 'src/app/interface/oportunidad_usuario.interface';
import { OportunidadUsuarioService } from 'src/app/services/oportunidad-usuario.service';

@Component({
  selector: 'app-inversiones',
  templateUrl: './inversiones.component.html',
  styleUrls: ['./inversiones.component.css']
})


export class InversionesComponent implements OnInit {

  title = 'Mis inversiones realizadas';
  public oportunidadesUsuario: InversionUsuario[] = [];
  tabs: string[] = ['A Tiempo', 'Pagadas','Con retraso' ]
  activeTabsIndex: number = 0;

  constructor(private oportunidadUsuario: OportunidadUsuarioService) { }
  
  ngOnInit(): void { 
    this.getOportunidadesUsu();
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

  getOportunidadesUsu() { 
    this.oportunidadUsuario.getOportunidadesUsu().subscribe(resp => {
      console.log(resp);
      this.oportunidadesUsuario = resp;
    });
  }

}
