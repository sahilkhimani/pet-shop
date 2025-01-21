import { CanActivateFn, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const token = localStorage.getItem(AppComponent.token);
  const role = localStorage.getItem(AppComponent.role);

  if (role && (token != null || token != '')) {
    const expectedRole = route.data['role'];
    if (role === expectedRole) {
      return true;
    }
    else {
      router.navigate(['/not-found']);
      return false;
    }
  }
  else {
    router.navigate(['/not-found']);
    return false;
  }
};
