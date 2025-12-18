import { Component } from '@angular/core';

@Component({
  selector: 'app-access-matrix',
  imports: [],
  templateUrl: './access-matrix.component.html',
  styleUrl: './access-matrix.component.css',
})
export class AccessMatrixComponent {
  roles = [
    { name: 'Manager', permissions: ['create_article', 'edit_article', 'delete_article','view_article','access_matrix'] },
    { name: 'Editor', permissions: ['create_article', 'edit_article','view_article'] },
    { name: 'Viewer', permissions: ['view_article'] },
    { name: 'Admin', permissions: ['create_article', 'edit_article', 'delete_article','view_article','access_matrix','manage_users'] },
  ]

  hasPermission(role: any, permission: string): boolean {
    return role.permissions.includes(permission);
  }
}
