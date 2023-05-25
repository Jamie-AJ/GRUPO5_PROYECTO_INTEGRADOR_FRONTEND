import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { AuthModule } from '../auth/auth.module';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router:Router, private authService:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      const allowebRole = route.data?.['allowedRole'];
    return this.authService.getUserRole().pipe(
      map((role)=>Boolean(role && allowebRole?.includes('ADMINISTRADOR'))),
      tap((hasAccess)=> hasAccess === false && alert('Acceso denegado'))
    );
  } 
  
}
