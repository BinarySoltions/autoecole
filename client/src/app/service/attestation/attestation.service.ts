import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Attestation } from 'src/app/entite/attestation.entity';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AttestationModel } from 'src/app/attestation/attestation/attestation.component';
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
export class AttestationService {

  readonly apiUrl = environment.apiEndpoint;

  constructor(private http:HttpClient) { }

  obtenirAttestationById(id):Observable<AttestationModel>{
    return this.http.get<AttestationModel>(this.apiUrl+'attestation/'+id);
  }

  AjouterAttestation(attestation:AttestationModel):Observable<AttestationModel>{
    return this.http.post<AttestationModel>(this.apiUrl+'attestation',attestation,httpOptions)
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
