import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProyectoModule } from '../../proyecto.module';


@NgModule({
  declarations: [
    AddCompanyComponent,
    ListPageComponent,
    EditCompanyComponent,
    

  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProyectoModule
  ]
})
export class EmpresasModule { }
