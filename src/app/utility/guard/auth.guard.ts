import { CanActivateFn, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(AppComponent.token);
  const router: Router = inject(Router);
  if (token == null || token == '') {
    router.navigate(['/not-found']);
    return false;
  }
  else {
    return true;
  }
};
