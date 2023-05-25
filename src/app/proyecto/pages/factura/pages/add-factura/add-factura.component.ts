import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresas } from 'src/app/interface/empresas.interface';
import { Factura } from 'src/app/interface/factura.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { FacturaService } from 'src/app/services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrls: ['./add-factura.component.css']
})
export class AddFacturaComponent implements OnInit{
  title="Factura de Empresas";
  objFactura: Factura = new Factura();
  empresas:Empresas[] = [];
  
  constructor(
    private facturaService:FacturaService,
    private router: Router,
    private empresasServices:EmpresasService) { }

  ngOnInit(): void {
    this.getEmpresas();
  }
  goBack(){
    this.router.navigate(['/facturas/list-factura']);
  }
  getEmpresas(){
    this.empresasServices.getEmpresas().subscribe(resp=>{
      console.log(resp);
      this.empresas = resp;
    })
  }
  postFactura(){
    this.facturaService.postFactura(this.objFactura).subscribe(
      resp =>{
        Swal.fire('Factura Generada', resp.mensaje, 'success');
        this.router.navigate(['/facturas/list-factura']);
      }
    )
  }
}
