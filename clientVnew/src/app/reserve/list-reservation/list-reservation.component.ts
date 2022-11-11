import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { EvenementEleve } from 'src/app/entite/evenement.entity';
import moment from 'moment';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit, OnChanges {
  @Input('delete') delete = false;
  @Input('evenementEleve') elements: EvenementEleve[] = [];
  @Output() deleteEvent = new EventEmitter<number>(null);
  @Output() reorderEvts = new EventEmitter(null);
  @Output() absenterEvent = new EventEmitter<number>(null);
  @ViewChild('row') row: ElementRef;
  @Input('lang') lang = 'fr';

  headElements = ['nom_module', 'id'];
  dataSource = new MatTableDataSource<EvenementEleve>(this.elements);


  pageSize: number = 5;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.elements);
    this.translate.setDefaultLang(this.lang);
    this.setDataSourceAttributes();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.elements);
    this.setDataSourceAttributes();
  }

  editer(id) {
    this.deleteEvent.emit(id);
  }
  reorder() {
    this.reorderEvts.emit();
  }
  absenter(id) {
    this.absenterEvent.emit(id);
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

  isHistoric(value) {
   
    if(this.delete){
      return true;
    }
    let now = moment().startOf('hour').add(2,'days').startOf('hour');
    var end = moment(value.date+' '+value.heure_debut).startOf('hour'); // another date
    var days = now.diff(end,'hours');
    
    return Number(days) < 0;
  }

  session(row) {
    if (row.includes('Sortie') && this.lang === "eng") {
      return row.replace('Sortie', 'Session');
    }
    return row;
  }

  compareDate(row){
    let now = moment().startOf('hour');
    var end = moment(row.date+' '+row.heure_debut).startOf('hour'); // another date
    var days = now.diff(end,'hours');
    return Number(days) > 0;
  }
  compareDateToday(row){
    let now = moment().startOf('hour');
    let tom = moment().add(1,'days').startOf('day');
    var end = moment(row.date+' '+row.heure_debut).startOf('hour'); // another date
    var days = now.diff(end,'hours');
    var dayAfter = tom.diff(end,'hours');
    return Number(days) <= 0 && Number(dayAfter) > 0;
  }

  compareDateAfterToday(row){
    let tom = moment().add(1,'days').startOf('day');
    var end = moment(row.date+' '+row.heure_debut).startOf('hour'); // another date
    var dayAfter = tom.diff(end,'hours');
    return  Number(dayAfter) <= 0;
  }
}
