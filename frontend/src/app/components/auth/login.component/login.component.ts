import { Component} from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  email: string = '';
  password: string = '';

constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({email: this.email, password: this.password}).subscribe({
      next: (res) => {
        // Successful login handled in AuthService
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      }
    })
  }
  
}
