import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RowGridComponent } from 'src/app/examen/row-grid/row-grid.component';
import { LastRowGridComponent } from 'src/app/examen/last-row-grid/last-row-grid.component';
import { FormsModule } from '@angular/forms';
import { PhaseDeuxAffichageComponent } from 'src/app/eleve/phase/deux/affichage/phase-deux-affichage/phase-deux-affichage.component';
import { ModalNoteComponent } from 'src/app/modal-note/modal-note.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalAccessComponent } from 'src/app/modal-access/modal-access.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material/angular-material.module';
import { ModalConfirmComponent } from '../../modal-confirm/modal-confirm.component';
import { ListReservationComponent } from 'src/app/reserve/list-reservation/list-reservation.component';
import { ModalDeleteEventsComponent } from '../../modal-delete-events/modal-delete-events.component';
import { BalancePaieComponent } from 'src/app/payement/balance-paie/balance-paie.component';
import { DialogConfirmerComponent } from 'src/app/partage/dialog-confirmer/dialog-confirmer.component';
import { DisplayFileComponent } from '../display-file/display-file.component';
@NgModule({
  declarations: [ RowGridComponent,
    LastRowGridComponent,PhaseDeuxAffichageComponent,ModalNoteComponent,    ModalAccessComponent, 
    ModalConfirmComponent,ListReservationComponent, ModalDeleteEventsComponent,BalancePaieComponent,DialogConfirmerComponent,
    DisplayFileComponent,],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  AngularMaterialModule,
  ],
  exports:[
    RowGridComponent,
    LastRowGridComponent,PhaseDeuxAffichageComponent,ModalNoteComponent,    ModalAccessComponent,AngularMaterialModule,
    ModalConfirmComponent,ListReservationComponent,ModalDeleteEventsComponent,  BalancePaieComponent,DialogConfirmerComponent,
    DisplayFileComponent,
  ],
  providers:[
    CookieService,
  ],
  entryComponents: [
    ModalNoteComponent,    ModalAccessComponent, ModalConfirmComponent,ModalDeleteEventsComponent,
  ],
})
export class SharedServiceModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,getBaseUrl()+"assets/i18n/", ".json");
}


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}