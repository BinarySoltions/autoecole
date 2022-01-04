import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EleveModule } from 'src/app/entite/eleve-module.entity';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Module } from 'src/app/entite/module.entity';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ErreurSortieService } from 'src/app/service/erreur-sortie.service';
import { ModuleService } from 'src/app/service/module/module.service';

@Component({
  selector: 'app-note-sortie',
  templateUrl: './note-sortie.component.html',
  styleUrls: ['./note-sortie.component.scss']
})
export class NoteSortieComponent implements OnInit {

  @ViewChild('formulaire') formulaire: NgForm;
  @ViewChild('row') row: ElementRef;
  elements: { langue: string; texte: string; id: number; selection: boolean }[] = [];
  erreurAjout: { langue: string; texte: string; }[] = [];
  headElements = ['texte', 'selection'];
  dataSource = new MatTableDataSource<any>();
  langue = 'fr';
  indexShow = 1;
  champs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  champsText = ["", "", "", "", "", "", "", "", "", ""];
  isSeclected = false;
  listeModules: Module[] = [];
  eleveModele:Eleve;

  pageSize: number = 5;
  private paginator: MatPaginator;
  private sort: MatSort;
  note: string;
  sortie: number = 0;
  idEleve: number;
  moduleEleve: EleveModule[];

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  constructor(private erreurSortie: ErreurSortieService,private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef, private serviceModule: ModuleService,private router:Router, 
    private serviceEleve:EleveService,
    private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }

  ngOnInit() {
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenirEleveById(this.idEleve);
    this.obtenirErreursSortie();
    this.obtenirModules();
  }

  obtenirErreursSortie() {
    this.erreurSortie.obtenirErreursSortie().subscribe(r => {
      if (r) {
        this.setValueTable(r);
      }
    })
  }
  public obtenirEleveById(id:number){
    if(id){
      this.serviceEleve.obtenirEleveById(id).subscribe(eleve=>{
        this.eleveModele = eleve;
        this.moduleEleve = this.eleveModele.modules.map(m=>m.eleve_module);
      });
    }
  }
  obtenirModules() {
    this.serviceModule.obtnenirSorties().subscribe(m => {
      this.listeModules = m;
      console.log(m);
    });
  }

  setDataSourceAttributes() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property.includes('.')) return item[property.split('.')[0]] ? property.split('.').reduce((o, i) => o[i], item) : item[property.split('.')[0]];
        return item[property];
      };
    }
    if (this.paginator && this.sort) {
      this.applyFilter(null);
    }
  }

  applyFilter(event: Event) {
    if (event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  soumettre() {
    let req = {id:this.idEleve,id_module:Number(this.sortie),note:this.note};
    this.serviceEleve.ajouterNoteSortie(req).subscribe(r=>{
      if(r && r.valid){
        this.supprimer(0);
      }
    })
  }

  private setValueTable(r) {
    r.forEach(e => {
      this.elements.push({ langue: e.langue, texte: e.texte, id: e.id, selection: false })
    });
    let result = this.elements.filter(e => e.langue == this.langue);
    this.dataSource = new MatTableDataSource(result);
    this.setDataSourceAttributes();
  }

  ajouter() {
    this.note = this.elements.filter(e => e.selection).map(e => e.texte).join(`<br/>`);
  }

  supprimer(value) {
    this.note = "";
    this.sortie = value;
    this.elements.forEach(e => e.selection = false);
    this.isSeclected = false;
  }

  radioChange(choice) {
    this.langue = choice.value;
    this.translate.setDefaultLang(choice.value);
    this.setValueTable(this.elements);
  }

  checkedChange(event) {
    console.log(this.elements);
    let ele = this.elements.filter(e => e.selection)

    if (ele) {
      this.isSeclected = true;
    } else {
      this.isSeclected = false;
    }
  }
  onModulesChange(event) {
    this.supprimer(event.target.value);
  }

  disableModule(id){
    let res = this.moduleEleve.find(em=>em.module_id == id)
    return !res.date_complete;
  }
}
