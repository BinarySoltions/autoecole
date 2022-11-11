import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../login-public.component';

@Component({
  selector: 'app-demander-pwd',
  templateUrl: './demander-pwd.component.html',
  styleUrls: ['./demander-pwd.component.scss']
})
export class DemanderPwdComponent implements OnInit {

  data = new LoginModel();

  constructor(private router: Router, private serviceEleve: EleveService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private translate: TranslateService,private spinner:NgxSpinnerService,) {
    this.translate.setDefaultLang('fr');
   }

  ngOnInit() {
  }
  askPwd(){
    this.spinner.show(undefined, { fullScreen: true });
    this.data.password =  btoa(JSON.stringify(this.encryptDataString(this.data.password_ref)));
    this.serviceEleve.askPassword(this.data).subscribe(res=>{
      if(res && res.isValid){
        this.toastr.success("Un mot de passe est envoyé dans votre message courriel ! Merci !/ A password is sent in your mail box! Thank's!", "Succes / Success", { timeOut: 30000 });
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
  hashMac(iv,value){
    let key = environment.keyApp32;
  return CryptoJS.HmacSHA256(iv+value,key);
    
  }
  encryptDataString(data:string) {

    try {
      let key = environment.keyApp32;
  
      let crypt = CryptoJS.AES.encrypt(data,key,{
        mode: CryptoJS.mode.CBC
      });
      let value = crypt.ciphertext.toString(CryptoJS.enc.Base64);
      let iv = CryptoJS.enc.Base64.stringify(crypt.iv);
      let mac = this.hashMac(iv,value);
    
      return {iv:iv,value:value,mac:CryptoJS.enc.Hex.stringify(mac)};
    } catch (e) {
      console.log(e);
    }
  }



  generatePassword = (
    passwordLength = 8,
  ) => {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const upperCase = lowerCase.toUpperCase()
    const numberChars = '0123456789'
    const specialChars = '!"@$%+-_?^&*()'
  
    let generatedPassword = ''
    let restPassword = ''
  
    const restLength = passwordLength % 4 
    const usableLength = passwordLength - restLength
    const generateLength = usableLength / 4
  
    const randomString = (char) => {
      return char[Math.floor(Math.random() * (char.length))]
    }
    for (let i = 0; i <= generateLength - 1; i++) {
      generatedPassword += `${randomString(lowerCase)}${randomString(upperCase)}${randomString(numberChars)}${randomString(specialChars)}`
    }
  
    for (let i = 0; i <= restLength - 1; i++) {
      restPassword += randomString([lowerCase, upperCase, numberChars, specialChars])
    }
  
    return generatedPassword + restPassword
  }
}
