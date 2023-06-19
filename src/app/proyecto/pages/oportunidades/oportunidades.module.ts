import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OportunidadesRoutingModule } from './oportunidades-routing.module';
import { AddOportunitiesComponent } from './pages/add-oportunities/add-oportunities.component';
import { ListOportunitiesComponent } from './pages/list-oportunities/list-oportunities.component';
import { ProyectoModule } from '../../proyecto.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExitsGuard } from 'src/app/guards/exits.guard';



@NgModule({
  declarations: [
    AddOportunitiesComponent,
    ListOportunitiesComponent
  ],
  imports: [
    CommonModule,
    OportunidadesRoutingModule,
    ReactiveFormsModule,
    ProyectoModule,
    SharedModule,
    FormsModule,
  ],
  providers: [ExitsGuard],
})
export class OportunidadesModule { }
