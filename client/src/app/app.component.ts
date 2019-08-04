import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { User } from './auth/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
currentUser: User;

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
}
