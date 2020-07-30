import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';
import { NgForm} from '@angular/forms';
import { User } from '../auth/user.model';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

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
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private authService: AuthService
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
        console.log(user);
      });
  }

  // convenience getter for easy access to form fields
 
  enregistrer() {
  
      this.loading = true;
      this.authenticationService.login(this.userLogin)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.loading = false;
                  this.userLogin = new User();
              });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
        this.userLogin.email = x.email;
        this.userLogin.idToken = x.idToken;
        this.userLogin.from = 'google';
        console.log(x.idToken);
        this.enregistrer();
        }
    );
  }

  signOut(): void {
    this.authService.signOut();
  }
}
