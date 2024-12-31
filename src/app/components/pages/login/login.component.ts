import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/dto/user.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = new User('', '', '', '', '', '', '');

  constructor(private _tostr: ToastrService, private _userService: UserService, public _loader: LoaderService) { }

  onLoginSubmit(event: SubmitEvent, signupForm: NgForm) {}

}
