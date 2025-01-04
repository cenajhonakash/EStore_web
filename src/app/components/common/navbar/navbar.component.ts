import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeycloakService } from 'src/app/service/security/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  collapse = true;
  isUserLoggedIn = false;

  //  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _keycloakService: KeycloakService) { }

  ngOnInit(): void {
    if (this._keycloakService.getUserDetails) {
      this.isUserLoggedIn = true
    }
    console.log('is user logged in '+this.isUserLoggedIn)
  }

  toggle() {
    this.collapse = !this.collapse
  }

}
