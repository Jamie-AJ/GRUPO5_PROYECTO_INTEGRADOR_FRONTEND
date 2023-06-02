import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OportunidadesRoutingModule } from './oportunidades-routing.module';
import { AddOportunitiesComponent } from './pages/add-oportunities/add-oportunities.component';
import { ListOportunitiesComponent } from './pages/list-oportunities/list-oportunities.component';
import { AppModule } from 'src/app/app.module';
import { ProyectoModule } from '../../proyecto.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AddOportunitiesComponent,
    ListOportunitiesComponent
  ],
  imports: [
    CommonModule,
    OportunidadesRoutingModule,
    ProyectoModule,
    SharedModule,
    FormsModule,
  ]
})
export class OportunidadesModule { }
