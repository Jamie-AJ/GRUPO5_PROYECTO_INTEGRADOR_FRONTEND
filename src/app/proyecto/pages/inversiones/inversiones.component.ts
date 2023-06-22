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

  constructor(private oportunidadUsuario: OportunidadUsuarioService) { }
  
  ngOnInit(): void { 
    this.getOportunidadesUsu();
  }

  getOportunidadesUsu() { 
    this.oportunidadUsuario.getOportunidadesUsu().subscribe(resp => {
      this.oportunidadesUsuario = resp;
    });
  }

}
