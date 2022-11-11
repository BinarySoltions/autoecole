import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SharedServiceModule } from '../shared/shared/shared-service.module';

@Injectable({
  providedIn: SharedServiceModule
})
export class PartageService {
  private nombreElevesExpires = new BehaviorSubject<number>(0);
  nombreCourant = this.nombreElevesExpires.asObservable();

  constructor() { }

  nouveauNombre(nombre){
    this.nombreElevesExpires.next(nombre);
  }
}
