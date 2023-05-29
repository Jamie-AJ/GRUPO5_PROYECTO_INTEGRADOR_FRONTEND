import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddFacturaComponent } from './pages/add-factura/add-factura.component';
import { ListFacturasComponent } from './pages/list-facturas/list-facturas.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'list-factura',component:ListFacturasComponent},
      {path:'add-factura',component:AddFacturaComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
