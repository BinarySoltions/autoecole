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
import * as _ from 'underscore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
declare var $: any;


@Component({
  selector: 'app-gabarit-eleve',
  templateUrl: './gabarit-eleve.component.html',
  styleUrls: ['./gabarit-eleve.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GabaritEleveComponent implements OnInit, AfterViewInit,OnChanges {

  numero=0;
  champ:any=core;
  lien:any=lien;
  @Input() listeEleves:Eleve[];
  @Input() titre:string;
  @Input() modulesConfig:any=[];
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
  phaseGroup :any;


  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
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
    this.phaseGroup = this.modulesConfig.map(m=> m.phase_id).filter((value, index, self) => self.indexOf(value) === index);
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
sortieEleve(row){
  this.router.navigate(["eleve/sortie/"+row.id]);
}
public supprimerEleve(value){
  this.idEleveASupprimer = value;
  $("#confirmerModal").modal('show');
  this.estSupprimeEleve.emit(this.idEleveASupprimer);
}

 determinerPhase(modules:Module[]):string{
   let modulesCompleted = [];
   modulesCompleted = modules.filter(m=>m.eleve_module.date_complete != null);
   let resultatArray = modulesCompleted.sort(this.compare);
   let resultat = resultatArray[0];
   if(resultat && Number(resultat.numero)){
     resultat = (resultat.type==="T" ? "Théorie "+resultat.nom : resultat.nom);
   }
  return resultat;
 }

 determinerModulesAfaire(modules:Module[]):string{
  let modulesCompleted = [];
  modulesCompleted = modules.filter(m=>m.eleve_module.date_complete != null);
  let resultatCompleted = modulesCompleted.sort(this.compare);
  let lastModuleCompleted = resultatCompleted[0];
  let modulesAbsent = [];
  modulesAbsent = modules.filter(m=>m.eleve_module.date_complete == null);

  let resultat = "";
  modulesAbsent.forEach((r:any)=>{
    if(r && Number(r.numero) && lastModuleCompleted && Number(r.numero) < Number(lastModuleCompleted.numero)){
      resultat+= (r.type==="T" ? "Théorie "+r.nom : r.nom) +", ";
    }
  });
  if(resultat && lastModuleCompleted && Number(lastModuleCompleted.numero)){
    resultat = resultat.substring(0,resultat.length-2);
  } else if(!lastModuleCompleted){
    resultat = "Théorie "+ modulesAbsent[0].nom;
  }
 return resultat;
}
  compare(a, b){
  if (a.numero < b.numero) return 1;
  if (b.numero < a.numero) return -1;

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

onModulesChange(event){
  this.numero = Number(event.value);
  if(this.numero) {
  let firstModule = this.modulesConfig[0];
  let module = this.modulesConfig.filter(m=>Number(m.numero)=== Number(this.numero))[0];
  let previousElements = this.modulesConfig.filter(m=>Number(m.numero)< Number(this.numero) && Number(m.phase_id)===Number(module.phase_id));
  console.log(" numero haut :", previousElements)
  if(previousElements && previousElements.length===0 && Number(firstModule.numero) === Number(this.numero)){
    previousElements = this.modulesConfig.filter(m=>Number(m.phase_id) === Number(module.phase_id));
  } else if(previousElements && previousElements.length===0){
    previousElements = this.modulesConfig.filter(m=>Number(m.phase_id) === Number(module.phase_id)-1);
    console.log(" numero prev :", previousElements)
  }
  let previousNumbers = [];
  if(previousElements && previousElements.length>0){
    previousNumbers = previousElements.map(n=>n.numero);
  }
  let listPreviousModules =  this.elements.filter((e:Eleve)=>{
    let index = Number(firstModule.numero) === Number(this.numero) ?1:e.modules.findIndex((m:Module)=>this.compareModuleDone(m,previousNumbers));
    if(index != -1){
     return e;
    }
   });
  let testlisteEleves =  listPreviousModules.filter((e:Eleve)=>{
   let index = e.modules.findIndex((m:Module)=>this.compareModuleAbsent(m));
   if(index != -1){
    return e;
   }
  });
  this.dataSource = new MatTableDataSource(testlisteEleves);
  this.setDataSourceAttributes();
} else{
  this.dataSource = new MatTableDataSource(this.elements);
  this.setDataSourceAttributes();
}
}

compareModuleAbsent(m):boolean{
  return Number(m.numero) === Number(this.numero) && m.eleve_module.date_complete==null;
}

compareModuleDone(m,previousNumbers):boolean{
  return previousNumbers.includes(m.numero) && m.eleve_module.date_complete!=null;
}

getModules(phase){
  return this.modulesConfig.filter(m=>m.phase_id === phase);
}
}
