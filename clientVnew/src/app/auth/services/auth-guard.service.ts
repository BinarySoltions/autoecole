import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';

@Injectable({
  providedIn: SharedServiceModule
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
