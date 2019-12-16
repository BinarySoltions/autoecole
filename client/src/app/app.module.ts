import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, MatExpansionModule, MatCardModule, MatRadioModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EleveAffichageComponent } from './eleve/affichage/eleve-affichage/eleve-affichage.component';
import { EleveSaisieComponent } from './eleve/saisie/eleve-saisie/eleve-saisie.component';
import { PhaseUneAffichageComponent } from './eleve/phase/une/affichage/phase-une-affichage/phase-une-affichage.component';
import { PhaseUneSaisieComponent } from './eleve/phase/une/saisie/phase-une-saisie/phase-une-saisie.component';
import { PhaseDeuxAffichageComponent } from './eleve/phase/deux/affichage/phase-deux-affichage/phase-deux-affichage.component';
import { PhaseDeuxSaisieComponent } from './eleve/phase/deux/saisie/phase-deux-saisie/phase-deux-saisie.component';
import { PhaseTroisAffichageComponent } from './eleve/phase/trois/affichage/phase-trois-affichage/phase-trois-affichage.component';
import { PhaseTroisSaisieComponent } from './eleve/phase/trois/saisie/phase-trois-saisie/phase-trois-saisie.component';
import { PhaseQuatreAffichageComponent } from './eleve/phase/quatre/affichage/phase-quatre-affichage/phase-quatre-affichage.component';
import { PhaseQuatreSaisieComponent } from './eleve/phase/quatre/saisie/phase-quatre-saisie/phase-quatre-saisie.component';
import { EcoleAffichageComponent } from './ecole/affichage/ecole-affichage/ecole-affichage.component';
import { EcoleSaisieComponent } from './ecole/saisie/ecole-saisie/ecole-saisie.component';
import { PersonneResponsableSaisieComponent } from './personne-responsable/saisie/personne-responsable-saisie/personne-responsable-saisie.component';
import { PersonneResponsableAffichageComponent } from './personne-responsable/affichage/personne-responsable-affichage/personne-responsable-affichage.component';
import { EleveService } from './service/eleve/eleve.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { AttestationComponent } from './attestation/attestation/attestation.component';

import {NgxMaskModule, IConfig} from 'ngx-mask'
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ToastrModule } from 'ngx-toastr';
import { EditorModule } from '@tinymce/tinymce-angular';
// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PhaseModuleComponent } from './phase/module/phase-module/phase-module.component';
import { AjouterModuleComponent } from './module/ajouter-module/ajouter-module.component';
import { DetailComponent } from './eleve/detail/detail.component';
import { GenererComponent } from './attestation/generer/generer.component';
import { DialogConfirmerComponent } from './partage/dialog-confirmer/dialog-confirmer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptorService } from './auth/services/jwt-interceptor.service';
import { ErrorInterceptorService } from './auth/services/error-interceptor.service';
import { fakeBackendProvider } from './auth/services/fack-backend-interceptor.service';
import { ChampObligatoireComponent } from './champ-obligatoire/champ-obligatoire.component';
import { ContratComponent } from './contrat/contrat.component';
import { EcoleConduiteComponent } from './contrat/ecole-conduite/ecole-conduite.component';
import { MotoConduiteComponent } from './contrat/moto-conduite/moto-conduite.component';
import { EleveInfoComponent } from './contrat/eleve-info/eleve-info.component';
import { DescriptionFormationComponent } from './contrat/description-formation/description-formation.component';
import { CoutFormationComponent } from './contrat/cout-formation/cout-formation.component';
import { ParametresContratComponent } from './parametres-contrat/parametres-contrat.component';
import { PayementComponent } from './payement/payement.component';
import { GabaritFactureComponent } from './payement/gabarit-facture/gabarit-facture.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { TotalComponent } from './payement/total/total.component';
import { ExporterRegistreComponent } from './exporter-registre/exporter-registre.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    EleveAffichageComponent,
    EleveSaisieComponent,
    PhaseUneAffichageComponent,
    PhaseUneSaisieComponent,
    PhaseDeuxAffichageComponent,
    PhaseDeuxSaisieComponent,
    PhaseTroisAffichageComponent,
    PhaseTroisSaisieComponent,
    PhaseQuatreAffichageComponent,
    PhaseQuatreSaisieComponent,
    EcoleAffichageComponent,
    EcoleSaisieComponent,
    PersonneResponsableSaisieComponent,
    PersonneResponsableAffichageComponent,
    NavbarComponent,
    AttestationComponent,
    PhaseModuleComponent,
    AjouterModuleComponent,
    DetailComponent,
    GenererComponent,
    DialogConfirmerComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChampObligatoireComponent,
    ContratComponent,
    EcoleConduiteComponent,
    MotoConduiteComponent,
    EleveInfoComponent,
    DescriptionFormationComponent,
    CoutFormationComponent,
    ParametresContratComponent,
    PayementComponent,
    GabaritFactureComponent,
    SafeHtmlPipe,
    TotalComponent,
    ExporterRegistreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule, 
    MatInputModule,
    BrowserAnimationsModule,
    MDBBootstrapModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot(),
    NgxDatatableModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  NgbModule,NgbPaginationModule, NgbAlertModule,
  NgxMaskModule.forRoot(),
  NgxSpinnerModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  EditorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatCardModule,
  MatRadioModule 
  ],
  schemas:[ NO_ERRORS_SCHEMA],
  providers: [EleveService, { provide: 'BASE_URL', useFactory: getBaseUrl },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,getBaseUrl()+"assets/i18n/", ".json");
}


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
