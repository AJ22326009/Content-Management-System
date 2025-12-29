import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any= null
  constructor(private http: HttpClient, private router: Router) {}

  restoreUserFromToken() {
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

  refresh(): Observable<any>{
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }
    return this.http.post<any>(`${environment.apiUrl}api/auth/refresh`, { refreshToken }).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('accessToken', res.accessToken);
          const decoded = jwtDecode<any>(res.accessToken);
          this.user = decoded;
          console.log('Token refreshed successfully');
        },
        error: () => {
          this.logout();
        }
      })
    );
  }
}
