import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-acceptation-condition',
  templateUrl: './acceptation-condition.component.html',
  styleUrls: ['../contrat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AcceptationConditionComponent implements OnInit {
  @Input() loiConditionUne:any;
  @Input() loiConditionENG:any;
  @Input() loiConditionDeux:any;
  @Input() loiConditionTrois:any;
  dateVersion :Date;
  constructor() { }

  ngOnInit() {
    this.dateVersion = new Date();
    this.dateVersion.setMonth(0);
  }

}
