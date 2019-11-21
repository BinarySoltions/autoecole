import { Component,EventEmitter, OnInit, AfterViewInit, Input, Output, ViewChild } from '@angular/core';
import { Module } from 'src/app/entite/module.entity';
import { ModuleService } from 'src/app/service/module/module.service';
import {TranslateService} from '@ngx-translate/core';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { Eleve } from 'src/app/entite/eleve.entity';
import {_} from 'underscore';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import moment from 'moment';

export class ModuleModel{
  id_module:number;
  eleves:number[];
  date_complete:any;
  sans_objet:number;
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

  @Input() listeEleves:any;
  @Output() estAjouterModule = new EventEmitter<any>();
  @ViewChild('formulaire') formulaire:NgForm;

  constructor(private serviceModule:ModuleService,
    private translate:TranslateService,
    private serviceEleve:EleveService,
    private toastr:ToastrService) { 
      translate.setDefaultLang('fr');
    }

  ngOnInit() {
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
    });
  }
  ajouter(){
    this.moduleModel.eleves = _.pluck(this.moduleModel.eleves,'id');
    this.moduleModel.date_complete = !this.moduleModel.date_complete?null:moment(this.moduleModel.date_complete).format('YYYY-MM-DD');
    this.serviceModule.ajouterModuleEleves(this.moduleModel).subscribe(res=>{
      if(res.valid){
        this.estAjouterModule.emit(true);
        this.toastr.success("Le module a été ajouté avec succés!","Information");
      }else{
        this.estAjouterModule.emit(false);
        this.toastr.error("Une erreur est survenue lors de l'enregistement!");
      }
    });
    this.moduleModel.eleves = [];
  }
  validerEleves(){
    let ct = this.moduleModel.eleves?this.moduleModel.eleves.length:0;
    return ct;
  }
  changeSansObjet(value){
    if(value){
      this.moduleModel.date_complete = null;
    }
  }
}
