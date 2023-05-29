import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PagesComponent } from './pages/error404-pages/error404-pages.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    Error404PagesComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    Error404PagesComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    
  ]
})
export class SharedModule { }
