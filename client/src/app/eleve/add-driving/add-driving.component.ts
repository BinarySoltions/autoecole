import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
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

@Component({
  selector: 'app-add-driving',
  templateUrl: './add-driving.component.html',
  styleUrls: ['./add-driving.component.scss']
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
  nTimes: any = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  timesUser: { value: string; label: string; places: string; date: string }[] = [];
  pos: number;
  eventsDateHeures: Evenement[] = [];
  idEleve: number;
  numero: string;
  first: boolean;
  isVisible: boolean;
  
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
    this.idEleve = +this.activatedRoute.snapshot.paramMap.get('id');
    this.obtenirEleveById(this.idEleve);
  }

  public obtenirEleveById(id:number){
    if(id){
      this.serviceEleve.obtenirEleveById(id).subscribe(eleve=>{
        this.eleveModele = eleve;
        let req = { langue: "fr", id: this.idEleve, numero: this.eleveModele.numero_contrat };
        this.cookieService.set('login-student', JSON.stringify(req));
        this.cookieTimeout = this.cookieService.get('login-student');
        this.init();
      });
    }
  }

  init() {
    if (this.cookieTimeout) {
      this.isVisible = true;
      let cookEle = JSON.parse(this.cookieTimeout);
      this.lang = cookEle.langue;
      this.idEleve = cookEle.id;
      this.numero = cookEle.numero;
      this.obtenirModules();
      this.obtenirEvenementsEleve();
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
  }
  obtenirModules() {
    this.serviceModule.obtnenirSorties().subscribe(m => {
      this.listeModules = m;
    });
  }
  obtenirEvenementsEleve() {
    let req = { numero: this.numero };
    this.serviceEleve.obtenirEvenementsEleve(req).subscribe(evt => {
      if (evt) {
        this.events = evt;
      }
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
      this.serviceEleve.creerEvenementEleve(this.eventDriving).subscribe((evt) => {
        if (evt) {
          this.events = evt
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
    this.serviceEleve.getEleveLogin(req).subscribe(res => {
      if (res && res.valid) {
        this.isVisible = true;
        this.idEleve = res.id;
        let req = { langue: this.lang, id: res.id, numero: this.numero };
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
    let req = { id: id };
    this.serviceEleve.deleteAdminEvent(req).subscribe(res => {
      dialogRef.close();
      if (res.valid) {
        this.toastr.success("Succés / Success !", "Succés / Success !", { timeOut: 5000 });
        this.obtenirEvenementsEleve();
      }else{
        this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
      }
    })
  }
}
