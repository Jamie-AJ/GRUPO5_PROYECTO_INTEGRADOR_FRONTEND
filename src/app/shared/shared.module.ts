import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PagesComponent } from './pages/error404-pages/error404-pages.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';





@NgModule({
  declarations: [
    Error404PagesComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    Error404PagesComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
