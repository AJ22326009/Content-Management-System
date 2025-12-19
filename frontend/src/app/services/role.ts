import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<Role[]>(environment.roleApiUrl);
  }
  
  updateRolePermissions(roleId: string, permissions: string[]) {
    return this.http.put<Role>(`${environment.roleApiUrl}/${roleId}/permissions`, { permissions });
  }
}
