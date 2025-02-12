import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, take } from 'rxjs';
import { ImageDetails } from 'src/app/dto/imageDetails.model';
import { ItemRequest } from 'src/app/dto/inventory/request/item-request.model';
import { CategoryResponse } from 'src/app/dto/inventory/response/category.model';
import { ItemResponse } from 'src/app/dto/inventory/response/product.model';
import { LoaderService } from 'src/app/service/common/loader.service';
import { CategoryService } from 'src/app/service/inventory/category.service';
import { ProductService } from 'src/app/service/inventory/product.service';
import { setCategories } from 'src/app/store/inventory/category.action';
import { setProducts } from 'src/app/store/inventory/product.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ItemRequest = new ItemRequest(undefined, '', '', '', undefined, undefined, undefined, '');
  categories: CategoryResponse[] = []
  cId: any;
  pickedCat: any;
  images: ImageDetails[] = [];

  constructor(private _toast: ToastrService, private _categoryService: CategoryService, public _loader: LoaderService, private _cStore: Store<{ categories: CategoryResponse[] }>
    , private _productService: ProductService, private _router: Router, private _route: ActivatedRoute, private _modalService: NgbModal, private _pStore: Store<{ products: ItemResponse[] }>) { }

  ngOnInit(): void {
    console.log('Inside add product')
    this._cStore.select("categories").subscribe({
      next: categories => {
        if (categories.length > 0) {
          this.categories = categories
          console.log('Loaded from store')
        } else {
          console.log('Loaded from service')
          // Service call
          this._categoryService.getCategories().subscribe({
            next: (data) => {
              this.categories = data
              //console.log('categories total from service ' + JSON.stringify(this.categories))
              if (this.categories.length > 0)
                this._cStore.dispatch(setCategories({ categories: this.categories }))
            },
            error: error => {
              console.log('error loading category' + error)
              this._toast.error('Error loading category', 'Warning', { positionClass: 'toast-center-center', timeOut: 2000 })
            }
          });
        }
      }
    });

    this.cId = this._route.snapshot.paramMap.get('cId')
    console.log('category id from router: ' + this.cId)
    if (this.cId) {
      // console.log('categories total ' + this.categories.length)
      const ind = this.categories.findIndex(cat => cat.id === this.cId);
      // console.log('Index from cat: ' + ind)
      const catexis = this.categories[ind];
      // console.log('category from router: ' + JSON.stringify(catexis))
      this.pickedCat = { 'name': catexis.name, 'id': catexis.id }
      console.log('category from router: ' + JSON.stringify(this.pickedCat))
      this._modalService.dismissAll()
    }
  }

  onSubmit(event: SubmitEvent, productForm: NgForm) {
    event.preventDefault();
    if (productForm.invalid) {
      console.log('Invalid product' + this.product)
      this._toast.error('Fields marked with * are mandatory!', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 });
    } else {
      console.log('product is ' + JSON.stringify(this.product))
      this._productService.addProduct(this.product, this.images!).subscribe(
        {
          next: (data) => {
            console.log('Added product')
            let ind: any;
            if (this.pickedCat) {
              ind = this.categories.findIndex(cat => cat.id === this.pickedCat.id + '');
            } else {
              ind = this.categories.findIndex(cat => cat.id === this.product.category + '');
            }
            console.log('index is: ' + ind)
            const catexis = this.categories[ind];
            // console.log('Category is : '+JSON.stringify(catexis))
            const itemCount: number = +catexis.totalItems + 1
            const newCat = new CategoryResponse(catexis.name, catexis.about, catexis.coverImage, catexis.id, [], catexis.images, itemCount + '');
            // const newCat = new CategoryResponse(catexis.name, catexis.about, catexis.coverImage, catexis.id, this.categories[ind] ? this.categories[ind].products.concat(data) : [data], catexis.images, catexis.totalItems);

            this.categories = this.categories.filter(cat => cat.id != this.product.category + '').concat(newCat);
            this._cStore.dispatch(setCategories({ categories: this.categories }))

            this.validateAndAddProductToStore(data);

            this._toast.success('Product Added succesfully!!!')
            this._router.navigate(['/admin/categories'])
          },
          error: error => {
            console.log('error adding item' + error)
            this._toast.error('Error adding item', 'Warning', { positionClass: 'toast-center-center', timeOut: 3000 })
          }
        }
      );
    }
  }

  // Handle image selection
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

  private validateAndAddProductToStore(data: ItemResponse) {
    console.log('inside private method validateAndAddProductToStore')
    var currentCategories = lastValueFrom(this._pStore.pipe(select("products"), take(1)));
    currentCategories.then((result) => {
      console.log('Inside promise resolutin')
      if (result.length > 0) {
        this._pStore.dispatch(setProducts({ products: result.concat(data) }));
      }
    });
  }
}
