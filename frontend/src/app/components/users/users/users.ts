import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user';
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  error: string = '';
  success: string = '';
  deletingUserId: string | null = null;


  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.loadUsers();
  }

  editUser(id: string){
    this.router.navigate(['/users/edit', id]);
  }

  private loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
      this.users = data.users;
      this.loading = false;
    },
      error: (err) => {
        this.error = 'Error loading users';
        this.loading = false;

        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
      
    });
  }

  deleteUser(id: string) {
    this.deletingUserId = id;
    if(confirm("Are you sure you want to delete this user?")){
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.deletingUserId = null;
          this.users = this.users.filter(user => user._id !== id);
          this.success = 'User deleted successfully';
          setTimeout(() => {
            this.success = '';
          }, 3000);
        },
        error: (err) => {
          this.deletingUserId = null;
          this.error = 'Error deleting user';
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      });
    }
  }

}
