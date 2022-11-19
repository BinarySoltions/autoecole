import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User } from 'src/app/auth/user.model';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { PartageService } from 'src/app/service/partage.service';

enum Lien{
  HOME = 1,
  ELEVE = 2,
  RECHERCHE = 3,
  CALENDAR = 4,
  FACTURE = 5,
  FICHIER = 6
}
@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NavbarSideComponent implements OnInit {

  baseUrl:any;
  currentUser:User;
  nombreElevesExpires: any;
  estNotifie: number;
  lien = Lien;
  lienActif = this.lien.HOME;
  @Input() isExamen = false;
  isLogged: User;
  constructor(private translate:TranslateService,
    @Inject('BASE_URL') baseUrl: string,
    private router: Router,
    private authenticationService: AuthenticationService,
    private serviceEleve:EleveService,
    private partageService:PartageService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.translate.setDefaultLang('fr');
    this.baseUrl = baseUrl;
    this.isLogged = this.authenticationService.currentUserValue;
  }
  ngAfterViewInit(): void {
    this.obtenirElevesExpires();
  }

  ngOnInit() {
   
  }

logout() {
    this.lienActif = this.lien.HOME;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
obtenirElevesExpires() { 
  if(this.isLogged) {
  this.serviceEleve.obtenirElevesExpires().subscribe(res=>{
    setTimeout(() => {
      this.estNotifie  = !res? 0 : res.length;
  },0);
   
  });

  this.partageService.nombreCourant.subscribe(n=>{
    this.estNotifie = n;
    setTimeout(() => {
      this.estNotifie = n;
  },0);
  });
}}

checkLogin(){
  return this.authenticationService.currentUserValue;
}
}
