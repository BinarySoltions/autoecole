import { Component } from '@angular/core';
import { User } from '../auth/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent  {

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
}

}