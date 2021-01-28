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
import { EvenementEleve,Evenement } from '../entite/evenement.entity';



@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  @ViewChild('formulaire') formulaire: NgForm;

  cookieTimeout: any;

  languages: { value: string; label: string; }[];
  lang = 'fr';
  eventDriving = new EvenementEleve();
  events: EvenementEleve[] = [];
  listeModules: Module[] = [];
  times: { value: string; label: string; places: string; date: string }[];
  timesEnd:{ value: string; label: string; places: string; date: string }[] = [];
  nTimes: any= ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
  timesUser: { value: string; label: string; places: string; date: string }[] = [];
  pos: number;
  eventsDateHeures:Evenement[]=[];


 


  constructor(private router: Router, private serviceEleve: EleveService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,
    private cookieService: CookieService, private serviceModule: ModuleService) {
    this.translate.setDefaultLang('fr');
    this.cookieTimeout = this.cookieService.get('subscribe-student');
  }

  ngOnInit() {
    this.obtenirModules();
    this.languages = [
      { value: 'fr', label: 'FR' },
      { value: 'eng', label: 'ENG' }
    ];
    this.times = [{ value: '09:00', label: '09:00', places: '', date: null }, { value: '10:00', label: '10:00', places: '', date: null }, { value: '11:00', label: '11:00', places: '', date: null }, { value: '12:00', label: '12:00', places: '', date: null },
    { value: '13:00', label: '13:00', places: '', date: null }, { value: '14:00', label: '14:00', places: '', date: null }, { value: '15:00', label: '15:00', places: '', date: null }, { value: '16:00', label: '16:00', places: '', date: null },
    { value: '17:00', label: '17:00', places: '', date: null }, { value: '18:00', label: '18:00', places: '', date: null }, { value: '19:00', label: '19:00', places: '', date: null }, { value: '20:00', label: '20:00', places: '', date: null }]
    this.eventDriving.heure_debut = this.formatAMPM(new Date());
    this.eventDriving.heure_fin = this.eventDriving.heure_debut;
  }
  obtenirModules() {
    this.serviceModule.obtnenirSorties().subscribe(m => {
      this.listeModules = m;
    });
  }
  initialiserDate() {
    this.eventDriving.date = !this.eventDriving.date ? null : this.obtenirDate(this.eventDriving.date);
  }
  obtenirDate(value: any): any {
    return moment(value).format();
  }
  public enregistrer() {
    console.log(this.times);
    if (!this.cookieTimeout) {
      this.formaterDate();
      this.eventDriving.numero = "2020-2299";
      this.eventDriving.eleve_id = 23;
      this.eventDriving.place = 1;
      this.eventDriving.nom_module = this.listeModules.find(m => m.id == this.eventDriving.module_id).nom;
      this.serviceEleve.creerEvenementEleve(this.eventDriving).subscribe((evt) => {

        this.toastr.success("Merci / Thank's!", "Succes / Success", { timeOut: 5000 });
        // this.cookieTimeout = 'uurureurueureuredj';
        // this.cookieService.set('event_student', this.cookieTimeout,1000);
      });
    } else {
      this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
    }
  }
  formaterDate() {
    this.eventDriving.date = !this.eventDriving.date ? null : moment(this.eventDriving.date).format('YYYY-MM-DD');
  }
  public fermer() {
    this.router.navigate(['/']);
  }
  setLanguage() {
    this.translate.setDefaultLang(this.lang);
  }

  public formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours; // the hour '0' should be '12'
    var strTime = hours + ':' + '00';
    return strTime;
  }

  weekendsDatesFilter = (d: any | null): boolean => {
    //console.log(d);
    const date = !!d ? d : moment();
    const dateHeures = this.eventsDateHeures
    .filter(x=>x.date === date.format('YYYY-MM-DD') && x.place === null);
    // Prevent Saturday and Sunday from being selected.
    //return day !== 0 && day !== 6;
    const dates = dateHeures.map(e=>e.date);
    return dates.indexOf(date.format('YYYY-MM-DD')) != -1;
  }
  onTimeChange(time) {
    this.pos = this.times.map(e => e.value).indexOf(time.target.value);
    this.eventDriving.heure_fin = this.timesEnd[this.pos].value;
  }
  onModulesChange(event){
    this.eventDriving.date = null;
    let module = this.listeModules.find(m => m.id == event.target.value);
    const dateStart = moment().format('YYYY-MM-DD');
    var dateEnd = null;
    if(module.phase_id == 2){
      dateEnd = moment().add('days',28).format('YYYY-MM-DD');
    }else {
      dateEnd = moment().add('days',56).format('YYYY-MM-DD');
    }
    let req = {dateStart:dateStart,dateEnd:dateEnd};
    this.serviceEleve.obtenirEvenementDatesHeures(req).subscribe(r=>{
      if(r){
        this.times = [];
        this.timesEnd = [];
        this.eventsDateHeures =  <Evenement[]>r;
      }
    });
  }

  onDateChange(event){
    this.eventDriving.heure_debut = null;
    this.eventDriving.heure_fin= null;
    this.times = [];
    this.timesEnd = [];
    const date = event.target.value.format('YYYY-MM-DD');
    const dateHeures = this.eventsDateHeures
    .filter(x=>x.date === date && x.place === null).sort((a,b)=>a > b ? 1 : -1);
    console.log(event.target.value);
    dateHeures.forEach(x => {
      if(x.place === null){
        var h = x.heure_debut.substring(0,5);
        var hf = x.heure_fin.substring(0,5);
        this.times.push({value:h,label:h,date:x.date,places:x.places.toString()});
        this.timesEnd.push({value:hf,label:hf,date:x.date,places:x.places.toString()});
      }
    });
  }
}
