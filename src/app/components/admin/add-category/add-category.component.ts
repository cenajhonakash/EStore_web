import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { CategoryRequest } from 'src/app/dto/inventory/request/category-request.model';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { setCategories } from 'src/app/store/inventory/category.action';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category: CategoryRequest = new CategoryRequest('', '', '')

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _router: Router, private _cStore: Store<{ categories: CategoryResponse[] }>) { }

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
            this.validateAndAddCategoryToStore(data);
            this._router.navigate(['/admin/categories'])
          },
          error: error => {
            console.log('error creating category' + error)
            this._toast.error('Error creating category', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 })
          }
        }
      );
    }
  }

  private validateAndAddCategoryToStore(data: CategoryResponse) {
    this._cStore.select("categories").subscribe({
      next: categories => {
        // If category is already loaded then update the category array with newly created category
        if (categories.length > 0) {
          console.log('No category yet loaded')
          let tc = categories;
          tc = tc.concat(data)
          this._cStore.dispatch(setCategories({
            categories:
              tc
          }));
        }
      }
    });
  }

}


