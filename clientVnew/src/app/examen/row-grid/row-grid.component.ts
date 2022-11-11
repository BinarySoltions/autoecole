import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { ReponseModel } from 'src/app/modele/examen-model';

@Component({
  selector: '[row-grid]',
  template: `<td style="border-left:1px solid #000 !important;border-right:1px solid #000 !important;background-color: rgb(236, 234, 234);">{{number[0]}}-</td>
  <td><input type="checkbox" name="{{number[0]}}a" [(ngModel)]="reponse.a" class="{{number[0]}}" (click)="selectionner($event,reponse)"></td><td><input type="checkbox" name="{{number[0]}}b" class="{{number[0]}}" [(ngModel)]="reponse.b" (click)="selectionner($event,reponse)"></td><td><input type="checkbox" [(ngModel)]="reponse.c" name="{{number[0]}}c" class="{{number[0]}}" (click)="selectionner($event,reponse)"></td><td style="border-right:1px solid #000 !important;"><input type="checkbox" name="{{number[0]}}d" class="{{number[0]}}" [(ngModel)]="reponse.d" (click)="selectionner($event,reponse)"></td>
  <td style="border: 0px solid transparent !important;background-color: rgb(185, 184, 184);border-right:1px solid #000 !important;"></td>
  <td style="border-right:1px solid #000 !important;border-left:1px solid #000 !important;background-color: rgb(236, 234, 234);">{{number[1]}}-</td>
  <td><input type="checkbox" name="{{number[1]}}a" class="{{number[1]}}" [(ngModel)]="reponsePlus.a" (click)="selectionner($event,reponsePlus)"></td><td><input type="checkbox" name="{{number[1]}}b" class="{{number[1]}}" [(ngModel)]="reponsePlus.b" (click)="selectionner($event,reponsePlus)"></td><td><input type="checkbox" name="{{number[1]}}c" class="{{number[1]}}" [(ngModel)]="reponsePlus.c" (click)="selectionner($event,reponsePlus)"></td><td  style="border-right:1px solid #000 !important;"><input type="checkbox" name="{{number[1]}}a" class="{{number[1]}}" [(ngModel)]="reponsePlus.d" (click)="selectionner($event,reponsePlus)"></td>`,
  styleUrls: ['../examen.component.scss']
})
export class RowGridComponent implements OnInit {
  @Input() number = [1,2];
  @Input() lastrow;
  @Input() reponse = new ReponseModel(false,false,false,false);
  @Input() reponsePlus = new ReponseModel(false,false,false,false);

  constructor() { }

  ngOnInit() {
    this.init();
  }

  selectionner(value,obj) {
    Object.getOwnPropertyNames(obj).forEach((val,idx,array)=>obj[val]=false);
    let className = value.target.className;
    $("."+className).change(function() {
      $("."+className).prop('checked', false);
      $(this).prop('checked', true);
  });
  }

  init(){
    this.reponse.a = false;
    this.reponse.b = false;
    this.reponse.c = false;
    this.reponse.d = false;
    this.reponsePlus.a = false;
    this.reponsePlus.b = false;
    this.reponsePlus.c = false;
    this.reponsePlus.d = false;
  }
}
