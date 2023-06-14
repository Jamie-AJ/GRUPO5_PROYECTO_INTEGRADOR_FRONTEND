import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OportunitiesUserRoutingModule } from './oportunities-user-routing.module';
import { OportunitiesComponent } from './page/oportunities/oportunities.component';
import { ProyectoModule } from '../../proyecto.module';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
    declarations: [
    OportunitiesComponent
    ],
    imports: [
        CommonModule,
      OportunitiesUserRoutingModule,
      SharedModule
    ]
})
export class OportunitiesUserModule { }
