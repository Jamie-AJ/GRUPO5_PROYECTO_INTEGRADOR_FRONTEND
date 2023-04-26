import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OportunitiesComponent } from './pages/oportunities/oportunities.component';
import { AcountStatusComponent } from './pages/acount-status/acount-status.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarComponent,
    SpinnerComponent,
    InversionesComponent,
    ProfileComponent,
    OportunitiesComponent,
    AcountStatusComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProyectoModule { }
