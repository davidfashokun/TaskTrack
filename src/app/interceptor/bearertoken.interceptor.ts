import { HttpInterceptorFn } from '@angular/common/http';
import { AuthSvcService } from '../services/auth-svc.service';
import { inject } from '@angular/core';

export const bearertokenInterceptor: HttpInterceptorFn = (req, next) => {
  let authSvc = inject(AuthSvcService)

  if (authSvc.currentUserToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authSvc.currentUserToken.token}`
      }
    })
  }
  return next(req);
};
