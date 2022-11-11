import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SharedServiceModule } from '../shared/shared/shared-service.module';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: SharedServiceModule
})
export class MonitorService {

  readonly apiUrl = environment.apiEndpoint;
  constructor(private http: HttpClient) { }

  obtenirMoniteur():Observable<any>{
    return this.http.get<any>(this.apiUrl+'moniteurs')
    .pipe(catchError(this.handleError));
  }
  enregistrerMoniteur(moniteur):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'add', moniteur, httpOptions)
    .pipe(catchError(this.handleError));
  }

  supprimerMoniteur(moniteur):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'supprimermoniteur', moniteur, httpOptions)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
     // console.error('An error occurred:', error.error.message);
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
