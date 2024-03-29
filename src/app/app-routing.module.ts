import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router'
import { Error404PagesComponent } from './shared/pages/error404-pages/error404-pages.component';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './guards';
import { hasRoleGuard } from './guards/has-role.guard';

const router:Routes = [

  {
    path:'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'dashboard',
    canActivate:[isAuthenticatedGuard],
    loadChildren: () => import ('./proyecto/proyecto.module').then(m => m.ProyectoModule)
  },
  {
    path:'404',
    component:Error404PagesComponent
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
