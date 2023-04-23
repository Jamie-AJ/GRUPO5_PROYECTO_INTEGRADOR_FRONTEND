import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { MainComponent } from './pages/main/main.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    RegistrarComponent,
    SliderComponent,
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
