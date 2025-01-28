import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryRequest } from 'src/app/dto/inventory/request/category-request.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category: CategoryRequest = new CategoryRequest('', '', '')

  constructor(private _toast: ToastrService) { }

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault()
  }
}
