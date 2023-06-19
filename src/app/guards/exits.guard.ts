import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';

export interface OnExit { 
  onExit: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})
export class ExitsGuard implements CanDeactivate<OnExit> {
  constructor(private modalService: ModalService) {}
  canDeactivate(
    component: OnExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canDeactivate');
    this.modalService.setShowModal(false); // Asegúrate de cerrar el modal antes de navegar
  
    return component.onExit ? component.onExit() : true;
  }
  
}