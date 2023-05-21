import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OportunitiesComponent } from './pages/oportunities/oportunities.component';
import { AcountStatusComponent } from './pages/acount-status/acount-status.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { MovementListComponent } from './pages/movement-list/movement-list.component';
import { AddAccountBankComponent } from './pages/add-account-bank/add-account-bank.component';



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
    TabsComponent,
    EditProfileComponent,
    WalletComponent,
    MovementListComponent,
    AddAccountBankComponent,
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    HomeComponent,
  ]
})
export class ProyectoModule { }
