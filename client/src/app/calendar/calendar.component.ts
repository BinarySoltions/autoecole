import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DateAdapter } from '@angular/material';
import moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit,AfterViewInit {
  @ViewChildren('dateDiv') datesDiv: QueryList<ElementRef>
  dataDays = [];
  height = 300;
  weeks = ["DIM.","LUN.","MAR.","MER.","JEU.","VEN.","SAM."]
  monthSelected = moment();
  constructor(private _adapter: DateAdapter<any>) {
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
      this.dataDays.push(i+date.format('MMMM'));
     }else{
      this.dataDays.push(i);
     }
     
     this.completeRightDays(i,days,dow);
      
    }
  }
  completeRightDays(i,lastDayMonth,dow){
    if(i === lastDayMonth){
      const dateMoins = moment(this.monthSelected).add(1, 'months');
      let diff = 7-dow;
      let j = 1;
      while(j<diff){
        if(j === 1){
          this.dataDays.push(j+dateMoins.format('MMMM'));
        }else{
          this.dataDays.push(j);
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
        this.dataDays.push(dd);
        diff--;
      }
    }
  }
  resizeEventDiv(){
    let divEle: ElementRef[] = this.datesDiv.toArray();
    //this.contentHeight = this.elementView.nativeElement.offsetHeight;
    this.height = divEle.map(e=>e.nativeElement.offsetHeight).reduce((a,b)=>Math.max(a,b));
    this.datesDiv.toArray().forEach(e=>e.nativeElement.style.height = this.height+'px');
  }

  addMonth(val){
    this.monthSelected = moment(this.monthSelected).add(val,'months');
    this.dataDays = [];
    this.prepareDays();
    setTimeout(()=>this.resizeEventDiv(),100);
  }

  toDay(){
    this.monthSelected = moment();
    this.dataDays = [];
    this.prepareDays();
    setTimeout(()=>this.resizeEventDiv(),100);
  }
}
