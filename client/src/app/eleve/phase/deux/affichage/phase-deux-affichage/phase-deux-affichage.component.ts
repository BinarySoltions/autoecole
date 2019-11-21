import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phase-deux-affichage',
  templateUrl: './phase-deux-affichage.component.html',
  styleUrls: ['./phase-deux-affichage.component.scss']
})
export class PhaseDeuxAffichageComponent implements OnInit {

  @Input() modules:any = [];
  constructor() { }

  ngOnInit() {
  }
  obtenirDate(value):any{
    if(!(!value)){
      return value.sans_objet?"S.O":null;
    }
    return null;
  }
}
