import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SharedServiceModule } from 'src/app/shared/shared/shared-service.module';

@Injectable({
  providedIn: SharedServiceModule
})
export class UserService {

  readonly apiUrl = environment.apiEndpoint;
  
  constructor(private http: HttpClient) { }

  getAll():Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}users`);
  }

  getById(id: number) {
      return this.http.get(`${this.apiUrl}users/${id}`);
  }

  register(user: User) {
      return this.http.post(`${this.apiUrl}auth/register`, user);
  }

  update(user: User) {
      return this.http.put(`${this.apiUrl}users/${user.id}`, user);
  }

  delete(id: number) {
      return this.http.delete(`${this.apiUrl}users/${id}`);
  }
}
