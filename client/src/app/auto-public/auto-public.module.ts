import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoPublicRoutingModule } from './auto-public-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AutoPublicComponent } from './auto-public.component';
import { BeginComponent } from '../examen/begin/begin.component';
import { SessionFinieComponent } from '../examen/session-finie/session-finie.component';
import { InscriptionComponent } from '../eleve/inscription/inscription.component';
import { SharedServiceModule } from '../shared/shared/shared-service.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ExamenComponent } from '../examen/examen.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularMaterialModule } from '../angular-material/angular-material/angular-material.module';
import { NavbarPublicComponent } from './navbar-public/navbar-public.component';
import { ReserveComponent } from '../reserve/reserve.component';

@NgModule({
  declarations: [AutoPublicComponent,BeginComponent,SessionFinieComponent,InscriptionComponent,ExamenComponent, NavbarPublicComponent, ReserveComponent,],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AutoPublicRoutingModule,
    SharedServiceModule,
    MDBBootstrapModule,
    AngularMaterialModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  schemas:[ NO_ERRORS_SCHEMA],
})
export class AutoPublicModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,getBaseUrl()+"assets/i18n/", ".json");
}


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}