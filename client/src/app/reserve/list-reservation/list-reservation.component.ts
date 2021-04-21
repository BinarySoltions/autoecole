import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EvenementEleve } from 'src/app/entite/evenement.entity';
import moment from 'moment';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit, OnChanges {

  @Input('evenementEleve') elements: EvenementEleve[] = [];
  @ViewChild('row') row: ElementRef;

  headElements = ['nom_module', 'date', 'heure_debut', 'heure_fin', 'id'];
  dataSource = new MatTableDataSource<EvenementEleve>(this.elements);


  pageSize: number = 5;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  constructor(
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.elements);
    this.setDataSourceAttributes();
  }

  ngOnInit() {
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

  isHistoric(value) {
    var now = moment(new Date()); //todays date
    var end = moment(value); // another date
    var days = now.diff(end,'days');
    return Number(days) < 0;
  }
}
