import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-modalite-payement',
  templateUrl: './modalite-payement.component.html',
  styleUrls: ['../contrat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalitePayementComponent implements OnInit, OnChanges {
  @Input() modalitePayementUn:any;
  @Input() modalitePayementDeux:any;
  @Input() modalitePayementTrois:any;
  @Input() numeroContrat:any;
  @Input() versement:any;
  @Input() dateDebut:any;
  dateFin:any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.dateFin = !this.dateDebut ? null : moment(this.dateDebut).add(18,'M').format('YYYY-MM-DD');
  }
}
