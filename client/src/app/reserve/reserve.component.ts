import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { EleveService } from '../service/eleve/eleve.service';
import moment from 'moment';
import { ModuleService } from '../service/module/module.service';
import { Module } from 'src/app/entite/module.entity';

export class EventDriving{
  date:any;
  startTime:any;
  endTime:any;
  noDriving:any;
}

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  @ViewChild('formulaire') formulaire:NgForm;

  cookiePremiereInscription:any;

  languages: { value: string; label: string; }[];
  lang = 'fr';
  eventDriving = new EventDriving();
  listeModules:Module[] = [];
  times: { element:{ value: string; label: string; places:string;};selected:{ value: string; label: string; places:string;}}[];
  nTimes: number[];
  timesUser:{ value: string; label: string; places:string;}[];
  
  constructor(private router:Router, private serviceEleve:EleveService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private translate:TranslateService,
        private cookieService:CookieService,private serviceModule:ModuleService) {
         this.translate.setDefaultLang('fr');
          this.cookiePremiereInscription = this.cookieService.get('subscribe-student');
         }

  ngOnInit() {
    this.obtenirModules();
    this.languages = [
      { value: 'fr', label: 'FR' },
      { value: 'eng', label: 'ENG' }
      ];
    this.times = [{element:{value:'09:00',label:'09:00',places:''},selected:null},{element:{value:'10:00',label:'10:00',places:''},selected:null},{element:{value:'11:00',label:'11:00',places:''},selected:null},{element:{value:'12:00',label:'12:00',places:''},selected:null},
    {element:{value:'13:00',label:'13:00',places:''},selected:null},{element:{value:'14:00',label:'14:00',places:''},selected:null},{element:{value:'15:00',label:'15:00',places:''},selected:null},{element:{value:'16:00',label:'16:00',places:''},selected:null},
    {element:{value:'17:00',label:'17:00',places:''},selected:null},{element:{value:'18:00',label:'18:00',places:''},selected:null},{element:{value:'19:00',label:'19:00',places:''},selected:null},{element:{value:'20:00',label:'20:00',places:''},selected:null}]
    this.eventDriving.startTime = this.formatAMPM(new Date());
    this.eventDriving.endTime = this.eventDriving.startTime;
    this.nTimes = [1,2];
  }
  obtenirModules(){
    this.serviceModule.obtnenirSorties().subscribe(m=>{
      this.listeModules = m;
    });
  }
  initialiserDate(){
    this.eventDriving.date = !this.eventDriving.date?null:this.obtenirDate(this.eventDriving.date);
  }
  obtenirDate(value:any):any{
    return moment(value).format();
  }
  public enregistrer(){
    console.log(this.times);
    if(!this.cookiePremiereInscription){
    this.formaterDate();
    // this.serviceEleve.inscrireEleve(this.eleveModele).subscribe((eleve)=>{
    //   this.eleveModele.id = eleve.id;
    //   this.toastr.success("Merci / Thank's!", "Succes / Success", {timeOut: 5000});
    //   this.cookiePremiereInscription = 'uurureurueureuredj';
    //   this.cookieService.set('subscribe-student', this.cookiePremiereInscription);
    // });
  } else {
    this.toastr.error("Erreur / Error !", "Erreur / Error !", {timeOut: 5000});
  }
  }
  formaterDate(){
    this.eventDriving.date = !this.eventDriving.date?null:moment(this.eventDriving.date).format('YYYY-MM-DD');
  }
  public fermer(){
    this.router.navigate(['/']);
  }
  setLanguage(){
    this.translate.setDefaultLang(this.lang);
  }

  public formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
 
    hours = hours < 10 ? '0'+hours : hours; // the hour '0' should be '12'
    var strTime = hours + ':' + '00';
    return strTime;
  }
  changeGroup(value,ele){
    console.log(value);
    console.log(ele);
  }
}
