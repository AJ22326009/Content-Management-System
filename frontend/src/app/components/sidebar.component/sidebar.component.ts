import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(public authService: AuthService, private router: Router) {}
   logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  can(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }
}
