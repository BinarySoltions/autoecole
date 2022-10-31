import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-date-versement',
  templateUrl: './date-versement.component.html',
  styleUrls:  ['../../contrat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateVersementComponent implements OnInit,OnChanges {
  @Input() noFR;
  @Input() noENG;
  @Input() versement;
  @Input() dFR;
  @Input() dENG;
  no:any;
  fr:any;
  eng:any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.no = this.noFR.match(/\d+/g);
    this.fr = this.noFR.match(/[a-zA-Z]+/g);
    this.eng = this.noENG.match(/[a-zA-Z]+/g);
  }
}
