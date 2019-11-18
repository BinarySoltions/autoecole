import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-description-formation',
  templateUrl: './description-formation.component.html',
  styleUrls: ['../contrat.component.scss']
})
export class DescriptionFormationComponent implements OnInit {
@Input() descriptionFormation;
  constructor() { }

  ngOnInit() {
  }

}
