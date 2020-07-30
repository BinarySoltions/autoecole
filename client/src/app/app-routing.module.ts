import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EleveAffichageComponent } from './eleve/affichage/eleve-affichage/eleve-affichage.component';
import { EleveSaisieComponent } from './eleve/saisie/eleve-saisie/eleve-saisie.component';
import { EcoleSaisieComponent } from './ecole/saisie/ecole-saisie/ecole-saisie.component';
import { AttestationComponent } from './attestation/attestation/attestation.component';
import { AjouterModuleComponent } from './module/ajouter-module/ajouter-module.component';
import { PhaseModuleComponent } from './phase/module/phase-module/phase-module.component';
import { PersonneResponsableAffichageComponent } from './personne-responsable/affichage/personne-responsable-affichage/personne-responsable-affichage.component';
import { DetailComponent } from './eleve/detail/detail.component';
import { GenererComponent } from './attestation/generer/generer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { ContratComponent } from './contrat/contrat.component';
import { PayementComponent } from './payement/payement.component';
import { ParametresContratComponent } from './parametres-contrat/parametres-contrat.component';
import { RechercheComponent } from './recherche/recherche.component';
import { NotificationComponent } from './notification/notification.component';
import { ExamenComponent } from './examen/examen.component';
import { BeginComponent } from './examen/begin/begin.component';
import { AdminComponent } from './examen/admin/admin.component';
import { SessionFinieComponent } from './examen/session-finie/session-finie.component';
import { ListExamenComponent } from './examen/admin/list-examen/list-examen.component';
import { InscriptionComponent } from './eleve/inscription/inscription.component';
import { ChangementGuardService } from './service/changement-guard.service';

const routes: Routes = [
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
  { path: 'examen' , component: BeginComponent},
  { path: 'examen/:numero/:langue' , component: BeginComponent},
  { path: 'imprimer-examen/:id' , component: AdminComponent, canActivate: [AuthGuardService]},
  { path: 'session-terminer' , component: SessionFinieComponent},
  { path: 'liste-examen/:id' , component: ListExamenComponent, canActivate: [AuthGuardService]},
  { path: 'inscription' , component: InscriptionComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
