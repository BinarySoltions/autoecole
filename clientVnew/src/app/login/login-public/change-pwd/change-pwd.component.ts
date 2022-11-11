import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginModel } from '../login-public.component';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {

  data = new LoginModel();

  constructor(private router: Router, private serviceEleve: EleveService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,private translate: TranslateService,
    private spinner:NgxSpinnerService,) {
    this.translate.setDefaultLang('fr');
   }

  ngOnInit() {
  }
  changePwd(){
    this.spinner.show(undefined, { fullScreen: true });
    this.data.password = this.data.password;
    this.data.password_new = this.data.password_new;
    this.serviceEleve.changePassword(this.data).subscribe(res=>{
      if(res && res.isValid){
        this.toastr.success("Merci de faire une réservation /Please do a reservation!", "Succes / Success", { timeOut: 10000 });
      } else {
        this.toastr.error("Erreur / Error !", "Erreur / Error !", { timeOut: 5000 });
      }
      this.spinner.hide();
    });
  }

  radioChange(choice){
    if(!!this.data){
      this.translate.setDefaultLang(choice.value);
    }
  }

  encryptDataString(data:string) {

    try {
      return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(environment.keyApp32),{
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
    } catch (e) {
      console.log(e);
    }
  }
}
