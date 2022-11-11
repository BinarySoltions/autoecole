import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dialog-confirmer',
  templateUrl: './dialog-confirmer.component.html',
  styleUrls: ['./dialog-confirmer.component.scss']
})
export class DialogConfirmerComponent implements OnInit {
  @Output() estConfirmer = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  confirmer(){
    this.estConfirmer.emit(true)
  }
  annuler(){
    this.estConfirmer.emit(false);
  }
}
