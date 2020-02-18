import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

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
