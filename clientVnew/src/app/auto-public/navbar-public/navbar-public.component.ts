import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User } from 'src/app/auth/user.model';
import { environment } from 'src/environments/environment';

enum Lien{
  EXAMEN = 1,
  PROFILE = 2
}
@Component({
  selector: 'app-navbar-public',
  templateUrl: './navbar-public.component.html',
  styleUrls: ['./navbar-public.component.scss']
})
export class NavbarPublicComponent implements OnInit {
  lien = Lien;
  lienActif = this.lien.PROFILE;
  currentUser:User;
  schoolName = environment.tenant.localeCompare('longueuildb')==0?'Longueuil':"";
  constructor(private authenticationService: AuthenticationService,
    private translate:TranslateService,
    private router: Router,) {
    this.translate.setDefaultLang('fr');

    this.currentUser =  this.authenticationService.currentUserPublicValue;
    this.authenticationService.currentUserPublic.subscribe(x => this.currentUser = x);
    console.log(" public nav bar", this.currentUser )
    if(this.currentUser){
      this.translate.setDefaultLang(this.currentUser.lang);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.lienActif = this.lien.PROFILE;
    this.authenticationService.logoutPublic();
    setTimeout(()=>this.router.navigate(['/public/reservation']),200);
}

routerProfile(){
  this.router.navigate(['/public/reservation/ok'],
    {queryParams:{lang:this.translate.currentLang}});;
}
}
