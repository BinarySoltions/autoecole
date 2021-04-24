import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoRoutingModule } from './auto-routing.module';
import { EleveAffichageComponent } from 'src/app/eleve/affichage/eleve-affichage/eleve-affichage.component';
import { EleveSaisieComponent } from 'src/app/eleve/saisie/eleve-saisie/eleve-saisie.component';
import { PhaseUneAffichageComponent } from 'src/app/eleve/phase/une/affichage/phase-une-affichage/phase-une-affichage.component';
import { PhaseUneSaisieComponent } from 'src/app/eleve/phase/une/saisie/phase-une-saisie/phase-une-saisie.component';
import { PhaseDeuxSaisieComponent } from 'src/app/eleve/phase/deux/saisie/phase-deux-saisie/phase-deux-saisie.component';
import { PhaseTroisAffichageComponent } from 'src/app/eleve/phase/trois/affichage/phase-trois-affichage/phase-trois-affichage.component';
import { PhaseTroisSaisieComponent } from 'src/app/eleve/phase/trois/saisie/phase-trois-saisie/phase-trois-saisie.component';
import { PhaseQuatreAffichageComponent } from 'src/app/eleve/phase/quatre/affichage/phase-quatre-affichage/phase-quatre-affichage.component';
import { PhaseQuatreSaisieComponent } from 'src/app/eleve/phase/quatre/saisie/phase-quatre-saisie/phase-quatre-saisie.component';
import { EcoleAffichageComponent } from 'src/app/ecole/affichage/ecole-affichage/ecole-affichage.component';
import { EcoleSaisieComponent } from 'src/app/ecole/saisie/ecole-saisie/ecole-saisie.component';
import { PersonneResponsableSaisieComponent } from 'src/app/personne-responsable/saisie/personne-responsable-saisie/personne-responsable-saisie.component';
import { PersonneResponsableAffichageComponent } from 'src/app/personne-responsable/affichage/personne-responsable-affichage/personne-responsable-affichage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AttestationComponent } from 'src/app/attestation/attestation/attestation.component';
import { PhaseModuleComponent } from 'src/app/phase/module/phase-module/phase-module.component';
import { AjouterModuleComponent } from 'src/app/module/ajouter-module/ajouter-module.component';
import { DetailComponent } from 'src/app/eleve/detail/detail.component';
import { GenererComponent } from 'src/app/attestation/generer/generer.component';
import { DialogConfirmerComponent } from 'src/app/partage/dialog-confirmer/dialog-confirmer.component';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { ChampObligatoireComponent } from 'src/app/champ-obligatoire/champ-obligatoire.component';
import { ContratComponent } from 'src/app/contrat/contrat.component';
import { EcoleConduiteComponent } from 'src/app/contrat/ecole-conduite/ecole-conduite.component';
import { MotoConduiteComponent } from 'src/app/contrat/moto-conduite/moto-conduite.component';
import { EleveInfoComponent } from 'src/app/contrat/eleve-info/eleve-info.component';
import { DescriptionFormationComponent } from 'src/app/contrat/description-formation/description-formation.component';
import { CoutFormationComponent } from 'src/app/contrat/cout-formation/cout-formation.component';
import { ParametresContratComponent } from 'src/app/parametres-contrat/parametres-contrat.component';
import { PayementComponent } from 'src/app/payement/payement.component';
import { GabaritFactureComponent } from 'src/app/payement/gabarit-facture/gabarit-facture.component';
import { SafeHtmlPipe } from 'src/app/pipe/safe-html.pipe';
import { TotalComponent } from 'src/app/payement/total/total.component';
import { ExporterRegistreComponent } from 'src/app/exporter-registre/exporter-registre.component';
import { NumeroComponent } from 'src/app/contrat/numero/numero.component';
import { ModalitePayementComponent } from 'src/app/contrat/modalite-payement/modalite-payement.component';
import { AcceptationConditionComponent } from 'src/app/contrat/acceptation-condition/acceptation-condition.component';
import { DateVersementComponent } from 'src/app/contrat/modalite-payement/date-versement/date-versement.component';
import { ResiliationComponent } from 'src/app/contrat/resiliation/resiliation.component';
import { RechercheComponent } from 'src/app/recherche/recherche.component';
import { GabaritEleveComponent } from 'src/app/eleve/affichage/gabarit-eleve/gabarit-eleve.component';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { AjouterExamenComponent } from 'src/app/ajouter-examen/ajouter-examen.component';
import { AdminComponent } from 'src/app/examen/admin/admin.component';
import { ListExamenComponent } from 'src/app/examen/admin/list-examen/list-examen.component';
import { BreadcrumbsComponent } from 'src/app/breadcrumbs/breadcrumbs.component';
import { ConfirmerChangementComponent } from 'src/app/modal/confirmer-changement/confirmer-changement.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material/angular-material.module';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { JwtInterceptorService } from 'src/app/auth/services/jwt-interceptor.service';
import { ErrorInterceptorService } from 'src/app/auth/services/error-interceptor.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AutoComponent } from './auto.component';
import { NavbarComponent } from '../navbar/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedServiceModule } from '../shared/shared/shared-service.module';
import { ReserveAdminComponent } from '../eleve/reserve-admin/reserve-admin.component';
import { DetailPayementComponent } from '../payement/detail-payement/detail-payement.component';
import { ErreurSortieComponent } from '../erreur-sortie/erreur-sortie.component';
import { NoteSortieComponent } from '../eleve/note-sortie/note-sortie.component';
import { CalendarComponent } from '../calendar/calendar.component';

export const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      environment.clientIDG
    ),
  }
]);
@NgModule({
  declarations: [
    AutoComponent,  
    EleveAffichageComponent,
    EleveSaisieComponent,
    PhaseUneAffichageComponent,
    PhaseUneSaisieComponent,
    PhaseDeuxSaisieComponent,
    PhaseTroisAffichageComponent,
    PhaseTroisSaisieComponent,
    PhaseQuatreAffichageComponent,
    PhaseQuatreSaisieComponent,
    EcoleAffichageComponent,
    EcoleSaisieComponent,
    PersonneResponsableSaisieComponent,
    PersonneResponsableAffichageComponent,
    AttestationComponent,
    PhaseModuleComponent,
    AjouterModuleComponent,
    DetailComponent,
    GenererComponent,
    NavbarComponent,
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
    ExporterRegistreComponent,
    NumeroComponent,
    ModalitePayementComponent,
    AcceptationConditionComponent,
    DateVersementComponent,
    ResiliationComponent,
    RechercheComponent,
    GabaritEleveComponent,
    NotificationComponent,
    AjouterExamenComponent,
    AdminComponent,
    ListExamenComponent,
    BreadcrumbsComponent,
    ConfirmerChangementComponent,
    ReserveAdminComponent,
    DetailPayementComponent,
    ErreurSortieComponent,
    NoteSortieComponent,
    CalendarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AutoRoutingModule,
    HttpClientModule,
    MDBBootstrapModule,
    // NgxDatatableModule,
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
  EditorModule,
  SocialLoginModule,
  AngularMaterialModule,
  SharedServiceModule,
  ],
  schemas:[ NO_ERRORS_SCHEMA],
  providers: [EleveService, { provide: 'BASE_URL', useFactory: getBaseUrl },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig,
  }
  ]
})
export class AutoModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,getBaseUrl()+"assets/i18n/", ".json");
}


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

export function provideConfig() {
  return config;
}