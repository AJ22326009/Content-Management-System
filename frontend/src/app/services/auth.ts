import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any= null
  constructor(private http: HttpClient, private router: Router) {}

  public restoreUserFromToken() {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return;

    try {
      const decoded = jwtDecode<any>(accessToken);
      this.user = decoded;
    } catch (error) {
      this.logout();
    }
  }
  
  login(credentials: { email: string; password: string }) {

    return this.http.post<any>(`${environment.apiUrl}api/auth/login`, credentials).pipe(
      tap(res=>{
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        
        const decoded=jwtDecode<any>(res.accessToken);
        this.user=decoded;
        
        this.router.navigate(['/dashboard']);
      })
  )}
  
  getUser(): any | null {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  hasPermission(permission: string): boolean {
    return this.user.permissions.includes(permission);
  }

  logout(){
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.http.post(`${environment.apiUrl}api/auth/logout`, { refreshToken }).subscribe();
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.user = null;
  }
}
