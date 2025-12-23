import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
   constructor(private http: HttpClient) {}

   getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.apiUrl}api/permissions`);
   }
}
