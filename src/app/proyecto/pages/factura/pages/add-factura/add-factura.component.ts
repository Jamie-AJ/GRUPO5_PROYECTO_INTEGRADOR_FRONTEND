import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
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

  @ViewChild('montoInput') montoInput!: ElementRef;
  showNegativeNumberError: boolean = false;
  postFactura(){
    if (this.objFactura.monto !== undefined && this.objFactura.monto < 0) {
      this.showNegativeNumberError = true;
      this.montoInput.nativeElement.focus();
    } else {
      this.showNegativeNumberError = false;
    this.facturaService.postFactura(this.objFactura).subscribe(
      resp =>{
        Swal.fire('Factura Generada', resp.mensaje, 'success');
        this.router.navigate(['/facturas/list-factura']);
      }
    );
    }
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return `${year}-${this.padZero(month)}-${this.padZero(day)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  
}


