import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EleveService } from '../service/eleve/eleve.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RechercheComponent implements OnInit {
  term: any;
  listeEleves: import("c:/laravel/client/src/app/entite/eleve.entity").Eleve[];
  titre="Éléve(s) trouvé(s)"
  panelOpenState = false;
  constructor(private serviceEleve: EleveService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }
  rechercher() {
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.rechercherEleves(this.term).subscribe(res=>{
      this.listeEleves = res;
      this.panelOpenState = true;
      this.spinner.hide();
    })
  }
}
