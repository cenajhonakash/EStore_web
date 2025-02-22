import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import Keycloak from 'keycloak-js';
import { UserProfile } from 'src/app/dto/user-profile';
import { setUser } from 'src/app/store/user.action';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined
  private _userProfile: UserProfile | undefined

  constructor(private _userStore: Store<{ user: UserProfile }>) { }

  async init() {
    console.log('Intitalizing Keycloak server')
    const authenticated = await this.keycloakInstance?.init({
      onLoad: 'login-required'
    })
    console.log('Intitalized Keycloak server')
    if (authenticated) {
      //console.log('user authenticated successfully!'+this._keycloak?.userInfo+this._keycloak?.loadUserInfo()+this._keycloak?.loadUserProfile())
      this._userProfile = (await this._keycloak?.loadUserProfile()) as UserProfile
      //console.log('user authenticated successfully!'+JSON.stringify(this._keycloak?.tokenParsed))
      this._userProfile.token = this._keycloak?.token
      this._userProfile.roles = this._keycloak?.realmAccess?.roles

      this._userStore.dispatch(setUser({ user: this._userProfile }))
      // console.log('roles from KY: ' + this._keycloak?.realmAccess?.roles)
      // console.log('User details: '+ this._userProfile.roles)
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
  get getUserDetails(): UserProfile | undefined {
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

  public userHasRole(roleName: string) {
    return this._keycloak?.hasRealmRole(roleName)
  }
}
