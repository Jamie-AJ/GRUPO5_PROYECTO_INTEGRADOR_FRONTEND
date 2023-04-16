import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ApproutingModule } from './app-routing.module';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApproutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
