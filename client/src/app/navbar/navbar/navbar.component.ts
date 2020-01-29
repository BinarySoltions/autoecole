import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User } from 'src/app/auth/user.model';
import { NotificationComponent } from 'src/app/notification/notification.component';
import { EleveService } from 'src/app/service/eleve/eleve.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  baseUrl:any;
  currentUser:User;
  nombreElevesExpires: any;
  estNotifie: number;
  constructor(private translate:TranslateService,
    @Inject('BASE_URL') baseUrl: string,
    private router: Router,
    private authenticationService: AuthenticationService,
    private serviceEleve:EleveService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.translate.setDefaultLang('fr');
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.obtenirElevesExpires();
  }

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
obtenirElevesExpires() {    
  this.serviceEleve.obtenirElevesExpires().subscribe(res=>{
    this.estNotifie  = !res? 0 : res.length;
  })
}
}
