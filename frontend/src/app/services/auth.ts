import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}
  private user: any= null
  login(){this.user = {
    fullname: 'Algasim Jallow',
    email: 'algsim@utg',
    imageUrl: 'https://github.com/AJ22326009/Admin-Dashboard/blob/main/src/assets/Algasim.jpg?raw=true',
    role: {
      name: 'Manager',
      permissions: ['create_article', 'edit_article', 'delete_article','view_article','access_matrix','manage_users','view_permissions',
        'view_roles', 'edit_role_permissions','publish_article'
      ]
    }
  }
}
  getUser(): User | null {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  hasPermission(permission: string): boolean {
    return !!this.user?.role.permissions.includes(permission);
  }

  logout(){
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.http.post(environment.logoutUrl, { refreshToken }).subscribe();
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.user = null;
  }
}
