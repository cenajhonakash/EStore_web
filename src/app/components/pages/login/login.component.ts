import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/dto/user.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { KeycloakService } from 'src/app/service/security/keycloak.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '', '', '', '', '', '');

  // constructor(private _tostr: ToastrService, private _userService: UserService, public _loader: LoaderService) { }
  constructor(private _keycloak: KeycloakService) { }

  async ngOnInit(): Promise<void> {
    await this._keycloak.init()
    await this._keycloak.login()
  }

  onLoginSubmit(event: SubmitEvent, signupForm: NgForm) { }

}
