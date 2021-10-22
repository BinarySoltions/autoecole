import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: SharedServiceModule
})
export class AuthPublicGuardService implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    const currentUser = this.authenticationService.currentUserPublicValue;
    if (currentUser) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/public/reservation'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

