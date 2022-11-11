import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payement } from './payement.model';
import { Eleve } from '../entite/eleve.entity';
import { TotalPayement } from './total/total.component';
import { SharedServiceModule } from '../shared/shared/shared-service.module';
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
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: SharedServiceModule
})
export class PayementService {

  readonly apiUrl = environment.apiEndpoint;


  constructor(private http: HttpClient) { }

  obtnenirPayements(id:number): Observable<Eleve> {
    return this.http.get<Eleve>(this.apiUrl + 'payements/'+id);
  }

  ajouterPayement(payement:Payement):Observable<Eleve>{
    return this.http.post<Eleve>(this.apiUrl+'payer',payement,httpOptions)
    .pipe(catchError(this.handleError));
  }
  obtnenirTotalPayementsByDates(totalPayement:TotalPayement): Observable<TotalPayement> {
    return this.http.post<TotalPayement>(this.apiUrl + 'payements',totalPayement,httpOptions);
  }
  genererPDF(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'printPayment', req, httpOptions2)
      .pipe(catchError(this.handleError));
  }
  obtnenirDetailsPayements(totalPayement:TotalPayement): Observable<TotalPayement> {
    return this.http.post<TotalPayement>(this.apiUrl + 'detailsPayements',totalPayement,httpOptions);
  }

  genererFacturePersoPDF(req:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'printFacturePerso', req, httpOptions2)
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
