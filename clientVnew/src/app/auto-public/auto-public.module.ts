import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoPublicRoutingModule } from './auto-public-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AutoPublicComponent } from './auto-public.component';
import { BeginComponent } from '../examen/begin/begin.component';
import { SessionFinieComponent } from '../examen/session-finie/session-finie.component';
import { InscriptionComponent } from '../eleve/inscription/inscription.component';
import { SharedServiceModule } from '../shared/shared/shared-service.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ExamenComponent } from '../examen/examen.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularMaterialModule } from '../angular-material/angular-material/angular-material.module';
import { NavbarPublicComponent } from './navbar-public/navbar-public.component';
import { ReserveComponent } from '../reserve/reserve.component';
import { DetailPhaseComponent } from '../reserve/detail-phase/detail-phase.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginPublicComponent } from '../login/login-public/login-public.component';
import { ChangePwdComponent } from '../login/login-public/change-pwd/change-pwd.component';
import { DemanderPwdComponent } from '../login/login-public/demander-pwd/demander-pwd.component';
import { PublicInterceptorService } from '../auth/services/public-interceptor.service';
import { PublicErrorInterceptorService } from '../auth/services/public-error-interceptor.service';
import { ConditionComponent } from '../eleve/inscription/condition/condition.component';
@NgModule({
  declarations: [AutoPublicComponent,BeginComponent,SessionFinieComponent,InscriptionComponent,ExamenComponent, NavbarPublicComponent, ReserveComponent,DetailPhaseComponent, LoginPublicComponent, ChangePwdComponent, DemanderPwdComponent, ConditionComponent, ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoPublicRoutingModule,
    SharedServiceModule,
    MDBBootstrapModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  schemas:[ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: PublicInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: PublicErrorInterceptorService, multi: true },
]
})
export class AutoPublicModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,getBaseUrl()+"assets/i18n/", ".json");
}


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}