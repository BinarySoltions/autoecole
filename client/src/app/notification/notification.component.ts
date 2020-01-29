import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EleveService } from '../service/eleve/eleve.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  estNotifie = 0;
  listeEleves: import("c:/laravel/client/src/app/entite/eleve.entity").Eleve[];
  titre = "Élèves en cours d'expiration";
  constructor(private serviceEleve: EleveService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.obtenirElevesExpires();
  }
  obtenirElevesExpires() {    
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.obtenirElevesExpires().subscribe(res=>{
      this.listeEleves = res;
      this.estNotifie  = !this.listeEleves ? 0 : this.listeEleves.length;
      this.spinner.hide();
    })
  }
}
