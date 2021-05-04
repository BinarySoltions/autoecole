import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Eleve } from 'src/app/entite/eleve.entity';
import { environment } from 'src/environments/environment';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};
const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
  'responseType'  : 'text' as 'json'
};
@Injectable({
  providedIn: SharedServiceModule
})
export class EleveService {

  readonly apiUrl = environment.apiEndpoint;


  constructor(private http: HttpClient) { }

  obtenirEleveById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(this.apiUrl + 'eleve/' + id);
  }
  obtenirEleveByIdPublic(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(this.apiUrl + 'elevePublic/' + id);
  }
  obtenirEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'eleves');
  }
  obtenirElevesLimites(limit): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'eleves/'+limit);
  }

  obtenirElevesUniquement(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'eleves_seulement');
  }

  ajouterEleve(eleve: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(this.apiUrl + 'eleve', eleve, httpOptions)
      .pipe(catchError(this.handleError));
  }
  inscrireEleve(eleve: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(this.apiUrl + 'inscrire', eleve, httpOptions)
      .pipe(catchError(this.handleError));
  }
  supprimerEleveById(id: number): Observable<{valid:boolean}> {
    return this.http.delete<{valid:boolean}>(this.apiUrl + 'eleve/' + id)
    .pipe(catchError(this.handleError));
  }
  obtenirElevesParTrimestre(trimestre:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'exporter_registre', trimestre, httpOptions)
      .pipe(catchError(this.handleError));
  }
  rechercherEleves(term): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'recherche/'+term);
  }
  obtenirElevesExpires(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'expiration');
  }

  ajouterExamens(eleve:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pass', eleve, httpOptions)
      .pipe(catchError(this.handleError));
  }
  verifierExamen(numero): Observable<any>{
    return this.http.get<Eleve[]>(this.apiUrl + 'examen/'+numero);
  }
  soumettreExamen(examen): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'examen', examen, httpOptions)
    .pipe(catchError(this.handleError));
  }

  obtenirExamen(id): Observable<any>{
    return this.http.get<Eleve[]>(this.apiUrl + 'obtenirExamen/'+id);
  }

  obtenirExamenById(id): Observable<any>{
    return this.http.get<Eleve[]>(this.apiUrl + 'obtenirExamenById/'+id);
  }
  modifierExamen(examen): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'enregistrerExamen', examen, httpOptions)
    .pipe(catchError(this.handleError));
  }
  genererExamenPDF(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'printExam', req, httpOptions2)
      .pipe(catchError(this.handleError));
  }
  genererContratPDF(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'printContrat', req, httpOptions2)
      .pipe(catchError(this.handleError));
  }
  genererAttestationPDF(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'printAttestation', req, httpOptions2)
      .pipe(catchError(this.handleError));
  }

  creerEvenementEleve(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'evenement', req, httpOptions)
      .pipe(catchError(this.handleError));
  }

  creerEvenements(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'evenements', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  obtenirEvenementDatesHeures(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getDatesHeures', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  obtenirEvenementsEleve(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getEvenementsEleve', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  obtenirEvenementsDetails(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'getDatesHeuresEvents', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  ajouterNoteSortie(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'ajouterNoteSortie', req, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getEleveLogin(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'loginEleve', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  deleteEvent(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'deleteEvent', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  deleteAdminEvent(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'deleteAdminEvent', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  deletePlacesEvent(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'deletePlacesEvent', req, httpOptions)
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
