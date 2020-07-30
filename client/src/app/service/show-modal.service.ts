import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {
  private modals: any[] = [];

  add(modal: any) {
      // add modal to array of active modals
      this.modals.push(modal);
  }

  remove(id: any) {
      // remove modal from array of active modals
      this.modals = this.modals.filter(x => !(x instanceof id));
  }

  open(id: any):any {
      // open modal specified by id
      let modal: any = this.modals.filter(x => x instanceof id)[0];
      modal.open();
      return modal;
  }

  close(id: any) {
      // close modal specified by id
      let modal: any = this.modals.filter(x => x instanceof id)[0];
      modal.close();
  }
}
