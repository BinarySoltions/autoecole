import { Component, OnInit, Input } from '@angular/core';
import { Ecole } from 'src/app/entite/ecole.entity';

@Component({
  selector: 'app-ecole-conduite',
  templateUrl: './ecole-conduite.component.html',
  styleUrls: ['../contrat.component.scss']
})
export class EcoleConduiteComponent implements OnInit {
  @Input() ecole :Ecole;
  constructor() { }

  ngOnInit() {
  }

}
