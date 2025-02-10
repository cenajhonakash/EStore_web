import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ImageDetails } from 'src/app/dto/imageDetails.model';
import { ItemRequest } from 'src/app/dto/inventory/request/item-request.model';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { ItemResponse } from 'src/app/dto/inventory/response/product.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { ProductService } from 'src/app/service/inventory/product.service';
import { AppHelper } from 'src/app/util/helper';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  // categories: ItemResponse[] = []
  products: ItemResponse[] = []
  pickedItem?: ItemResponse
  isAdmin: any;
  toUpdateItem: ItemRequest = new ItemRequest();
  images: ImageDetails[] = [];

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _helper: AppHelper, private modalService: NgbModal
    , private _cStore: Store<{ categories: CategoryResponse[] }>, private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data
        //if (this.products.length > 0)
        //this._cStore.dispatch(setCategories({ categories: this.categories }))
      },
      error: (error) => {
        console.log('error loading category' + error)
        this._toast.error('Error loading category', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 })
      }
    });
  }

  open(content: any, item: ItemResponse) {
    console.log('Inside open Item modal')
    this.pickedItem = item
    console.log('Picked item is: ' + JSON.stringify(this.pickedItem))
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  updateProduct(itemId: string) {
    //throw new Error('Method not implemented.');
  }

  // Handle image selection
  onImageChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.images = Array.from(files).map(file => {
        if (file.type != 'image/png' && file.type != 'image/jpeg') {
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
}
