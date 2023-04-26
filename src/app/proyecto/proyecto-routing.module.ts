import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { AcountStatusComponent } from './pages/acount-status/acount-status.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OportunitiesComponent } from './pages/oportunities/oportunities.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const router:Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[
      {path:'dashboard',component:DashboardComponent},
      {path:'inversiones', component:InversionesComponent},
      {path:'account-status', component:AcountStatusComponent},
      {path:'profile', component:ProfileComponent},
      {path:'oportunities',component:OportunitiesComponent},
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