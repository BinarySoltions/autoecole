import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PayementService } from '../payement.service';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

export class TotalPayement{
  dateDebut:any;
  dateFin:any;
  type:string;
  montant:TotalTypePayement[];
}
export class TotalTypePayement{
  montant:number;
  type:string;
}
@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {
  @Output('datesEvent') datesEvent = new EventEmitter<any>(null);
  dateDebut:any;
  dateFin:any;
  transactions:TotalPayement[]=[];
  displayedColumns: string[] = ['dateDebut', 'dateFin','montant'];
  dataSource = new MatTableDataSource<TotalPayement>(this.transactions);

  constructor(private servicePayement:PayementService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }

  formaterDate(){
    this.dateDebut = !this.dateDebut?null:moment(this.dateDebut).format('YYYY-MM-DD');
    this.dateFin = !this.dateFin?null:moment(this.dateFin).format('YYYY-MM-DD');
  }
  enregistrer(){
    this.spinner.show(undefined, { fullScreen: true });
    this.formaterDate();
    let totalPayement = new TotalPayement();
    totalPayement.dateDebut = this.dateDebut;
    totalPayement.dateFin = this.dateFin;
    this.datesEvent.emit(totalPayement);
    this.servicePayement.obtnenirTotalPayementsByDates(totalPayement).subscribe(res=>{
      this.transactions = [];
      if(res){
        this.transactions.push(<TotalPayement>res);
        this.dataSource = new MatTableDataSource<TotalPayement>(this.transactions);
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    })
  };
  public getTotalCost(montant:TotalTypePayement[]=[]): number 
  {
    return montant.map(m=>Number(m.montant)).reduce((accumulator, currentValue) => accumulator + currentValue);
  }

}
