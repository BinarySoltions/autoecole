import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-dialog-confirmer',
  templateUrl: './dialog-confirmer.component.html',
  styleUrls: ['./dialog-confirmer.component.scss']
})
export class DialogConfirmerComponent implements OnInit {
  @Output() estConfirmer = new EventEmitter<any>();
  @Input('description') description = "Voulez vous vraiment supprimer cet élève?";
  @Input('confirmText') confirmText ="Confirmer votre choix";
  constructor(private translate: TranslateService,) {
    this.translate.setDefaultLang('fr');
  
   }

  ngOnInit() {
  }

  
  confirmer(){
    this.estConfirmer.emit(true)
  }
  annuler(){
    this.estConfirmer.emit(false);
  }
}
