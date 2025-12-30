import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
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
            const isLoginReq = req.url.includes('/api/auth/login');
            // case 1: token expired / invalid
            if (error.status === 401 && !isLoginReq) {

                //token expired, try to refresh
                return authService.refresh().pipe(
                    switchMap((res: any) => {
                        localStorage.setItem('accessToken', res.accessToken);

                        const retryReq = req.clone({
                            setHeaders: { Authorization: `Bearer ${res.accessToken}` }
                        });

                        return next(retryReq);
                    }),

                    //if refresh token is also expired, logout 
                    catchError((refreshErr) => {
                        authService.logout();
                        router.navigate(['/login']);
                        return throwError(() => refreshErr);
                    })
                );
            }

            // case 2: No internet / server down
            if(error.status === 0){
                console.error('Network Error: server unreachable.');
            }

            return throwError(() => error);
        })
    )
};