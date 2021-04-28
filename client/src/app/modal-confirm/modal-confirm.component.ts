import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ModalAccessComponent } from '../modal-access/modal-access.component';

export interface DialogDataConfirm{
  id:number;
  lang:string;
}
@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  constructor(private translate: TranslateService,
    public dialogRef: MatDialogRef<ModalAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataConfirm) {
    this.translate.setDefaultLang('fr');
    dialogRef.disableClose = true;
   }

  ngOnInit() {
    this.translate.setDefaultLang(this.data.lang);
  }

  annuler() {
    this.dialogRef.close();
  }
}
