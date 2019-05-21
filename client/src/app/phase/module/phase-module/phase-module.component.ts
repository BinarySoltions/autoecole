import { Component, OnInit } from '@angular/core';
import { PhaseService } from 'src/app/service/phase.service';
import { _ } from 'underscore';
import { TranslateService } from '@ngx-translate/core';
import { ModuleService } from 'src/app/service/module/module.service';
import { ToastrService } from 'ngx-toastr';
import { Phase } from 'src/app/entite/phase.entity';
import { Module } from 'src/app/entite/module.entity';

export class PhaseModel {
  nom: string;
  numero: number;
  nom_module: string;
  numero_module:number;
  type:string;
}
@Component({
  selector: 'app-phase-module',
  templateUrl: './phase-module.component.html',
  styleUrls: ['./phase-module.component.scss']
})
export class PhaseModuleComponent implements OnInit {
  phase: PhaseModel;
  listeNombres: number[];
  listePhaseModuleModel: Phase[] = [];
  message = {
    'emptyMessage': 'Pas de modules disponible.',
    'totalMessage': ''
  };

  constructor(private servicePhase:PhaseService,
    private translate:TranslateService,
    private serviceModule: ModuleService,
    private toastr : ToastrService) {
      this.translate.setDefaultLang('fr');
     }

  ngOnInit() {
    this.phase = new PhaseModel();
    this.listeNombres = _.range(1,28);
    this.obtenirPhase();
    this.definirDefaultValueSelectionOption();
  }
  definirDefaultValueSelectionOption() {
    if (this.phase.numero == null) {
      this.phase.numero = 0;
    }
    if (this.phase.numero_module == null) {
      this.phase.numero_module = 0;
    }
  }
  obtenirPhase(){
    this.servicePhase.obtenirPhasesModules().subscribe(res=>{
      this.listePhaseModuleModel = res;
    });
  }
  
  ajouter() {
    this.serviceModule.ajouterPhaseModule(this.phase).subscribe(res=>{
      if(res && _.has(res[0],'id')){
        this.listePhaseModuleModel = res;
        this.toastr.success("La phase et le module ont été ajoutés avec succés!","Informtion");
      }else{
        this.toastr.error("Une erreur est survenue lors de l'enregistrement!","Informtion");
      }
     
    });
  }
  ajouterModuleDansLaListe(nombre: number) {
  }
}
