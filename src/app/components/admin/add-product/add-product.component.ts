import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ItemRequest } from 'src/app/dto/inventory/request/item-request.model';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { setCategories } from 'src/app/store/inventory/category.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ItemRequest = new ItemRequest();
  categories: CategoryResponse[] = []

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _cStore: Store<{ categories: CategoryResponse[] }>) { }

  ngOnInit(): void {
    console.log('Inside add product')
    this._cStore.select("categories").subscribe({
      next: categories => {
        if (categories.length > 0) {
          console.log('add-p category already in store')
          this.categories = categories
        } else {
          console.log('add-p Loading category from backend')
          // Service call
          this._categoryService.getCategories().subscribe({
            next: (data) => {
              this.categories = data
              this._cStore.dispatch(setCategories({ categories: this.categories }))
            },
            error: error => {
              console.log('error loading category' + error)
              this._toast.error('Error loading category', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 })
            }
          })
        }
      }
    });
  }

  onSubmit(event: SubmitEvent, productForm: NgForm) {
    event.preventDefault();
    if (productForm.invalid) {
      console.log('Invalid product' + this.product)
      this._toast.error('Fields marked with * are mandatory!', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 });
    } else {

    }
  }
}
