import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-examen',
  templateUrl: './list-examen.component.html',
  styleUrls: ['./list-examen.component.scss']
})
export class ListExamenComponent implements OnInit,OnDestroy {

  @ViewChild('row') row: ElementRef;
  examensEntites: any=[];
  headElements1 = ['numero','date_examen','id'];
  dataSource: MatTableDataSource<any>;

  searchText: string = '';
  previous: any[]=[];

  maxVisibleItems: number = 20;
  idEleveASupprimer : number;
  indexASupprimer :number;
  private paginator: MatPaginator;
  private sort: MatSort;
  idEleve: number;
  sub: any;
  elements: any;

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
    private toastr:ToastrService, private route:ActivatedRoute) {
      this.translate.setDefaultLang('fr');
   }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.idEleve = +params['id'];
      this.obtenirExamens();
    })
  }

  obtenirExamens(){
    this.serviceEleve.obtenirExamen(this.idEleve).subscribe(r=>{
      if(r){
        this.elements = r;
        this.dataSource = new MatTableDataSource(r);
      }
    })
  }

  editerExamen(id){
    this.router.navigate(["imprimer-examen/"+id]);
  }

  obtenirNomComplet(){
    const eleve = this.elements[0].eleve;
    return eleve.prenom+" "+eleve.nom;
  }
}
