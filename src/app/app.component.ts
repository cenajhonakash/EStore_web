import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Store';
  constructor(private toastr: ToastrService){}
  showPopup(){
    this.toastr.success('Thanks for choosing us!','Please visit again');
  }
}
