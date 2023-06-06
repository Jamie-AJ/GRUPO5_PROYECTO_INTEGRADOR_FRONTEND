import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OportunitiesUserRoutingModule } from './oportunities-user-routing.module';
import { OportunitiesComponent } from './page/oportunities/oportunities.component';


@NgModule({
  declarations: [
    OportunitiesComponent,
  ],
  imports: [
    CommonModule,
    OportunitiesUserRoutingModule
  ]
})
export class OportunitiesUserModule { }
