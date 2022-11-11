import { Component, OnInit } from '@angular/core';
import { ContratService } from '../service/contrat/contrat.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class ParametresContrat{
  description_formation:string;
  cout_formation:string;
  modalite_payement_un:string;
  modalite_payement_deux:string;
  modalite_payement_trois:string;
  acceptation_condition_un:string;
  acceptation_condition_anglais:string;
  acceptation_condition_deux:string;
  acceptation_condition_trois:string;
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
  constructor(private serviceContrat:ContratService,
    private spinner:NgxSpinnerService,) { }

  ngOnInit() {
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceContrat.obtenirParametresContrat().subscribe(res=>{
      if(res) {
        this.parametres = res;
        this.spinner.hide();
      }
    });
  }
  activerContent(value){
    this.activeContent = value;
  }
  enregistrer(){
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceContrat.AjouterParametresContrat(this.parametres).subscribe(res=>{
      if(res) {
        this.parametres = res;
        this.spinner.hide();
      }
    });
  }
  fermer(){

  }
}
