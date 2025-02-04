import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, switchMap, take, takeUntil } from 'rxjs';
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
      this._toast.error('Fields marked with * are mandatory!', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 });
    } else {
      this._categoryService.addCategory(this.category).subscribe(
        {
          next: (data) => {
            this.validateAndAddCategoryToStore(data);
            this._toast.success('Added succesfully!!!')
            // this._router.navigate(['/admin/categories'])
          },
          error: error => {
            console.log('error creating category' + error)
            this._toast.error('Error creating category', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
          }
        }
      );
    }
  }

  private validateAndAddCategoryToStore(data: CategoryResponse) {
    console.log('inside private method validateAndAddCategoryToStore')
    var currentCategories = lastValueFrom(this._cStore.pipe(select("categories"), take(1)));
    currentCategories.then((result) => {
      console.log('Inside promise resolutin')
      if(result.length > 0){
        this._cStore.dispatch(setCategories({ categories: result.concat(data) }));
      }
    });
  }

}


