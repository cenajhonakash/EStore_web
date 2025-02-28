import { Component, OnInit, signal, TemplateRef, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, switchMap, take } from 'rxjs';
import { ImageDetails } from 'src/app/dto/imageDetails.model';
import { CategoryRequest } from 'src/app/dto/inventory/request/category-request.model';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { ItemResponse } from 'src/app/dto/inventory/response/product.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { setCategories } from 'src/app/store/inventory/category.action';
import { setProducts } from 'src/app/store/inventory/product.action';
import { AppHelper } from 'src/app/util/helper';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: CategoryResponse[] = []
  pickedCategory?: CategoryResponse
  isAdmin: any;
  toUpdateCategory: CategoryRequest = new CategoryRequest('', '', '')
  images: ImageDetails[] = [];

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _helper: AppHelper, private modalService: NgbModal
    , private _cStore: Store<{ categories: CategoryResponse[] }>, private _pStore: Store<{ products: ItemResponse[] }>
  ) { }

  ngOnInit(): void {
    console.log('Inside view cat init')
    this.isAdmin = this._helper.isRoleAdmin()
    this._cStore.select("categories").subscribe({
      next: categories => {
        if (categories.length > 0) {
          console.log('category already in store')
          this.categories = categories
          //console.log('All Categories: '+ JSON.stringify(this.categories))
        } else {
          console.log('Loading category from backend')
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


  open(content: any, category: CategoryResponse) {
    this.pickedCategory = category
    // TODO for STORE-MANAGER role, view sales data of the category in last one month | Call view Sales API
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  deleteCategory(content: any, category: CategoryResponse) {
    this.pickedCategory = category
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        // Call service
        this._categoryService.deleteCategory(category.id).subscribe({
          next: (data) => {
            this._toast.success('Deleted category: ' + category.name, 'Success', { positionClass: 'toast-center-center', timeOut: 3000 })
            this.modalService.dismissAll();
            this.categories = this.categories.filter(c => c.id != category.id);
            this._cStore.dispatch(setCategories({ categories: this.categories }))
            this.deleteProductFromStoreForCategory(category.id)
          },
          error: error => {
            console.log('error creating category' + error)
            this._toast.error('Error deleting category: ' + category.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
          }
        })
      });
  }

  updateCategory(category: CategoryRequest, id: String) {
    // Call service
    this._categoryService.updateCat(this.toUpdateCategory, id, this.images).subscribe({
      next: (data) => {
        this._toast.success('Updated category: ' + this.pickedCategory!.name, 'Success', { positionClass: 'toast-center-center', timeOut: 3000 })
        const ind = this.categories.findIndex(c => c.id == this.pickedCategory!.id);
        console.log('Total categories: ' + this.categories.length + ' and index is' + ind)

        const catexis = this.categories[ind];
        const newCat = new CategoryResponse(data.name, data.about, '', data.id, [], data.images, catexis.totalItems)
        this.categories = this.categories.filter(c => c.id != data.id).concat(newCat)

        // this.categories[ind] = data
        this._cStore.dispatch(setCategories({ categories: this.categories }))
        this.modalService.dismissAll();
      },
      error: error => {
        console.log('error updating category' + error)
        this._toast.error('Error updating category: ' + this.pickedCategory!.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
      }
    });
  }

  onImageChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.images = Array.from(files).map(file => {
        if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/webp') {
          this._toast.warning('Format not supported for file: ' + file.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
        } else if (file.size > 60000) { // 30000 = 30KB
          this._toast.warning('Size not supported for file: ' + file.name, 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
        }
        else {
          const pu = URL.createObjectURL(file);
          const imgD: ImageDetails = { previewImage: pu, file: file }
          return imgD
        }
        return { previewImage: '', file: undefined }
      }).filter(file => file.previewImage != '');
    }
  }

  private deleteProductFromStoreForCategory(cId: String) {
    console.log('inside private method deleteProductFromStoreForCategory')
    var products = lastValueFrom(this._pStore.pipe(select("products"), take(1)));
    products.then((result) => {
      console.log('Deleting product')
      if (result.length > 0) {
        this._pStore.dispatch(setProducts({ products: result.filter(p => p.cId != cId) }));
      }
    });
  }

}
