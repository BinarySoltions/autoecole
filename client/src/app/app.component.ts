import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { User } from './auth/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/services/authentication.service';
import { ExamenComponent } from './examen/examen.component';
import { BeginComponent } from './examen/begin/begin.component';
import { SessionFinieComponent } from './examen/session-finie/session-finie.component';
import { InscriptionComponent } from './eleve/inscription/inscription.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
currentUser: User;
isExamen = false;

constructor(private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang('fr');
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

onActivate(value){
    this.isExamen = false;
    if(value instanceof ExamenComponent || 
        value instanceof BeginComponent || 
        value instanceof SessionFinieComponent || 
        value instanceof InscriptionComponent){
        this.isExamen = true;
    }
}
}
