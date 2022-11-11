import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Ecole } from 'src/app/entite/ecole.entity';
import { catchError } from 'rxjs/operators';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: SharedServiceModule
})
export class EcoleService {
  readonly apiUrl = environment.apiEndpoint;

  constructor(private http:HttpClient) { }

  obtenirEcole():Observable<Ecole>{
    return this.http.get<Ecole>(this.apiUrl+'ecoles');
  }

  AjouterEcole(ecole:Ecole):Observable<Ecole>{
    return this.http.post<Ecole>(this.apiUrl+'ecole',ecole,httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
