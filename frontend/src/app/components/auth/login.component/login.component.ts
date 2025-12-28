import { Component} from '@angular/core';
import { AuthService } from '../../../services/auth/auth';
import { Router } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  email: string = '';
  password: string = '';
  loginForm: FormGroup;
  loading: boolean = false;
  error: string|null = null;
 
constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
}

  login() {
    this.loading = true;
    this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe({
      next: (res) => {
        // Successful login handled in AuthService
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error.message || 'An error occurred during login.';

        this.loading = false;
        setTimeout(() => {
          this.error = null;
        }, 4000);
        
        this.loginForm.reset();
      }
    })
  }
  
}
