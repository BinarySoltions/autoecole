import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: SharedServiceModule
})
export class PublicErrorInterceptorService implements HttpInterceptor{

  constructor(private authenticationService:AuthenticationService,
    private spinner: NgxSpinnerService,private toastr: ToastrService,
    private router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logoutPublic();
          this.spinner.hide();
          this.toastr.error('Session expirée !/ Session timeout !','Erreur/Error',{ timeOut: 10000 });
          this.router.navigate(['/public/reservation']);
         // location.reload(true);
      }
      
      const error = err.error.message || err.statusText;
      return throwError(error);
  }))
  }
}
