import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PagesComponent } from './pages/error404-pages/error404-pages.component';



@NgModule({
  declarations: [
    Error404PagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    Error404PagesComponent
  ]
})
export class SharedModule { }
