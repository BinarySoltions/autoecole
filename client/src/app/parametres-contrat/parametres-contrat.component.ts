import { Component, OnInit } from '@angular/core';

export class ParametresContrat{
  descriptionFormation:string;
  coutFormation:string;
  modalitePayementUn:string;
  modalitePayementDeux:string;
  modalitePayementTrois:string;
  acceptationConditionUn:string;
  acceptationConditionAnglais:string;
  acceptationConditionDeux:string;
  acceptationConditionTrois:string;
}
export enum TYPECONTRAT{
  FORMATION = 1,
  PAYEMENT = 2,
  CONDITION = 3
}
@Component({
  selector: 'app-parametres-contrat',
  templateUrl: './parametres-contrat.component.html',
  styleUrls: ['./parametres-contrat.component.scss']
})
export class ParametresContratComponent implements OnInit {
  parametres:ParametresContrat = new ParametresContrat();
 activeContent : number = TYPECONTRAT.FORMATION;
 PC = TYPECONTRAT;
  constructor() { }

  ngOnInit() {

  }
  activerContent(value){
    this.activeContent = value;
  }
}
