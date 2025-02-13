import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StaticClass } from '../helper/static-words';
import { LocalStorageService } from '../services/local-storage.service';

export const apiHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const token = localStorageService.getItem(StaticClass.token);
  const expiryTime = localStorageService.getItem(StaticClass.expiryTime);
  let checkExpiry: boolean = expiryTime ? new Date().getTime() > +expiryTime : true;
  if (!token || checkExpiry) {
    localStorageService.clear();
    // router.navigate([StaticClass.loginPage])
    return next(req)
  }
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })
  return next(reqWithHeader);
};
