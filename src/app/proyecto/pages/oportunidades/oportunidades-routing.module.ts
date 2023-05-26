import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddOportunitiesComponent } from './pages/add-oportunities/add-oportunities.component';
import { ListOportunitiesComponent } from './pages/list-oportunities/list-oportunities.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'add-inversion',component:AddOportunitiesComponent},
      {path:'list-inversion',component:ListOportunitiesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OportunidadesRoutingModule { }
