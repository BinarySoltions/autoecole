import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';
import { ExamenComponent } from '../examen/examen.component';
import { BeginComponent } from '../examen/begin/begin.component';
import { SessionFinieComponent } from '../examen/session-finie/session-finie.component';
import { InscriptionComponent } from '../eleve/inscription/inscription.component';
import { LoginPublicComponent } from '../login/login-public/login-public.component';

@Component({
  selector: 'app-auto',
  templateUrl: './auto-public.component.html',
})
export class AutoPublicComponent  {

  currentUser: User;
isExamen = false;

constructor(private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUserPublic.subscribe(x => this.currentUser = x);
    translate.setDefaultLang('fr');
}

logout() {
    this.authenticationService.logoutPublic();
    this.router.navigate(['public/reservation']);
}

onActivate(value){
    this.isExamen = false;
    if(value instanceof ExamenComponent || 
        value instanceof BeginComponent || 
        value instanceof SessionFinieComponent || 
        value instanceof InscriptionComponent){
        this.isExamen = true;
    }
    console.log('currentUser');
    console.log(this.currentUser);
    if(!(value instanceof LoginPublicComponent)){
      
        if(!this.currentUser){
            this.router.navigate(['public/reservation']);
        }
    }
}

}
