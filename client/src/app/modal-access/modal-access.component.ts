import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';


export interface DialogDataAccess {
  langue: string;
  id:number;
  numeroIdentification: string;
  nom: string;
  isLogin:boolean;
  password:string;
}

@Component({
  selector: 'app-modal-access',
  templateUrl: './modal-access.component.html',
  styleUrls: ['./modal-access.component.scss']
})
export class ModalAccessComponent implements OnInit {
  cookieLogin: string;
  numeroIdentification: string;
  nom: string;
  langue: string = "fr";
 

  constructor(private translate: TranslateService,
    public dialogRef: MatDialogRef<ModalAccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAccess) {
    this.translate.setDefaultLang('fr');
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.data.isLogin = false;
  }

  commencer() {
    //this.data.isLogin = false;
    //this.dialogRef.close();
  }

  radioChange(choice) {
    if(!!this.data){
      this.langue = choice.value;
      this.translate.setDefaultLang(choice.value);
    }
   
  }
}
