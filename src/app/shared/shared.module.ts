import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PagesComponent } from './pages/error404-pages/error404-pages.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerListComponent } from './components/spinner-list/spinner-list.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ModalComponent } from './components/modal/modal.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';








@NgModule({
  declarations: [
    Error404PagesComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SpinnerListComponent,
    AccordionComponent,
    ModalComponent,
    ChartsComponent,
    ProgressBarComponent,

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
    ModalComponent,
    ChartsComponent,
    ProgressBarComponent,

  ]
})
export class SharedModule { }
