import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: SharedServiceModule
})
export class AuthenticationService {
  readonly apiUrl = environment.apiEndpoint;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentUserPublicSubject: BehaviorSubject<User>;
  public currentUserPublic: Observable<User>;

  constructor(private http: HttpClient, private cookieService: CookieService,) {
      const valeur = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')):null;
      this.currentUserSubject = new BehaviorSubject<User>(valeur);
      this.currentUser = this.currentUserSubject.asObservable();
      const valeurPublic = this.cookieService.get('login-public') ? this.getUserPublic():null;
      this.currentUserPublicSubject = new BehaviorSubject<User>(valeurPublic);
      this.currentUserPublic = this.currentUserPublicSubject.asObservable();
      console.log("yessa")
  }
  getUserPublic():User {
    let userCookie =  this.cookieService.get('login-public');
    let userLoging = new User;
    userLoging.access_token = userCookie;
    return userLoging;
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }
  public get currentUserPublicValue(): User {
    return this.currentUserPublicSubject.value;
    }

  login(userLoging:User) {
      return this.http.post<any>(`${this.apiUrl}auth/authenticate`, userLoging)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.access_token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  loginPublic(userLoging:User){
    let userCookie = {id:userLoging.id,token:userLoging.access_token};
    let userString = JSON.stringify(userCookie);
    userLoging.access_token = btoa(userString);
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 28);
    this.cookieService.set('_login_public', userLoging.access_token ,dateNow);
    this.currentUserPublicSubject.next(userLoging);
  }

  logoutPublic() {
    // remove user from local storage to log user out
    this.cookieService.delete('_login_public','/');
    this.currentUserPublicSubject.next(null); 
  }
}
