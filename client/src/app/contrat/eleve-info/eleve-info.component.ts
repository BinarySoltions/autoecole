import { Component, OnInit, Input } from '@angular/core';
import { Eleve } from 'src/app/entite/eleve.entity';

@Component({
  selector: 'app-eleve-info',
  templateUrl: './eleve-info.component.html',
  styleUrls: ['../contrat.component.scss']
})
export class EleveInfoComponent implements OnInit {
  @Input() eleve:Eleve;
  constructor() { }

  ngOnInit() {
  }

}
