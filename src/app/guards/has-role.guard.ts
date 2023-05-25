import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state) => {

  const authService: LoginService = inject(LoginService);
  // const router = inject(Router);
  if(authService.getUserRole() === 'ADMIN'){
    return true;
  }else{
    alert('Acceso denegado');
    return false;
  }
};
