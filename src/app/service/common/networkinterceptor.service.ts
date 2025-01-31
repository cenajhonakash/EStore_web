import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { KeycloakService } from '../security/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkinterceptorService implements HttpInterceptor {

  constructor(public _loader: LoaderService, private _keycloak: KeycloakService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loader.isLoading.next(true);

    // add token in header
    if (this._keycloak.getUserDetails?.token) {
      //console.log('Token from keycloak' + this._keycloak.getUserDetails?.token)
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+ this._keycloak.getUserDetails.token
        }
      })
    }
    return next.handle(req).pipe(
      finalize(
        () => {
          this._loader.isLoading.next(false)
        }
      )
    )
  }
}
