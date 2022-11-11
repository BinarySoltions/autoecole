import { Component, ElementRef, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';

export interface DialogDataEvent {
  id: number;
  places: number;
  date: any;
  heure_debut: any;
  heure_fin: any;
  place?: number;
  prenom?: string;
  nom?: string;
  numero_contrat?: string;
  nom_module?: string;
  selection:boolean;
}
export interface DialogViewModel{
  action:string;
  events:DialogDataEvent[];
  eventsDuplicate:DialogDataEvent[];
}
@Component({
  selector: 'app-modal-delete-events',
  templateUrl: './modal-delete-events.component.html',
  styleUrls: ['./modal-delete-events.component.scss']
})
export class ModalDeleteEventsComponent implements OnInit {
  @ViewChild('row') row: ElementRef;
  elements:DialogDataEvent[]=[];
  headElements = ['heure_debut', 'heure_fin','places', 'id'];
  dataSource = new MatTableDataSource<DialogDataEvent>(this.elements);
  selectAll = false;

  pageSize: number = 10;
  private paginator: MatPaginator;
  private sort: MatSort;
  lang: string;

  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  constructor(private translate: TranslateService,
    public dialogRef: MatDialogRef<ModalDeleteEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogViewModel) {
    this.translate.setDefaultLang('fr');
    dialogRef.disableClose = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elements = this.data.events;
    this.dataSource = new MatTableDataSource(this.elements);
    this.setDataSourceAttributes();
  }

  ngOnInit() {
    this.elements = this.data.events;
    this.dataSource = new MatTableDataSource(this.elements);
    this.setDataSourceAttributes();
  }

  editer(id) {
   
  }

  getHeure(value) {
    let hh = value.substring(0, 2);
    let mm = value.substring(2, 2);
    let date = new Date();
    date.setHours(Number(hh));
    date.setMinutes(Number(mm));
    return moment(date).format('HH:mm');
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

  annuler() {
    this.dialogRef.close();
  }

  session(row) {
    if (!!row && row.includes('Sortie') && this.lang === "eng") {
      return row.replace('Sortie', 'Session');
    }
    return row;
  }

  selectAllEvent(event){
    this.data.events.forEach(e=>e.selection = !this.isSelected(e) && this.selectAll);
  }

  getDate(date){
    return moment(date).format('YYYY-MMMM-DD')
  }

  isSelected(row){
    return !this.isEventPlaceEmpty(row,this.data.eventsDuplicate) && this.data.action=='d';
  }

  isEventPlaceEmpty(data:DialogDataEvent,events:DialogDataEvent[]){
    let evt = events.filter(e=>e.heure_debut === data.heure_debut && !!e.numero_contrat);
    return !(!!evt && evt.length > 0);
  }
}
