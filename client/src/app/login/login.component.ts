import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';
import { NgForm} from '@angular/forms';
import { User } from '../auth/user.model';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  @ViewChild('formulaire') formulaire:NgForm;
  userLogin:User = new User();
  socialUser: any;
  socialUserLogin = new User();
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private authService: AuthService,
      private toastr: ToastrService,
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.authService.authState.subscribe((user) => {
        this.socialUser = user;
      });
  }

  // convenience getter for easy access to form fields
 connecter(){
  this.enregistrer(this.userLogin);
 }
  enregistrer(user) {
      this.loading = true;
      this.authenticationService.login(user)
          .pipe(first())
          .subscribe(
              data => {
                  
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.loading = false;
                  this.toastr.error("Mot de passe ou email incorrect!", "Erreur de connexion", {timeOut: 5000});
                  this.socialUserLogin = new User();
              });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
        this.socialUserLogin.email = x.email;
        this.socialUserLogin.idToken = x.idToken;
        this.socialUserLogin.from = 'google';
        this.enregistrer(this.socialUserLogin);
        }
    );
  }

  signOut(): void {
    this.authService.signOut();
  }
}
