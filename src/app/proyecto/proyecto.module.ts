import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AcountStatusComponent } from './pages/acount-status/acount-status.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { MovementListComponent } from './pages/movement-list/movement-list.component';
import { AuthModule } from '../auth/auth.module';
import { DepositoComponent } from './pages/deposito/deposito.component';
import { RetiroComponent } from './pages/retiro/retiro.component';
import localeEsPE from '@angular/common/locales/es-PE';

import { registerLocaleData } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';


registerLocaleData(localeEsPE);


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    NavbarComponent,
    InversionesComponent,
    ProfileComponent,
    AcountStatusComponent,
    DashboardComponent,
    FooterComponent,
    TabsComponent,
    EditProfileComponent,
    WalletComponent,
    MovementListComponent,
    DepositoComponent,
    RetiroComponent,
    BreadcrumbsComponent,

  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    SharedModule
  ],
  exports:[
    HomeComponent,
    TabsComponent
  ]
})
export class ProyectoModule { }
