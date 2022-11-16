import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Evenement, EvenementEleve } from 'src/app/entite/evenement.entity';
import { Module } from 'src/app/entite/module.entity';
import { ModalAccessComponent } from 'src/app/modal-access/modal-access.component';
import { ModalConfirmComponent } from 'src/app/modal-confirm/modal-confirm.component';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ModuleService } from 'src/app/service/module/module.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-driving',
  templateUrl: './add-driving.component.html',
  styleUrls: ['./add-driving.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddDrivingComponent implements OnInit {
  eleveModele:Eleve;

  @ViewChild('formulaire') formulaire: NgForm;

  cookieTimeout: any;

  languages: { value: string; label: string; }[];
  lang = 'fr';
  eventDriving = new EvenementEleve();
  events: EvenementEleve[] = [];
  listeModules: Module[] = [];
  times: { value: string; label: string; places: string; date: string }[];
  timesEnd: { value: string; label: string; places: string; date: string }[] = [];
  nTimes: any = ['08:00','09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  timesUser: { value: string; label: string; places: string; date: string }[] = [];
  pos: number;
  eventsDateHeures: Evenement[] = [];
  idEleve: number;
  numero: string;
  first: boolean;
  isVisible: boolean;
  dateProduction:any = moment();
  
  constructor(private router: Router, private serviceEleve: EleveService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,private spinner:NgxSpinnerService,
    private translate: TranslateService,
    private cookieService: CookieService, private serviceModule: ModuleService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document) {
    this.translate.setDefaultLang('fr');
    //this.checklogin();
    this.first = true;
  }

  ngOnInit() {
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenirEleveById(this.idEleve);
  }

  public obtenirEleveById(id:number){
    if(id){
      this.spinner.show(undefined, { fullScreen: true });
      this.serviceEleve.obtenirEleveById(id).subscribe(eleve=>{
        this.eleveModele = eleve;
        let req = { langue: "fr", id: this.idEleve, numero: this.eleveModele.numero_contrat };
       // this.cookieService.set('login-student-admin', JSON.stringify(req));
        this.cookieTimeout = JSON.stringify(req);//this.cookieService.get('login-student-admin');
        this.spinner.hide();
        this.init();
      });
    }
  }

  init() {
    this.eventDriving = new EvenementEleve();
    if (this.cookieTimeout) {
      this.isVisible = true;
      let cookEle = JSON.parse(this.cookieTimeout);
      this.lang = cookEle.langue;
      this.idEleve = cookEle.id;
      this.numero = cookEle.numero;
      this.obtenirModules(this.idEleve);
      //this.obtenirEvenementsEleve();
      this.languages = [
        { value: 'fr', label: 'FR' },
        { value: 'eng', label: 'ENG' }
      ];
      this.times = [{ value: '08:00', label: '08:00', places: '', date: null }, { value: '09:00', label: '09:00', places: '', date: null }, { value: '10:00', label: '10:00', places: '', date: null }, { value: '11:00', label: '11:00', places: '', date: null }, { value: '12:00', label: '12:00', places: '', date: null },
      { value: '13:00', label: '13:00', places: '', date: null }, { value: '14:00', label: '14:00', places: '', date: null }, { value: '15:00', label: '15:00', places: '', date: null }, { value: '16:00', label: '16:00', places: '', date: null },
      { value: '17:00', label: '17:00', places: '', date: null }, { value: '18:00', label: '18:00', places: '', date: null }, { value: '19:00', label: '19:00', places: '', date: null }, { value: '20:00', label: '20:00', places: '', date: null }]
      this.eventDriving.heure_debut = this.formatAMPM(new Date());
      this.eventDriving.heure_fin = this.eventDriving.heure_debut;
    }
  }
  obtenirModules(id) {
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceModule.obtnenirSortiesEleve(id).subscribe(m => {
      this.listeModules = m.filter(s=>s.type === 'P');;
      this.spinner.hide();
      this.obtenirEvenementsEleve();
    });
  }
  obtenirEvenementsEleve() {
    this.spinner.show(undefined, { fullScreen: true });
    let req = { numero: this.numero };
    this.serviceEleve.obtenirEvenementsEleve(req).subscribe(evt => {
      if (evt) {
        this.events = evt;
        this.updateEventCompleted();
      }
      this.spinner.hide();
    });
  }
  initialiserDate() {
    this.eventDriving.date = !this.eventDriving.date ? null : this.obtenirDate(this.eventDriving.date);
  }
  obtenirDate(value: any): any {
    return moment(value).format();
  }
  public enregistrer() {
    if (this.cookieTimeout) {
      this.formaterDate();
      this.eventDriving.numero = this.numero;//"2020-2299";
      this.eventDriving.eleve_id = this.idEleve;
      this.eventDriving.place = 1;
      this.eventDriving.nom_module = this.listeModules.find(m => m.id == this.eventDriving.module_id).nom;
      if(this.validSessionOneTwo()){
        this.toastr.error("La date Sortie 1 doit être différente de Sortie 2 / Date of Session 1 must not be same of Session 2 !", "Erreur / Error !", { timeOut: 5000 });
        return;
      }
      if(this.validSaving()){
        this.toastr.error("Nombre maximum de places est limité à trois / Maximum number of places is limited to three !", "Erreur / Error !", { timeOut: 5000 });
        return;
      }
      if(this.validMaxPlaceDaySaving()){
        this.toastr.error("Nombre de places par jour est de 2 / Number of places by day is 2 !", "Erreur / Error !", { timeOut: 5000 });
        return;
      }
      if(this.validDateEventsInfNextEventDateSaving()){
        this.toastr.error("Merci de contacter Pconduite pour cette réservation  / Please contact Pconduite for this reservation !", "Erreur / Error !", { timeOut: 10000 });
        return;
      }
      this.spinner.show(undefined, { fullScreen: true });
      this.serviceEleve.creerEvenementEleve(this.eventDriving).subscribe((evt) => {
        if (evt && evt.isValid) {
          this.events = evt.data;
          this.updateEventCompleted();
          this.toastr.success("Merci / Thank's!", "Succes / Success", { timeOut: 5000 });
        } else {
          this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
        }
          this.spinner.hide();
        // this.cookieTimeout = 'uurureurueureuredj';
        // this.cookieService.set('event_student', this.cookieTimeout,1000);
      });
    } else {
      this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
    }
  }
  updateEventCompleted(){
    if(this.events && this.events.length > 0){
    this.events.forEach(e=>{
      e.complete = false;
      if(this.listeModules.find(m=>m.id == e.module_id && !!m.date_complete)){
        e.complete = e.status != 2 && true;
      }
    });
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
    const date = !!d ? d : moment();
    const dateHeures = this.eventsDateHeures
      .filter(x => x.date === date.format('YYYY-MM-DD') && x.place === null);
    // Prevent Saturday and Sunday from being selected.
    //return day !== 0 && day !== 6;
    const dates = dateHeures.map(e => e.date);
    return dates.indexOf(date.format('YYYY-MM-DD')) != -1;
  }
  dateClass: MatCalendarCellClassFunction<any> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      
      const date = !!cellDate ? cellDate : moment();
      const dateHeures = this.eventsDateHeures
      .filter(x => x.date === date.format('YYYY-MM-DD') && x.place === null);
    // Prevent Saturday and Sunday from being selected.
    //return day !== 0 && day !== 6;
    const dates = dateHeures.map(e => e.date);
    return dates.length > 0 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  onTimeChange(time) {
    this.pos = this.times.map(e => e.value).indexOf(time.target.value);
    this.eventDriving.heure_fin = this.timesEnd[this.pos].value;
  }
  onModulesChange(event) {
    this.eventDriving.date = null;
    let module = this.listeModules.find(m => m.id == event.target.value);
    const dateStart = moment(this.dateProduction).format('YYYY-MM-DD');
    var dateEnd = null;
    if (module.phase_id == 2) {
      dateEnd = moment(this.dateProduction).add(100, 'days').format('YYYY-MM-DD');
    } else {
      dateEnd = moment(this.dateProduction).add(100, 'days').format('YYYY-MM-DD');
    }
    let req = { dateStart: dateStart, dateEnd: dateEnd };
    this.serviceEleve.obtenirEvenementDatesHeures(req).subscribe(r => {
      if (r) {
        this.times = [];
        this.timesEnd = [];
        this.eventsDateHeures = <Evenement[]>r;
      }
    });
  }

  onDateChange(event) {
    this.eventDriving.heure_debut = null;
    this.eventDriving.heure_fin = null;
    this.times = [];
    this.timesEnd = [];
    const date = event.target.value.format('YYYY-MM-DD');
    const dateHeures = this.eventsDateHeures
      .filter(x => x.date === date && (x.place === null || x.place < x.places)).sort((a, b) => a > b ? 1 : -1);
    dateHeures.forEach(x => {
      let evt = this.events.find(e=>e.date===x.date && e.heure_debut === x.heure_debut && e.heure_fin === x.heure_fin);
      if (!evt) {
        var h = x.heure_debut.substring(0, 5);
        var hf = x.heure_fin.substring(0, 5);
        this.times.push({ value: h, label: h, date: x.date, places: x.places.toString() });
        this.timesEnd.push({ value: hf, label: hf, date: x.date, places: x.places.toString() });
      }
    });
    this.times = this.times.sort((a,b)=>Number(a.value.substring(0, 2)) > Number(b.value.substring(0, 2))?1:-1);
    this.timesEnd = this.timesEnd.sort((a,b)=>Number(a.value.substring(0, 2)) > Number(b.value.substring(0, 2))?1:-1);
  }
  onDateProductionChange(event){
   this.eventDriving.module_id = 0;
  }
  openDialog(): void {
    if (!this.cookieTimeout && false) {
      if (this.first) this.dialog.closeAll();
      const dialogRef = this.dialog.open(ModalAccessComponent, {
        data: { nom: null, numeroIdentification: null, langue: null }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (!!result) {
          this.getInfoEleve(result, dialogRef);
        }

        this.init();
      });
    }
  }

  getInfoEleve(result, dialogRef) {
    this.isVisible = false;
    this.lang = result.langue;
    let req = { numero: result.numeroIdentification, nom: result.nom };
    this.numero = req.numero;
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.getEleveLogin(req).subscribe(res => {
      if (res && res.valid) {
        this.isVisible = true;
        this.idEleve = res.id;
        let req = { langue: this.lang, id: res.id, numero: this.numero };
        //this.cookieService.set('login-student-admin', JSON.stringify(req), 0.02);
        dialogRef.close();
        this.spinner.hide();
        this._document.defaultView.location.reload();
      } else {

      }
      this.spinner.hide();
    })
  }
  checklogin() {
    this.cookieTimeout = this.cookieService.get('login-student-admin');
    this.openDialog();
    const src = timer(0, 60000);
    src.subscribe(v => {
      this.cookieTimeout = this.cookieService.get('login-student-admin');
      this.openDialog();
    })
  }
  session(row) {
    if (row.includes('Sortie') && this.lang === "eng") {
      return row.replace('Sortie', 'Session');
    }
    return row;
  }

  confirmDeleteEvent(event) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: { id: event, lang: this.lang }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.deleteEvent(result, dialogRef);
      }
    });
  }

  deleteEvent(id, dialogRef) {
    let evt = this.events.find(e=>e.id === id);
    let req = { id: id,
      date:evt.date,heure_debut:evt.heure_debut,heure_fin:evt.heure_fin};
      this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.deleteAdminEvent(req).subscribe(res => {
      dialogRef.close();
      if (res.valid) {
        this.toastr.success("Succés / Success !", "Succés / Success !", { timeOut: 5000 });
        this.obtenirEvenementsEleve();
      }else{
        this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
      }
      this.spinner.hide();
    })
  }

  validSaving(){
    var estTrue = false;
    let sessionsCar = this.listeModules.filter(m=>m.date_complete)
    .sort((a,b)=>moment(b.date_complete).startOf('day').diff(moment(a.date_complete).startOf('day'),'days'));
    if(sessionsCar && sessionsCar.length > 0){
      let lastSession = sessionsCar[0];
      let eventsValid = this.events.filter(e=> e.status != 2 && moment(e.date).startOf('day').diff(moment(lastSession.date_complete).startOf('day'),'days')>0);
      let eventsValidOther = this.events.filter(e=> e.status != 2 && moment(e.date).startOf('day').diff(moment(lastSession.date_complete).startOf('day'),'days')==0);
      var numberOffset = 0;
      if(eventsValidOther && eventsValidOther.length > 1){
        let eventsValidOtherA = this.listeModules.filter(e=>moment(e.date_complete).startOf('day').diff(moment(lastSession.date_complete).startOf('day'),'days')==0);
        numberOffset = eventsValidOther.length - ( !!eventsValidOtherA ?eventsValidOtherA.length : 0);
      }
      estTrue = (!!eventsValid?eventsValid.length:0) + numberOffset > 2;
    } 
    else if(this.events.length>0){
      let evts = this.events.filter(e=>e.status != 2);
      estTrue = !!evts && evts.length == 3;
    }
    return estTrue;
  }
  validMaxPlaceDaySaving(){
    let estTrue = false;
    let eventsValid = this.events.filter(e=>moment(e.date).startOf('day').diff(moment(this.eventDriving.date).startOf('day'),'days')==0);
    if(eventsValid && eventsValid.length > 1){
      estTrue = true;
    } 
    return estTrue;
  }
  validDateEventsInfNextEventDateSaving(){
    let estTrue = false;
    let numeroEventModule = this.listeModules.find(m => m.id == this.eventDriving.module_id).numero; 
    let tempEvents = this.listeModules.filter(m=> this.events.find(e=>e.module_id == m.id && e.status != 2) != null);
    let tempEventsSup = this.events.filter(e=> tempEvents.find(m=>m.id == e.module_id && 
      Number(m.numero) > numeroEventModule) != null );
   
    if(tempEventsSup && tempEventsSup.length>0){
      let eventsValid = tempEventsSup.filter(e=>moment(e.date+' '+e.heure_debut).startOf('hour').diff(moment(this.eventDriving.date+' '+this.eventDriving.heure_debut).startOf('hour'),'hours')<0);
      if(eventsValid && eventsValid.length > 0){
        estTrue = true;
      } 
    }
    let tempEventsInf = this.events.filter(e=> tempEvents.find(m=>m.id == e.module_id 
      && Number(m.numero) < numeroEventModule) != null );
    if(tempEventsInf && tempEventsInf.length>0){
      let eventsValidInf = tempEventsInf.filter(e=>moment(e.date+' '+e.heure_debut).startOf('hour').diff(moment(this.eventDriving.date+' '+this.eventDriving.heure_debut).startOf('hour'),'hours')>0);
      if(eventsValidInf && eventsValidInf.length > 0){
        estTrue = true;
      } 
    }
    return estTrue;
  }
  getSortie(val){
    let estTrue = true;
    var sessionsCarNext = null;
    var eventsId  = [];
    if(this.events && this.events.length > 0){
      eventsId = this.events.filter(e=>e.status != 2).map(e=>e.module_id);
    }
   
    if(eventsId && eventsId.length > 0){
      let eventSesion = null;
      
      eventSesion = this.listeModules.filter(m=> eventsId.find(e=>e == m.id) == null && m.date_complete == null && m.sans_objet == null).sort((a,b)=>Number(a.numero) > Number(b.numero)?1:-1)[0];
     
      if(eventSesion){
        sessionsCarNext = eventSesion;
      }else{
        sessionsCarNext = this.listeModules.filter(m=> m.date_complete == null && m.sans_objet== null)
      .sort((a,b)=>Number(a.numero) > Number(b.numero)?1:-1)[0];
      }
    } else{
      sessionsCarNext = this.listeModules.filter(m=> m.date_complete == null && m.sans_objet == null)
      .sort((a,b)=>Number(a.numero) > Number(b.numero)?1:-1)[0];
    }
    
    if(!!sessionsCarNext){
      estTrue = !(Number(val) == sessionsCarNext.numero)
     }
    return estTrue;
  }

  validSessionOneTwo(){
    if(this.eventDriving.nom_module.includes('Sortie 2')){
      let evt = this.events.find(e=> e.nom_module == 'Sortie 1');
      if(!!evt){
        return moment(evt.date).startOf('day').diff(moment(this.eventDriving.date).startOf('day'),'days') == 0;
      }
    } else if(this.eventDriving.nom_module.includes('Sortie 1')){
      let evt = this.events.find(e=> e.nom_module == 'Sortie 2');
      if(!!evt){
        return moment(evt.date).startOf('day').diff(moment(this.eventDriving.date).startOf('day'),'days') == 0;
      } 
    }
    return false;
  }

  reorder(evt){
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.reoderEvts({numero:this.numero}).subscribe(res=>{
      console.log(res);
      if (res) {
        this.events = res;
        this.updateEventCompleted();
      }
      this.spinner.hide();
    })
  }

  absenterEvent(id){
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.absenterEvts({id:id, numero:this.numero}).subscribe(res=>{
      console.log(res);
      if (res) {
        this.events = res;
        this.updateEventCompleted();
      }
      this.spinner.hide();
    })
  }
}
