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
      return this.http.get<User[]>(`${this.apiUrl}User`);
  }

  getById(id: number) {
      return this.http.get(`${this.apiUrl}User/${id}`);
  }

  register(user: User) {
      return this.http.post(`${this.apiUrl}auth/register`, user);
  }

  update(user: User) {
      return this.http.put(`${this.apiUrl}User/${user.id}`, user);
  }

  delete(id: number) {
      return this.http.delete(`${this.apiUrl}User/${id}`);
  }
}
