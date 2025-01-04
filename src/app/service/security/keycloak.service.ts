import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined

  constructor() { }

  async init() {
    console.log('Intitalizing Keycloak server')
    const authenticated = await this.keycloakInstance?.init({
      onLoad: 'login-required'
    })
    console.log('Intitalized Keycloak server')
    if (authenticated) {
      console.log('user authenticated successfully!')
    }
  }

  // Creating single instance of Keycloak
  get keycloakInstance() {
    console.log('Getting realm details')
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8888',
        realm: 'Estore_Space',
        clientId: 'est-client-xyz-19'
      })
    }
    return this._keycloak;
  }
}
