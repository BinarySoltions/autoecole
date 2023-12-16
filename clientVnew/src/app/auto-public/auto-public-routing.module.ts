import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeginComponent } from '../examen/begin/begin.component';
import { SessionFinieComponent } from '../examen/session-finie/session-finie.component';
import { InscriptionComponent } from '../eleve/inscription/inscription.component';
import { AutoPublicComponent } from './auto-public.component';
import { ReserveComponent } from '../reserve/reserve.component';
import { LoginPublicComponent } from '../login/login-public/login-public.component';
import { ChangePwdComponent } from '../login/login-public/change-pwd/change-pwd.component';
import { DemanderPwdComponent } from '../login/login-public/demander-pwd/demander-pwd.component';
import { AuthPublicGuardService } from '../auth/services/auth-public-guard.service';

const routes: Routes = [
  { path: '', component: AutoPublicComponent, 
  children:[
    { path: 'examen' , component: BeginComponent},
  { path: 'examen/:numero/:langue' , component: BeginComponent},
  { path: 'session-terminer' , component: SessionFinieComponent},
  { path: 'inscription' , component: InscriptionComponent},
  { path: 'reservation/ok' , component: ReserveComponent,canActivate: [AuthPublicGuardService]},
  { path: 'reservation' , component: LoginPublicComponent},
  { path: 'demander-mot-de-passe' , component: DemanderPwdComponent},
  { path: 'changer-mot-de-passe' , component: ChangePwdComponent},
  ]
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoPublicRoutingModule { }
