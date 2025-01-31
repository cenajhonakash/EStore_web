import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryRequest } from 'src/app/dto/inventory/request/category-request.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category: CategoryRequest = new CategoryRequest('', '', '')

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService) { }

  onFormSubmit(event: SubmitEvent, addCategoryForm: NgForm) {
    event.preventDefault();
    if (addCategoryForm.invalid) {
      console.log('Invalid category' + this.category)
      this._toast.error('Fields marked with * are mandatory!', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 });
    } else {
      this._categoryService.addCategory(this.category).subscribe(
        {
          next: (data) => {
            this._toast.success('Added succesfully!!!')
          },
          error: error => {
            console.log('error creating category' + error)
            this._toast.error('Error creating category', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 })
          }
        }
      );
    }
  }
}


