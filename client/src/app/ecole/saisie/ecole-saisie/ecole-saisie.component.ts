import { Component, OnInit } from '@angular/core';
import core from 'src/app/core/core.json';

@Component({
  selector: 'app-ecole-saisie',
  templateUrl: './ecole-saisie.component.html',
  styleUrls: ['./ecole-saisie.component.scss']
})
export class EcoleSaisieComponent implements OnInit {

  champ:any=core;
  constructor() { }

  ngOnInit() {
  }

}
