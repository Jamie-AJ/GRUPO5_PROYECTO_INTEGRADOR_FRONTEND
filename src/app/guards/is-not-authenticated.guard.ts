import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService:LoginService =inject(LoginService);
  const router = inject(Router);
  
  if(authService.isLoggedIn()){
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
