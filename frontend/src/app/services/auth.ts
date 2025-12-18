import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any= null
  login(){this.user = {
    fullname: 'Algasim Jallow',
    email: 'algsim@utg',
    role: {
      name: 'Manager',
      permissions: ['create_article', 'edit_article', 'delete_article','view_article'],
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
    this.user = null;
  }
}
