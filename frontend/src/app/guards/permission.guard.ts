import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth';

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermission = route.data['permission'] as string;

  if(!requiredPermission){
    return true; // No specific permission required
  }

  if(authService.hasPermission(requiredPermission)){
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
