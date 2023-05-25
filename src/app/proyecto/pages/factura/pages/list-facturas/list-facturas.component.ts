import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Factura } from 'src/app/interface/factura.interface';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-list-facturas',
  templateUrl: './list-facturas.component.html',
  styleUrls: ['./list-facturas.component.css']
})
export class ListFacturasComponent {
  title = 'Facturas de Empresas';
  factura:Factura[] = [];
  constructor(private facturaService:FacturaService){}
  // showModal = false;

  // openModal() {
  //   this.showModal = true;
  // }

  // closeModal() {
  //   this.showModal = false;
  // }
  agregarFactura(){
    
  }

}
