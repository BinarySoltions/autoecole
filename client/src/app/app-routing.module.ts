import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EleveAffichageComponent } from './eleve/affichage/eleve-affichage/eleve-affichage.component';
import { EleveSaisieComponent } from './eleve/saisie/eleve-saisie/eleve-saisie.component';
import { EcoleSaisieComponent } from './ecole/saisie/ecole-saisie/ecole-saisie.component';
import { AttestationComponent } from './attestation/attestation/attestation.component';

const routes: Routes = [
  { path: 'eleves', component: EleveAffichageComponent },
  { path: 'eleve' , component: EleveSaisieComponent},
  { path: 'attestation' , component: AttestationComponent},
  { path: 'eleve/:id' , component: EleveSaisieComponent},
  { path: 'ecole/ecole' , component: EcoleSaisieComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
