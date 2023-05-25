import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { AddFacturaComponent } from './pages/add-factura/add-factura.component';
import { ListFacturasComponent } from './pages/list-facturas/list-facturas.component';



@NgModule({
  declarations: [
    AddFacturaComponent,
    ListFacturasComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
