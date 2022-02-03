import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MonitorService } from 'src/app/service/monitor.service';
import { Monitor } from '../monitor.component';

@Component({
  selector: 'app-table-monitor',
  templateUrl: './table-monitor.component.html',
  styleUrls: ['./table-monitor.component.scss']
})
export class TableMonitorComponent implements OnInit,OnChanges {
  @Input('moniteurs') elements: Monitor[] = [];
  @ViewChild('row') row: ElementRef;
  @Input('lang') lang = 'fr';

  headElements = ['nom', 'id'];
  dataSource = new MatTableDataSource<Monitor>(this.elements);


  pageSize: number = 5;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.init();
  }

  init() {
    this.dataSource = new MatTableDataSource(this.elements);
    this.translate.setDefaultLang(this.lang);
    this.setDataSourceAttributes();
  }

  ngOnInit() {
    this.init();
  }

  constructor( private cdRef: ChangeDetectorRef,private router: Router,private monitorService: MonitorService,
    private activatedRoute: ActivatedRoute,private cookieService: CookieService,
    private toastr: ToastrService,
    private translate: TranslateService,private spinner:NgxSpinnerService,) {
    this.translate.setDefaultLang('fr');
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

  editer(id){
    this.monitorService.supprimerMoniteur(id).subscribe(res => {
      if(res){
        this.elements = res;
        this.init();
      }else if(res.length == 0){
        this.elements = [];
      }
    })
  }
}
