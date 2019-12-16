import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParametresContrat } from 'src/app/parametres-contrat/parametres-contrat.component';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};
@Injectable({
  providedIn: 'root'
})
export class ContratService {

  readonly apiUrl = environment.apiEndpoint;

  constructor(private http:HttpClient) { }

  obtenirParametresContrat():Observable<ParametresContrat>{
    return this.http.get<ParametresContrat>(this.apiUrl+'parametres/contrat');
  }

  AjouterParametresContrat(param:ParametresContrat):Observable<ParametresContrat>{
    return this.http.post<ParametresContrat>(this.apiUrl+'parametre/contrat',param,httpOptions)
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
