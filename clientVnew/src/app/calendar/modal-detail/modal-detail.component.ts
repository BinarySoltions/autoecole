import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import 'moment/locale/fr';


export interface DialogDataEvent {
  id:number;
  places:number;
  date:any;
  heure_debut:any;
  heure_fin:any;
  place?:number;
  prenom?:string;
  nom?:string;
  numero_contrat?:string;
  nom_module?:string;
}
@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit {

  constructor(private translate: TranslateService,
    public dialogRef: MatDialogRef<ModalDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEvent[]) {
    this.translate.setDefaultLang('fr');
  }

  ngOnInit() {
  }

  getDate(date){
    return moment(date).format('YYYY-MMMM-DD')
  }

  session(row){
    if(row.includes('Sortie')){
      return row.replace('Sortie','').trim();
    }
    return row;
  }
}
