import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-description-formation',
  templateUrl: './description-formation.component.html',
  styleUrls: ['../contrat.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionFormationComponent implements OnInit {
@Input() descriptionFormation;
  constructor() { }

  ngOnInit() {
  }

}
