import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phase-une-affichage',
  templateUrl: './phase-une-affichage.component.html',
  styleUrls: ['./phase-une-affichage.component.less']
})
export class PhaseUneAffichageComponent implements OnInit {

  @Input() modules:any = [];
  constructor() { }

  ngOnInit() {
  }

}
