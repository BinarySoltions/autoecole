import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

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

import { ToastrModule } from 'ngx-toastr';
// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PhaseModuleComponent } from './phase/module/phase-module/phase-module.component';
import { AjouterModuleComponent } from './module/ajouter-module/ajouter-module.component';
import { DetailComponent } from './eleve/detail/detail.component';


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
    DetailComponent
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
  NgxMaskModule.forRoot(options),
  NgxSpinnerModule
  ],
  schemas:[ NO_ERRORS_SCHEMA],
  providers: [EleveService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export var options: Partial<IConfig> | (() => Partial<IConfig>);
