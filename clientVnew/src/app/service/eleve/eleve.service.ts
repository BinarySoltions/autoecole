import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Eleve, EleveSummary } from 'src/app/entite/eleve.entity';
import { environment } from 'src/environments/environment';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';
import { Module } from 'src/app/entite/module.entity';

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
  'responseType'  : 'blob' as 'json'
};
const httpOptions3 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
  'responseType'  : 'blob' as 'json'
};
@Injectable({
  providedIn: SharedServiceModule
})
export class EleveService {

  readonly apiUrl = environment.apiEndpoint;


  constructor(private http: HttpClient) { }

  obtenirEleveById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(this.apiUrl + 'Student/' + id);
  }
  obtenirEleve(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(this.apiUrl + 'Student/' + id);
  }
  obtenirEleveByIdPublic(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(this.apiUrl + 'elevePublic/' + id);
  }
  obtenirEleves(): Observable<EleveSummary[]> {
    return this.http.get<EleveSummary[]>(this.apiUrl + 'Student/summary');
  }
  obtenirElevesLimites(limit): Observable<EleveSummary[]> {
    return this.http.get<EleveSummary[]>(this.apiUrl + 'Student/'+limit);
  }

  obtenirElevesUniquement(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'eleves_seulement');
  }

  obtenirElevesModuleAfaire(moduleId:Module): Observable<EleveSummary[]> {
    return this.http.get<EleveSummary[]>(this.apiUrl + 'Student/summary'+'?moduleId='+moduleId);
  }

  ajouterEleve(eleve: Eleve): Observable<number> {
    return this.http.post<number>(this.apiUrl + 'Student', eleve, httpOptions)
      .pipe(catchError(this.handleError));
  }

  modifierEleve(eleveId:number,eleve: Eleve): Observable<number> {
    return this.http.put<number>(this.apiUrl + 'Student/' + eleveId, eleve, httpOptions)
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
    return this.http.get<any>(this.apiUrl + 'Student/export/trimester', { params: trimestre })
      .pipe(catchError(this.handleError));
  }
  rechercherEleves(term): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'recherche/'+term);
  }
  obtenirElevesExpires(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl + 'expiration');
  }

  ajouterExamens(eleve:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Exam/batch',{'exams': eleve}, httpOptions)
      .pipe(catchError(this.handleError));
  }
  verifierExamen(numero): Observable<any>{
    return this.http.get<Eleve[]>(this.apiUrl + 'examen/'+numero);
  }
  getUrlExam(url): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'contentExam',url, httpOptions2)
    .pipe(catchError(this.handleError));
  }
  soumettreExamen(examen): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'examen', examen, httpOptions)
    .pipe(catchError(this.handleError));
  }

  obtenirExamen(id): Observable<any>{
    return this.http.get<any>(this.apiUrl + 'Exam/student/'+id);
  }

  obtenirExamenById(id): Observable<any>{
    return this.http.get<Eleve[]>(this.apiUrl + 'Exam/'+id);
  }
  modifierExamen(examen): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'enregistrerExamen', examen, httpOptions)
    .pipe(catchError(this.handleError));
  }
  genererExamenPDF(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'printExam', req, httpOptions2)
      .pipe(catchError(this.handleError));
  }
  genererDeclarationExamenPDF(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'printDeclaration', req, httpOptions2)
      .pipe(catchError(this.handleError));
  }
  genererContratPDF(req:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + `Contract/student/${req.id}/contract/details-pdf`,  httpOptions2)
      .pipe(catchError(this.handleError));
  }
  genererAttestationPDF(eleveId:number,req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + `Certificate/student/${eleveId}/detailed-pdf`, req, httpOptions2)
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
    return this.http.put<any>(this.apiUrl + 'Student/modules/update-note', req, httpOptions)
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
  updatePlacesEvent(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'updatePlacesEvent', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  reoderEvts(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'reorderEvts', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  absenterEvts(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'updateStatusReservation', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  askPassword(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'askPassword', req, httpOptions)
      .pipe(catchError(this.handleError));
  }
  changePassword(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'changePassword', req, httpOptions)
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
