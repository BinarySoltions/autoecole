import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartageService {
  private nombreElevesExpires = new BehaviorSubject<number>(0);
  nombreCourant = this.nombreElevesExpires.asObservable();

  constructor() { }

  nouveauNombre(nombre){
    this.nombreElevesExpires.next(nombre);
  }
}
