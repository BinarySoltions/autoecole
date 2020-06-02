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

@Component({
  selector: 'app-ajouter-examen',
  templateUrl: './ajouter-examen.component.html',
  styleUrls: ['./ajouter-examen.component.scss']
})
export class AjouterExamenComponent implements OnInit ,AfterViewInit {

  dropdownListEleve:any = [];
  selectedItems = [];
  dropdownSettings = {};

  @Input() listeEleves:any;
  @Output() estAjouterModule = new EventEmitter<any>();
  @ViewChild('formulaire') formulaire:NgForm;
  elevesSelectionnes:Eleve[] = [];

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
  }
  ngAfterViewInit(): void {
   
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
 
  ajouter(){
    let request = [];
    this.elevesSelectionnes.forEach(e=>{
      let el  = this.listeEleves.find(e1=>e1.id == e.id);
      request.push({eleve_id:el.id,numero:el.numero_contrat});
    });
    this.serviceEleve.ajouterExamens(request).subscribe(res=>{
      if(res.isValid){
        this.estAjouterModule.emit(true);
        this.toastr.success("L'examen a été ajouté avec succés!","Information");
      }else{
        this.estAjouterModule.emit(false);
        this.toastr.error("Une erreur est survenue lors de l'enregistement!");
      }
      this.elevesSelectionnes = [];
    });
  }
  validerEleves(){
    let ct = this.elevesSelectionnes?this.elevesSelectionnes.length:0;
    return ct;
  }

  fermer(){
    this.elevesSelectionnes = [];
  }
}
