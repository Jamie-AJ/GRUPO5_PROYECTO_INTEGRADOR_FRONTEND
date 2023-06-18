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
import { OportunitiesComponent } from './pages/oportunities-user/oportunities.component';


const router:Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[
      {path:'',component:DashboardComponent},
      {path:'inversiones', component:InversionesComponent},
      {path:'profile-edit',component:EditProfileComponent},
      { path: 'details-profile', component: ProfileComponent },
      {path:'oportunities-list', component:OportunitiesComponent},
      {path:'account-status', component:AcountStatusComponent},
      {path:'wallet', component: WalletComponent },
      {path:'**', redirectTo:'dashboard'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports:[
    RouterModule
  ]
})
export class ProyectoRoutingModule { }