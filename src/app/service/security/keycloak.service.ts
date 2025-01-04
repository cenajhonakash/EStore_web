import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from 'src/app/dto/user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined
  private _userProfile: UserProfile | undefined 

  constructor() { }

  async init() {
    console.log('Intitalizing Keycloak server')
    const authenticated = await this.keycloakInstance?.init({
      onLoad: 'login-required'
    })
    console.log('Intitalized Keycloak server')
    if (authenticated) {
      console.log('user authenticated successfully!')
      this._userProfile = (await this._keycloak?.loadUserProfile()) as UserProfile
      this._userProfile.token = this._keycloak?.token
    }
  }

  // Creating single instance of Keycloak
  get keycloakInstance() {
    console.log('Getting realm details')
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8888',
        realm: 'Estore_Space',
        clientId: 'EST-UI-v1-2025'
      })
    }
    return this._keycloak;
  }

  // Fetch logged in user details from Keycloak server
  get getUserDetails() : UserProfile | undefined {
    return this._userProfile
  }

  // login redirect
  login() {
    return this._keycloak?.login()
  }

  // logout redirect
  logout() {
    return this._keycloak?.logout()
  }
}
