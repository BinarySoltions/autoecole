import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, HostListener, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { Eleve } from 'src/app/entite/eleve.entity';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import core from 'src/app/core/core.json';
import lien from 'src/app/core/lien.json';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module } from 'src/app/entite/module.entity';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-eleve-affichage',
  templateUrl: './eleve-affichage.component.html',
  styleUrls: ['./eleve-affichage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EleveAffichageComponent implements OnInit,AfterViewInit {

  champ:any=core;
  lien:any=lien;
  listeEleves:Eleve[]=[];
  
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;
  elements: Eleve[]=[];
  headElements = ['Nom', 'Prénom', 'Adresse','Téléphone','Phase','Action'];

  searchText: string = '';
  previous: Eleve[]=[];

  maxVisibleItems: number = 20;
  
  constructor(private serviceEleve:EleveService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private translate:TranslateService,
    private spinner:NgxSpinnerService) {
      this.translate.setDefaultLang('fr');
   }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  ngOnInit() { 
    this.spinner.show(undefined, { fullScreen: true });
 
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
    this.serviceEleve.obtenirEleves().subscribe((result)=>{
      this.elements = result;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      //this.spinner.hide();
    });
   
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.cdRef.detectChanges();
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
 public ajouterEleve(){
   this.router.navigate([lien.url.ajout_eleve]);
 }

 determinerPhase(modules:Module[]):string{
   let mapModule = new Map;
   modules.forEach(m=>{
      if(m.eleve_module.date_complete == null){
        mapModule.set(m.numero,m.nom);
      }
   });
   let resultatArray = Array.from(mapModule.keys()).sort(this.compare);
   let resultat = mapModule.get(resultatArray[0]);
  return resultat;
 }
  compare(a, b){
  if (a > b) return 1;
  if (b > a) return -1;

  return 0;
}
}
