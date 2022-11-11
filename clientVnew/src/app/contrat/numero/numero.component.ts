import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-numero-contrat',
  templateUrl: './numero.component.html',
  styleUrls: ['../contrat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NumeroComponent implements OnInit {
  @Input() numero:any;
  constructor() { }

  ngOnInit() {
  }

}
