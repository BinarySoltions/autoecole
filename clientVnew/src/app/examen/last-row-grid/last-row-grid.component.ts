import { Component, OnInit } from '@angular/core';
import { RowGridComponent } from '../row-grid/row-grid.component';

@Component({
  selector: '[last-row-grid]',
  template: `<td style="border-left:1px solid #000 !important;border-right:1px solid #000 !important;background-color: rgb(236, 234, 234);">{{number[0]}}-</td>
  <td><input type="checkbox" [(ngModel)]="reponse.a" name="{{number[0]}}a" class="{{number[0]}}" (click)="selectionner($event,reponsePlus)"></td><td><input type="checkbox" [(ngModel)]="reponse.b" name="{{number[0]}}b" class="{{number[0]}}" (click)="selectionner($event,reponse)"></td><td><input type="checkbox" [(ngModel)]="reponse.c" name="{{number[0]}}c" class="{{number[0]}}" (click)="selectionner($event,reponse)"></td><td style="border-right:1px solid #000 !important;"><input type="checkbox" [(ngModel)]="reponse.d" name="{{number[0]}}d" class="{{number[0]}}" (click)="selectionner($event,reponse)"></td>
  <td  style="background-color: rgb(185, 184, 184);border-right:1px solid #000 !important;"></td>
  <td style="border-right:1px solid #000 !important;border-left:1px solid #000 !important;background-color: rgb(236, 234, 234);">{{number[1]}}-</td>
  <td><input type="checkbox" [(ngModel)]="reponsePlus.a" name="{{number[1]}}a" class="{{number[1]}}" (click)="selectionner($event,reponsePlus)"></td><td><input type="checkbox" [(ngModel)]="reponsePlus.b" name="{{number[1]}}b" class="{{number[1]}}" (click)="selectionner($event,reponsePlus)"></td><td><input type="checkbox" name="{{number[1]}}c" [(ngModel)]="reponsePlus.c" class="{{number[1]}}" (click)="selectionner($event,reponsePlus)"></td><td  style="border-right:1px solid #000 !important;"><input type="checkbox" [(ngModel)]="reponsePlus.d" name="{{number[1]}}a" class="{{number[1]}}" (click)="selectionner($event,reponsePlus)"></td>`,
  styleUrls: ['./last-row-grid.component.scss']
})
export class LastRowGridComponent extends RowGridComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
