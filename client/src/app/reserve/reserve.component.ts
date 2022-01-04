import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { EleveService } from '../service/eleve/eleve.service';
import moment from 'moment';
import { ModuleService } from '../service/module/module.service';
import { Module } from 'src/app/entite/module.entity';
import { EvenementEleve, Evenement } from '../entite/evenement.entity';
import { ModalAccessComponent } from '../modal-access/modal-access.component';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/services/authentication.service';
import { User } from '../auth/user.model';
import { PhaseService } from '../service/phase.service';
import { Phase } from '../entite/phase.entity';



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
  listePTModules: Module[] = [];
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
  nom: any;
  sub: any;
  cookieTimeoutAutre: string;
  phases: Phase[]=[];
  delay: number;
  idPhase: number;



  constructor(private router: Router, private serviceEleve: EleveService,
    private toastr: ToastrService, private servicePhase:PhaseService,
    private translate: TranslateService,private spinner:NgxSpinnerService,
    private cookieService: CookieService, private serviceModule: ModuleService,
    public dialog: MatDialog, private route:ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document) {
    this.translate.setDefaultLang('fr');
    this.checklogin();
    this.first = true;
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params=>{
      this.idEleve = +params['id'];
      this.numero = params['numero'];
      this.nom = params['nom'];
      this.lang = params['lang'];
      this.init();
    })
   
  }

  init() {
    this.eventDriving = new EvenementEleve();
  
      this.isVisible = true;
      this.obtenirModules(this.idEleve);
      //this.obtenirEvenementsEleve();
      this.languages = [
        { value: 'fr', label: 'FR' },
        { value: 'eng', label: 'ENG' }
      ];
      this.times = [{ value: '08:00', label: '08:00', places: '', date: null },{ value: '09:00', label: '09:00', places: '', date: null }, { value: '10:00', label: '10:00', places: '', date: null }, { value: '11:00', label: '11:00', places: '', date: null }, { value: '12:00', label: '12:00', places: '', date: null },
      { value: '13:00', label: '13:00', places: '', date: null }, { value: '14:00', label: '14:00', places: '', date: null }, { value: '15:00', label: '15:00', places: '', date: null }, { value: '16:00', label: '16:00', places: '', date: null },
      { value: '17:00', label: '17:00', places: '', date: null }, { value: '18:00', label: '18:00', places: '', date: null }, { value: '19:00', label: '19:00', places: '', date: null }, { value: '20:00', label: '20:00', places: '', date: null }]
      this.eventDriving.heure_debut = this.formatAMPM(new Date());
      this.eventDriving.heure_fin = this.eventDriving.heure_debut;

      this.servicePhase.obtenirPhases().subscribe(p=>{
        this.phases = p;
      })
    
  }
  obtenirModules(id) {
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceModule.obtnenirSortiesEleve(id).subscribe(m => {
      this.listePTModules = m;
      this.listeModules = m.filter(s=>s.type === 'P');
      this.spinner.hide();
      this.obtenirEvenementsEleve();
    });
  }
  obtenirEvenementsEleve() {
    let req = { numero: this.numero };
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.obtenirEvenementsEleve(req).subscribe(evt => {
      if (evt) {
        this.events = evt;
        this.updateEventCompleted();
      }
     this.spinner.hide();
    });
  }

  updateEventCompleted(){
    if(this.events && this.events.length > 0){
    this.events.forEach(e=>{
      e.complete = false;
      if(this.listeModules.find(m=>m.id == e.module_id && !!m.date_complete)){
        e.complete = true;
      }
    });
  }
  }

  initialiserDate() {
    this.eventDriving.date = !this.eventDriving.date ? null : this.obtenirDate(this.eventDriving.date);
  }
  obtenirDate(value: any): any {
    return moment(value).format();
  }
  public enregistrer() {
    this.formaterDate();
    if(!this.eventDriving.date){
      this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
      return;
    }
      this.eventDriving.numero = this.numero;//"2020-2299";
      this.eventDriving.eleve_id = this.idEleve;
      this.eventDriving.place = 1;
      this.eventDriving.nom_module = this.listeModules.find(m => m.id == this.eventDriving.module_id).nom;
      this.delay = 0;
      if(!this.validPhase()){
        if(this.delay){
          this.toastr.error("La phase "+this.idPhase+" dure "+this.delay+" jours! Merci de revenir  / Phase "+this.idPhase+" takes "+this.delay+" days! Please come next day!", "Erreur / Error !", { timeOut: 5000 });
        }else{
          this.toastr.error("Merci de compléter la phase précédente / Please complete your previous phase !", "Erreur / Error !", { timeOut: 5000 });
        }
       
        return;
      }
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
       // let dates = this.events.map(d => moment(d.date+' '+d.heure_debut));
       // let maxDate = moment.max(dates) 
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
          this.toastr.error("Vous devez communiquer avec l'école de conduite / You must contact the driving school!", "Erreur / Error !", { timeOut: 5000 });
        }
        this.spinner.hide();
        // this.cookieTimeout = 'uurureurueureuredj';
        // this.cookieService.set('event_student', this.cookieTimeout,1000);
      });
  }
  formaterDate() {
    this.eventDriving.date = !this.eventDriving.date ? null : moment(this.eventDriving.date).format('YYYY-MM-DD');
  }
  public fermer() {
    this.router.navigate(['/']);
  }
  setLanguage() {
    console.log('lang');
    console.log(this.lang);
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
  onTimeChange(time) {
    this.pos = this.times.map(e => e.value).indexOf(time.target.value);
    this.eventDriving.heure_fin = this.timesEnd[this.pos].value;
  }
  onModulesChange(event) {
    this.eventDriving.date = null;
    let module = this.listeModules.find(m => m.id == event.target.value);
    const dateStart = moment().format('YYYY-MM-DD');
    var dateEnd = null;
    if (module.phase_id == 2) {
      dateEnd = moment().add(56, 'days').format('YYYY-MM-DD');
    } else {
      dateEnd = moment().add(100, 'days').format('YYYY-MM-DD');
    }
    let req = { dateStart: dateStart, dateEnd: dateEnd };
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.obtenirEvenementDatesHeures(req).subscribe(r => {
      if (r) {
        this.times = [];
        this.timesEnd = [];
        this.eventsDateHeures = <Evenement[]>r;
      }
      this.spinner.hide();
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

  openDialog(): void {
    if (!this.cookieTimeout) {
        this.router.navigate['/public/reservation'];
    }
  }

  getInfoEleve(result, dialogRef) {
    this.isVisible = false;
    this.lang = result.langue;
    let password = result.password;
    let req = { numero: result.numeroIdentification, nom: result.nom, password: password};
    this.numero = req.numero;
    this.nom = req.nom;
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.getEleveLogin(req).subscribe(res => {
      if (res && res.isValid) {
        this.isVisible = true;
        this.idEleve = res.id;
        let req = { langue: this.lang, id: res.id, numero: this.numero,nom:this.nom };
        this.cookieService.set('login-student', JSON.stringify(req), 0.02);
        let user = new User;
        user.id = res.id;
        user.access_token = res.token;
       // this.authenticationService.loginPublic(user);
        dialogRef.close();
        this._document.defaultView.location.reload();
      } else {

      }
      this.spinner.hide();
    });
    setTimeout(()=> this.spinner.hide(),30000);
  }
  checklogin() {
    this.cookieTimeout = this.cookieService.get('_login_public');
    this.openDialog();
    const src = timer(0, 60000);
    src.subscribe(v => {
      this.cookieTimeout = this.cookieService.get('_login_public');
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
    let req = { id: id,nom:this.nom,numero:this.numero,
      date:evt.date,heure_debut:evt.heure_debut,heure_fin:evt.heure_fin};
      this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.deleteEvent(req).subscribe(res => {
      dialogRef.close();
      this.spinner.hide();
      if (res.valid) {
        this.toastr.success("Succés / Success !", "Succés / Success !", { timeOut: 5000 });
        this.init();
        this.obtenirEvenementsEleve();
      }else{
        this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
      }
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
    let tempEvents = this.listeModules.filter(m=> this.events.find(e=>e.module_id == m.id) != null);
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
      let evt1 = this.events.find(e=> e.nom_module == 'Sortie 3');
      if(!!evt1){ 
        return moment(evt1.date).startOf('day').diff(moment(this.eventDriving.date).startOf('day'),'days') == 0;
      } 
    } else if(this.eventDriving.nom_module.includes('Sortie 1')){
      let evt = this.events.find(e=> e.nom_module == 'Sortie 2');
      if(!!evt){
        return moment(evt.date).startOf('day').diff(moment(this.eventDriving.date).startOf('day'),'days') == 0;
      } 
    }else if(this.eventDriving.nom_module.includes('Sortie 3')){
      let evt = this.events.find(e=> e.nom_module == 'Sortie 2');
      if(!!evt){
        return moment(evt.date).startOf('day').diff(moment(this.eventDriving.date).startOf('day'),'days') == 0;
      } 
    }
    return false;
  }

  validPhase(){
    let idPhaseCurrent = this.listeModules.find(m => m.id == this.eventDriving.module_id).phase_id;
    this.idPhase = idPhaseCurrent - 1;
    let modules = this.listePTModules.filter(m=> m.phase_id == this.idPhase && m.date_complete == null && m.sans_objet == null);
 
    if(!!modules && modules.length > 0){
      return false;
    }

    this.delay = this.phases.find(p=>p.id==idPhaseCurrent).duree;
    this.idPhase = idPhaseCurrent;
    let firstModulePhase = this.listePTModules.filter(m=> m.phase_id == idPhaseCurrent && m.date_complete != null).sort((a,b)=>Number(a.numero) < Number(b.numero)?-1:1)[0];
    let lastModulePhase = this.listePTModules.filter(m=> m.phase_id == idPhaseCurrent).sort((a,b)=>Number(a.numero) < Number(b.numero)?1:-1)[0];
    if(lastModulePhase.id == this.eventDriving.module_id){
     
      return moment(this.eventDriving.date).startOf('day').diff(moment(firstModulePhase.date_complete).startOf('day'),'days') >= this.delay;
    }
    return true;
  }

  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.keyApp).toString();
    } catch (e) {
      console.log(e);
    }
  }
  encryptDataString(data:string) {

    try {
      return CryptoJS.AES.encrypt(data, environment.keyApp).toString();
    } catch (e) {
      console.log(e);
    }
  }

  absenterEvent(id){

  }

  reoder(){

  }

  toggleCondition(event){
    this.eventDriving.condition = event.checked;
  }
}
