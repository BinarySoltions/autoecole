import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ErreurSortieService } from '../service/erreur-sortie.service';

@Component({
  selector: 'app-erreur-sortie',
  templateUrl: './erreur-sortie.component.html',
  styleUrls: ['./erreur-sortie.component.scss']
})
export class ErreurSortieComponent implements OnInit {
  @ViewChild('formulaire') formulaire:NgForm;
  @ViewChild('row') row: ElementRef;
  elements :{langue:string;texte:string;id:number}[]=[];
  erreurAjout:{langue:string;texte:string;}[]=[];
  headElements = ['texte', 'id'];
  dataSource = new MatTableDataSource<any>();
  langue = 'fr';
  indexShow = 1;
  champs = [1,2,3,4,5,6,7,8,9,10];
  champsText = ["","","","","","","","","",""];


  pageSize: number = 5;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  constructor( private erreurSortie:ErreurSortieService,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }

  ngOnInit() {
    this.obtenirErreursSortie();
  }

  obtenirErreursSortie(){
    this.erreurSortie.obtenirErreursSortie().subscribe(r=>{
      if(r){
        this.setValueTable(r);
      }
    })
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

  soumettre(){
   this.champs.forEach(i=>{
     const val = this.formulaire.value['textarea_'+i];
     console.log(val);
     if(val){
      this.erreurAjout.push({langue:this.langue,texte:val});
     }
   });
   this.erreurSortie.enregistrerErreursSortie(this.erreurAjout).subscribe(r=>{
     if(r){
      this.indexShow = 1;
      this.champsText = ["","","","","","","","","",""];
      this.setValueTable(r);
      this.erreurAjout = [];
     }
   });
  }

  private setValueTable(r){
    this.elements = r;
    let result = this.elements.filter(e=>e.langue == this.langue);
    this.dataSource = new MatTableDataSource(result);
    this.setDataSourceAttributes();
  }

  ajouter(){
    if(this.indexShow < 10){
      this.indexShow++;
    }
  }

  diminuer(){
    if(this.indexShow > 1){
      this.indexShow--;
    }
  }

  radioChange(choice){
    this.langue = choice.value;
    this.translate.setDefaultLang(choice.value);
    this.setValueTable(this.elements);
  }

  editer(row){

  }
}
