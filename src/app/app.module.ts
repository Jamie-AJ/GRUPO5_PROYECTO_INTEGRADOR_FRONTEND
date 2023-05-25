import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import localeEsPE from '@angular/common/locales/es-PE';

import { registerLocaleData } from '@angular/common';
import { FacturaComponent } from './services/factura/factura.component'; 

registerLocaleData(localeEsPE);


@NgModule({
  declarations: [
    AppComponent,
    FacturaComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ProyectoModule,
    FormsModule,
    SharedModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],

})
export class AppModule { }
