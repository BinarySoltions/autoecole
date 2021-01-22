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
import { Evenement } from '../entite/evenement.entity';



@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  @ViewChild('formulaire') formulaire:NgForm;

  cookieTimeout:any;

  languages: { value: string; label: string; }[];
  lang = 'fr';
  eventDriving = new Evenement();
  events : Evenement[] = [];
  listeModules:Module[] = [];
  times: {value: string; label: string; places:string;date:string}[];
  nTimes: number[];
  timesUser:{ value: string; label: string; places:string;date:string}[]=[];
  pos: number;
  
  constructor(private router:Router, private serviceEleve:EleveService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private translate:TranslateService,
        private cookieService:CookieService,private serviceModule:ModuleService) {
         this.translate.setDefaultLang('fr');
          this.cookieTimeout = this.cookieService.get('subscribe-student');
         }

  ngOnInit() {
    this.obtenirModules();
    this.languages = [
      { value: 'fr', label: 'FR' },
      { value: 'eng', label: 'ENG' }
      ];
    this.times = [{value:'09:00',label:'09:00',places:'',date:null},{value:'10:00',label:'10:00',places:'',date:null},{value:'11:00',label:'11:00',places:'',date:null},{value:'12:00',label:'12:00',places:'',date:null},
    {value:'13:00',label:'13:00',places:'',date:null},{value:'14:00',label:'14:00',places:'',date:null},{value:'15:00',label:'15:00',places:'',date:null},{value:'16:00',label:'16:00',places:'',date:null},
    {value:'17:00',label:'17:00',places:'',date:null},{value:'18:00',label:'18:00',places:'',date:null},{value:'19:00',label:'19:00',places:'',date:null},{value:'20:00',label:'20:00',places:'',date:null}]
    this.eventDriving.heure_debut = this.formatAMPM(new Date());
    this.eventDriving.heure_fin = this.eventDriving.heure_debut;
    this.nTimes = [];
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
    if(!this.cookieTimeout){
    this.formaterDate();
    this.eventDriving.numero = "2020-2299";
    this.eventDriving.eleve_id = 23;
    this.eventDriving.place = 1;
    this.eventDriving.nom_module = this.listeModules.find(m=>m.id==this.eventDriving.module_id).nom;
    this.serviceEleve.creerEvenementEleve(this.eventDriving).subscribe((evt)=>{
      
      this.toastr.success("Merci / Thank's!", "Succes / Success", {timeOut: 5000});
      // this.cookieTimeout = 'uurureurueureuredj';
      // this.cookieService.set('event_student', this.cookieTimeout,1000);
    });
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
  }

  weekendsDatesFilter  = (d: any | null): boolean => {
    //console.log(d);
    const date = !!d ?d:moment();
    const day = date.day();
    // Prevent Saturday and Sunday from being selected.
    //return day !== 0 && day !== 6;
    return date.format('YYYY-MM-DD') != '2021-01-18';
  }
  onTimeChange(time){
    this.pos = this.times.map(e=>e.value).indexOf(time.target.value);
    this.eventDriving.heure_fin = this.times[this.pos+1].value;
  }
  isDisabled(value){
    return value===this.pos;
  }
  addEvent(date){
    const dateFormat = date.value.format('YYYY-MM-DD');
    this.times.forEach(t=>{t.date = dateFormat;t.places='2';});
    this.timesUser = JSON.parse(JSON.stringify(this.times));
  }


}
