import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            // case 1: token expired / invalid
            if (error.status === 401) {
                authService.logout();
                router.navigate(['/login']);
            }

            // case 2: No internet / server down
            if(error.status === 0){
                console.error('Network Error: server unreachable.');
            }

            return throwError(() => error);
        })
    )
};