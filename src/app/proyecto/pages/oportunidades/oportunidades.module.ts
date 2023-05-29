import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OportunidadesRoutingModule } from './oportunidades-routing.module';
import { AddOportunitiesComponent } from './pages/add-oportunities/add-oportunities.component';
import { ListOportunitiesComponent } from './pages/list-oportunities/list-oportunities.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddOportunitiesComponent,
    ListOportunitiesComponent
  ],
  imports: [
    CommonModule,
    OportunidadesRoutingModule,
    FormsModule
  ]
})
export class OportunidadesModule { }
