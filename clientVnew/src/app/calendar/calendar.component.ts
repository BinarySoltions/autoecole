import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';
import moment from 'moment';
import 'moment/locale/fr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evenement } from '../entite/evenement.entity';
import { ModalDeleteEventsComponent } from '../modal-delete-events/modal-delete-events.component';
import { EleveService } from '../service/eleve/eleve.service';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit,AfterViewInit {
  @ViewChildren('dateDiv') datesDiv: QueryList<ElementRef>
  dataDays:{day:string;date:any;events:Evenement[]} []= [];
  height = 300;
  weeks = ["DIM.","LUN.","MAR.","MER.","JEU.","VEN.","SAM."]
  monthSelected = moment();
  eventsDateHeures: Evenement[];
  events :  Evenement[];
  constructor(private _adapter: DateAdapter<any>,private router: Router,
    private spinner:NgxSpinnerService,private toastr: ToastrService,
    private serviceEleve: EleveService, public dialog: MatDialog) {
    this._adapter.setLocale('fr');
   }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeEventDiv();
  }
  ngOnInit() {
    this.prepareDays();
  }
  ngAfterViewInit(): void {
   this.resizeEventDiv();
  }
  prepareDays(){
    let days = this.monthSelected.daysInMonth();
    for(let i=1; i<= days; i++){
      let date = this.monthSelected.date(i)
      const dow = date.day();
     this.completeLeftDays(i,dow);
     if(i==1){
      this.dataDays.push({day:i+date.format('MMMM'),
      date:moment(this.monthSelected).date(i),events:[]});
     }else{
      this.dataDays.push({day:i+"",
      date:moment(this.monthSelected).date(i),events:[]});
     }
     
     this.completeRightDays(i,days,dow);
      
    }
    const dateMoins = moment(this.monthSelected).add(-1, 'months').set('date',1).format('YYYY-MM-DD');
    const datePlus = moment(this.monthSelected).add(1, 'months').format('YYYY-MM-DD');
    this.setEvents(dateMoins,datePlus)
  }

  completeRightDays(i,lastDayMonth,dow){
    if(i === lastDayMonth){
      const dateMoins = moment(this.monthSelected).add(1, 'months');
      let diff = 7-dow;
      let j = 1;
      while(j<diff){
        if(j === 1){
          this.dataDays.push({day:j+dateMoins.format('MMMM'),
          date:moment(dateMoins).locale('fr').date(j),events:[]});
        }else{
          this.dataDays.push({day:j+"",
          date:moment(dateMoins).locale('fr').date(j),events:[]});
        }
        j++;
      }
    }
  }

  completeLeftDays(i,dow){
    if(i === 1){
      const dateMoins = moment(this.monthSelected).add(-1, 'months');
      let diff = dow-1;
      let ddays = dateMoins.daysInMonth();
      while(diff>=0 && diff < 6){
        let dd = ddays-diff;
        this.dataDays.push({day:dd+"",
        date:moment(dateMoins).date(dd),events:[]});
        diff--;
      }
    }
  }
  
  resizeEventDiv(){
    let divEle: ElementRef[] = this.datesDiv.toArray();
    this.height = divEle.map(e=>e.nativeElement.offsetHeight).reduce((a,b)=>Math.max(a,b));
    if(this.height < 100){
      this.height = 100;
    }
    this.datesDiv.toArray().forEach(e=>e.nativeElement.style.height = this.height+'px');
  }

  addMonth(val){
    this.monthSelected = moment(this.monthSelected).add(val,'months');
    this.dataDays = [];
    this.prepareDays();
    setTimeout(()=>this.resizeEventDiv(),500);
  }

  toDay(){
    this.monthSelected = moment();
    this.dataDays = [];
    this.prepareDays();
    setTimeout(()=>this.resizeEventDiv(),500);
  }

  setEvents(dateStart,dateEnd){
    this.spinner.show(undefined, { fullScreen: true });
    let req = {dateStart:dateStart,dateEnd:dateEnd};
    this.serviceEleve.obtenirEvenementsDetails(req).subscribe(r=>{
      if(r && r.length > 0){
        this.eventsDateHeures =  <Evenement[]>r;
        this.dataDays.forEach(d=>{
          let events = this.eventsDateHeures.filter(e=>moment(e.date).startOf('day').diff(d.date.startOf('day'),'days') == 0);
          this.events = events;
          d.events = events;
          setTimeout(()=>this.resizeEventDiv(),500);
        })
      }
      this.spinner.hide();
    });
  }
  getMonth(date){
    return moment(date).format('YYYY-MMMM');
  }
  isCurrentDay(date){
    return moment().startOf('day').diff(date.date.startOf('day'),'days') === 0;
  }

  openDetail(data:Evenement,events:Evenement[]){
    if(!data.numero_contrat){
      return;
    }
    const dialogRef = this.dialog.open(ModalDetailComponent, {
      data: events.filter(e=>e.heure_debut === data.heure_debut)
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  isEventPlaceEmpty(data:Evenement,events:Evenement[]){
    let evt = events.filter(e=>e.heure_debut === data.heure_debut && !!e.numero_contrat);
    return !(!!evt && evt.length > 0);
  }
  getPlacesEmpty(data:Evenement,events:Evenement[]){
    let evt = events.filter(e=>e.heure_debut === data.heure_debut && !!e.numero_contrat);
    return data.places - evt.length;
  }
  getDateEvents(events:Evenement[]){
    return events.filter((thing, i, arr) => {
      return arr.indexOf(arr.find(t => t.heure_debut === thing.heure_debut)) === i;
    });;
  }
  reservation(){
    this.router.navigate(['reservation']);
  }
  
  openUpdateEvent(events:Evenement[],data:Evenement[],action){
    const dialogRef = this.dialog.open(ModalDeleteEventsComponent, {
      data: {action:action, events:events,eventsDuplicate:data}
    });

    dialogRef.afterClosed().subscribe(result => {
     let req = result.events.filter(e=>e.selection);
     if(req && req.length > 0){
       if(result.action === 'd'){
        let r = req.map(r=>r.id);
         this.deletePlacesEvent(r)
       }else if(result.action === 'm'){
        this.updatePlacesEvent(req)
      }
     }
    });
  }

  deletePlacesEvent(r){
    this.serviceEleve.deletePlacesEvent(r).subscribe(r=>{
      if(r && r.valid){
       this.toastr.success("Suppression avec succés!", "Supprimer", {timeOut: 5000});
       this.dataDays = [];
       this.prepareDays();
       setTimeout(()=>this.resizeEventDiv(),500);
      }else{
       this.toastr.error("Suppression avec erreur!", "Supprimer", {timeOut: 5000});
      }
    })
  }
  updatePlacesEvent(r){
    this.serviceEleve.updatePlacesEvent(r).subscribe(r=>{
      if(r && r.valid){
       this.toastr.success("Modification avec succés!", "Modifier", {timeOut: 5000});
       this.dataDays = [];
       this.prepareDays();
       setTimeout(()=>this.resizeEventDiv(),500);
      }else{
       this.toastr.error("Modification avec erreur!", "Modifier", {timeOut: 5000});
      }
    })
  }
}
