import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MonitorService } from '../service/monitor.service';

export class Monitor{
  id:number;
  prenom:string;
  nom:string;
  numero:string;
  status:number;
}
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  data = new Monitor();
  monitors = [];

  constructor(private router: Router,private monitorService: MonitorService,
    private activatedRoute: ActivatedRoute,private cookieService: CookieService,
    private toastr: ToastrService,
    private translate: TranslateService,private spinner:NgxSpinnerService,) {
    this.translate.setDefaultLang('fr');}

  ngOnInit() {
    this.monitorService.obtenirMoniteur().subscribe(res =>{
      if(res){
        this.monitors = res;
      }
    })
  }

  ajouter(){
    this.monitorService.enregistrerMoniteur(this.data).subscribe(res => {
      if(res){
        this.monitors = res;
      }
    })
  }
}
