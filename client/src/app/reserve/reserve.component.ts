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



  constructor(private router: Router, private serviceEleve: EleveService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,
    private cookieService: CookieService, private serviceModule: ModuleService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document) {
    this.translate.setDefaultLang('fr');
    this.checklogin();
    this.first = true;
  }

  ngOnInit() {

    this.cookieTimeout = this.cookieService.get('login-student');
    this.init();
  }

  init() {
    if (this.cookieTimeout) {
      this.isVisible = true;
      let cookEle = JSON.parse(this.cookieTimeout);
      this.lang = cookEle.langue;
      this.idEleve = cookEle.id;
      this.numero = cookEle.numero;
      this.nom = cookEle.nom;
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
    }
  }
  obtenirModules(id) {
    this.serviceModule.obtnenirSortiesEleve(id).subscribe(m => {
      this.listeModules = m;
      this.obtenirEvenementsEleve();
    });
  }
  obtenirEvenementsEleve() {
    let req = { numero: this.numero };
    this.serviceEleve.obtenirEvenementsEleve(req).subscribe(evt => {
      if (evt) {
        this.events = evt;
      }
      this.validSaving();
    });
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
    
    if (this.cookieTimeout) {
     
      this.eventDriving.numero = this.numero;//"2020-2299";
      this.eventDriving.eleve_id = this.idEleve;
      this.eventDriving.place = 1;
      this.eventDriving.nom_module = this.listeModules.find(m => m.id == this.eventDriving.module_id).nom;
      if(this.validSessionOneTwo()){
        this.toastr.error("La date Sortie 1 doit être différente de Sortie 2 / Date of Session 1 must not be same of Session 2 !", "Erreur / Error !", { timeOut: 5000 });
        return;
      }
      if(this.validSaving()){
        this.toastr.error("Nombre de places / Number of places !", "Erreur / Error !", { timeOut: 5000 });
        return;
      }
      this.serviceEleve.creerEvenementEleve(this.eventDriving).subscribe((evt) => {
        if (evt && evt.isValid) {
          this.events = evt.data;
          this.toastr.success("Merci / Thank's!", "Succes / Success", { timeOut: 5000 });
        } else {
          this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
        }

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
      dateEnd = moment().add(28, 'days').format('YYYY-MM-DD');
    } else {
      dateEnd = moment().add(56, 'days').format('YYYY-MM-DD');
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
      .filter(x => x.date === date && x.place === null).sort((a, b) => a > b ? 1 : -1);
    dateHeures.forEach(x => {
      if (x.place === null) {
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
    this.nom = req.nom;
    this.serviceEleve.getEleveLogin(req).subscribe(res => {
      if (res && res.valid) {
        this.isVisible = true;
        this.idEleve = res.id;
        let req = { langue: this.lang, id: res.id, numero: this.numero,nom:this.nom };
        this.cookieService.set('login-student', JSON.stringify(req), 0.02);
        dialogRef.close();
        this._document.defaultView.location.reload();
      } else {

      }
    })
  }
  checklogin() {
    this.cookieTimeout = this.cookieService.get('login-student');
    this.openDialog();
    const src = timer(0, 60000);
    src.subscribe(v => {
      this.cookieTimeout = this.cookieService.get('login-student');
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
    this.cookieTimeout = this.cookieService.get('login-student');
    if(!this.cookieTimeout){
     return;
    }
    let cookEle = JSON.parse(this.cookieTimeout);
    this.lang = cookEle.langue;
    this.idEleve = cookEle.id;
    this.numero = cookEle.numero;
    this.nom = cookEle.nom;
    let req = { id: id,nom:this.nom,numero:this.numero };
    this.serviceEleve.deleteEvent(req).subscribe(res => {
      dialogRef.close();
      if (res.valid) {
        this.toastr.success("Succés / Success !", "Succés / Success !", { timeOut: 5000 });
        this.obtenirEvenementsEleve();
      }else{
        this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
      }
    })
  }

  validSaving(){
    var estTrue = true;
    let sessionsCar = this.listeModules.filter(m=>m.date_complete)
    .sort((a,b)=>moment(b.date_complete).startOf('days').diff(moment(a.date_complete).startOf('days'),'days'));
    if(sessionsCar && sessionsCar.length > 0){
      let lastSession = sessionsCar[0];
      let eventsValid = this.events.filter(e=>moment(e.date).startOf('days').diff(moment(lastSession.date_complete).startOf('days'),'days')<31);
      estTrue = eventsValid.length > 2;
    } 
    else if(this.events.length>0){
      estTrue = this.events.length == 3;
    }
    return estTrue;
  }

  getSortie(val){
    var estTrue = true;
    var nom = "";
    var evt = {numero:0};
    let eventSesion = this.events
    .sort((a,b)=>moment(b.date).startOf('days').diff(moment(a.date).startOf('days'),'days'));
    if(eventSesion && eventSesion.length > 0 ){
       nom = eventSesion[0].nom_module;
       evt = this.listeModules.find(m=>m.nom == nom);
    }
   
    let sessionsCarNext = this.listeModules.filter(m=>m.numero > evt.numero)
      .sort((a,b)=>a.numero > b.numero?1:-1)[0];
      
    estTrue = !(Number(val) == sessionsCarNext.numero)
    return estTrue;
  }

  validSessionOneTwo(){
    if(this.eventDriving.nom_module.includes('Sortie 2')){
      let evt = this.events.find(e=> e.nom_module == 'Sortie 1');
      return moment(evt.date).startOf('days').diff(moment(this.eventDriving.date).startOf('days'),'days') == 0;
    }
    return false;
  }
}
