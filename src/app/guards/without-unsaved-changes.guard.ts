import { CanDeactivateFn } from '@angular/router';



export interface HasUnsavedChanges { 
  hasUnsavedChanges():boolean;
}

export const withoutUnsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges>
  = (component, currentRoute, currentState, nextState) => {
              
    if (component.hasUnsavedChanges()) {
      return confirm('¿Estás seguro de que quieres salir?');
     }
  return true;
};
