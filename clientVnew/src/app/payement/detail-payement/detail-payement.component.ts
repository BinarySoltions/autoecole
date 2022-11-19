import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild ,ViewEncapsulation} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TotalPayement } from '../total/total.component';
import moment from 'moment';
import { PayementService } from '../payement.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detail-payement',
  templateUrl: './detail-payement.component.html',
  styleUrls: ['./detail-payement.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DetailPayementComponent implements OnInit, OnChanges {

  @Input() dateDebut:any;
  @Input() dateFin:any;
  displayedColumns: string[] = ['date_payement','nom','type','montant'];
  transactions:{nom:string; montant:number;type:string;date_payement:any;}[]=[];
  dataSource1 = new MatTableDataSource<any>(this.transactions);

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  constructor(private servicePayement:PayementService,
    private spinner:NgxSpinnerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.enregistrer();
  }

  ngOnInit() {
  }

  formaterDate(){
    this.dateDebut = !this.dateDebut?null:moment(this.dateDebut).format('YYYY-MM-DD');
    this.dateFin = !this.dateFin?null:moment(this.dateFin).format('YYYY-MM-DD');
  }

  enregistrer(){
  
    this.formaterDate();
    let totalPayement = new TotalPayement();
    totalPayement.dateDebut = this.dateDebut;
    totalPayement.dateFin = this.dateFin;
    if(!!this.dateDebut && !!this.dateFin){
      this.obtenirDetailsPayements(totalPayement);
    }
    
  };
 
  obtenirDetailsPayements(totalPayement){
    this.spinner.show(undefined, { fullScreen: true });
    this.servicePayement.obtnenirDetailsPayements(totalPayement).subscribe(res=>{
      this.transactions = [];
      if(res){
        this.transactions = <any>res;
        this.dataSource1 = new MatTableDataSource<any>(this.transactions);
        this.setDataSourceAttributes();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    })
  }

  setDataSourceAttributes() {
    if (this.paginator) {
    this.dataSource1.paginator = this.paginator;
    }
    if (this.sort) {
    this.dataSource1.sort = this.sort;
    this.dataSource1.sortingDataAccessor = (item, property) => {
      if (property.includes('.')) return item[property.split('.')[0]]?property.split('.').reduce((o,i)=>o[i], item):item[property.split('.')[0]];
      return item[property];
   };
    }
    if (this.paginator && this.sort) {
      this.applyFilter(null);
    }
  }

  applyFilter(event: Event) {
    if(event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource1.filter = filterValue.trim().toLowerCase();  
    }
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
