import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Module } from 'src/app/entite/module.entity';
import { environment } from 'src/environments/environment';
import { HttpHeaders,HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ModuleModel } from 'src/app/module/ajouter-module/ajouter-module.component';
import { Eleve } from 'src/app/entite/eleve.entity';
import { Phase } from 'src/app/entite/phase.entity';
import { PhaseModel } from 'src/app/phase/module/phase-module/phase-module.component';
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
export class ModuleService {

  readonly apiUrl = environment.apiEndpoint;


  constructor(private http: HttpClient) { }

  obtnenirModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl + 'modules');
  }

  ajouterModuleEleves(module: ModuleModel): Observable<{'valid':boolean}> {
    return this.http.post<{'valid':boolean}>(this.apiUrl + 'module_eleves', module, httpOptions)
      .pipe(catchError(this.handleError));
  }
  ajouterPhaseModule(phaseModule:PhaseModel):Observable<Phase[]>{
    return this.http.post<Phase[]>(this.apiUrl+'module',phaseModule,httpOptions)
    .pipe(catchError(this.handleError));
  }

  obtnenirSorties(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl + 'sorties');
  }

  obtnenirSortiesEleve(id): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl + 'sorties/'+id);
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
