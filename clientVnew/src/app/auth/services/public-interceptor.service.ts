import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';
import { User } from '../user.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: SharedServiceModule
})
export class PublicInterceptorService implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUserPublic = this.authenticationService.currentUserPublicValue;
    if(!currentUserPublic){
      currentUserPublic = new User;
    }
 
      request = request.clone({
        setHeaders: { 
              'X-Header-Public': `${currentUserPublic.access_token}`
            }
      });
    

    return next.handle(request);
}
}