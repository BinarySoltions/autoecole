import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auto/auto.module').then(m=>m.AutoModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./auto-public/auto-public.module').then(m=>m.AutoPublicModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
