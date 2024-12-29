import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/dto/user.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = new User('', '', '', '', '', '', '');

  constructor(private _tostr: ToastrService, private _userService: UserService) { }

  onFormSubmit(event: SubmitEvent, signupForm: NgForm) {
    if (signupForm.valid) {
      console.log('user details', signupForm)
      this._userService.registerNewUser(this.user).subscribe({
        next: (user) => {
          //success
          this._tostr.success('Signed Up. Hooray!!!')
          signupForm.resetForm()
        }, error: (error) => {
          // runtime error
          this._tostr.error('Error signing up, please try after sometime')
          console.log(error)
        }, complete: () => { }
      })
    } else {
      this._tostr.error('Fields marked with * are mandatory!')
    }
  }
}
