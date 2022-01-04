import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {
  @Input('lang') lang='fr';
  constructor() { }

  ngOnInit() {
  }

}
