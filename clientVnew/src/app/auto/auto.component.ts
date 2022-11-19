import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { User } from '../auth/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav : MatSidenav;
 
  currentUser: User;
isExamen = false;
showFiller = false;
constructor(private translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private observer: BreakpointObserver
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang('fr');
}

ngAfterViewInit() {
  this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
    if (res.matches ) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  });
}
logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

onActivate(value){
    this.isExamen = false;
}

checkLogin(){
  return this.authenticationService.currentUserValue;
}
}
