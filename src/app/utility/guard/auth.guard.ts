import { CanActivateFn, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { inject } from '@angular/core';
import { StaticClass } from '../helper/static-words';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const token = localStorage.getItem(AppComponent.token);
  const role = localStorage.getItem(AppComponent.role);

  if (token == null || token == '' || role == null) {
    router.navigate([StaticClass.loginPage]);
    return false;
  }
  else {
    const expectedRole = route.data['role'] as string[];
    if (expectedRole.includes(role)) {
      return true;
    }
    router.navigate([StaticClass.notFound])
    return false;
  }
};
