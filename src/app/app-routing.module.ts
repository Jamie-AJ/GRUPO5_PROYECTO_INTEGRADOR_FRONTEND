import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router'
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './proyecto/pages/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';

const router:Routes = [

  {
    path :'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path:'auth',
    loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren: () => import ('./proyecto/proyecto.module').then(m => m.ProyectoModule)
  },
  // {
  //   path:'404',
  //   component:PageNotFoundComponent
  // },
  {
    path: '**',
    redirectTo: 'auth'
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
