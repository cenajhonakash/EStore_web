import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../service/security/keycloak.service';
import { ToastrService } from 'ngx-toastr';

export const storeManagerGuardGuard: CanActivateFn = (route, state) => {
  const kyck = inject(KeycloakService)
  const tostr = inject(ToastrService)
  const rout = inject(Router)
  if (kyck.userHasRole('STORE_ASSOCIATE'))
    return true;
  else {
    tostr.warning('You are not authorized to view this page', 'Warning')
    rout.navigate(['/home'])
    return false;
  }
};
