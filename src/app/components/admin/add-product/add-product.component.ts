import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ItemRequest } from 'src/app/dto/inventory/request/item-request.model';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { ProductService } from 'src/app/service/inventory/product.service';
import { setCategories } from 'src/app/store/inventory/category.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ItemRequest = new ItemRequest();
  categories: CategoryResponse[] = []

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _cStore: Store<{ categories: CategoryResponse[] }>, private _productService: ProductService, private _router: Router) { }

  ngOnInit(): void {
    console.log('Inside add product')
    this._cStore.select("categories").subscribe({
      next: categories => {
        if (categories.length > 0) {
          this.categories = categories
        } else {
          // Service call
          this._categoryService.getCategories().subscribe({
            next: (data) => {
              this.categories = data
              if (this.categories.length > 0)
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
      console.log('product is ' + JSON.stringify(this.product))
      this._productService.addProduct(this.product).subscribe(
        {
          next: (data) => {
            console.log('Added product')
            const ind = this.categories.findIndex(cat => cat.id === this.product.category + '');
            const catexis = this.categories[ind];
            const newCat = new CategoryResponse(catexis.name, catexis.about, catexis.coverImage, catexis.id, this.categories[ind].products.concat(data), catexis.images, catexis.totalItems);

            this.categories = this.categories.filter(cat => cat.id != this.product.category + '').concat(newCat);
            this._cStore.dispatch(setCategories({ categories: this.categories }))

            this._toast.success('Product Added succesfully!!!')
            this._router.navigate(['/admin/categories'])
          },
          error: error => {
            console.log('error adding item' + error)
            this._toast.error('Error addin item', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
          }
        }
      );
    }
  }
}
