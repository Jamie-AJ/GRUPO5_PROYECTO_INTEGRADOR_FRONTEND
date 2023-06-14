import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { AddFacturaComponent } from './pages/add-factura/add-factura.component';
import { ListFacturasComponent } from './pages/list-facturas/list-facturas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProyectoModule } from '../../proyecto.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AddFacturaComponent,
    ListFacturasComponent,
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProyectoModule,
    SharedModule
  ]
})
export class FacturaModule { }
