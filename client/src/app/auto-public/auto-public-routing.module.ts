import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeginComponent } from '../examen/begin/begin.component';
import { SessionFinieComponent } from '../examen/session-finie/session-finie.component';
import { InscriptionComponent } from '../eleve/inscription/inscription.component';
import { AutoPublicComponent } from './auto-public.component';

const routes: Routes = [
  { path: '', component: AutoPublicComponent, 
  children:[
    { path: 'examen' , component: BeginComponent},
  { path: 'examen/:numero/:langue' , component: BeginComponent},
  { path: 'session-terminer' , component: SessionFinieComponent},
  { path: 'inscription' , component: InscriptionComponent},
  ]
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoPublicRoutingModule { }
