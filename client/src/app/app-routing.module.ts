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

const routes: Routes = [
  { path: 'eleves', component: EleveAffichageComponent },
  { path: 'eleve' , component: EleveSaisieComponent},
  { path: 'attestation' , component: AttestationComponent},
  { path: 'eleve/:id' , component: EleveSaisieComponent},
  { path: 'eleve/detail/:id' , component: DetailComponent},
  { path: 'ecole' , component: EcoleSaisieComponent},
  { path: 'module' , component: AjouterModuleComponent},
  { path: 'phase' , component: PhaseModuleComponent},
  { path: 'personne' , component: PersonneResponsableAffichageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
