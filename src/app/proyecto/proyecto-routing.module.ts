import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { AcountStatusComponent } from './pages/acount-status/acount-status.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { OportunitiesComponent } from './pages/oportunities-user/oportunities/oportunities.component';
import { AddOportunitiesComponent } from './pages/oportunidades/pages/add-oportunities/add-oportunities.component';
import { ListOportunitiesComponent } from './pages/oportunidades/pages/list-oportunities/list-oportunities.component';
import { AddCompanyComponent } from './pages/empresas/pages/add-company/add-company.component';
import { ListPageComponent } from './pages/empresas/pages/list-page/list-page.component';
import { ListFacturasComponent } from './pages/factura/pages/list-facturas/list-facturas.component';
import { AddFacturaComponent } from './pages/factura/pages/add-factura/add-factura.component';
import { hasRoleGuard } from '../guards/has-role.guard';



const router: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'inversiones', component: InversionesComponent },
      { path: 'profile-edit', component: EditProfileComponent },
      { path: 'details-profile', component: ProfileComponent },
      { path: 'oportunities-list', component: OportunitiesComponent },
      { path: 'account-status', component: AcountStatusComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'inversion/add-inversion', component: AddOportunitiesComponent},
      { path: 'inversion/list-inversion', component: ListOportunitiesComponent},
      { path: 'empresa/add-company', component: AddCompanyComponent},
      { path: 'empresa/list-company', component: ListPageComponent },
      { path: 'empresa/list-componay/:page', component: ListPageComponent },
      { path: 'empresa/edit-company', component: AddCompanyComponent },
      { path: 'factura/list-factura', component: ListFacturasComponent },
      { path: 'factura/add-factura', component: AddFacturaComponent },
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
  ]
})
export class ProyectoRoutingModule { }