import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthGuardService } from 'src/app/auth/services/auth-guard.service';
import { EleveAffichageComponent } from 'src/app/eleve/affichage/eleve-affichage/eleve-affichage.component';
import { EleveSaisieComponent } from 'src/app/eleve/saisie/eleve-saisie/eleve-saisie.component';
import { AttestationComponent } from 'src/app/attestation/attestation/attestation.component';
import { GenererComponent } from 'src/app/attestation/generer/generer.component';
import { ChangementGuardService } from 'src/app/service/changement-guard.service';
import { DetailComponent } from 'src/app/eleve/detail/detail.component';
import { PayementComponent } from 'src/app/payement/payement.component';
import { EcoleSaisieComponent } from 'src/app/ecole/saisie/ecole-saisie/ecole-saisie.component';
import { AjouterModuleComponent } from 'src/app/module/ajouter-module/ajouter-module.component';
import { PhaseModuleComponent } from 'src/app/phase/module/phase-module/phase-module.component';
import { PersonneResponsableAffichageComponent } from 'src/app/personne-responsable/affichage/personne-responsable-affichage/personne-responsable-affichage.component';
import { ParametresContratComponent } from 'src/app/parametres-contrat/parametres-contrat.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { ContratComponent } from 'src/app/contrat/contrat.component';
import { RechercheComponent } from 'src/app/recherche/recherche.component';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { BeginComponent } from 'src/app/examen/begin/begin.component';
import { AdminComponent } from 'src/app/examen/admin/admin.component';
import { SessionFinieComponent } from 'src/app/examen/session-finie/session-finie.component';
import { ListExamenComponent } from 'src/app/examen/admin/list-examen/list-examen.component';
import { InscriptionComponent } from 'src/app/eleve/inscription/inscription.component';
import { AutoComponent } from './auto.component';
import { ReserveAdminComponent } from '../eleve/reserve-admin/reserve-admin.component';
import { ErreurSortieComponent } from '../erreur-sortie/erreur-sortie.component';
import { NoteSortieComponent } from '../eleve/note-sortie/note-sortie.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { AddDrivingComponent } from '../eleve/add-driving/add-driving.component';
import { FactureComponent } from '../facture/facture.component';

const routes: Routes = [
  { path: '', component: AutoComponent, 
  children:[
    { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'eleves', component: EleveAffichageComponent, canActivate: [AuthGuardService]},
  { path: 'eleve' , component: EleveSaisieComponent, canActivate: [AuthGuardService]},
  { path: 'attestation' , component: AttestationComponent, canActivate: [AuthGuardService]},
  { path: 'attestation/:id' , component: GenererComponent, canActivate: [AuthGuardService]},
  { path: 'eleve/:id' , component: EleveSaisieComponent, canActivate: [AuthGuardService],canDeactivate:[ChangementGuardService]},
  { path: 'eleve/detail/:id' , component: DetailComponent, canActivate: [AuthGuardService]},
  { path: 'eleve/payements/:id' , component: PayementComponent, canActivate: [AuthGuardService]},
  { path: 'ecole' , component: EcoleSaisieComponent, canActivate: [AuthGuardService]},
  { path: 'module' , component: AjouterModuleComponent, canActivate: [AuthGuardService]},
  { path: 'phase' , component: PhaseModuleComponent, canActivate: [AuthGuardService]},
  { path: 'personne' , component: PersonneResponsableAffichageComponent, canActivate: [AuthGuardService]},
  { path: 'parametres/contrat' , component: ParametresContratComponent, canActivate: [AuthGuardService]},
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent, canActivate: [AuthGuardService]},
  { path: 'eleve/contrat/:id' , component: ContratComponent},
  { path: 'recherche' , component: RechercheComponent, canActivate: [AuthGuardService]},
  { path: 'notification' , component: NotificationComponent, canActivate: [AuthGuardService]},
  { path: 'imprimer-examen/:id' , component: AdminComponent, canActivate: [AuthGuardService]},
  { path: 'liste-examen/:id' , component: ListExamenComponent, canActivate: [AuthGuardService]},
  { path: 'reservation' , component: ReserveAdminComponent, canActivate: [AuthGuardService]},
  { path: 'erreur-sortie' , component: ErreurSortieComponent, canActivate: [AuthGuardService]},
  { path: 'eleve/note/:id' , component: NoteSortieComponent, canActivate: [AuthGuardService]},
  { path: 'calendrier' , component: CalendarComponent, canActivate: [AuthGuardService]},
  { path: 'eleve/sortie/:id' , component: AddDrivingComponent, canActivate: [AuthGuardService]},
  { path: 'facture' , component: FactureComponent, canActivate: [AuthGuardService]},
  ] },
  
  // // otherwise redirect to home
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AutoRoutingModule { }
