import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HomeComponent } from '../home/home.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';

const routes: Routes = [
  {path:'',
  component:HomeComponent,
  children:[
    { path: 'add-company', component: AddCompanyComponent },
    { path: 'list-company', component: ListPageComponent },
    { path: 'edit-company', component: AddCompanyComponent }
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
