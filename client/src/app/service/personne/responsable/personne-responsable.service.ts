import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders,HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { PersonneResponsable } from 'src/app/entite/personne-responsable.entity';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
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
export class PersonneResponsableService {

  readonly apiUrl = environment.apiEndpoint;
  
  constructor(private http:HttpClient,
    private toastr:ToastrService) { }

  obtnenirPersonnesResponsables(): Observable<PersonneResponsable[]> {
    return this.http.get<PersonneResponsable[]>(this.apiUrl + 'personnes');
  }
  ajouterPersonneResponsable(personne: PersonneResponsable): Observable<PersonneResponsable[]> {
    return this.http.post<PersonneResponsable[]>(this.apiUrl + 'personne', personne, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    var errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred:' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      
       errorMessage =  `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`;
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
