import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cout-formation',
  templateUrl: './cout-formation.component.html',
  styleUrls: ['./cout-formation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoutFormationComponent implements OnInit {
  @Input() loiCoutFormation;
  @Input() coutFormation: number;
  TPS = 5;
  TVQ = 9.975;
  heurePratique = 15;
  heureTheorique = 24;
  constructor() { }

  ngOnInit() {
  }
  obtenirHeuresTotales(){
    const t = this.heurePratique + this.heureTheorique;
    return t;
  }
  obtenirTauxHoraire(){
    const t = this.heurePratique + this.heureTheorique;
    const m = this.coutFormation/t;
    return Number(m.toFixed(2));
  }
  obtenirMontantHorsTaxes(){
    const m = this.coutFormation/(1+0.05+0.09975);
    return Number(m.toFixed(2));
  }

  obtenirTVQ(){
    const m = this.obtenirMontantHorsTaxes()*this.TVQ/100;
    return Number(m.toFixed(2));
  }
  obtenirTPS(){
    const m = this.obtenirMontantHorsTaxes()*this.TPS/100;
    return Number(m.toFixed(2));
  }

}
