import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, HostListener, ChangeDetectorRef, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
declare var $: any;


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
  @Input() titre:string;
  @Output() estSupprimeEleve = new EventEmitter<number>();
  
  @ViewChild('row') row: ElementRef;
  elements: Eleve[]=[];
  headElements1 = ['nom', 'prenom','coordonnee.telephone','attestation.resultat_phase_une','modules','id'];
  dataSource: MatTableDataSource<Eleve>;

  searchText: string = '';
  previous: Eleve[]=[];

  maxVisibleItems: number = 20;
  idEleveASupprimer : number;
  indexASupprimer :number;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  constructor(private serviceEleve:EleveService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private translate:TranslateService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService) {
      this.translate.setDefaultLang('fr');
   }


  ngOnInit() { 
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.obtenirEleves(this.listeEleves);
  }
  ngAfterViewInit() {
  }
  obtenirEleves(result){
    if (result) {
      this.elements = result;
      this.dataSource = new MatTableDataSource(this.elements);
      this.setDataSourceAttributes();
    } 
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
examenEleve(row){
    this.router.navigate(["liste-examen/"+row.id]);
}
noteEleve(row){
  this.router.navigate(["eleve/note/"+row.id]);
}
public supprimerEleve(value){
  this.idEleveASupprimer = value;
  $("#confirmerModal").modal('show');
  this.estSupprimeEleve.emit(this.idEleveASupprimer);
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
   if(resultat && Number(resultat)){
     resultat = "Théorie "+resultat;
   }
  return resultat;
 }
  compare(a, b){
  if (a < b) return 1;
  if (b < a) return -1;

  return 0;
}
applyFilter(event: Event) {
  if(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }
  
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
setDataSourceAttributes() {
  if (this.paginator) {
  this.dataSource.paginator = this.paginator;
  }
  if (this.sort) {
  this.dataSource.sort = this.sort;
  this.dataSource.sortingDataAccessor = (item, property) => {
    if (property.includes('.')) return item[property.split('.')[0]]?property.split('.').reduce((o,i)=>o[i], item):item[property.split('.')[0]];
    return item[property];
 };
  }
  if (this.paginator && this.sort) {
    this.applyFilter(null);
  }
}
attestationValide(row):any{
  if(row.attestation && row.attestation.resultat_phase_une){
    return row.attestation.resultat_phase_une;
  } else {
    return false;
  }
}

validerExamen(row):any{
  if(row && row.examens && row.examens.length> 0){
    return true;
  } else {
    return false;
  }
}
}
