import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { AddFacturaComponent } from './pages/add-factura/add-factura.component';
import { ListFacturasComponent } from './pages/list-facturas/list-facturas.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddFacturaComponent,
    ListFacturasComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    FormsModule
  ]
})
export class FacturaModule { }
