import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EleveService } from '../service/eleve/eleve.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PartageService } from '../service/partage.service';
import { AuthenticationService } from '../auth/services/authentication.service';
import { Eleve } from '../entite/eleve.entity';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  estNotifie = 0;
  listeEleves: Eleve[];
  titre = "Élèves en cours d'expiration";
  constructor(private serviceEleve: EleveService,
    private spinner:NgxSpinnerService,
    private partageService:PartageService,
    private authenticationService: AuthenticationService,) { }

  ngOnInit() {
    if(this.authenticationService && this.authenticationService.currentUserValue){
      this.obtenirElevesExpires();
    }
  }
  obtenirElevesExpires() {    
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.obtenirElevesExpires().subscribe(res=>{
      this.listeEleves = res;
      this.estNotifie  = !this.listeEleves ? 0 : this.listeEleves.length;
      this.partageService.nouveauNombre(this.estNotifie);
      this.spinner.hide();
    })
  }
}
