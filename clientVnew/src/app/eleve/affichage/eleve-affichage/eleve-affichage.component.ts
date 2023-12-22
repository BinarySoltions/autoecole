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
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { PartageService } from 'src/app/service/partage.service';
import { ExportExcelService } from 'src/app/excel/export-excel.service';
import { AjouterModuleComponent } from 'src/app/module/ajouter-module/ajouter-module.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoteModuleComponent } from '../../note-module/note-module.component';



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
  headElements = ['Nom', 'Prénom', 'Adresse','Téléphone','Module','Action'];

  searchText: string = '';
  previous: Eleve[]=[];

  maxVisibleItems: number = 20;
  idEleveASupprimer : number;
  indexASupprimer :number;

  isLoading = true;
  modules: any = [];
  dialogRef: MatDialogRef<NoteModuleComponent>;

  constructor(private serviceEleve:EleveService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private translate:TranslateService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private exportExcelService:ExportExcelService,
    private partageService:PartageService,
    private dialog:MatDialog) {
      this.translate.setDefaultLang('fr');
   }

  @HostListener('input') oninput() {
    //this.mdbTablePagination.searchText = this.searchText;
  }
  ngOnInit() {
    this.spinner.show(undefined, { fullScreen: true });
    this.isLoading = true;
    this.obtenirElevesLimites(100);
    //this.obtenirElevesExpires();
  }

  ngAfterViewInit() {

  }
  obtenirEleves(){
    this.serviceEleve.obtenirEleves().subscribe((result)=>{
      if (result) {
        this.elements = result;
        this.listeEleves  = result.filter(eleve=>{
          return _.extend(eleve, {'nomcomplet':eleve.nom+', '+eleve.prenom+', '+eleve.numero_contrat}) ;
        });
       this.isLoading = false;
       this.dialogRef?.componentInstance.elevesChangeSubscribe.next(this.listeEleves)
      }
    });
  }
  obtenirElevesLimites(limit){
    this.serviceEleve.obtenirElevesLimites(limit).subscribe((result)=>{
      if (result) {
        this.elements = result;
        this.listeEleves  = result.filter(eleve=>{
          return _.extend(eleve, {'nomcomplet':eleve.nom+', '+eleve.prenom+', '+eleve.numero_contrat}) ;
        });
        this.dialogRef?.componentInstance.elevesChangeSubscribe.next(this.listeEleves)
      }
      this.spinner.hide();
    });
    this.obtenirEleves();
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

 public ajouterEleve(){
   this.router.navigate([lien.url.ajout_eleve]);
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
evenementAjouterModule(value){
  if(value){
    this.obtenirEleves();
  }
}
obtenirElevesExpires() {
  this.serviceEleve.obtenirElevesExpires().subscribe(res=>{
    const n  = !res? 0 : res.length;
    this.partageService.nouveauNombre(n);
  })
}
estSupprimeEleve(value){
  this.idEleveASupprimer = value;
}
confirmerSuppression(value){
  if(value){
    this.serviceEleve.supprimerEleveById(this.idEleveASupprimer).subscribe(res=>{
      if(res.valid){
        this.listeEleves = this.listeEleves.filter(e=>e.id != this.idEleveASupprimer);
        this.obtenirEleves();
        this.toastr.success("L'élève a été supprimé avec succes!","Infrormation");
      }
    })
  }
}

exporterEleves(){
 let titre = "Listes-des-eleves-actifs";

 let columns = [];
 this.elements.forEach(e=>{
  columns.push({nom:e.nom,prenom:e.prenom,email:e.email,telephone:e.coordonnee.telephone,numero_contrat:e.numero_contrat});
 });

 this.exportExcelService.exportElevsAsExcelFile(columns,titre);
}

modulesChange(event){
  this.modules = event;
}

AjouterNoteEleves(){
   this.dialogRef = this.dialog.open(NoteModuleComponent, {
    data: {listeEleves:this.listeEleves}
  });

  this.dialogRef.afterClosed().subscribe(result => {

  });
}
}
