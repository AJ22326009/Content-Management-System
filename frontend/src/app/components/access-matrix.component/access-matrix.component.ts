import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role';
import { PermissionService } from '../../services/permission';
import { Permission } from '../../models/permission.model';


@Component({
  selector: 'app-access-matrix',
  imports: [],
  templateUrl: './access-matrix.component.html',
  styleUrl: './access-matrix.component.css',
})
export class AccessMatrixComponent implements OnInit {
  roles: any[] = [];
  permissions: Permission[] = [];
  loadingPermissions: boolean = false;
  loadingRoles: boolean = false;
  error: string |null = null;

  constructor(private roleService: RoleService, private permissionService: PermissionService) {}

  ngOnInit() {
    this.loadRoles();
    this.loadPermissions();
    // console.log(this.roles);
    // console.log(this.permissions);
  }

  loadRoles() {
    this.loadingRoles = true;
    this.roleService.getRoles().subscribe({
      next: (data: any)=>{this.roles = data.roles; this.loadingRoles = false;},
      error: err=>{this.error = err?.message || 'failed to load roles'; this.loadingRoles = false;}
    });
  }

  loadPermissions() {
    this.loadingPermissions = true;
    this.permissionService.getPermissions().subscribe({
      next: (data: any)=> { this.permissions = data.permissions; this.loadingPermissions = false;},
      error: err => { this.error = err?.message || 'failed to load permissions'; this.loadingPermissions = false; }
    });
  }

  isRoleHavingPermission(role: any, permission: Permission): boolean {
    return role.permissions.includes(permission._id);
  }
}
