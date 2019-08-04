import { Component, OnInit, Inject } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User } from 'src/app/auth/user.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  baseUrl:any;
  currentUser:User;
  constructor(private translate:TranslateService,
    @Inject('BASE_URL') baseUrl: string,
    private router: Router,
    private authenticationService: AuthenticationService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.translate.setDefaultLang('fr');
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    console.log(this.baseUrl);
  }

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
