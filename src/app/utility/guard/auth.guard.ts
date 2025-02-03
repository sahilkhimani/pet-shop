import { CanActivateFn, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { inject } from '@angular/core';
import { StaticClass } from '../helper/static-words';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getItem<string>(StaticClass.token);
  const role = localStorageService.getItem<string>(StaticClass.role);
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
