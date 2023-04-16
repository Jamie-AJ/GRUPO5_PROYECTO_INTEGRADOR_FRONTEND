import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const router:Routes = [
  {
    path:'',
    children:[
      {path:'',component:HomeComponent},
      {path:'**', redirectTo:''}
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