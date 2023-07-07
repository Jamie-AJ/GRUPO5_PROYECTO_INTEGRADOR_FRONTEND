import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const hasRoleGuard: CanActivateFn = (route, state) => {

  const authService: LoginService = inject(LoginService);
  // const router = inject(Router);
  if(authService.getUserRole() === 'ADMIN'){
    return true;
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes permisos para acceder a esta ruta!',
    });
    return false;
  }
};
