import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppHelper } from 'src/app/util/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _toast: ToastrService, private _router: Router, private _helper: AppHelper) { }

  ngOnInit(): void {
    if (this._helper.isRoleAdmin()) {
      this._router.navigate(['/admin'])
    } else {
      this._router.navigate(['/home'])
    }
  }

}
