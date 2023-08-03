import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

import { AddOportunitiesComponent } from './pages/oportunidades/pages/add-oportunities/add-oportunities.component';
import { AddCompanyComponent } from './pages/empresas/pages/add-company/add-company.component';
import { AddAccountComponent } from './pages/account-status/page/add-account/add-account.component';
import { AddFacturaComponent } from './pages/factura/pages/add-factura/add-factura.component';
import { AccountBankComponent } from './pages/account-status/page/account-bank/account-bank.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepositoComponent } from './pages/account-status/page/deposito/deposito.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditCompanyComponent } from './pages/empresas/pages/edit-company/edit-company.component';
import { HomeComponent } from './pages/home/home.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { ListOportunitiesComponent } from './pages/oportunidades/pages/list-oportunities/list-oportunities.component';
import { ListPageComponent } from './pages/empresas/pages/list-page/list-page.component';
import { ListFacturasComponent } from './pages/factura/pages/list-facturas/list-facturas.component';
import { MovementListComponent } from './pages/movement-list/movement-list.component';
import { MainAccountComponent } from './pages/account-status/page/main-account/main-account.component';
import { OportunitiesComponent } from './pages/oportunities-user/oportunities/oportunities.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReporteUsuarioComponent } from './pages/mantenimientos/reporte-usuario/reporte-usuario.component';
import { RetiroComponent } from './pages/account-status/page/retiro/retiro.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { WalletComponent } from './pages/account-status/page/wallet/wallet.component';


import { FooterComponent } from './components/footer/footer.component';
import localeEsPE from '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
import { ReporteInversionesComponent } from './pages/mantenimientos/reporte-inversiones/reporte-inversiones.component';
registerLocaleData(localeEsPE);


@NgModule({
  declarations: [
    AddOportunitiesComponent,
    AddFacturaComponent,
    AddCompanyComponent,
    AddAccountComponent,
    AccountBankComponent,
    DashboardComponent,
    DepositoComponent,
    EditProfileComponent,
    EditCompanyComponent,
    HomeComponent,
    InversionesComponent,
    ListOportunitiesComponent,
    ListPageComponent,
    ListFacturasComponent,
    MovementListComponent,
    MainAccountComponent,
    OportunitiesComponent,
    ProfileComponent,
    PaginationComponent,
    ReporteUsuarioComponent,
    RetiroComponent,
    TabsComponent,
    WalletComponent,
    FooterComponent,
    ReporteInversionesComponent,

    

  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    SharedModule
  ],
  exports: [
    HomeComponent,
    TabsComponent
  ]
})
export class ProyectoModule { }
