import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { EvenementEleve, Evenement } from 'src/app/entite/evenement.entity';
import { Module } from 'src/app/entite/module.entity';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ModuleService } from 'src/app/service/module/module.service';
import { List } from 'linqts';
declare var $: any;

@Component({
  selector: 'app-reserve-admin',
  templateUrl: './reserve-admin.component.html',
  styleUrls: ['./reserve-admin.component.scss']
})
export class ReserveAdminComponent implements OnInit,AfterViewInit {

  @ViewChild('formulaire') formulaire: NgForm;

  cookieTimeout: any;

  languages: { value: string; label: string; }[];
  lang = 'fr';
  eventDriving = new EvenementEleve();
  events: EvenementEleve[] = [];
  listeModules: Module[] = [];
  times: { value: string; label: string; places: string; date: string }[];
  nTimes: any= ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
  timesUser: { value: string; label: string; places: string; date: string }[] = [];
  pos: number;

  startDate: any;
  rangeDateTimes : {date:any;times:any;}[]=[];
  eventsPlaces : List<Evenement> = new List<Evenement>([]);
  dateNow = moment();

  constructor(private router: Router, private serviceEleve: EleveService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,
    private cookieService: CookieService, private serviceModule: ModuleService) {
    this.translate.setDefaultLang('fr');
    this.cookieTimeout = this.cookieService.get('subscribe-student');
  }
  ngAfterViewInit(): void {
  
  }

  ngOnInit() {
    this.obtenirModules();
    this.languages = [
      { value: 'fr', label: 'FR' },
      { value: 'eng', label: 'ENG' }
    ];
    this.times = [{ value: '08:00', label: '08:00', places: '', date: null },{ value: '09:00', label: '09:00', places: '', date: null }, { value: '10:00', label: '10:00', places: '', date: null }, { value: '11:00', label: '11:00', places: '', date: null }, { value: '12:00', label: '12:00', places: '', date: null },
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
    console.log(this.eventsPlaces);
    if (!this.cookieTimeout) {
      this.formaterDate();
      console.log(this.eventsPlaces);
      this.serviceEleve.creerEvenements(this.eventsPlaces.ToArray()).subscribe((evt) => {

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
  changeGroup(value, ele) {
    if(value.value && value.value.length > 0){
      const val = value.value[0];
      const pos = this.nTimes.indexOf(val.value);
      const heure_fin = this.nTimes[pos + 1];
      this.eventsPlaces.Add(<Evenement>{places:Number(val.places),date:val.date,heure_debut:val.value,heure_fin:heure_fin});
    }else if(value.value){
      this.eventsPlaces =  this.eventsPlaces.Where(x=> !this.validEvent(x,ele));
      
    }else{
      this.eventsPlaces.First(x=>x.date===ele.date && x.heure_debut === ele.value).places = ele.places;
    }
  }
validEvent(x,ele):boolean{
  var r =  x.date === ele.date && x.heure_debut === ele.value;
  return r;
}
  weekendsDatesFilter = (d: any | null): boolean => {
    //console.log(d);
    const date = !!d ? d : moment();
    const day = date.day();
    // Prevent Saturday and Sunday from being selected.
    //return day !== 0 && day !== 6;
    return date.format('YYYY-MM-DD') != '2021-01-18';
  }
  onTimeChange(time) {
    this.pos = this.times.map(e => e.value).indexOf(time.target.value);
    this.eventDriving.heure_fin = this.times[this.pos + 1].value;
  }
  isDisabled(value) {
    return value === this.pos;
  }
  addEvent(date, n) {
    console.log(date.value);
    console.log(n);
    if (n == 1) {
      this.eventsPlaces = new List<Evenement>([]);
      this.rangeDateTimes = [];
      this.startDate = date.value;
    } else if (n == 2) {
      const dateFormat = date.value;
      //Logic for getting rest of the dates between two dates("FromDate" to "EndDate")
      var start = this.startDate;
      while (start <= dateFormat) {
        const date = start.format('YYYY-MM-DD');
        this.times.forEach(t => { t.date = date; t.places = '1'; });
        this.timesUser = JSON.parse(JSON.stringify(this.times));
        this.rangeDateTimes.push({date:date,times:this.timesUser});
        this.timesUser.forEach(x=>{
          const val = x;
          const pos = this.nTimes.indexOf(val.value);
          const heure_fin = this.nTimes[pos + 1];
          if(!!heure_fin){
            this.eventsPlaces.Add(<Evenement>{places:Number(val.places),date:val.date,heure_debut:val.value,heure_fin:heure_fin});
          }
        });
        
        var newDate = start.add('days',1);
        start = newDate;
      }
      console.log(this.eventsPlaces);
    }

  }


}
