import { CanDeactivateFn } from '@angular/router';

export const exitsGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
