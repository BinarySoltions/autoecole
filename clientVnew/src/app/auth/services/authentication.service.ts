import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: SharedServiceModule
})
export class AuthenticationService {
  readonly apiUrl = environment.apiEndpoint;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentUserPublicSubject: BehaviorSubject<User>;
  public currentUserPublic: Observable<User>;

  constructor(private http: HttpClient) {
      const valeur = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')):null;
      this.currentUserSubject = new BehaviorSubject<User>(valeur);
      this.currentUser = this.currentUserSubject.asObservable();
      const valeurPublic = localStorage.getItem('currentUserPublic') ? JSON.parse(localStorage.getItem('currentUserPublic')):null;
      this.currentUserPublicSubject = new BehaviorSubject<User>(valeurPublic);
      this.currentUserPublic = this.currentUserPublicSubject.asObservable();
      console.log("yessa")
  }

  public get currentUserValue(): User {
    const userSession = localStorage.getItem('currentUser');
      return this.currentUserSubject.value || userSession?JSON.parse(userSession):null;
  }
  public get currentUserPublicValue(): User {
    //TODO
    const userSession = localStorage.getItem('currentUserPublic');
    return this.currentUserPublicSubject.value || userSession?JSON.parse(userSession):null;
    }

  login(userLoging:User) {
      return this.http.post<any>(`${this.apiUrl}auth/authenticate`, userLoging,httpOptions)
          .pipe(map(user => {
              console.log("login successful if there's a jwt token in the response");
              if (user && user.access_token) {
               console.log("store user details and jwt token in local storage to keep user logged in between page refreshes");
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

  loginPublic(req:any){
    return this.http.post<any>(`${this.apiUrl}loginEleve`, req,httpOptions)
    .pipe(map(user => {
        console.log("login successful if there's a jwt token in the response");
        if (user && user.access_token) {
          user.lang = req.langue;
         console.log("store user details and jwt token in local storage to keep user logged in between page refreshes");
            localStorage.setItem('currentUserPublic', JSON.stringify(user));
          this.currentUserPublicSubject.next(user);
        }

        return user;
    }));
  }

  logoutPublic() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserPublic');
    this.currentUserPublicSubject.next(null);
  }
}
