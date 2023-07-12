import { CanDeactivateFn } from '@angular/router';
import { AddOportunitiesComponent } from '../proyecto/pages/oportunidades/pages/add-oportunities/add-oportunities.component';
import { WalletComponent } from '../proyecto/pages/wallet/wallet.component';
import { AcountStatusComponent } from '../proyecto/pages/acount-status/acount-status.component';

export const withoutUnsavedChangesGuard: CanDeactivateFn<AcountStatusComponent>
  = (component, currentRoute, currentState, nextState) => {
              
    if (component.form.dirty) {
      return confirm('¿Estás seguro de que quieres salir?');
     }
  return true;
};
