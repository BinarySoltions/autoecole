import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-send-email',
  templateUrl: './modal-send-email.component.html',
  styleUrls: ['./modal-send-email.component.scss']
})
export class ModalSendEmailComponent implements OnInit {

  form = new FormGroup({
    email:new FormControl("",[Validators.email]),
    isSending:new FormControl(false),
  });
  constructor( public dialogRef: MatDialogRef<ModalSendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
   ) {
    this.form.get('email').setValue(data);
    this.dialogRef.disableClose = true;
    }

  ngOnInit(): void {
  }

  soumettre(){
    this.form.get('isSending').setValue(true);
    this.dialogRef.close(this.form.value);
  }
  annuler(){
    this.dialogRef.close(false);
  }
}
