import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PagesComponent } from './pages/error404-pages/error404-pages.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerListComponent } from './components/spinner-list/spinner-list.component';
import { AccordionComponent } from './components/accordion/accordion.component';





@NgModule({
  declarations: [
    Error404PagesComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SpinnerListComponent,
    AccordionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    Error404PagesComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SpinnerListComponent,
    
  ]
})
export class SharedModule { }
