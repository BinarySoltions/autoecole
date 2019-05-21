import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Eleve } from 'src/app/entite/eleve.entity';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  readonly apiUrl = environment.apiEndpoint;


  constructor(private http: HttpClient) { }

  obtenirEleveById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(this.apiUrl + 'eleve/' + id);
  }

  obtenirEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'eleves');
  }

  obtenirElevesUniquement(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'eleves_seulement');
  }

  ajouterEleve(eleve: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(this.apiUrl + 'eleve', eleve, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
