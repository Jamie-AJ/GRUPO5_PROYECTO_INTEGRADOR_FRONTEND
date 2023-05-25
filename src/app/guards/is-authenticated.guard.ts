import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService =inject(LoginService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
