import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';
import { UserService } from '../auth/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  @ViewChild('formulaire') formulaire:NgForm;
  userRegister:User = new User();
  users:User[]=[];
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) { 
      // redirect to home if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
    this.userService.getAll().subscribe(u=>{
      if(u) this.users = u;
    })
  }

 
  enregistrer() {
      this.submitted = true;

      this.loading = true;
      this.userRegister.password_confirmation = this.userRegister.password;
      this.userService.register(this.userRegister)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/login']);
              },
              error => {
                  this.loading = false;
              });
  }
}
