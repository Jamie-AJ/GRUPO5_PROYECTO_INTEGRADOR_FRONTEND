import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { OportunitiesComponent } from './page/oportunities/oportunities.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path:'oportunities-list', component:OportunitiesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OportunitiesUserRoutingModule { }
