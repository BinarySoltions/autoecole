import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ShowModalService } from './show-modal.service';
import { ConfirmerChangementComponent } from '../modal/confirmer-changement/confirmer-changement.component';
import { SharedServiceModule } from '../shared/shared/shared-service.module';
export interface PeutEtreDeactivate{
  estPropre():boolean | Observable<boolean>;
}

@Injectable({
  providedIn: SharedServiceModule
})
export class ChangementGuardService implements  CanDeactivate<PeutEtreDeactivate>{

  constructor(private showModalService:ShowModalService) { }

  canDeactivate(component: PeutEtreDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean |  Observable<boolean> {
    const result =  component.estPropre()?true: this.confirmDialog();
    return result;
  }

confirmDialog(){
    let modal = <ConfirmerChangementComponent>this.showModalService.open(ConfirmerChangementComponent);
    return modal.onClose;
  }
}
