import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}api/users`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<User>(`${environment.apiUrl}api/users/${id}`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}api/users/delete/${id}`);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}api/users/update/${id}`, user);
  }

  registerUser({fullname, email, password, role, imageUrl}: {fullname: string, email: string, password: string, role: string, imageUrl: string}): Observable<User> {
    const user = {fullname, email, password, role, imageUrl};
    return this.http.post<User>(`${environment.apiUrl}api/users/register`, user);
  }
}
