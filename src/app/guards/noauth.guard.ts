import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSvcService } from '../services/auth-svc.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const noauthGuard: CanActivateFn = (route, state) => {
  let authSvc = inject(AuthSvcService);
  let router = inject(Router);
  let alert = inject(MatSnackBar)
  if (authSvc.currentUserToken) {
    return true;
  }
  else {
    alert.open('You must be logged in to view your lists!','Close', {verticalPosition:'bottom',duration:4000,})
    router.navigate(['/login'])
    return false;

  }
};
