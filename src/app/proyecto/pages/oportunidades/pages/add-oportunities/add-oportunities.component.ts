import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { Oportunidades } from 'src/app/interface/oportunidades.interface';
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { OportunidadesService } from 'src/app/services/oportunidades.service';
import { FacturaService } from 'src/app/services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-oportunities',
  templateUrl: './add-oportunities.component.html',
  styleUrls: ['./add-oportunities.component.css']
})
export class AddOportunitiesComponent {

  objOportunidades: Oportunidades = new Oportunidades();

  empresaCombo: Empresas[] = [];
  facturaCombo: Factura[] = [];

  private router = inject(Router);
  constructor(private empresaService: EmpresasService, private oportunidadesService: OportunidadesService, private facturaService: FacturaService){
  }
  ngOnInit() {
    this.obtenerEmpresa();
    this.obtenerFactura();
  }
  obtenerEmpresa(){
    this.empresaService.getEmpresas().subscribe(
      empresas => {
        this.empresaCombo = empresas;
        console.log(empresas);
      },
      error =>{
      console.error(error);
      }
    );

  }
  obtenerFactura(){
    this.facturaService.getFacturasActivas().subscribe(
      facturas =>{
        this.facturaCombo = facturas;
        console.log(facturas);
      },
      error =>{
      console.error(error);
      }
    );

  }
  postInsertarOportunidad(){
    this.oportunidadesService.postOportunidad(this.objOportunidades).subscribe(
      response =>{
        Swal.fire('Registro con exito', response.mensaje, 'success');
        
      },
      error =>{
        console.error(error);
      }
    );
  }

}
