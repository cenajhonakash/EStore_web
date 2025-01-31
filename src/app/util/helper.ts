import { Injectable } from "@angular/core";
import { KeycloakService } from "../service/security/keycloak.service";
import { UserRoles } from "../constants/role.enum";

@Injectable({
    providedIn: 'root'
})
export class AppHelper {

    constructor(private _keycloakService: KeycloakService) { }

    public isRoleAdmin() {
        return this._keycloakService.getUserDetails?.roles?.includes(UserRoles[UserRoles.STORE_ADMIN]);
    }

    public userHasRole(roleName: string) {
        return this._keycloakService.userHasRole(roleName);
      }
}