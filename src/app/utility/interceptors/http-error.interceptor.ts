import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StaticClass } from '../helper/static-words';
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  let errorMessage: string = 'An unknown error occurred!';
  const badRequest: string = "Bad Request. Please check your input.";
  const unAuthorized: string = "Unauthorized. Please login again.";
  const serverError: string = "Server error. Please try again later.";
  const unexpectedError: string = "An Unexpected Error Occured";
  const serverOff: string = "Unable to connect to server";

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          errorMessage = serverOff;
          router.navigate([StaticClass.loginPage]);
        }
        else {
          switch (error.status) {
            case 400:
              errorMessage = error.error || badRequest;
              break;
            case 401:
              errorMessage = unAuthorized;
              router.navigate(['/login']);
              break;
            case 500:
              errorMessage = serverError;
              break;
            default:
              errorMessage = error.error || unexpectedError;
              break;
          }
        }
      }
      return throwError(() => new HttpErrorResponse({
        error: errorMessage
      }));
    })
  );
};

