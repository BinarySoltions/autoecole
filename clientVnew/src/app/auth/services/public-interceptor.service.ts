import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';
import { User } from '../user.model';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: SharedServiceModule
})
export class PublicInterceptorService implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ headers: request.headers.append('X-TENANT-ID', environment.tenant) });

    let currentUserPublic = this.authenticationService.currentUserPublicValue;
    if(currentUserPublic && currentUserPublic.access_token){
      request =  request.clone({ headers: request.headers.append('Authorization', `Bearer ${currentUserPublic.access_token}`) });
    }


    return next.handle(request);
}
}
