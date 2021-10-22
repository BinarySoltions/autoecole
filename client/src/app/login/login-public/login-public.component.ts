import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EleveService } from 'src/app/service/eleve/eleve.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/auth/user.model';

export class LoginModel{
  langue:string;
  nom:string;
  numero:string;
  password:string;
  password_new:string;
  password_ref:string;
}
@Component({
  selector: 'app-login-public',
  templateUrl: './login-public.component.html',
  styleUrls: ['./login-public.component.scss']
})
export class LoginPublicComponent implements OnInit {
  data = new LoginModel();

  constructor(private router: Router, private serviceEleve: EleveService,
    private activatedRoute: ActivatedRoute,private cookieService: CookieService,
    private toastr: ToastrService,private authenticationService: AuthenticationService,
    private translate: TranslateService,private spinner:NgxSpinnerService,) {
    this.translate.setDefaultLang('fr');
   }

  ngOnInit() {
  }
  

  radioChange(choice){
    if(!!this.data){
      this.translate.setDefaultLang(choice.value);
    }
  }
  commencer(){
    this.spinner.show(undefined, { fullScreen: true });
    this.serviceEleve.getEleveLogin(this.data).subscribe(res => {
      if (res && res.isValid) {
      
        let req = { langue: this.data.langue, id: res.id, numero: this.data.numero,nom:this.data.nom };
        this.cookieService.set('login-student', JSON.stringify(req), 0.02);
        let user = new User;
        user.id = res.id;
        user.access_token = res.token;
        this.authenticationService.loginPublic(user);
        this.spinner.hide();
        this.router.navigate(['/public/reservation/ok'],
        {queryParams:{id:res.id,numero:this.data.numero,nom:this.data.nom,lang:this.data.langue}});
      } else {

      }
      this.spinner.hide();
    });
  }
}
