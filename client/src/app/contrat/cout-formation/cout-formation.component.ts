import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cout-formation',
  templateUrl: './cout-formation.component.html',
  styleUrls: ['./cout-formation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoutFormationComponent implements OnInit {
  @Input() coutFormation;
  constructor() { }

  ngOnInit() {
  }

}
