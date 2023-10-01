import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddOportunitiesComponent } from './pages/oportunidades/pages/add-oportunities/add-oportunities.component';
import { AddCompanyComponent } from './pages/empresas/pages/add-company/add-company.component';
import { AddAccountComponent } from './pages/account-status/page/add-account/add-account.component';
import { AddFacturaComponent } from './pages/factura/pages/add-factura/add-factura.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { ListOportunitiesComponent } from './pages/oportunidades/pages/list-oportunities/list-oportunities.component';
import { ListPageComponent } from './pages/empresas/pages/list-page/list-page.component';
import { ListFacturasComponent } from './pages/factura/pages/list-facturas/list-facturas.component';
import { MainAccountComponent } from './pages/account-status/page/main-account/main-account.component';
import { OportunitiesComponent } from './pages/oportunities-user/oportunities/oportunities.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReporteUsuarioComponent } from './pages/mantenimientos/reporte-usuario/reporte-usuario.component';
import { ReporteInversionesComponent } from './pages/mantenimientos/reporte-inversiones/reporte-inversiones.component';
import { withoutUnsavedChangesGuard } from '../guards/without-unsaved-changes.guard';

const router: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'investment', component: InversionesComponent },
      { path: 'investment/:page', component: InversionesComponent},
      { path: 'profile-edit', component: EditProfileComponent },
      { path: 'details-profile', component: ProfileComponent },
      { path: 'oportunities-list', component: OportunitiesComponent },
      { path: 'account-status', component: MainAccountComponent },
      { path: 'account-status/page/:page', component: MainAccountComponent },
      { path: 'account-status/add-account', component: AddAccountComponent, canDeactivate: [withoutUnsavedChangesGuard]},
      { path: 'oportunities/add-oportunities', component: AddOportunitiesComponent},
      { path: 'oportunities/list-oportunities', component: ListOportunitiesComponent},
      { path: 'company/add-company', component: AddCompanyComponent},
      { path: 'company/edit-company', component: AddCompanyComponent },
      { path: 'company/list-company', component: ListPageComponent },
      { path: 'company/list-company/:page', component: ListPageComponent },
      { path: 'invoice/list-invoice', component: ListFacturasComponent },
      { path: 'invoice/list-invoice/page/:page', component: ListFacturasComponent},
      { path: 'invoice/add-invoice', component: AddFacturaComponent },
      { path: 'reportes/inversiones', component: ReporteInversionesComponent },
      { path: 'reportes/usuarios', component: ReporteUsuarioComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ],
})
export class ProyectoRoutingModule { }