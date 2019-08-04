import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-champ-obligatoire',
  templateUrl: './champ-obligatoire.component.html',
  styleUrls: ['./champ-obligatoire.component.scss']
})
export class ChampObligatoireComponent implements OnInit {

  @Input() modele:NgModel;

  constructor() { }

  ngOnInit() {
    let dd = this.modele;
  }


}
