import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OportunitiesComponent } from './pages/oportunities/oportunities.component';
import { AcountStatusComponent } from './pages/acount-status/acount-status.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarComponent,
    InversionesComponent,
    ProfileComponent,
    OportunitiesComponent,
    AcountStatusComponent,
    DashboardComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[
    HomeComponent,
  ]
})
export class ProyectoModule { }
