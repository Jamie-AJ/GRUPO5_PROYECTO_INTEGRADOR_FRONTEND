import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCompanyComponent,
    ListPageComponent,

  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpresasModule { }
