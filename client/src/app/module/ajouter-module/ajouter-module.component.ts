import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Module } from 'src/app/entite/module.entity';
import { ModuleService } from 'src/app/service/module/module.service';
import {TranslateService} from '@ngx-translate/core';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { Eleve } from 'src/app/entite/eleve.entity';
import {_} from 'underscore';
import { ToastrService } from 'ngx-toastr';

export class ModuleModel{
  id_module:number;
  eleves:number[];
  date_complete:Date;
}
@Component({
  selector: 'app-ajouter-module',
  templateUrl: './ajouter-module.component.html',
  styleUrls: ['./ajouter-module.component.scss']
})
export class AjouterModuleComponent implements OnInit,AfterViewInit {

  dropdownListEleve:any = [];
  selectedItems = [];
  dropdownSettings = {};
  moduleModel:ModuleModel = new ModuleModel();
  listeModules:Module[] = [];

  constructor(private serviceModule:ModuleService,
    private translate:TranslateService,
    private serviceEleve:EleveService,
    private toastr:ToastrService) { 
      translate.setDefaultLang('fr');
    }

  ngOnInit() {
    this.serviceEleve.obtenirElevesUniquement().subscribe(e=>{
      let el = e.filter(eleve=>{
        return _.extend(eleve, {'nomcomplet':eleve.nom+', '+eleve.prenom}) ;
      });
      this.dropdownListEleve = el;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nomcomplet',
      selectAllText: 'Cocher tout',
      unSelectAllText: 'Décocher tout',
      searchPlaceholderText:'Rechercher',
      allowSearchFilter: true
    };
    this.moduleModel.id_module = 0;
  }
  ngAfterViewInit(): void {
    this.obtenirModules();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  obtenirModules(){
    this.serviceModule.obtnenirModules().subscribe(m=>{
      this.listeModules = m;
      console.log(this.listeModules);
    });
  }
  ajouter(){
    this.moduleModel.eleves = _.pluck(this.moduleModel.eleves,'id');
    this.moduleModel.date_complete = _.values(this.moduleModel.date_complete).join('-');
    this.serviceModule.ajouterModuleEleves(this.moduleModel).subscribe(res=>{
      if(res.valid){
        this.toastr.success("Le module a été ajouté avec succés!","Information");
      }else{
        this.toastr.error("Une erreur est survenue lors de l'enregistement!");
      }
    });
    this.moduleModel.eleves = [];
  }
}
