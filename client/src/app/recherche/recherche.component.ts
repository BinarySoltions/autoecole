import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EleveService } from '../service/eleve/eleve.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RechercheComponent implements OnInit {

  constructor(private serviceEleve: EleveService) { }

  ngOnInit() {
  }
  rechercher() {

  }
}
