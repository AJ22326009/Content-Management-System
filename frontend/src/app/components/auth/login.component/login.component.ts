import { Component} from '@angular/core';
import { AuthService } from '../../../services/auth';
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
 
constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
}

  login() {
    this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe({
      next: (res) => {
        // Successful login handled in AuthService
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      }
    })
  }
  
}
