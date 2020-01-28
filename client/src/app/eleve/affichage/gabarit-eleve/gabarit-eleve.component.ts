import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, HostListener, ChangeDetectorRef, AfterViewInit, Input, OnChanges } from '@angular/core';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { Eleve } from 'src/app/entite/eleve.entity';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import core from 'src/app/core/core.json';
import lien from 'src/app/core/lien.json';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module } from 'src/app/entite/module.entity';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {_} from 'underscore';


@Component({
  selector: 'app-gabarit-eleve',
  templateUrl: './gabarit-eleve.component.html',
  styleUrls: ['./gabarit-eleve.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GabaritEleveComponent implements OnInit, AfterViewInit,OnChanges {

  champ:any=core;
  lien:any=lien;
  @Input() listeEleves:Eleve[];
  
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;
  elements: Eleve[]=[];
  headElements = ['Nom', 'Prénom', 'Adresse','Téléphone','Module','Action'];

  searchText: string = '';
  previous: Eleve[]=[];

  maxVisibleItems: number = 20;
  idEleveASupprimer : number;
  indexASupprimer :number;
  
  constructor(private serviceEleve:EleveService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private translate:TranslateService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService) {
      this.translate.setDefaultLang('fr');
   }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  ngOnInit() { 
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.obtenirEleves(this.listeEleves);
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.cdRef.detectChanges();
  }
  obtenirEleves(result){
    if (result) {
      this.elements = result;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    } 
  }
  searchItems(value) {
    const prev = this.mdbTable.getDataSource();
    this.searchText=value;
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }
 public editerEleve(value){
   this.router.navigate([lien.url.ajout_eleve+"/"+value]);
 }
 public detailEleve(value){
  this.router.navigate(["eleve/detail/"+value]);
}
public attestationEleve(value){
  this.router.navigate(["attestation/"+value]);
}
public payementEleve(value){
  this.router.navigate(["eleve/payements/"+value]);
}
public contratEleve(value){
  this.router.navigate(["eleve/contrat/"+value]);
}
public supprimerEleve(value,index){
  this.idEleveASupprimer = value;
  this.indexASupprimer = index;
}
confirmerSuppression(value){
  if(value){
    this.serviceEleve.supprimerEleveById(this.idEleveASupprimer).subscribe(res=>{
      if(res.valid){
        this.elements.splice(this.indexASupprimer,1);
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.toastr.success("L'élève a été supprimé avec succes!","Infrormation");
      }
    })
  }
}


 determinerPhase(modules:Module[]):string{
   let mapModule = new Map;
   modules.forEach(m=>{
      if(m.eleve_module.date_complete != null){
        mapModule.set(m.numero,m.nom);
      }
   });
   let resultatArray = Array.from(mapModule.keys()).sort(this.compare);
   let resultat = mapModule.get(resultatArray[0]);
  return resultat;
 }
  compare(a, b){
  if (a < b) return 1;
  if (b < a) return -1;

  return 0;
}

}
